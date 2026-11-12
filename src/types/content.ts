import type { SectionSetting } from "@/lib/sections";

export type SocialLink = { platform: string; url: string };
export type SkillTool = { name: string; icon: string };
export type InfoRow = { label: string; value: string };

export type Profile = {
  id?: string;
  full_name: string;
  professional_title: string;
  typed_roles: string[];
  short_intro: string;
  bio: string;
  email: string;
  phone: string | null;
  location: string;
  profile_image_url: string;
  hero_image_url: string | null;
  resume_url: string | null;
  availability_status: string;
  social_links: SocialLink[];
  skill_tools: SkillTool[];
  /** Hero: fixed start of the headline; typed_roles rotate after it. */
  hero_headline: string;
  /** Hero: small trust line under the buttons, e.g. "120+ businesses trust my work". */
  trust_line: string;
  /** Optional photo behind the dark hero (a dark overlay is added automatically). */
  hero_background_url: string | null;
  about_title: string;
  about_image_url: string | null;
  /** Checklist in the About section. */
  about_points: string[];
  experience_years: number;
  /** Photos in the "Why work with me" section (up to 3). */
  work_photos: string[];
  /** "Birthday: 01.07.1994" style rows on the About page. */
  personal_info: InfoRow[];
  /** Academic fields */
  affiliation: string | null;
  research_interests: string[];
  press_bio: string | null;
  cv_updated: string | null;
};

export type Service = {
  id: string;
  title: string;
  short_description: string;
  icon_key: string | null;
  active: boolean;
  sort_order: number;
};

export type ResumeItem = {
  id: string;
  type: "education" | "experience" | "visiting" | "service";
  title: string;
  subtitle: string;
  period: string;
  badge: string | null;
  description: string;
  active: boolean;
  sort_order: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  /** bar = progress bar, circle = round meter (languages), tag = check-mark list (knowledge) */
  display: "bar" | "circle" | "tag";
  active: boolean;
  sort_order: number;
};

export type Client = {
  id: string;
  name: string;
  category: string;
  logo_url: string | null;
  website_url: string | null;
  active: boolean;
  sort_order: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  read_time: string;
  published_at: string;
  link_url?: string | null;
  status: "published" | "draft";
  updated_at?: string;
};

export type SiteSettings = {
  id?: string;
  website_name: string;
  logo_url: string | null;
  accent_color: string;
  /** Second brand colour used in gradients. */
  accent_color_2: string;
  default_theme: "dark" | "light" | "system";
  contact_email: string;
  public_phone: string | null;
  seo_title: string;
  seo_description: string;
  footer_text: string;
  hire_label: string;
  /** Home page section order + visibility (see src/lib/sections.ts) */
  sections: SectionSetting[];
  /** Google Maps / OpenStreetMap embed link for the Contact page. */
  map_embed_url: string | null;
  /** Animated circle that follows the mouse. */
  cursor_enabled: boolean;
};

export type Award = {
  id: string;
  title: string;
  organization: string | null;
  year: string | null;
  short_description: string;
  image_url: string | null;
  link_url: string | null;
  active: boolean;
  sort_order: number;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type Stat = {
  id: string;
  value: string;
  label: string;
  /** "band" = counters strip, "about" = vertical bars in the About section */
  placement: "band" | "about";
  /** Bar height for "about" stats (0–100). */
  percent: number;
  active: boolean;
  sort_order: number;
};


export type PubType = "journal" | "book" | "chapter" | "proceedings" | "working" | "other";

export type Publication = {
  id: string;
  title: string;
  slug: string;
  pub_type: PubType;
  /** Display string, e.g. "De Masi, S., Zattoni, A., & Van Ees, H." */
  authors: string;
  year: number;
  venue: string | null;
  details: string | null;
  /** Plain DOI such as 10.1111/beer.12467 (the site builds the https://doi.org link). */
  doi: string | null;
  isbn: string | null;
  abstract: string | null;
  topics: string[];
  abs_stars: number;
  impact_factor: string | null;
  badge: string | null;
  status: "published" | "forthcoming" | "working";
  featured: boolean;
  language: string;
  /** Extra research links: platform = button label (SSRN, ResearchGate, PDF ...). */
  links: SocialLink[];
  active: boolean;
  sort_order: number;
  updated_at?: string;
};

export type TalkRole = "presenter" | "chair" | "discussant" | "organizer" | "mentor" | "invited" | "participant";

export type Talk = {
  id: string;
  year: number;
  event: string;
  location: string | null;
  dates: string | null;
  role: TalkRole;
  title: string | null;
  link_url: string | null;
  active: boolean;
  sort_order: number;
};

export type Course = {
  id: string;
  title: string;
  institution: string;
  programme: string | null;
  level: string | null;
  language: string | null;
  years: string | null;
  status: "current" | "past";
  active: boolean;
  sort_order: number;
};
