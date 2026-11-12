import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Authors } from "@/components/site/authors";
import { doiUrl, publicationLinks } from "@/lib/publications";
import type { Publication } from "@/types/content";

function impact(v: string | null) {
  if (!v) return null;
  const m = v.match(/^(.+?)\s*\((\d{4})\)$/);
  return m ? `Impact Factor (${m[2]}): ${m[1]}` : `Impact Factor: ${v}`;
}

function Card({ pub }: { pub: Publication }) {
  const links = publicationLinks(pub);
  const meta = [impact(pub.impact_factor), pub.abs_stars ? `${pub.abs_stars} Star${pub.abs_stars > 1 ? "s" : ""} (ABS)` : null].filter(Boolean);
  return (
    <article className="group h-full border border-line bg-card p-6 transition-colors duration-300 hover:border-accent sm:p-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-heading text-[26px] leading-none font-extrabold text-accent-ink">{pub.year}</span>
        {pub.badge && <span className="chip !text-accent-ink">★ {pub.badge}</span>}
      </div>
      <h3 className="mt-4 font-heading text-[19px] leading-snug font-bold text-heading">
        {pub.doi ? (
          <a href={doiUrl(pub.doi)} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink">
            {pub.title}
          </a>
        ) : (
          pub.title
        )}
      </h3>
      <p className="mt-3 text-[16px] leading-[1.7]">
        <Authors text={pub.authors} />
      </p>
      {(pub.venue || pub.details) && (
        <p className="mt-1 text-[16px] leading-[1.7] italic">
          {pub.venue}
          {pub.venue && pub.details ? ", " : ""}
          {pub.details}
        </p>
      )}
      {pub.isbn && <p className="mt-1 text-[15px] text-muted">ISBN: {pub.isbn}</p>}
      {meta.length > 0 && <p className="mt-2 font-heading text-[14px] font-semibold text-muted">{meta.join(" · ")}</p>}
      {links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map((l, i) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={i === 0 ? "btn btn-solid !min-h-[44px] !px-5 !text-[14px]" : "btn btn-line !min-h-[44px] !px-5 !text-[14px]"}>
              {l.label} <ArrowUpRight size={15} aria-hidden />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export function PublicationList({ items, empty = "Publications will appear here soon." }: { items: Publication[]; empty?: string }) {
  if (!items.length) return <p>{empty}</p>;
  return (
    <Stagger className="grid gap-6">
      {items.map((p) => (
        <StaggerItem key={p.id}>
          <Card pub={p} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
