import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { PubSubnav } from "@/components/site/pub-subnav";
import { PublicationList } from "@/components/site/publication-list";
import { getPublications, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";
import { OTHER_TYPES } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Other Publications",
  description: "Conference proceedings, working papers, reports and doctoral thesis by Sara De Masi.",
  alternates: { canonical: "/publications/other" },
};

export default async function Page() {
  const [settings, pubs] = await Promise.all([getSettings(), getPublications()]);
  if (!isSectionVisible(settings.sections, "publications")) notFound();
  const items = pubs.filter((p) => OTHER_TYPES.includes(p.pub_type));
  return (
    <div className="page">
      <PageHead chip="Publications" title="Other Publications" />
      <PubSubnav active="/publications/other" />
      <p className="mb-8 text-[16px]">Conference proceedings, working papers, reports and doctoral thesis.</p>
      <PublicationList items={items} />
    </div>
  );
}
