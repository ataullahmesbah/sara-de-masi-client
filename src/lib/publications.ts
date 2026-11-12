import type { Publication, PubType } from "@/types/content";

export const doiUrl = (doi: string) => `https://doi.org/${doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}`;

export type PubLink = { label: string; url: string };

/** Only real links: the DOI ("View Paper") and any extra link stored for the publication. */
export function publicationLinks(p: Publication): PubLink[] {
  const out: PubLink[] = [];
  if (p.doi) out.push({ label: "View Paper", url: doiUrl(p.doi) });
  for (const l of p.links ?? []) out.push({ label: l.platform, url: l.url });
  return out;
}

export const PAPER_TYPES: PubType[] = ["journal"];
export const BOOK_TYPES: PubType[] = ["book", "chapter"];
export const OTHER_TYPES: PubType[] = ["proceedings", "working", "other"];
