import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resources } from "@/lib/admin/resources";
import { PageHeader } from "@/components/admin/ui";
import { ResourceForm } from "@/components/admin/resource-form";
import { saveResource } from "@/actions/admin";

type Props = { params: Promise<{ resource: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { resource, id } = await params;
  const r = resources[resource];
  return { title: r ? `${id === "new" ? "New" : "Edit"} ${r.singular.toLowerCase()}` : "Not found" };
}

const defaults: Record<string, Record<string, unknown>> = {
  publications: { pub_type: "journal", status: "published", language: "en", year: new Date().getFullYear(), abs_stars: 0, topics: [], links: [], active: true, sort_order: 0 },
  talks: { role: "presenter", year: new Date().getFullYear(), active: true, sort_order: 0 },
  courses: { status: "current", active: true, sort_order: 0 },
  services: { active: true, icon_key: "landmark", sort_order: 0 },
  resume: { type: "experience", active: true, sort_order: 0 },
  skills: { level: 100, display: "tag", category: "Refereeing", active: true, sort_order: 0 },
  clients: { category: "Affiliation", active: true, sort_order: 0 },
  awards: { active: true, sort_order: 0, year: String(new Date().getFullYear()) },
  stats: { placement: "band", percent: 0, active: true, sort_order: 0 },
  gallery: { active: true, sort_order: 0 },
  blog: { status: "published", read_time: "2 min read", published_at: new Date().toISOString().slice(0, 10) },
};

export default async function ResourceEdit({ params }: Props) {
  await requireAdmin();
  const { resource: key, id } = await params;
  const resource = resources[key];
  if (!resource) notFound();

  const isNew = id === "new";
  let values: Record<string, unknown> = defaults[key] ?? {};
  if (!isNew) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from(resource.table).select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    values = data;
  }

  return (
    <>
      <Link href={`/admin/${key}`} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-heading">
        <ArrowLeft size={15} /> {resource.label}
      </Link>
      <PageHeader title={isNew ? `New ${resource.singular.toLowerCase()}` : `Edit ${resource.singular.toLowerCase()}`} description={resource.description} />
      <ResourceForm
        fields={resource.fields}
        values={values}
        action={saveResource.bind(null, key, isNew ? null : id)}
        cancelHref={`/admin/${key}`}
        submitLabel={isNew ? `Create ${resource.singular.toLowerCase()}` : "Save changes"}
      />
    </>
  );
}
