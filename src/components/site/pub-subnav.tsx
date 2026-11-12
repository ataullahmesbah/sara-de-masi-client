import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/publications/papers", label: "Papers" },
  { href: "/publications/books", label: "Books & Book Chapters" },
  { href: "/publications/other", label: "Other Publications" },
];

export function PubSubnav({ active }: { active: string }) {
  return (
    <nav aria-label="Publications" className="mb-10 flex flex-wrap gap-3">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} aria-current={t.href === active ? "page" : undefined} className={cn("btn !min-h-[44px] !px-5 !text-[14px]", t.href === active ? "btn-solid" : "btn-line")}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
