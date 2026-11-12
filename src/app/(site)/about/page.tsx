import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { AboutIntro } from "@/components/site/about-intro";
import { Services } from "@/components/site/services";
import { Skills } from "@/components/site/skills";
import { Resume } from "@/components/site/resume";
import { Clients } from "@/components/site/clients";
import { Awards } from "@/components/site/awards";
import { getAwards, getClients, getProfile, getResearchAreas, getResume, getSettings, getSkills } from "@/lib/data";
import { contactLink, isSectionVisible } from "@/lib/sections";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return { title: "About", description: (profile.bio || profile.short_intro).slice(0, 160), alternates: { canonical: "/about" } };
}

export default async function AboutPage() {
  const [settings, profile, areas, skills, resume, clients, awards] = await Promise.all([getSettings(), getProfile(), getResearchAreas(), getSkills(), getResume(), getClients(), getAwards()]);
  if (!isSectionVisible(settings.sections, "about")) notFound();
  const contactHref = contactLink(settings.sections, settings.contact_email);
  const cvLink = isSectionVisible(settings.sections, "cv") ? "/cv" : null;

  return (
    <div className="page">
      <PageHead chip="About" title="About Me" />
      <div className="flex flex-col gap-24">
        <AboutIntro profile={{ ...profile, resume_url: profile.resume_url ?? cvLink }} contactHref={contactHref} hireLabel={settings.hire_label} />
        {areas.length > 0 && (
          <div>
            <h2 className="block-title mb-8">Research Areas</h2>
            <Services services={areas} />
          </div>
        )}
        {resume.length > 0 && <Resume items={resume} />}
        {awards.length > 0 && <Awards awards={awards} />}
        {skills.length > 0 && <Skills skills={skills} />}
        {clients.length > 0 && <Clients clients={clients} />}
      </div>
    </div>
  );
}
