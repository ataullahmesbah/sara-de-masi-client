import Link from "next/link";
import { BookOpen, CheckCircle2, ExternalLink, GraduationCap, Mail, Mic, Newspaper, Plus, Trophy, UserPen } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/data";
import { Badge, Card } from "@/components/admin/ui";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

export default async function Overview() {
  const admin = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const count = async (table: string, filter?: [string, unknown]) => {
    let q = supabase.from(table).select("id", { count: "exact", head: true });
    if (filter) q = q.eq(filter[0], filter[1]);
    return (await q).count ?? 0;
  };
  const [pubs, talks, courses, awards, posts, unread, recent, noLink, settings] = await Promise.all([
    count("publications", ["active", true]),
    count("talks", ["active", true]),
    count("courses", ["active", true]),
    count("awards", ["active", true]),
    count("blog_posts", ["status", "published"]),
    count("messages", ["is_read", false]),
    supabase.from("publications").select("id, title, year, pub_type, updated_at").order("updated_at", { ascending: false }).limit(6),
    supabase.from("publications").select("id", { count: "exact", head: true }).is("doi", null).eq("links", "[]"),
    getSettings(),
  ]);

  const stats = [
    { label: "Publications", value: pubs, Icon: BookOpen, href: "/admin/publications" },
    { label: "Talks & events", value: talks, Icon: Mic, href: "/admin/talks" },
    { label: "Courses", value: courses, Icon: GraduationCap, href: "/admin/courses" },
    { label: "Awards", value: awards, Icon: Trophy, href: "/admin/awards" },
    { label: "News items", value: posts, Icon: Newspaper, href: "/admin/blog" },
    { label: "Unread messages", value: unread, Icon: Mail, href: "/admin/messages" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const missing = noLink.count ?? 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">{greeting},</p>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Welcome back, {admin.displayName.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-muted">{settings.website_name} · Academic website</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-heading hover:bg-[var(--card-to)]">
          <ExternalLink size={16} /> View website
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map(({ label, value, Icon, href }) => (
          <Link key={label} href={href} className="group rounded-2xl border border-line bg-[var(--card-to)] p-5 transition hover:-translate-y-0.5 hover:border-accent/40">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent-ink">
              <Icon size={18} />
            </span>
            <p className="mt-4 font-heading text-3xl font-bold text-heading">{value}</p>
            <p className="mt-0.5 text-xs text-muted">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 [&>*]:min-w-0">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">Recently edited publications</h2>
            <Link href="/admin/publications" className="text-sm text-accent-ink hover:underline">All publications</Link>
          </div>
          {recent.data?.length ? (
            <ul className="divide-y divide-[var(--border)]">
              {recent.data.map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/publications/${p.id}`} className="flex items-center gap-4 py-3 hover:opacity-80">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-heading">{p.title}</span>
                      <span className="text-xs text-muted">{p.year} · edited {formatDate(p.updated_at)}</span>
                    </span>
                    <Badge>{p.pub_type}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-sm text-muted">No publications yet.</p>
          )}
          {missing > 0 && (
            <p className="mt-4 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
              {missing} publication{missing === 1 ? "" : "s"} ha{missing === 1 ? "s" : "ve"} no DOI or link, so there is no “View Paper” button for {missing === 1 ? "it" : "them"}. Add the real DOI when you have it.
            </p>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 font-heading text-lg font-semibold">Quick actions</h2>
            <div className="grid gap-2">
              <Link href="/admin/publications/new" className="flex items-center gap-3 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-on-accent hover:opacity-90">
                <Plus size={16} /> Add publication
              </Link>
              <Link href="/admin/blog/new" className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-medium text-heading hover:bg-[var(--bg)]">
                <Newspaper size={16} /> Write news item
              </Link>
              <Link href="/admin/talks/new" className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-medium text-heading hover:bg-[var(--bg)]">
                <Mic size={16} /> Add talk / event
              </Link>
              <Link href="/admin/profile" className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-medium text-heading hover:bg-[var(--bg)]">
                <UserPen size={16} /> Edit profile & CV
              </Link>
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 font-heading text-lg font-semibold">Website status</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-emerald-500" /> Website is online</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-emerald-500" /> Database connected</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-emerald-500" /> Changes publish instantly</li>
            </ul>
            <a href={siteConfig.url} target="_blank" rel="noopener noreferrer" className="mt-4 block truncate text-sm text-accent-ink hover:underline">{siteConfig.url.replace(/^https?:\/\//, "")}</a>
          </Card>
        </div>
      </div>
    </div>
  );
}
