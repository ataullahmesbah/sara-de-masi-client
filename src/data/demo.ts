/**
 * CONTENT — Prof. Sara De Masi
 * Used when Supabase is not configured, and mirrored by supabase/seed.sql
 * (run `npm run seed:generate` after editing this file).
 * Source: PRD folder (CV, publications, teaching, LinkedIn). Typos from the original
 * CV were corrected. Items marked "confirm" in the handover notes still need the client's OK.
 */
import type {
  Award,
  BlogPost,
  Client,
  Course,
  Profile,
  Publication,
  ResumeItem,
  Service,
  SiteSettings,
  Skill,
  Stat,
  Talk,
} from "@/types/content";

export const demoSettings: SiteSettings = {
  website_name: "Sara De Masi",
  logo_url: null,
  accent_color: "#f2b35b",
  accent_color_2: "#f2b35b",
  default_theme: "dark",
  contact_email: "sara.demasi@unifi.it",
  public_phone: null,
  seo_title: "Sara De Masi — Corporate Governance & Board Diversity | University of Florence",
  seo_description:
    "Sara De Masi is Associate Professor of Management at the University of Florence. Research on corporate governance, board diversity, women on boards, ESG and executive compensation.",
  footer_text: "Associate Professor of Management, University of Florence",
  hire_label: "Invite Me",
  sections: [
    { key: "about", visible: true },
    { key: "publications", visible: true },
    { key: "teaching", visible: true },
    { key: "blog", visible: true },
    { key: "cv", visible: true },
    { key: "contact", visible: true },
  ],
  map_embed_url: null,
  cursor_enabled: true,
};

export const demoProfile: Profile = {
  full_name: "Sara De Masi",
  professional_title: "Associate Professor of Management",
  typed_roles: ["Associate Professor", "Corporate Governance Scholar", "Board Diversity Researcher", "Executive Educator"],
  short_intro:
    "Associate Professor of Management at the University of Florence. Research on corporate governance, board diversity, women on boards, executive compensation and ESG.",
  bio: "Sara De Masi is Associate Professor of Management at the University of Florence, Department of Economics and Management, where she also serves on the International Relations Committee. She is an internationally engaged scholar with extensive experience in research, executive education, and global academic collaborations.\n\nShe teaches Management and Organizations at New York University Florence and Global Strategy at BIG Academy, an executive education programme for managers and business leaders. She has also held visiting positions at leading international institutions, including New York University Stern School of Business and Warsaw School of Economics.\n\nSara served as Co-Chair of the EURAM 2025 Annual Conference “Managing with Purpose”, hosted by the University of Florence, and is currently part of the leadership team of EURAM SIG 02 – Corporate Governance, where she serves as Programme Chair-Elect for EURAM 2026.\n\nHer research focuses on corporate governance, board diversity, women on boards, executive compensation, sustainability, academic entrepreneurship, and regulated companies. Her work has been published in international peer-reviewed journals and recognised with international awards.",
  email: "sara.demasi@unifi.it",
  phone: null,
  location: "Via delle Pandette 9, 50127 Florence, Italy",
  profile_image_url: "/demo/portrait-placeholder.svg",
  hero_image_url: "/demo/portrait-placeholder.svg",
  hero_headline: "Corporate governance, board diversity and the pathways to leadership.",
  hero_background_url: null,
  resume_url: "/files/Sara-De-Masi-CV.pdf",
  availability_status: "",
  trust_line: "",
  about_title: "",
  about_image_url: null,
  about_points: [],
  experience_years: 0,
  work_photos: [],
  // Shown on the Contact page (label = place, value = address · email).
  personal_info: [
    { label: "Position", value: "Associate Professor of Management" },
    { label: "Affiliation", value: "University of Florence" },
    { label: "Department", value: "Economics and Management" },
    { label: "Email", value: "sara.demasi@unifi.it" },
    { label: "Address", value: "Via delle Pandette 9, 50127 Florence, Italy" },
    { label: "NYU Florence", value: "Via Bolognese 120, 50139 Florence · sd1481@nyu.edu" },
  ],
  social_links: [],
  skill_tools: [],
  affiliation: "Department of Economics and Management, University of Florence",
  research_interests: [
    "Corporate governance",
    "Board diversity",
    "Women on boards",
    "Sustainability",
    "ESG",
    "CEO compensation",
    "Managerial incentives",
    "Strategy",
    "Academic entrepreneurship",
    "Regulated companies",
  ],
  press_bio:
    "Sara De Masi is Associate Professor of Management at the University of Florence. Her research focuses on corporate governance, board diversity, women on boards, executive compensation and sustainability. She teaches at NYU Florence and BIG Academy, was Co-Chair of EURAM 2025 and is Programme Chair-Elect of EURAM SIG 02 – Corporate Governance for 2026.",
  cv_updated: "November 2026",
};

/** Research areas (stored in the "services" table). */
export const demoServices: Service[] = [
  { id: "ra1", title: "Corporate governance & boards", short_description: "How boards of directors are composed, how they monitor and advise, and how governance shapes strategy and performance.", icon_key: "landmark", active: true, sort_order: 1 },
  { id: "ra2", title: "Gender diversity & women on boards", short_description: "The effects of women directors, critical mass, board chairs and quotas on board dynamics, tasks and corporate outcomes.", icon_key: "users", active: true, sort_order: 2 },
  { id: "ra3", title: "Executive compensation & incentives", short_description: "CEO pay design, incentives and disclosure, in listed firms, banks and regulated industries.", icon_key: "coins", active: true, sort_order: 3 },
  { id: "ra4", title: "ESG & sustainability", short_description: "How board composition and leadership drive environmental, social and governance performance and disclosure.", icon_key: "leaf", active: true, sort_order: 4 },
  { id: "ra5", title: "Regulated & public-utility firms", short_description: "Governance and incentives in energy, telecom and other regulated companies, and in banks.", icon_key: "factory", active: true, sort_order: 5 },
  { id: "ra6", title: "Academic entrepreneurship & technology transfer", short_description: "Organisational change inside entrepreneurial and engaged universities.", icon_key: "graduation", active: true, sort_order: 6 },
];

type PubInput = Partial<Publication> & Pick<Publication, "title" | "slug" | "authors" | "year" | "pub_type">;
const P = (p: PubInput, i: number): Publication => ({
  venue: null,
  details: null,
  doi: null,
  isbn: null,
  abstract: null,
  topics: [],
  abs_stars: 0,
  impact_factor: null,
  badge: null,
  status: "published",
  featured: false,
  language: "en",
  links: [],
  active: true,
  ...p,
  id: `pub-${i + 1}`,
  sort_order: i + 1,
});

const raw: PubInput[] = [
  // ---------------- Journal articles ----------------
  { pub_type: "journal", slug: "2025-demasi-diversity-boardroom-review", authors: "De Masi, S., Zattoni, A., Leventis, S., & Van Ees, H.", year: 2025, title: "Diversity in the Boardroom: A Systematic and Interdisciplinary Review of the Literature", venue: "Annals of Corporate Governance", details: "Vol. 8, pp. 250–346", topics: ["Board diversity", "Corporate governance"], featured: true },
  { pub_type: "journal", slug: "2023-zattoni-board-diversity-antecedents", authors: "Zattoni, A., Leventis, S., Van Ees, H., & De Masi, S.", year: 2023, title: "Board diversity's antecedents and consequences: A review and research agenda", venue: "The Leadership Quarterly", details: "Vol. 34, No. 1, 101659", doi: "10.1016/j.leaqua.2022.101659", abs_stars: 4, impact_factor: "9.924 (2022)", topics: ["Board diversity", "Corporate governance", "Women on boards"], featured: true },
  { pub_type: "journal", slug: "2023-demasi-post-crisis-pay-disclosure-banks", authors: "De Masi, S., John, K., Słomka-Gołębiowska, A., & Urbanek, P.", year: 2023, title: "Regulation and post-crisis pay disclosure strategies of banks", venue: "Review of Quantitative Finance and Accounting", details: "Vol. 61, pp. 1243–1275", doi: "10.1007/s11156-023-01177-w", abs_stars: 3, impact_factor: "1.7 (2022)", topics: ["CEO compensation", "Corporate governance", "Regulated companies"] },
  { pub_type: "journal", slug: "2023-slomka-ask-a-chairwoman", authors: "Słomka-Gołębiowska, A., De Masi, S., Zambelli, S., & Paci, A.", year: 2023, title: "Towards higher sustainability: If you want something done, ask a chairwoman", venue: "Finance Research Letters", details: "Vol. 58, pp. 1–7 (104308)", doi: "10.1016/j.frl.2023.104308", abs_stars: 2, impact_factor: "10.4 (2023)", topics: ["Women on boards", "Sustainability", "ESG"], featured: true },
  { pub_type: "journal", slug: "2022-demasi-women-boards-environmental-performance", authors: "De Masi, S., Słomka-Gołębiowska, A., & Paci, A.", year: 2022, title: "Women on boards and corporate environmental performance in Italian companies: The importance of nomination background", venue: "Business Ethics, the Environment & Responsibility", details: "Vol. 31, pp. 981–998", doi: "10.1111/beer.12467", impact_factor: "5.056 (2021)", badge: "Most Cited Paper (Wiley Award)", topics: ["Women on boards", "Sustainability", "Board diversity"], featured: true },
  { pub_type: "journal", slug: "2022-slomka-board-dynamics-tasks", authors: "Słomka-Gołębiowska, A., De Masi, S., & Paci, A.", year: 2022, title: "Board dynamics and board tasks empowered by women on boards: Evidence from Italy", venue: "Management Research Review", details: "Vol. 46, No. 3, pp. 390–412", doi: "10.1108/MRR-09-2021-0678", impact_factor: "3.760 (2023)", topics: ["Women on boards", "Corporate governance", "Board diversity"] },
  { pub_type: "journal", slug: "2022-demasi-voice-not-enough", authors: "De Masi, S., Słomka-Gołębiowska, A., & Paci, A.", year: 2022, title: "Gender diversity on corporate boards: when the voice is not enough", venue: "Sinergie Italian Journal of Management", details: "Vol. 40, pp. 169–189", doi: "10.7433/s118.2022.08", topics: ["Women on boards", "Board diversity"] },
  { pub_type: "journal", slug: "2021-demasi-critical-mass-esg", authors: "De Masi, S., Słomka-Gołębiowska, A., Becagli, C., & Paci, A.", year: 2021, title: "Towards sustainable corporate behavior: the effect of the critical mass of female directors on environmental, social and governance disclosure", venue: "Business Strategy and the Environment", details: "Vol. 30, pp. 1865–1878", doi: "10.1002/bse.2721", abs_stars: 3, impact_factor: "10.801 (2021)", topics: ["Women on boards", "ESG", "Sustainability"], featured: true },
  { pub_type: "journal", slug: "2021-demasi-monitoring-kanter", authors: "De Masi, S., Słomka-Gołębiowska, A., & Paci, A.", year: 2021, title: "Women on boards and monitoring tasks: An empirical application of Kanter's theory", venue: "Management Decision", details: "Vol. 59, No. 13, pp. 56–72", doi: "10.1108/MD-10-2019-1450", abs_stars: 2, impact_factor: "4.953 (2021)", topics: ["Women on boards", "Corporate governance"] },
  { pub_type: "journal", slug: "2020-bellandi-bottom-level-university", authors: "Bellandi, M., Caloffi, A., & De Masi, S.", year: 2020, title: "Bottom-level organizational changes within entrepreneurial and engaged models of university: Insights from Italy", venue: "The Journal of Technology Transfer", details: "pp. 1–26 (online first)", abs_stars: 2, impact_factor: "4.147 (2019)", topics: ["Academic entrepreneurship"] },
  { pub_type: "journal", slug: "2018-cambini-ceo-telecom", authors: "Cambini, C., De Masi, S., Paci, A., & Rondi, L.", year: 2018, title: "CEO compensation in EU telecom companies: Does the State design the right incentives?", venue: "Telecommunications Policy", details: "Vol. 42, pp. 474–488", doi: "10.1016/j.telpol.2018.03.004", abs_stars: 2, impact_factor: "2.224 (2018)", topics: ["CEO compensation", "Managerial incentives", "Regulated companies"] },
  { pub_type: "journal", slug: "2018-mayo-organization-agility", authors: "Mayo, M. A., De Masi, S., & Paci, A.", year: 2018, title: "Managing organization agility when there is no time to manage: the impact of temporal-scarcity on managerial decision-making", venue: "International Journal of Strategic Management", details: "Vol. 18, pp. 41–50", impact_factor: "3.1 (2018)", topics: ["Strategy"] },
  { pub_type: "journal", slug: "2016-john-cg-banks", authors: "John, K., De Masi, S., & Paci, A.", year: 2016, title: "Corporate governance in banks", venue: "Corporate Governance: An International Review", details: "Vol. 24, No. 3, pp. 303–321", doi: "10.1111/corg.12161", abs_stars: 3, impact_factor: "3.571 (2015)", topics: ["Corporate governance", "Regulated companies"] },
  { pub_type: "journal", slug: "2016-cambini-ceo-incentives-energy", authors: "Cambini, C., De Masi, S., & Rondi, L.", year: 2016, title: "CEO incentives in European energy utilities: Evidence from regulated vs unregulated firms", venue: "Journal of Industrial and Business Economics", details: "Vol. 43, No. 2, pp. 127–155", doi: "10.1007/s40812-016-0028-7", abs_stars: 1, topics: ["CEO compensation", "Managerial incentives", "Regulated companies"] },
  { pub_type: "journal", slug: "2015-cambini-incentive-compensation-energy", authors: "Cambini, C., Rondi, L., & De Masi, S.", year: 2015, title: "Incentive Compensation in Energy Firms: Does regulation matter?", venue: "Corporate Governance: An International Review", details: "Vol. 23, No. 4, pp. 378–395", abs_stars: 3, impact_factor: "3.571 (2015)", topics: ["CEO compensation", "Managerial incentives", "Regulated companies"] },
  { pub_type: "other", slug: "2009-demasi-governance-public-utility", authors: "De Masi, S.", year: 2009, title: "Modelli di governance delle public utility: Un confronto tra Italia e Spagna", venue: "Arel – Agenzia di Ricerche e Legislazione", details: "No. 3/2009, pp. 97–120", language: "it", badge: "Best Paper Award", topics: ["Corporate governance", "Regulated companies"] },

  // ---------------- Books ----------------
  { pub_type: "book", slug: "2019-demasi-diversita-di-genere", authors: "De Masi, S.", year: 2019, title: "La diversità di genere negli organi di governo delle imprese", venue: "Giappichelli, Torino", isbn: "978-88-921-2070-9", language: "it", topics: ["Board diversity", "Women on boards"] },
  { pub_type: "book", slug: "2016-demasi-remunerazione-decisori", authors: "De Masi, S.", year: 2016, title: "La remunerazione dei decisori aziendali: Elementi, incentivi e governance", venue: "Aracne Editrice, Roma", language: "it", topics: ["CEO compensation", "Managerial incentives"] },
  { pub_type: "book", slug: "2016-demasi-pharma-innovation", authors: "De Masi, S., & Paci, A.", year: 2016, title: "Corporate governance systems and innovation in pharmaceutical industry: What drives the innovation strategy", venue: "Aracne Editrice, Roma", topics: ["Corporate governance", "Strategy"] },

  // ---------------- Book chapters ----------------
  { pub_type: "chapter", slug: "2025-demasi-more-than-a-seat", authors: "De Masi, S., Zattoni, A., & Słomka-Gołębiowska, A.", year: 2025, title: "More than having a seat at the table: From bringing women in the boardroom to making their voice heard", venue: "In G. D'Allura & M. Bannò (Eds.), Feminist Perspectives in Entrepreneurship, Governance and Management: Breaking Barriers. Edward Elgar", topics: ["Women on boards", "Board diversity"] },
  { pub_type: "chapter", slug: "2024-demasi-women-on-corporate-boards", authors: "De Masi, S.", year: 2024, title: "Women on corporate boards: Leveraging female talent for corporate performance", venue: "In M. Callegari & E. Desana (Eds.), No Women No Board: How ESG-ender diversity is reshaping corporate governance around the world. Pacini Editore", isbn: "978-88-3379-813-4", topics: ["Women on boards", "Corporate governance"] },
  { pub_type: "chapter", slug: "2023-demasi-theory-of-proportions", authors: "De Masi, S., & Słomka-Gołębiowska, A.", year: 2023, title: "Diversity, board dynamics and board tasks: an introduction to the theory of proportions", venue: "In S. Tasheva & M. Huse (Eds.), Research Handbook on Diversity and Corporate Governance. Edward Elgar", topics: ["Board diversity", "Corporate governance"] },
  { pub_type: "chapter", slug: "2021-demasi-donne-nei-cda", authors: "De Masi, S.", year: 2021, title: "Le donne nei consigli di amministrazione delle imprese: gli effetti di una maggiore valorizzazione dei talenti femminili", venue: "In M. Callegari, E. R. Desana & M. Sarale (Eds.), Speriamo che sia femmina. Torino: Rubbettino", details: "pp. 145–158", isbn: "978-88-7590-170-7", language: "it", topics: ["Women on boards"] },
  { pub_type: "chapter", slug: "2020-demasi-csr-disclosure-strategies", authors: "De Masi, S., Sartarelli, M., & Tampieri, A.", year: 2020, title: "Corporate Social Responsibility and Firm Performance: The Role of Disclosure Strategies", venue: "In S. Garzella (Ed.), Corporate Social Responsibility: Theoretical Analysis and Practical Implications. Franco Angeli", isbn: "978-88-351-0509-1", topics: ["Sustainability", "ESG"] },
  { pub_type: "chapter", slug: "2009-demasi-termovalorizzatore-brescia", authors: "De Masi, S.", year: 2009, title: "Una leadership costruita su tecnologia e informazione: il termovalorizzatore di Brescia", venue: "In M. Morisi & A. Paci (Eds.), Il bisogno di decidere. Il Mulino, Bologna", language: "it", topics: [] },
  { pub_type: "chapter", slug: "2009-demasi-termovalorizzatore-vienna", authors: "De Masi, S.", year: 2009, title: "Le politiche ambientali al centro di una capitale europea: il termovalorizzatore di Spittelau a Vienna", venue: "In M. Morisi & A. Paci (Eds.), Il bisogno di decidere. Il Mulino, Bologna", language: "it", topics: [] },
  { pub_type: "chapter", slug: "2009-demasi-termovalorizzatore-maresme", authors: "De Masi, S.", year: 2009, title: "Il ruolo delle politiche di compensazione territoriali quale via per la realizzazione degli impianti: il termovalorizzatore del Maresme, Barcellona", venue: "In M. Morisi & A. Paci (Eds.), Il bisogno di decidere. Il Mulino, Bologna", language: "it", topics: [] },
  { pub_type: "chapter", slug: "2006-demasi-innovazione-finanziaria", authors: "De Masi, S., & Spadoni, V.", year: 2006, title: "Innovazione finanziaria e cambiamento economico: alcuni benchmark territoriali", venue: "In A. Paci & A. Romiti (Eds.), Sistema finanziario e cambiamento economico. IRPET, Firenze", language: "it", topics: [] },

  // ---------------- Conference proceedings & other ----------------
  { pub_type: "proceedings", slug: "2024-demasi-board-social-human-capital", authors: "De Masi, S., Paci, A., Słomka-Gołębiowska, A., & Zambelli, S.", year: 2024, title: "Disentangling board social and human capital: what really drives corporate sustainability?", venue: "EURAM 2024, Bath – Fostering innovation to address grand challenges", details: "pp. 1–28. ISBN 978-2-9602195-6-2", topics: ["Sustainability", "Board diversity"] },
  { pub_type: "proceedings", slug: "2023-slomka-chairwoman-openness", authors: "Słomka-Gołębiowska, A., De Masi, S., Paci, A., & Zambelli, S.", year: 2023, title: "Chairwoman and openness to gender diversity: A view beyond the number of women on boards", venue: "EURAM 2023, Dublin – Transforming business for good", details: "pp. 1–32. ISBN 978-2-9602195-5-5", topics: ["Women on boards", "Board diversity"] },
  { pub_type: "proceedings", slug: "2022-slomka-structural-power-esg", authors: "Słomka-Gołębiowska, A., De Masi, S., Paci, A., & Zambelli, S.", year: 2022, title: "The contingency role of female directors' structural power on ESG performance", venue: "EURAM 2022, Zurich – Leading digital transformation", details: "pp. 1–23. ISBN 978-2-9602195-4-8", topics: ["Women on boards", "ESG"] },
  { pub_type: "other", slug: "2021-demasi-boards-environment-ingroups", authors: "De Masi, S.", year: 2021, title: "Boards Contributing to the Protection of the Environment: Looking at the Dynamics between In-groups and Out-groups", venue: "International Journal of Business Research and Management (IJBRM)", details: "Vol. 12, No. 2, pp. 76–88", badge: "Best Paper Award", topics: ["Sustainability", "Board diversity"] },
  { pub_type: "proceedings", slug: "2020-demasi-legitimate-women-advisory", authors: "De Masi, S., Słomka-Gołębiowska, A., & Paci, A.", year: 2020, title: "Legitimate women and board advisory tasks", venue: "EURAM 2020 – The business of now: the future starts here", details: "pp. 1–24. ISBN 978-2-9602195-2-4", topics: ["Women on boards", "Corporate governance"] },
  { pub_type: "other", slug: "2020-demasi-minority-elected-directors", authors: "De Masi, S., & Zorzi, A.", year: 2020, title: "Enhancing Board Monitoring Tasks: The Effect of Minority-Elected Directors", venue: "International Journal of Business and Management", details: "Vol. 15, pp. 85–95", topics: ["Corporate governance"] },
  { pub_type: "other", slug: "2018-demasi-women-do-the-job-quota", authors: "De Masi, S., Słomka-Gołębiowska, A., & Paci, A.", year: 2018, title: "Women Do the Job: The Reasons to Set Quota for Women on Boards", venue: "International Journal of Business and Management", details: "Vol. 13, pp. 167–179", topics: ["Women on boards", "Board diversity"] },
  { pub_type: "proceedings", slug: "2018-demasi-women-do-the-job-aom", authors: "De Masi, S., Paci, A., & Słomka-Gołębiowska, A.", year: 2018, title: "Women Do the Job: The Reasons to Make Women Sit on Boards", venue: "Academy of Management Proceedings", details: "Vol. 2018", topics: ["Women on boards"] },
  { pub_type: "other", slug: "2018-mayo-parallel-emic-model", authors: "Mayo, M. A., Howell, W., & De Masi, S.", year: 2018, title: "Use of a Parallel-Emic Research Model and Key-Word-In-Context Indexing Tool to Develop an Instructional Exercise to Promote Student Global Mindedness", venue: "Journal of Teaching in International Business", details: "Vol. 29, pp. 113–133", topics: ["Strategy"] },
  { pub_type: "other", slug: "2014-demasi-independent-directors-utilities", authors: "De Masi, S., & Paci, A.", year: 2014, title: "Board Composition in the public utilities: a focus on independent directors",
    links: [{ platform: "EUI CADMUS Repository", url: "http://www.eui.eu/Research/EUIPublications/AcademicPublications/AboutCadmus.aspx" }], venue: "Network Industries Quarterly", details: "Vol. 16, No. 3 (also in the EUI CADMUS repository)", topics: ["Corporate governance", "Regulated companies"] },
  { pub_type: "working", slug: "2013-cambini-incentive-compensation-regulation", authors: "Cambini, C., Rondi, L., & De Masi, S.", year: 2013, title: "Incentive Compensation and Incentive Regulation: Empirical Evidence",
    links: [{ platform: "Bocconi IEFE Working Papers", url: "http://www.iefe.unibocconi.it/wps/wcm/connect/Cdr/Centro_IEFEen/Home/Working+Papers/?page=3" }], venue: "Bocconi IEFE Working Paper No. 53/2013", topics: ["CEO compensation", "Regulated companies"] },
  { pub_type: "proceedings", slug: "2013-becagli-independent-directors-monitors", authors: "Becagli, C., De Masi, S., & Paci, A.", year: 2013, title: "Are Independent Directors Good Monitors of Public Utilities?", venue: "AIDEA Annual Conference, Cacucci Editore", details: "Vol. 1, pp. 1–26. ISBN 978-88-6611-294-5", topics: ["Corporate governance", "Regulated companies"] },
  { pub_type: "other", slug: "2015-coppola-strategie-competitive-ateneo", authors: "Coppola, G., De Masi, S., & Vannucci, V.", year: 2015, title: "Strategie competitive ed azioni di marketing per i centri di ricerca, gli spin-off ed i servizi all'innovazione dell'ateneo fiorentino", venue: "Dipartimento di Scienze per l'Economia e l'Impresa, Università degli Studi di Firenze", details: "pp. 1–78", language: "it", topics: ["Academic entrepreneurship"] },
  { pub_type: "other", slug: "2011-demasi-phd-thesis", authors: "De Masi, S.", year: 2011, title: "CEO Compensation and Board of Directors in European Public Utilities of the Energy Sector",
    links: [{ platform: "Thesis (PDF)", url: "http://e-theses.imtlucca.it/53/11/Thesis_Sara%20De%20Masi_DEF%20abstract.pdf" }], venue: "IMT Institute for Advanced Studies Lucca (Doctoral thesis)", topics: ["CEO compensation", "Regulated companies"] },
  { pub_type: "proceedings", slug: "2010-becagli-independent-directors-energy", authors: "Becagli, C., De Masi, S., & Paci, A.", year: 2010, title: "The Role of Independent Directors in the Public Utilities of the Energy Sector: an Empirical Analysis", venue: "23rd EBEN Annual Conference – Which values for which organizations?", topics: ["Corporate governance", "Regulated companies"] },
  { pub_type: "proceedings", slug: "2010-demasi-ceo-compensation-utilities", authors: "De Masi, S.", year: 2010, title: "CEO Compensation in the Public Utilities of the energy sector: an empirical analysis", venue: "Conference on Economics and Management of Public Utilities, Bocconi University (peer reviewed)", topics: ["CEO compensation", "Regulated companies"] },
];

export const demoPublications: Publication[] = raw.map(P);

export const demoTalks: Talk[] = (
  [
    [2026, "12th ICGS Annual Conference", "HEC Montréal, Canada", "2–4 Oct 2026", "presenter", "Chairwomen and pathways to board leadership: France, Spain and Italy", "https://icgs-2026.hec.ca/"],
    [2026, "EURAM 2026 Annual Conference", "University of Agder, Kristiansand, Norway", "16–19 Jun 2026", "organizer", "SIG 02 Programme Chair-Elect · Track Chair “Corporate Governance and Diversity”", "https://conferences.euram.academy/2026conference/"],
    [2025, "ICGS Annual Conference", "University of Manchester, UK", "18–19 Oct 2025", "presenter", "Breaking the silence, not just the ceiling: How time with female directors shapes board leadership", null],
    [2025, "ICGS Annual Conference", "University of Manchester, UK", "18–19 Oct 2025", "chair", "Session: Female leadership on boards", null],
    [2025, "EURAM 2025 Annual Conference — “Managing with Purpose”", "Florence, Italy", "22–25 Jun 2025", "organizer", "Conference Co-Chair (2,100+ participants from 70 countries)", "https://conferences.euram.academy/2025conference/"],
    [2024, "EURAM 2024", "University of Bath, UK", "25–28 Jun 2024", "presenter", "Disentangling board social and human capital: what really drives corporate sustainability?", null],
    [2024, "EURAM 2024 — Doctoral Colloquium", "University of Bath, UK", "24–25 Jun 2024", "mentor", null, null],
    [2023, "EURAM 2023", "Trinity College Dublin, Ireland", "14–16 Jun 2023", "presenter", "Are women drivers of sustainability? The moderating effect of women on boards in the relationship between ESG performance and firm financial stability", null],
    [2023, "EURAM 2023", "Trinity College Dublin, Ireland", "14–16 Jun 2023", "chair", "Session: Ownership and board governance", null],
    [2023, "EURAM 2023", "Trinity College Dublin, Ireland", "14–16 Jun 2023", "discussant", "Session: Exploring leadership, board dynamics and organizational reputation", null],
    [2023, "ICGS Annual Conference", "Madrid, Spain", "20–23 Oct 2023", "presenter", "Chairwoman and openness to gender diversity", null],
    [2022, "ICGS Annual Conference", "Miami, USA", "11–13 Nov 2022", "presenter", "Diversity in the boardroom: a systematic review", null],
    [2022, "EURAM 2022", "Zurich / Winterthur, Switzerland", "12–15 Jun 2022", "presenter", "The contingency role of female directors' structural power on ESG performance", null],
    [2022, "EURAM 2022", "Zurich / Winterthur, Switzerland", "12–15 Jun 2022", "chair", "Session: Board of directors, TMTs and diversity", null],
    [2022, "FFEA Conference", "Naples, Italy", "12–14 Jun 2022", "presenter", "Chairwomen and ESG", null],
    [2022, "11th International Workshop Advances in Cleaner Production", "Online", "15 Jul 2022", "presenter", "Are women drivers of sustainability? (Best Paper Award)", null],
    [2021, "IRMC Conference", "Cagliari, Italy", "1–2 Oct 2021", "presenter", "Responsible executive pay disclosure in banks", null],
    [2021, "EURAM 2021 (online)", "Online", null, "presenter", "Women on boards and environmental performance: family female directors", null],
    [2021, "EURAM 2021 (online)", "Online", null, "chair", "Session: Corporate governance and diversity", null],
    [2021, "SIMA Conference (online)", "Online", null, "presenter", "Gender diversity on corporate boards: when the voice is not enough", null],
    [2020, "EURAM 2020 (online)", "Online", null, "presenter", "Legitimate women and board advisory tasks", null],
    [2020, "EURAM 2020 (online)", "Online", null, "chair", null, null],
    [2020, "SIMA Conference (online)", "Online", null, "presenter", "Legitimate women and board advisory tasks", null],
    [2019, "Norefjell Board Governance Workshop", "Barcelona / Toulouse Business School", "15–18 Feb 2019", "presenter", "Quota, women on boards and board tasks: The sanctions matter", null],
    [2019, "Value Creating Boards", "Consob, Rome, Italy", "31 May 2019", "participant", null, null],
    [2019, "SIMA Conference", "Rome, Italy", "20–21 Jun 2019", "participant", null, null],
    [2019, "SIDREA Workshop", "Parthenope University, Naples, Italy", "6 Nov 2019", "presenter", "Corporate social responsibility and firm performance", null],
    [2018, "Academy of Management Annual Meeting", "Chicago, USA", "9–14 Aug 2018", "presenter", "Women Do the Job: The Reasons to Make Women Sit on Boards", null],
    [2018, "EURAM 2018", "Reykjavik, Iceland", "20–23 Jun 2018", "participant", null, null],
    [2018, "10th Workshop on Women on Boards (organised by M. Huse)", "BI Oslo, Norway", "31 Aug–4 Sep 2018", "presenter", "Women do the job", null],
    [2018, "4th Workshop on Culture and Gender Issues", "Rome, Italy", "9 Mar 2018", "participant", null, null],
    [2017, "ICGS Annual Conference", "LUISS, Rome, Italy", "2–4 Sep 2017", "presenter", "CEO compensation in EU telecom companies", null],
    [2015, "Kent State University", "Ohio, USA", "15–16 Sep 2015", "presenter", "Paper and lecture on the international business environment", null],
    [2015, "4th Annual Conference, Journal of Management and Governance", "Bolzano, Italy", "16–17 Jul 2015", "presenter", null, null],
    [2015, "4th Annual Conference, Journal of Management and Governance", "Bolzano, Italy", "16–17 Jul 2015", "discussant", "Discussant of Słomka-Gołębiowska", null],
    [2015, "FMA European Conference", "Venice, Italy", "11–12 Jun 2015", "discussant", "Discussant of Drobetz et al.", null],
    [2015, "CAPA Florence", "Florence, Italy", "30 Mar 2015", "invited", "Executive compensation and incentives", null],
    [2014, "Copenhagen Business School — CCG", "Copenhagen, Denmark", "14 May 2014", "participant", null, null],
    [2014, "University of Florence — Master programme", "Florence, Italy", "22 May 2014", "invited", "Invited lectures", null],
    [2013, "Corporate Governance Network Utilities", "Vienna, Austria", "30–31 Oct 2013", "participant", null, null],
    [2013, "AIDEA Annual Conference", "Lecce, Italy", "19–21 Sep 2013", "presenter", "Are independent directors good monitors of public utilities?", null],
    [2013, "EARIE Annual Conference", "Évora, Portugal", "30–31 Aug 2013", "participant", null, null],
    [2013, "University of Florence — lectures", "Florence, Italy", "14 & 22 May 2013", "invited", "Invited lectures", null],
    [2013, "Florence–Ritsumeikan Workshop", "Florence, Italy", "12–13 Mar 2013", "participant", null, null],
    [2013, "NYU Stern — PhD presentation", "New York, USA", "21 Feb 2013", "presenter", null, null],
    [2011, "University of Florence — lectures", "Florence, Italy", "11 Apr & 3 Nov 2011", "invited", "CEO compensation and stock options", null],
    [2010, "SIDE-ISLE Conference", "Bolzano, Italy", "4–5 Dec 2010", "participant", null, null],
    [2010, "EBEN Annual Conference", "Trento, Italy", "Sep 2010", "presenter", "The role of independent directors in the public utilities of the energy sector", null],
    [2010, "Conference on Economics and Management of Public Utilities", "Bocconi University, Milan, Italy", "14–15 Jul 2010", "presenter", "CEO compensation in the public utilities of the energy sector", null],
    [2010, "NYU Stern — PhD seminar", "New York, USA", "17 Jun 2010", "presenter", null, null],
  ] as const
).map(([year, event, location, dates, role, title, link_url], i) => ({
  id: `talk-${i + 1}`,
  year,
  event,
  location,
  dates,
  role,
  title,
  link_url,
  active: true,
  sort_order: i + 1,
}));

export const demoCourses: Course[] = [
  { id: "c1", title: "Corporate Governance and Financial Institutions", institution: "University of Florence", programme: "MSc Finance and Risk Management", level: "MSc", language: "English", years: "Since 2013", status: "current", active: true, sort_order: 1 },
  { id: "c2", title: "Fundamentals of Entrepreneurship and Business Ethics", institution: "University of Florence", programme: "BSc Sustainable Finance for Societal Challenges", level: "BSc", language: "English", years: "Since 2022", status: "current", active: true, sort_order: 2 },
  { id: "c3", title: "Principles of Management", institution: "University of Florence", programme: "BSc Business", level: "BSc", language: "Italian", years: "Since 2016", status: "current", active: true, sort_order: 3 },
  { id: "c4", title: "Management and Organizations", institution: "NYU Florence", programme: "Stern course", level: "BSc", language: "English", years: "Since Sep 2016", status: "current", active: true, sort_order: 4 },
  { id: "c5", title: "Global Strategy", institution: "BIG Academy", programme: "Executive education", level: "Executive", language: "To confirm", years: "Since Feb 2020", status: "current", active: true, sort_order: 5 },
  { id: "c6", title: "International Business", institution: "Kent State University", programme: "Business Program", level: "BSc", language: "English", years: "2015 – 2023/24", status: "current", active: true, sort_order: 6 },
  { id: "c7", title: "Government and Business Relations", institution: "Kent State University & George Washington University programmes", programme: null, level: null, language: "English", years: "2011 – 2014", status: "past", active: true, sort_order: 7 },
  { id: "c8", title: "Strategy and Competition", institution: "IFTS", programme: null, level: null, language: null, years: "Nov 2014", status: "past", active: true, sort_order: 8 },
  { id: "c9", title: "Pricing Strategies", institution: "European School of Economics", programme: null, level: null, language: null, years: "Spring 2012", status: "past", active: true, sort_order: 9 },
  { id: "c10", title: "Budgeting", institution: "IFTS", programme: "Marketing & Tourism", level: null, language: null, years: "Dec 2011", status: "past", active: true, sort_order: 10 },
  { id: "c11", title: "Corporate Governance (Teaching Assistant)", institution: "University of Florence", programme: "MSc Governance & Business", level: "MSc", language: null, years: "2007 – 2009", status: "past", active: true, sort_order: 11 },
  { id: "c12", title: "Corporate Strategy (Teaching Assistant)", institution: "University of Florence", programme: "Undergraduate", level: "BSc", language: null, years: "2007 – 2009", status: "past", active: true, sort_order: 12 },
];

type R = Omit<ResumeItem, "id" | "active" | "sort_order">;
const resumeRows: R[] = [
  // Current roles first (the home page shows the first four "Current" items)
  { type: "experience", title: "Associate Professor of Management", subtitle: "University of Florence — Dept. of Economics and Management", period: "Jun 2024 – Present", badge: "Current", description: "Research and teaching in corporate governance and management. Member of the International Relations Committee." },
  { type: "experience", title: "Lecturer — Management and Organizations", subtitle: "New York University Florence", period: "Sep 2016 – Present", badge: "Current", description: "" },
  { type: "experience", title: "Professor — Global Strategy", subtitle: "BIG Academy (executive education)", period: "Feb 2020 – Present", badge: "Current", description: "Executive education for managers and business leaders." },
  { type: "service", title: "Programme Chair-Elect, SIG 02 Corporate Governance", subtitle: "European Academy of Management (EURAM)", period: "2026", badge: "Current", description: "Track Chair “Corporate Governance and Diversity”, EURAM 2026 (Kristiansand, Norway)." },
  { type: "service", title: "Executive Director of International Relations", subtitle: "DISEI — University of Florence", period: "Since 2020", badge: "Current", description: "" },
  { type: "service", title: "Co-Chair, EURAM 2025 Annual Conference “Managing with Purpose”", subtitle: "EURAM · hosted by the University of Florence", period: "Jun 2025", badge: null, description: "More than 2,100 participants from 70 countries." },
  { type: "service", title: "Member, Executive Committee", subtitle: "European Academy of Management (EURAM)", period: "2024 – 2025", badge: null, description: "" },
  { type: "service", title: "Sherpa — Platform on Sustainable Finance, Subgroup 1 “Data and Usability”", subtitle: "European Commission", period: "2023 – 2024", badge: null, description: "" },
  { type: "service", title: "Director of International Relations", subtitle: "DISEI — University of Florence", period: "2017 – 2020", badge: null, description: "" },
  { type: "experience", title: "Senior Assistant Professor (RTD-B)", subtitle: "University of Florence", period: "Nov 2021 – Jul 2024", badge: null, description: "" },
  { type: "experience", title: "Assistant Professor (RTD-A)", subtitle: "University of Florence", period: "Nov 2016 – Nov 2021", badge: null, description: "" },
  { type: "experience", title: "Lecturer — International Business", subtitle: "Kent State University", period: "2011 – 2023/24", badge: null, description: "" },
  { type: "experience", title: "Post-doc Researcher", subtitle: "University of Florence", period: "2013 – 2015", badge: null, description: "" },
  { type: "experience", title: "Researcher", subtitle: "Fondazione Nord-Est, Treviso", period: "2010 – 2011", badge: null, description: "" },
  { type: "experience", title: "Researcher", subtitle: "CENSLOC", period: "2008", badge: null, description: "" },
  { type: "experience", title: "Junior Researcher", subtitle: "Formez (Ministry of Public Affairs)", period: "2006", badge: null, description: "" },
  { type: "visiting", title: "Visiting Professor", subtitle: "Warsaw School of Economics", period: "2022", badge: null, description: "" },
  { type: "visiting", title: "Visiting Post-doc, Department of Finance", subtitle: "NYU Stern School of Business (supervisor: Kose John)", period: "2012 – 2014", badge: null, description: "" },
  { type: "visiting", title: "Visiting PhD Student, Department of Economics", subtitle: "NYU Stern School of Business", period: "2010", badge: null, description: "" },
  { type: "education", title: "PhD in Economics, Markets and Institutions", subtitle: "IMT School for Advanced Studies Lucca", period: "2008 – 2011", badge: "Degree July 2011", description: "Thesis: “CEO compensation and board of directors in European public utilities of the energy sector” — empirical analysis of CEO compensation, governance and incentive mechanisms on a unique dataset. Supervisor: Carlo Cambini (Politecnico di Torino). Evaluators: Kose John (NYU Stern), Laura Rondi (Politecnico di Torino)." },
  { type: "education", title: "MSc in Governance and Strategic Management", subtitle: "University of Florence", period: "2004 – 2006", badge: "110 e lode", description: "Thesis: “New horizons for ‘made in Italy’: The Chinese market”." },
  { type: "education", title: "BA in Business Economics", subtitle: "University of Florence", period: "2001 – 2004", badge: null, description: "" },
];
export const demoResume: ResumeItem[] = resumeRows.map((r, i) => ({ ...r, id: `r${i + 1}`, active: true, sort_order: i + 1 }));

const skillGroups: Record<string, string[]> = {
  Refereeing: [
    "British Journal of Management",
    "Corporate Governance: An International Review",
    "International Journal of Management Reviews",
    "California Management Review",
    "European Management Review",
    "Journal of Management and Governance",
    "Journal of International Financial Markets, Institutions & Money",
    "International Journal of Business Governance and Ethics",
    "Management Decision",
  ],
  Memberships: [
    "Academy of Management (AOM)",
    "European Academy of Management (EURAM)",
    "International Corporate Governance Society (ICGS)",
    "Società Italiana di Management (SIMA)",
    "Financial Management Association (FMA)",
    "European Association for Research in Industrial Economics (EARIE)",
  ],
  "Summer schools & PhD courses": [
    "NYU Stern PhD: Banking and Financial Institutions (K. John, A. Sanders, 2013)",
    "NYU Stern PhD: Agency and Executive Compensation (D. Yermack, 2010)",
    "NYU Stern PhD: Econometric Analysis for Panel Data (W. Greene, 2010)",
    "London Business School: Doctoral Summer School “Corporate Governance and Finance” (2009)",
    "CIDE Bertinoro: Summer School in Econometrics, “Panel Data and Discrete Choice Models” (2009)",
    "AIFI: Private Equity and Venture Capital (2006)",
  ],
};
export const demoSkills: Skill[] = Object.entries(skillGroups).flatMap(([category, names], g) =>
  names.map((name, i) => ({ id: `sk-${g}-${i}`, name, category, level: 100, display: "tag" as const, active: true, sort_order: g * 20 + i + 1 }))
);

export const demoStats: Stat[] = [
  { id: "st1", value: "15", label: "Peer-reviewed papers", placement: "band", percent: 0, active: true, sort_order: 1 },
  { id: "st2", value: "12", label: "Books & book chapters", placement: "band", percent: 0, active: true, sort_order: 2 },
  { id: "st3", value: "2,100+", label: "EURAM 2025 participants", placement: "band", percent: 0, active: true, sort_order: 3 },
];

export const demoClients: Client[] = [
  { id: "cl1", name: "University of Florence", category: "Affiliation", logo_url: null, website_url: "https://www.unifi.it/", active: true, sort_order: 1 },
  { id: "cl2", name: "NYU Florence", category: "Affiliation", logo_url: null, website_url: "https://www.nyu.edu/", active: true, sort_order: 2 },
  { id: "cl3", name: "EURAM", category: "Affiliation", logo_url: null, website_url: "https://conferences.euram.academy/2025conference/", active: true, sort_order: 3 },
  { id: "cl4", name: "BIG Academy", category: "Affiliation", logo_url: null, website_url: "https://bigacademy.it/", active: true, sort_order: 4 },
  { id: "cl5", name: "ICGS", category: "Affiliation", logo_url: null, website_url: "https://icgs-2026.hec.ca/", active: true, sort_order: 5 },
];

export const demoAwards: Award[] = [
  { id: "a1", title: "ICGS 5+ Conference Milestone Pin", organization: "International Corporate Governance Society", year: "2026", short_description: "Recognition received at the 12th ICGS Annual Conference, HEC Montréal.", image_url: null, link_url: "https://icgs-2026.hec.ca/", active: true, sort_order: 1 },
  { id: "a2", title: "Most Inspirational Paper, SIG 02 COGO", organization: "EURAM 2025", year: "2025", short_description: "“From Diversity to Inclusion: Viewing women on boards beyond numbers”, with Słomka-Gołębiowska, Paci and Zambelli.", image_url: null, link_url: null, active: true, sort_order: 2 },
  { id: "a3", title: "Florence Ambassador Award", organization: "City of Florence", year: "2023", short_description: "", image_url: null, link_url: null, active: true, sort_order: 3 },
  { id: "a4", title: "Most Cited Paper (Wiley Award)", organization: "Business Ethics, the Environment & Responsibility", year: null, short_description: "“Women on boards and corporate environmental performance in Italian companies: The importance of nomination background”, with Słomka-Gołębiowska and Paci.", image_url: null, link_url: "https://doi.org/10.1111/beer.12467", active: true, sort_order: 4 },
  { id: "a5", title: "Best Paper Award", organization: "11th International Workshop Advances in Cleaner Production", year: "2022", short_description: "15 July 2022. “Are women drivers of sustainability? The moderating effect of women on boards in the relationship between ESG performance and firm financial stability” (Słomka-Gołębiowska, Gabrielczyk, Becagli).", image_url: null, link_url: null, active: true, sort_order: 5 },
  { id: "a6", title: "Best Paper Award", organization: "International Journal of Business Research and Management", year: "2022", short_description: "February 2022. “Boards Contributing to the Protection of the Environment: Looking at the Dynamics between In-groups and Out-groups”.", image_url: null, link_url: null, active: true, sort_order: 6 },
  { id: "a7", title: "Italian Research Award FABR 2017", organization: "MIUR", year: "2017", short_description: "", image_url: null, link_url: null, active: true, sort_order: 7 },
  { id: "a8", title: "Research Grant for Best Young Researchers (Bando 215/2017)", organization: "University of Florence", year: "2017", short_description: "“Minority shareholder protection and slate (list) voting in Italy”, with Andrea Zorzi.", image_url: null, link_url: null, active: true, sort_order: 8 },
  { id: "a9", title: "Post-doc Scholarship", organization: "Ente Cassa di Risparmio di Firenze", year: "2013–2014", short_description: "", image_url: null, link_url: null, active: true, sort_order: 9 },
  { id: "a10", title: "Post-doc Grant", organization: "Ministry of Education and Research & Eli Lilly", year: "2012–2013", short_description: "", image_url: null, link_url: null, active: true, sort_order: 10 },
  { id: "a11", title: "Best Paper Award", organization: "10th Spain–Italy Dialogue Forum", year: "2009", short_description: "", image_url: null, link_url: null, active: true, sort_order: 11 },
  { id: "a12", title: "Full Academic Scholarship for PhD", organization: "IMT Lucca / Italian Ministry of Education", year: "2008–2011", short_description: "", image_url: null, link_url: null, active: true, sort_order: 12 },
  { id: "a13", title: "Best Graduate Student of the Year", organization: "BCC – Banca di Credito Cooperativo", year: "2006", short_description: "", image_url: null, link_url: null, active: true, sort_order: 13 },
];

export const demoPosts: BlogPost[] = [
  {
    id: "n1",
    title: "Presenting new research on chairwomen at ICGS 2026",
    slug: "icgs-2026-chairwomen-pathways",
    excerpt: "At HEC Montréal, new work on how women reach the chair of the board in France, Spain and Italy.",
    content:
      "Sara De Masi presented new research on chairwomen and the pathways to board leadership in France, Spain and Italy at the 12th Annual Conference of the International Corporate Governance Society (ICGS), held at HEC Montréal on 2–4 October 2026.\n\nThe study is co-authored with Słomka-Gołębiowska, Zambelli and Paci. It asks a simple question: if the person in the room were a man, would the path to the chair be different?",
    cover_image_url: "/demo/news-icgs.svg",
    category: "Conference",
    read_time: "1 min read",
    published_at: "2026-10-03",
    link_url: "https://icgs-2026.hec.ca/",
    status: "published",
  },
  {
    id: "n2",
    title: "ICGS 5+ Conference Milestone Pin",
    slug: "icgs-milestone-pin-2026",
    excerpt: "Recognition from the International Corporate Governance Society.",
    content: "At ICGS 2026 in Montréal, Sara De Masi received the ICGS 5+ Conference Milestone Pin from the International Corporate Governance Society.",
    cover_image_url: "/demo/news-pin.svg",
    category: "Award",
    read_time: "1 min read",
    published_at: "2026-10-04",
    link_url: null,
    status: "published",
  },
  {
    id: "n3",
    title: "Programme Chair-Elect of EURAM SIG 02 — Corporate Governance",
    slug: "euram-2026-sig-02-programme-chair-elect",
    excerpt: "Leading the Corporate Governance and Diversity track at EURAM 2026 in Kristiansand.",
    content: "Sara De Masi serves as Programme Chair-Elect of EURAM SIG 02 – Corporate Governance, and as Track Chair of “Corporate Governance and Diversity” for the EURAM 2026 Annual Conference, held at the University of Agder, Kristiansand (Norway), on 16–19 June 2026.",
    cover_image_url: "/demo/news-euram.svg",
    category: "Service",
    read_time: "1 min read",
    published_at: "2026-06-16",
    link_url: "https://conferences.euram.academy/2026conference/",
    status: "published",
  },
  {
    id: "n4",
    title: "EURAM 2025 in Florence: “Managing with Purpose”",
    slug: "euram-2025-florence-co-chair",
    excerpt: "More than 2,100 participants from 70 countries met at the University of Florence.",
    content: "The University of Florence hosted the EURAM 2025 Annual Conference, “Managing with Purpose”, in June 2025. Sara De Masi served as Co-Chair of the conference, which welcomed more than 2,100 participants from 70 countries.\n\nAt the same conference, the paper “From Diversity to Inclusion: Viewing women on boards beyond numbers” received the Most Inspirational Paper award of SIG 02 (Corporate Governance).",
    cover_image_url: "/demo/news-florence.svg",
    category: "Conference",
    read_time: "1 min read",
    published_at: "2025-06-25",
    link_url: "https://conferences.euram.academy/2025conference/",
    status: "published",
  },
];

