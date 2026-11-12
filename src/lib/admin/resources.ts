import { serviceIconKeys } from "@/components/ui/service-icon";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "gallery"
  | "file"
  | "list"
  | "slug"
  | "color"
  | "date"
  | "url"
  | "email"
  | "links"
  | "tools"
  | "info"
  | "embed"
  | "sections";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  /** Storage folder for uploads */
  folder?: string;
  min?: number;
  max?: number;
  rows?: number;
  maxLength?: number;
  /** Take the full row in the two-column form grid */
  full?: boolean;
  /** For slug fields: the field it is generated from */
  from?: string;
};

export type Column = {
  name: string;
  label: string;
  kind?: "image" | "badge" | "boolean" | "date" | "text";
};

export type Resource = {
  key: string;
  table: string;
  label: string;
  singular: string;
  description: string;
  fields: Field[];
  columns: Column[];
  /** Fields that can be toggled from the list view */
  toggles?: { name: string; label: string; on: unknown; off: unknown }[];
  orderBy: { column: string; ascending: boolean };
  sortable?: boolean;
  /** Public path to revalidate / preview (use {slug}) */
  publicPath?: string;
  emptyText: string;
};

const sortOrder: Field = { name: "sort_order", label: "Sort order", type: "number", min: 0, max: 9999, help: "Lower numbers appear first." };
const active: Field = { name: "active", label: "Visible on website", type: "boolean" };
const activeToggle = { name: "active", label: "Visible", on: true, off: false };

export const resources: Record<string, Resource> = {
  publications: {
    key: "publications",
    table: "publications",
    label: "Publications",
    singular: "Publication",
    description: "Shown in the Publications menu: Papers (journal articles), Books & Book Chapters, Other Publications. Add the DOI (the “View Paper” button) and any extra real links.",
    orderBy: { column: "year", ascending: false },
    emptyText: "No publications yet.",
    columns: [
      { name: "year", label: "Year" },
      { name: "title", label: "Title" },
      { name: "pub_type", label: "Type", kind: "badge" },
      { name: "venue", label: "Venue" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 400, full: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, help: "Filled automatically from the title. Must be unique." },
      {
        name: "pub_type",
        label: "Type",
        type: "select",
        required: true,
        options: [
          { value: "journal", label: "Paper (journal article) → Papers menu" },
          { value: "book", label: "Book → Books & Book Chapters menu" },
          { value: "chapter", label: "Book chapter → Books & Book Chapters menu" },
          { value: "proceedings", label: "Conference proceedings → Other Publications menu" },
          { value: "working", label: "Working paper → Other Publications menu" },
          { value: "other", label: "Other → Other Publications menu" },
        ],
      },
      { name: "authors", label: "Authors", type: "text", required: true, maxLength: 600, full: true, placeholder: "De Masi, S., Zattoni, A., & Van Ees, H.", help: "Format: Surname, I., Surname, I., & Surname, I. “De Masi” is shown in bold automatically." },
      { name: "year", label: "Year", type: "number", required: true, min: 1990, max: 2100 },
      { name: "venue", label: "Journal / publisher / conference", type: "text", maxLength: 300 },
      { name: "details", label: "Volume, issue, pages", type: "text", maxLength: 200, placeholder: "Vol. 34, No. 1, pp. 101–120" },
      { name: "doi", label: "DOI", type: "text", maxLength: 120, placeholder: "10.1111/beer.12467", help: "Only the DOI, e.g. 10.1111/beer.12467. The site builds the https://doi.org/… link and the “View Paper” button." },
      { name: "isbn", label: "ISBN (books and chapters)", type: "text", maxLength: 30 },
      { name: "links", label: "Extra links", type: "links", full: true, help: "Only real links. “Name” is the button label (e.g. PDF, Publisher page, Repository). The DOI above already creates the “View Paper” button." },
      { name: "abs_stars", label: "ABS stars (0–4)", type: "number", min: 0, max: 4, help: "0 = not shown." },
      { name: "impact_factor", label: "Impact factor (optional)", type: "text", maxLength: 40, placeholder: "9.924 (2022)", help: "Shown only on the publication page, with its year." },
      { name: "badge", label: "Badge", type: "text", maxLength: 80, placeholder: "Best Paper Award" },
      active,
      sortOrder,
    ],
  },

  talks: {
    key: "talks",
    table: "talks",
    label: "Talks & events",
    singular: "Talk / event",
    description: "Conferences and invited lectures. They appear in the Curriculum Vitae page.",
    orderBy: { column: "year", ascending: false },
    emptyText: "No talks yet.",
    columns: [
      { name: "year", label: "Year" },
      { name: "event", label: "Event" },
      { name: "role", label: "Role", kind: "badge" },
      { name: "dates", label: "Dates" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "year", label: "Year", type: "number", required: true, min: 1990, max: 2100 },
      { name: "event", label: "Event", type: "text", required: true, maxLength: 200, full: true },
      { name: "location", label: "Location", type: "text", maxLength: 160 },
      { name: "dates", label: "Dates", type: "text", maxLength: 60, placeholder: "22–25 Jun 2025" },
      {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        options: [
          { value: "presenter", label: "Presenter" },
          { value: "chair", label: "Session chair" },
          { value: "discussant", label: "Discussant" },
          { value: "organizer", label: "Organiser / Co-chair" },
          { value: "mentor", label: "Mentor" },
          { value: "invited", label: "Invited speaker" },
          { value: "participant", label: "Participant" },
        ],
      },
      { name: "title", label: "Paper / session title", type: "text", maxLength: 300, full: true },
      { name: "link_url", label: "Link (event page, paper or slides)", type: "url" },
      active,
      sortOrder,
    ],
  },

  courses: {
    key: "courses",
    table: "courses",
    label: "Courses",
    singular: "Course",
    description: "Teaching on the /teaching page. “Past” courses go into the collapsible archive.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No courses yet.",
    columns: [
      { name: "title", label: "Course" },
      { name: "institution", label: "Institution" },
      { name: "years", label: "Years" },
      { name: "status", label: "Status", kind: "badge" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "title", label: "Course title", type: "text", required: true, maxLength: 200, full: true },
      { name: "institution", label: "Institution", type: "text", required: true, maxLength: 160 },
      { name: "programme", label: "Programme", type: "text", maxLength: 160 },
      { name: "level", label: "Level", type: "text", maxLength: 30, placeholder: "BSc, MSc, Executive…" },
      { name: "language", label: "Language", type: "text", maxLength: 30 },
      { name: "years", label: "Years taught", type: "text", maxLength: 40, placeholder: "Since 2013" },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { value: "current", label: "Current" },
          { value: "past", label: "Past (archive)" },
        ],
      },
      active,
      sortOrder,
    ],
  },

  resume: {
    key: "resume",
    table: "resume_items",
    label: "Positions & education",
    singular: "Position",
    description: "Experience and education timeline on the About page and the Curriculum Vitae.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No positions yet.",
    columns: [
      { name: "title", label: "Title" },
      { name: "type", label: "Type", kind: "badge" },
      { name: "period", label: "Period" },
    ],
    toggles: [activeToggle],
    fields: [
      {
        name: "type",
        label: "Type",
        type: "select",
        required: true,
        options: [
          { value: "experience", label: "Academic / professional position" },
          { value: "service", label: "Service role (leadership, committees)" },
          { value: "visiting", label: "Visiting position" },
          { value: "education", label: "Education" },
        ],
      },
      { name: "title", label: "Title", type: "text", required: true, maxLength: 160 },
      { name: "subtitle", label: "Institution / organisation", type: "text", required: true, maxLength: 160 },
      { name: "period", label: "Period", type: "text", required: true, maxLength: 40, placeholder: "Jun 2024 – Present" },
      { name: "badge", label: "Badge", type: "text", maxLength: 30, placeholder: "Current" },
      { name: "description", label: "Description", type: "textarea", rows: 4, maxLength: 800, full: true },
      active,
      sortOrder,
    ],
  },

  services: {
    key: "services",
    table: "services",
    label: "Research areas",
    singular: "Research area",
    description: "Research themes shown on the About page.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No research areas yet.",
    columns: [
      { name: "title", label: "Title" },
      { name: "icon_key", label: "Icon", kind: "badge" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 80 },
      { name: "icon_key", label: "Icon", type: "select", options: serviceIconKeys.map((k) => ({ value: k, label: k })) },
      { name: "short_description", label: "Description", type: "textarea", required: true, rows: 4, maxLength: 300, full: true },
      active,
      sortOrder,
    ],
  },

  skills: {
    key: "skills",
    table: "skills",
    label: "Service lists",
    singular: "List item",
    description: "Items on the About page grouped by “Group title”: Refereeing, Memberships, Summer schools & PhD courses.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No items yet.",
    columns: [
      { name: "name", label: "Item" },
      { name: "category", label: "Group", kind: "badge" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "name", label: "Item", type: "text", required: true, maxLength: 160, full: true },
      { name: "category", label: "Group title", type: "text", required: true, maxLength: 60, placeholder: "Refereeing" },
      { name: "level", label: "Level (unused)", type: "number", min: 0, max: 100 },
      { name: "display", label: "Style", type: "select", required: true, options: [{ value: "tag", label: "List" }] },
      active,
      sortOrder,
    ],
  },

  clients: {
    key: "clients",
    table: "clients",
    label: "Affiliations",
    singular: "Affiliation",
    description: "Institutions shown on the About page. The name is shown as text unless you upload a logo.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No affiliations yet.",
    columns: [
      { name: "logo_url", label: "", kind: "image" },
      { name: "name", label: "Name" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, maxLength: 80 },
      { name: "category", label: "Group", type: "text", required: true, maxLength: 40, placeholder: "Affiliation" },
      { name: "logo_url", label: "Logo (optional)", type: "image", folder: "clients" },
      { name: "website_url", label: "Website", type: "url" },
      active,
      sortOrder,
    ],
  },

  awards: {
    key: "awards",
    table: "awards",
    label: "Awards",
    singular: "Award",
    description: "Awards, grants and scholarships on the About page. Newest first (use the arrows to reorder).",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No awards yet.",
    columns: [
      { name: "year", label: "Year" },
      { name: "title", label: "Award" },
      { name: "organization", label: "Awarded by", kind: "badge" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "title", label: "Award title", type: "text", required: true, maxLength: 160 },
      { name: "organization", label: "Awarding body", type: "text", maxLength: 120 },
      { name: "year", label: "Year", type: "text", maxLength: 20, placeholder: "2025" },
      { name: "link_url", label: "Link (optional)", type: "url", help: "Page of the award or of the related paper." },
      { name: "short_description", label: "Description (optional)", type: "textarea", rows: 3, maxLength: 400, full: true },
      active,
      sortOrder,
    ],
  },

  stats: {
    key: "stats",
    table: "stats",
    label: "Highlights",
    singular: "Highlight",
    description: "The 3 numbers on the home page (first three active items).",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No highlights yet.",
    columns: [
      { name: "value", label: "Value" },
      { name: "label", label: "Label" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "value", label: "Value", type: "text", required: true, maxLength: 12, placeholder: "2,100+" },
      { name: "label", label: "Label", type: "text", required: true, maxLength: 60 },
      active,
      sortOrder,
    ],
  },

  blog: {
    key: "blog",
    table: "blog_posts",
    label: "News",
    singular: "News item",
    description: "News and media on /news.",
    orderBy: { column: "published_at", ascending: false },
    publicPath: "/news/{slug}",
    emptyText: "No news yet.",
    columns: [
      { name: "cover_image_url", label: "", kind: "image" },
      { name: "title", label: "Title" },
      { name: "category", label: "Category", kind: "badge" },
      { name: "published_at", label: "Date", kind: "date" },
    ],
    toggles: [{ name: "status", label: "Published", on: "published", off: "draft" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 160, full: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, help: "/news/your-slug" },
      { name: "category", label: "Category", type: "text", required: true, maxLength: 40 },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 3, maxLength: 300, full: true },
      {
        name: "content",
        label: "Content",
        type: "textarea",
        required: true,
        rows: 14,
        maxLength: 30000,
        full: true,
        help: "Leave a blank line between paragraphs. Start a line with “## ” for a heading and “- ” for a bullet point.",
      },
      { name: "cover_image_url", label: "Cover image", type: "image", required: true, folder: "blog", full: true },
      { name: "link_url", label: "External link (e.g. LinkedIn post)", type: "url", full: true },
      { name: "read_time", label: "Read time", type: "text", maxLength: 20, placeholder: "2 min read" },
      { name: "published_at", label: "Publish date", type: "date", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { value: "published", label: "Published" },
          { value: "draft", label: "Draft (hidden)" },
        ],
      },
    ],
  },
};

export const profileFields: Field[] = [
  { name: "full_name", label: "Full name", type: "text", required: true, maxLength: 80 },
  { name: "professional_title", label: "Title", type: "text", required: true, maxLength: 100, placeholder: "Associate Professor of Management" },
  { name: "typed_roles", label: "Home: typing words", type: "list", required: true, full: true, help: "One per line, e.g. Associate Professor." },
  { name: "affiliation", label: "Affiliation", type: "text", maxLength: 160, full: true },
  { name: "short_intro", label: "Home: short intro", type: "textarea", required: true, rows: 3, maxLength: 300, full: true, help: "Two or three lines under the name on the home page." },
  { name: "bio", label: "Long bio", type: "textarea", required: true, rows: 10, maxLength: 4000, full: true, help: "Shown on the About page. Leave a blank line between paragraphs." },
  { name: "press_bio", label: "Press bio (third person)", type: "textarea", rows: 4, maxLength: 800, full: true, help: "Optional. Third-person bio for conference programmes."},
  { name: "research_interests", label: "Research interests", type: "list", full: true, help: "One per line." },
  { name: "hero_image_url", label: "Home photo", type: "image", folder: "profile", help: "Square portrait. It is shown inside the morphing shape (black & white until hover)." },
  { name: "profile_image_url", label: "Profile photo (small, square)", type: "image", required: true, folder: "profile", help: "Used for search engines and social sharing." },
  { name: "resume_url", label: "CV (PDF)", type: "file", folder: "documents", help: "Used by every “Download CV” button." },
  { name: "cv_updated", label: "CV last updated", type: "text", maxLength: 40, placeholder: "November 2026" },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "text", maxLength: 30 },
  { name: "location", label: "Location", type: "text", required: true, maxLength: 80 },
  { name: "personal_info", label: "About & CV details", type: "info", full: true, help: "Rows shown on the About page and in the CV, e.g. Position, Affiliation, Email, Address, NYU Florence. The row labelled “NYU Florence” also appears on the Contact page." },
  { name: "social_links", label: "Social / profile links", type: "links", full: true, help: "Icons on the home page, e.g. LinkedIn, ResearchGate, ORCID. Only add real profile URLs." },
];

export const settingsFields: Field[] = [
  { name: "website_name", label: "Website name", type: "text", required: true, maxLength: 60 },
  { name: "hire_label", label: "Invitation button label", type: "text", required: true, maxLength: 30 },
  { name: "logo_url", label: "Logo (optional — the name is used otherwise)", type: "image", folder: "settings" },
  { name: "accent_color", label: "Accent colour", type: "color", required: true, help: "Cursor circle, active menu and buttons (gold by default)." },
  {
    name: "default_theme",
    label: "Default theme",
    type: "select",
    required: true,
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "system", label: "Follow visitor's system" },
    ],
  },
  { name: "contact_email", label: "Public contact email", type: "email", required: true },
  { name: "footer_text", label: "Footer line", type: "text", maxLength: 100, full: true, placeholder: "Associate Professor of Management, University of Florence" },
  {
    name: "map_embed_url",
    label: "Contact map (embed link)",
    type: "embed",
    full: true,
    help: "Google Maps → Share → Embed a map → copy only the link inside src=\"...\". Leave empty to hide the map.",
  },
  { name: "public_phone", label: "Public phone", type: "text", maxLength: 30 },
  { name: "cursor_enabled", label: "Animated mouse circle", type: "boolean", help: "A circle follows the mouse on computers." },
  {
    name: "sections",
    label: "Page sections",
    type: "sections",
    full: true,
    help: "Turn pages on or off. Turning a page off also removes it from the menu, the footer and the sitemap.",
  },
  { name: "seo_title", label: "SEO title", type: "text", required: true, maxLength: 90, full: true, help: "Shown in Google results and browser tabs. ~60 characters." },
  { name: "seo_description", label: "SEO description", type: "textarea", required: true, rows: 3, maxLength: 170, full: true, help: "~155 characters." },
];
