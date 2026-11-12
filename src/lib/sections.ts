/**
 * Website pages: which ones are shown. Stored in site_settings.sections and
 * edited in Admin → Settings → Page sections. Turning a page off also removes
 * its menu link and its sitemap entry.
 */
export type SectionKey = "about" | "publications" | "teaching" | "blog" | "cv" | "contact";

export type SectionSetting = { key: SectionKey; visible: boolean };

type SectionDef = { key: SectionKey; label: string; description: string };

export const SECTION_DEFS: SectionDef[] = [
  { key: "about", label: "About", description: "Bio, positions, education, awards, research areas (/about)" },
  { key: "publications", label: "Publications", description: "Papers, Books & Book Chapters, Other Publications (/publications/…)" },
  { key: "teaching", label: "Teaching", description: "Courses by institution (/teaching)" },
  { key: "blog", label: "News", description: "News and media (/news)" },
  { key: "cv", label: "Curriculum Vitae", description: "European-style CV page with PDF download (/cv)" },
  { key: "contact", label: "Contact", description: "Contact form and addresses (/contact)" },
];

export const SECTION_KEYS = SECTION_DEFS.map((d) => d.key);

export const defaultSections: SectionSetting[] = SECTION_DEFS.map((d) => ({ key: d.key, visible: true }));

/** Merges saved settings with the known sections: keeps saved order, drops unknown keys, appends new ones. */
export function normalizeSections(saved: unknown): SectionSetting[] {
  if (typeof saved === "string") {
    try {
      saved = JSON.parse(saved);
    } catch {
      saved = [];
    }
  }
  const list = Array.isArray(saved) ? saved : [];
  const seen = new Set<string>();
  const result: SectionSetting[] = [];
  for (const item of list) {
    const key = (item as SectionSetting)?.key;
    if (!SECTION_KEYS.includes(key) || seen.has(key)) continue;
    seen.add(key);
    result.push({ key, visible: (item as SectionSetting).visible !== false });
  }
  for (const d of SECTION_DEFS) if (!seen.has(d.key)) result.push({ key: d.key, visible: true });
  return result;
}

export function isSectionVisible(saved: unknown, key: SectionKey) {
  return normalizeSections(saved).find((s) => s.key === key)?.visible ?? true;
}

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

const publicationChildren = [
  { label: "Papers", href: "/publications/papers" },
  { label: "Books & Book Chapters", href: "/publications/books" },
  { label: "Other Publications", href: "/publications/other" },
];

const hrefs: Record<SectionKey, Omit<NavItem, "label">> = {
  about: { href: "/about" },
  publications: { href: "/publications/papers", children: publicationChildren },
  teaching: { href: "/teaching" },
  blog: { href: "/news" },
  cv: { href: "/cv" },
  contact: { href: "/contact" },
};

/** Menu: Home, About, Publications (3 sub-menus), Teaching, News, Curriculum Vitae, Contact (order set in Settings). */
export function navItems(saved: unknown): NavItem[] {
  return [
    { label: "Home", href: "/" },
    ...normalizeSections(saved)
      .filter((s) => s.visible)
      .map((s) => ({ label: SECTION_DEFS.find((d) => d.key === s.key)!.label, ...hrefs[s.key] })),
  ];
}

export function sectionLabel(key: SectionKey) {
  return SECTION_DEFS.find((d) => d.key === key)?.label ?? key;
}

export function sectionDescription(key: SectionKey) {
  return SECTION_DEFS.find((d) => d.key === key)?.description ?? "";
}

/** Where "Invite me" style buttons go: the contact page, or email when Contact is turned off. */
export function contactLink(saved: unknown, email: string) {
  return isSectionVisible(saved, "contact") ? "/contact" : `mailto:${email}`;
}
