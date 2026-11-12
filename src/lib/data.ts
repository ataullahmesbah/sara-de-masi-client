import "server-only";
import { cache } from "react";
import { getPublicClient } from "@/lib/supabase/public";
import {
  demoAwards,
  demoClients,
  demoCourses,
  demoPosts,
  demoProfile,
  demoPublications,
  demoResume,
  demoServices,
  demoSettings,
  demoSkills,
  demoStats,
  demoTalks,
} from "@/data/demo";
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

/**
 * Public read layer. When Supabase is not configured every getter returns the
 * built-in demo content, so the site never renders empty.
 */

async function list<T>(table: string, fallback: T[], filter: (q: any) => any, orders: [string, boolean][] = [["sort_order", true]]): Promise<T[]> {
  const db = getPublicClient();
  if (!db) return fallback;
  let q = filter(db.from(table).select("*"));
  for (const [col, asc] of orders) q = q.order(col, { ascending: asc });
  const { data, error } = await q;
  if (error) {
    console.error(`[data] ${table}:`, error.message);
    return [];
  }
  return (data ?? []) as T[];
}

async function single<T>(table: string, fallback: T): Promise<T> {
  const db = getPublicClient();
  if (!db) return fallback;
  const { data, error } = await db
    .from(table)
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) console.error(`[data] ${table}:`, error.message);
  return data ? ({ ...fallback, ...data } as T) : fallback;
}

export const getSettings = cache(() => single<SiteSettings>("site_settings", demoSettings));
export const getProfile = cache(() => single<Profile>("profile", demoProfile));

const byOrder: [string, boolean][] = [["sort_order", true]];

/** Research areas live in the "services" table. */
export const getResearchAreas = cache(() => list<Service>("services", demoServices, (q) => q.eq("active", true)));

export const getPublications = cache(() =>
  list<Publication>("publications", demoPublications, (q) => q.eq("active", true), [
    ["year", false],
    ["sort_order", true],
  ])
);

export const getPublicationBySlug = cache(async (slug: string) => {
  const all = await getPublications();
  return all.find((p) => p.slug === slug) ?? null;
});

export const getTalks = cache(() =>
  list<Talk>("talks", demoTalks, (q) => q.eq("active", true), [
    ["year", false],
    ["sort_order", true],
  ])
);

export const getCourses = cache(() => list<Course>("courses", demoCourses, (q) => q.eq("active", true), byOrder));

/** Positions, education, visiting posts and service roles. */
export const getResume = cache(() => list<ResumeItem>("resume_items", demoResume, (q) => q.eq("active", true), byOrder));

/** Refereeing, memberships, summer schools (grouped by "category"). */
export const getSkills = cache(() => list<Skill>("skills", demoSkills, (q) => q.eq("active", true), byOrder));

/** Affiliations (UniFI, NYU, EURAM ...). */
export const getClients = cache(() => list<Client>("clients", demoClients, (q) => q.eq("active", true), byOrder));

export const getAwards = cache(() => list<Award>("awards", demoAwards, (q) => q.eq("active", true), byOrder));

export const getPosts = cache(() =>
  list<BlogPost>("blog_posts", demoPosts, (q) => q.eq("status", "published"), [["published_at", false]])
);

export const getPostBySlug = cache(async (slug: string) => {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
});

export const getStats = cache(() => list<Stat>("stats", demoStats, (q) => q.eq("active", true), byOrder));

