import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { getCourses, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Teaching",
  description: "Courses taught by Sara De Masi at the University of Florence, NYU Florence, BIG Academy and Kent State University.",
  alternates: { canonical: "/teaching" },
};

export default async function TeachingPage() {
  const [settings, courses] = await Promise.all([getSettings(), getCourses()]);
  if (!isSectionVisible(settings.sections, "teaching")) notFound();
  const current = courses.filter((c) => c.status === "current");
  const past = courses.filter((c) => c.status === "past");
  const institutions = [...new Set(current.map((c) => c.institution))];

  return (
    <div className="page">
      <PageHead chip="Teaching" title="Teaching" />
      <div className="flex flex-col gap-16">
        {institutions.map((inst) => (
          <section key={inst} aria-label={inst}>
            <h2 className="block-title mb-8">{inst}</h2>
            <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {current
                .filter((c) => c.institution === inst)
                .map((c) => (
                  <StaggerItem key={c.id}>
                    <article className="group h-full border border-line bg-card p-7 transition-colors duration-300 hover:border-accent">
                      <p className="font-heading text-[13px] font-medium text-muted italic">{[c.level, c.language, c.years].filter(Boolean).join(" / ")}</p>
                      <h3 className="mt-3 text-[19px] leading-snug font-bold">{c.title}</h3>
                      {c.programme && <p className="mt-2 text-[15px] leading-relaxed">{c.programme}</p>}
                    </article>
                  </StaggerItem>
                ))}
            </Stagger>
          </section>
        ))}

        {past.length > 0 && (
          <section aria-label="Teaching archive">
            <h2 className="block-title mb-8">Previous Teaching</h2>
            <ul className="border-t border-line">
              {past.map((c) => (
                <li key={c.id} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[170px_1fr] sm:gap-8">
                  <span className="font-heading text-[14px] font-semibold text-muted">{c.years}</span>
                  <span>
                    <strong className="font-heading text-heading">{c.title}</strong>
                    <span className="block text-[15px]">{[c.institution, c.programme].filter(Boolean).join(" · ")}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
