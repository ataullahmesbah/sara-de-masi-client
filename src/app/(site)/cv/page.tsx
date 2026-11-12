import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { PageHead } from "@/components/site/page-head";
import { PrintButton } from "@/components/site/print-button";
import { getAwards, getCourses, getProfile, getPublications, getResume, getSettings, getSkills, getTalks } from "@/lib/data";
import { doiUrl } from "@/lib/publications";
import { isSectionVisible } from "@/lib/sections";
import type { Publication, ResumeItem } from "@/types/content";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "Curriculum vitae of Sara De Masi in European format: work experience, education and training, publications, conferences and awards.",
  alternates: { canonical: "/cv" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-section mt-10 grid gap-x-8 gap-y-3 md:grid-cols-[200px_1fr]">
      <h2 className="border-b-2 border-accent pb-1 font-heading text-[14px] font-bold tracking-[0.1em] text-heading uppercase md:border-b-0 md:pt-1">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Rows({ items }: { items: ResumeItem[] }) {
  return (
    <ul className="space-y-5">
      {items.map((r) => (
        <li key={r.id} className="grid gap-x-6 sm:grid-cols-[150px_1fr]">
          <span className="font-heading text-[14px] font-semibold text-muted">{r.period}</span>
          <span>
            <strong className="font-heading text-heading">{r.title}</strong>
            <span className="block text-[15px]">{r.subtitle}{r.badge && r.badge !== "Current" ? ` · ${r.badge}` : ""}</span>
            {r.description && <span className="block text-[14.5px] text-muted">{r.description}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Pubs({ items }: { items: Publication[] }) {
  return (
    <ol className="list-decimal space-y-2.5 pl-5 text-[15px] leading-relaxed">
      {items.map((p) => (
        <li key={p.id}>
          {p.authors} ({p.year}). {p.title}. {p.venue && <em>{p.venue}</em>}
          {p.details ? `, ${p.details}` : ""}.{" "}
          {p.doi && (
            <a href={doiUrl(p.doi)} target="_blank" rel="noopener noreferrer" className="underline">
              {doiUrl(p.doi)}
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}

export default async function CvPage() {
  const [settings, profile, resume, pubs, talks, awards, skills, courses] = await Promise.all([getSettings(), getProfile(), getResume(), getPublications(), getTalks(), getAwards(), getSkills(), getCourses()]);
  if (!isSectionVisible(settings.sections, "cv")) notFound();
  const of = (t: ResumeItem["type"]) => resume.filter((r) => r.type === t);
  const groups = [...new Set(skills.map((s) => s.category))];
  const info = profile.personal_info;

  return (
    <div className="page">
      <PageHead chip="Curriculum Vitae" title="Curriculum Vitae" />

      <div className="no-print mb-10 flex flex-wrap gap-4">
        {profile.resume_url && (
          <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" download className="btn btn-solid">
            <Download size={17} aria-hidden /> Download CV (PDF)
          </a>
        )}
        <PrintButton />
      </div>

      <article aria-label="Curriculum vitae" className="border border-line bg-card p-6 sm:p-10">
        <header className="border-b border-line pb-8">
          <p className="font-heading text-[13px] font-bold tracking-[0.14em] text-accent-ink uppercase">Curriculum Vitae</p>
          <h2 className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold">{profile.full_name}</h2>
          <p className="mt-1 font-heading text-[17px] font-medium text-muted">{profile.professional_title}</p>
        </header>

        <Section title="Personal information">
          <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-[130px_1fr]">
            {info.map((r) => (
              <div key={r.label + r.value} className="contents">
                <dt className="font-heading font-bold text-heading">{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
            {profile.cv_updated && (
              <>
                <dt className="font-heading font-bold text-heading">CV updated</dt>
                <dd>{profile.cv_updated}</dd>
              </>
            )}
          </dl>
        </Section>

        {profile.short_intro && (
          <Section title="About me">
            <p>{profile.press_bio || profile.short_intro}</p>
          </Section>
        )}

        {of("experience").length > 0 && (
          <Section title="Work experience">
            <Rows items={of("experience")} />
          </Section>
        )}
        {of("education").length > 0 && (
          <Section title="Education and training">
            <Rows items={of("education")} />
          </Section>
        )}
        {of("visiting").length > 0 && (
          <Section title="Visiting positions">
            <Rows items={of("visiting")} />
          </Section>
        )}
        {of("service").length > 0 && (
          <Section title="Academic leadership and service">
            <Rows items={of("service")} />
          </Section>
        )}

        <Section title="Publications">
          {[
            ["Papers", pubs.filter((p) => p.pub_type === "journal")],
            ["Books", pubs.filter((p) => p.pub_type === "book")],
            ["Book chapters", pubs.filter((p) => p.pub_type === "chapter")],
            ["Other publications", pubs.filter((p) => ["proceedings", "working", "other"].includes(p.pub_type))],
          ].map(([label, items]) => {
            const list = items as Publication[];
            return list.length ? (
              <div key={label as string} className="mb-8 last:mb-0">
                <h3 className="mb-3 font-heading text-[16px] font-bold text-heading">{label as string}</h3>
                <Pubs items={list} />
              </div>
            ) : null;
          })}
        </Section>

        {awards.length > 0 && (
          <Section title="Awards, grants and scholarships">
            <ul className="space-y-2">
              {awards.map((a) => (
                <li key={a.id}>
                  <strong className="font-heading text-heading">{a.year ? `${a.year} — ` : ""}{a.title}</strong>
                  {a.organization ? `, ${a.organization}` : ""}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {talks.length > 0 && (
          <Section title="Conferences and invited lectures">
            <ul className="space-y-1.5 text-[15px]">
              {talks.map((t) => (
                <li key={t.id} className="grid gap-x-4 sm:grid-cols-[56px_1fr]">
                  <span className="font-heading font-semibold text-muted">{t.year}</span>
                  <span>
                    {t.event}
                    {t.location ? `, ${t.location}` : ""} <span className="text-muted">({t.role})</span>
                    {t.title ? `: ${t.title}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {courses.length > 0 && (
          <Section title="Teaching">
            <ul className="space-y-1.5 text-[15px]">
              {courses.map((c) => (
                <li key={c.id} className="grid gap-x-4 sm:grid-cols-[150px_1fr]">
                  <span className="font-heading font-semibold text-muted">{c.years}</span>
                  <span>
                    <strong className="font-heading text-heading">{c.title}</strong>, {c.institution}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {groups.map((g) => (
          <Section key={g} title={g}>
            <p className="text-[15px] leading-relaxed">{skills.filter((s) => s.category === g).map((s) => s.name).join("; ")}</p>
          </Section>
        ))}
      </article>
    </div>
  );
}
