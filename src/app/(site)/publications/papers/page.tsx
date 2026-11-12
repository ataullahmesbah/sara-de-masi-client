import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { PubSubnav } from "@/components/site/pub-subnav";
import { PublicationList } from "@/components/site/publication-list";
import { getPublications, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";
import { PAPER_TYPES } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Papers",
  description: "Peer-reviewed journal articles by Sara De Masi on corporate governance, board diversity, women on boards and executive compensation.",
  alternates: { canonical: "/publications/papers" },
};

export default async function Page() {
  const [settings, pubs] = await Promise.all([getSettings(), getPublications()]);
  if (!isSectionVisible(settings.sections, "publications")) notFound();
  const items = pubs.filter((p) => PAPER_TYPES.includes(p.pub_type));
  return (
    <div className="page">
      <PageHead chip="Publications" title="Papers" />
      <PubSubnav active="/publications/papers" />
      <p className="mb-8 text-[16px]">{items.length} peer-reviewed journal articles. Titles and the “View Paper” buttons open the paper through its DOI.</p>
      <PublicationList items={items} />
    </div>
  );
}
