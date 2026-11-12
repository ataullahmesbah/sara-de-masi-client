import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { PubSubnav } from "@/components/site/pub-subnav";
import { PublicationList } from "@/components/site/publication-list";
import { getPublications, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";
import { BOOK_TYPES } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Books & Book Chapters",
  description: "Books and edited book chapters by Sara De Masi.",
  alternates: { canonical: "/publications/books" },
};

export default async function Page() {
  const [settings, pubs] = await Promise.all([getSettings(), getPublications()]);
  if (!isSectionVisible(settings.sections, "publications")) notFound();
  const items = pubs.filter((p) => BOOK_TYPES.includes(p.pub_type));
  const books = items.filter((p) => p.pub_type === "book");
  const chapters = items.filter((p) => p.pub_type === "chapter");
  return (
    <div className="page">
      <PageHead chip="Publications" title="Books & Book Chapters" />
      <PubSubnav active="/publications/books" />
      <div className="flex flex-col gap-14">
        <section aria-labelledby="books">
          <h2 id="books" className="block-title mb-8">Books</h2>
          <PublicationList items={books} />
        </section>
        <section aria-labelledby="chapters">
          <h2 id="chapters" className="block-title mb-8">Book Chapters</h2>
          <PublicationList items={chapters} />
        </section>
      </div>
    </div>
  );
}
