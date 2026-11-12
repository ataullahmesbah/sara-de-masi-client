import { HomeHero } from "@/components/site/home-hero";
import { JsonLd } from "@/components/site/json-ld";
import { siteConfig } from "@/config/site";
import { contactLink } from "@/lib/sections";
import { getProfile, getSettings, getStats } from "@/lib/data";

export default async function HomePage() {
  const [settings, profile, stats] = await Promise.all([getSettings(), getProfile(), getStats()]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${siteConfig.url}/#person`,
              name: profile.full_name,
              jobTitle: profile.professional_title,
              description: profile.short_intro,
              email: `mailto:${settings.contact_email}`,
              image: new URL(profile.profile_image_url, siteConfig.url).toString(),
              url: siteConfig.url,
              affiliation: { "@type": "CollegeOrUniversity", name: "University of Florence", url: "https://www.unifi.it/" },
              knowsAbout: profile.research_interests,
              sameAs: profile.social_links.map((s) => s.url),
            },
            { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, url: siteConfig.url, name: settings.website_name, description: settings.seo_description, publisher: { "@id": `${siteConfig.url}/#person` } },
          ],
        }}
      />
      <HomeHero
        name={profile.full_name}
        roles={profile.typed_roles.length ? profile.typed_roles : [profile.professional_title]}
        intro={profile.short_intro}
        photo={profile.hero_image_url || profile.profile_image_url}
        socials={profile.social_links}
        resumeUrl={profile.resume_url}
        contactHref={contactLink(settings.sections, settings.contact_email)}
        hireLabel={settings.hire_label}
        stats={stats.slice(0, 3)}
      />
    </>
  );
}
