"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown, FileText, GraduationCap, Home, Mail, Menu, Newspaper, ScrollText, User, X, type LucideIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { NavItem } from "@/lib/sections";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  "/": Home,
  "/about": User,
  "/publications/papers": BookOpen,
  "/teaching": GraduationCap,
  "/news": Newspaper,
  "/cv": ScrollText,
  "/contact": Mail,
};

type Props = {
  name: string;
  logo: string | null;
  nav: NavItem[];
  footerLine: string;
  year: number;
};

function isActive(pathname: string, href: string) {
  if (href === "/publications/papers") return pathname.startsWith("/publications");
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function Logo({ name, logo, className }: { name: string; logo: string | null; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label={`${name} — home`}>
      {logo ? (
        <Image src={logo} alt="" width={160} height={48} className="h-10 w-auto object-contain" />
      ) : (
        <span className="font-heading text-[30px] leading-none font-extrabold tracking-[0.18em] text-heading uppercase">{name}</span>
      )}
    </Link>
  );
}

function Links({ nav, pathname, id }: { nav: NavItem[]; pathname: string; id: string }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <ul className="flex flex-col gap-1.5">
      {nav.map((item, i) => {
        const Icon = icons[item.href] ?? FileText;
        const active = isActive(pathname, item.href);
        const hasChildren = Boolean(item.children?.length);
        const expanded = hasChildren && (openMenu === item.href || (openMenu === null && active));
        const rowClass = cn(
          "group relative flex w-full items-center gap-4 py-2 text-left font-heading text-[16px] transition-colors",
          active ? "font-bold tracking-wide text-heading" : "font-medium text-muted hover:text-heading"
        );
        const inner = (
          <>
            <Icon size={17} aria-hidden className={cn("transition-transform duration-300 group-hover:-translate-y-0.5", active && "text-accent-ink")} />
            <span className="transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>
            {hasChildren ? (
              <ChevronDown size={15} aria-hidden className={cn("ml-1 transition-transform duration-300", expanded && "rotate-180")} />
            ) : (
              active && <motion.span layoutId={`nav-dot-${id}`} className="ml-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            )}
          </>
        );
        return (
          <motion.li key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}>
            {hasChildren ? (
              <>
                <button type="button" className={rowClass} aria-expanded={expanded} aria-controls={`sub-${id}-${i}`} onClick={() => setOpenMenu(expanded ? "" : item.href)}>
                  {inner}
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.ul
                      id={`sub-${id}-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="ml-[7px] overflow-hidden border-l border-line pl-6"
                    >
                      {item.children!.map((c) => {
                        const subActive = pathname === c.href || pathname.startsWith(`${c.href}/`);
                        return (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              aria-current={subActive ? "page" : undefined}
                              className={cn("block py-1.5 font-heading text-[15px] transition-colors", subActive ? "font-bold text-accent-ink" : "font-medium text-muted hover:text-heading")}
                            >
                              {c.label}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link href={item.href} aria-current={active ? "page" : undefined} className={rowClass}>
                {inner}
              </Link>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}

function Footer({ name, footerLine, year }: { name: string; footerLine: string; year: number }) {
  return (
    <p className="font-heading text-[15px] leading-relaxed text-muted italic">
      &copy; {year} {name}
      {footerLine && (
        <>
          <br />
          {footerLine}
        </>
      )}
    </p>
  );
}

export function Sidebar({ name, logo, nav, footerLine, year }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar-w)] flex-col justify-center bg-sidebar px-12 transition-colors duration-300 lg:flex 2xl:px-24">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Logo name={name} logo={logo} />
        </motion.div>
        <nav aria-label="Main" className="mt-14">
          <Links nav={nav} pathname={pathname} id="desk" />
        </nav>
        <div className="mt-20">
          <Footer name={name} footerLine={footerLine} year={year} />
        </div>
      </aside>

      {/* Mobile: top bar + drawer */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-[70px] items-center justify-between border-b border-line bg-sidebar px-5 lg:hidden">
        <Logo name={name} logo={logo} className="[&_span]:text-[22px]" />
        <div className="flex items-center gap-2">
          <ThemeToggle className="!h-10 !w-10 text-heading" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center text-heading"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 left-0 z-50 flex w-[min(320px,85vw)] flex-col bg-sidebar px-8 py-8 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Logo name={name} logo={logo} className="[&_span]:text-[22px]" />
                <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center text-heading" aria-label="Close menu" autoFocus>
                  <X size={24} />
                </button>
              </div>
              <nav aria-label="Main" className="mt-12">
                <Links nav={nav} pathname={pathname} id="mob" />
              </nav>
              <div className="mt-auto">
                <Footer name={name} footerLine={footerLine} year={year} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
