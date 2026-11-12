import { Briefcase, GraduationCap, Landmark, Plane } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { ResumeItem } from "@/types/content";

function Column({ title, items, Icon }: { title: string; items: ResumeItem[]; Icon: typeof Briefcase }) {
  if (!items.length) return null;
  return (
    <div>
      <h2 className="block-title mb-8 flex items-center gap-3">
        <Icon size={22} className="text-accent-ink" aria-hidden /> {title}
      </h2>
      <Stagger className="flex flex-col">
        {items.map((r) => (
          <StaggerItem key={r.id} className="group relative border-l border-line pb-9 pl-8 last:pb-0">
            <span aria-hidden className="absolute top-1.5 -left-[6px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg transition-colors duration-300 group-hover:bg-accent" />
            <span className="chip !px-2.5 !py-1 !text-[11px]">{r.period}</span>
            <h3 className="mt-3 text-[18px] font-bold">{r.title}</h3>
            <p className="mt-0.5 font-heading text-[14px] font-medium text-muted italic">
              {r.subtitle}
              {r.badge ? ` · ${r.badge}` : ""}
            </p>
            {r.description && <p className="mt-2.5 text-[15px] leading-relaxed">{r.description}</p>}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function Resume({ items }: { items: ResumeItem[] }) {
  const of = (t: ResumeItem["type"]) => items.filter((r) => r.type === t);
  if (!items.length) return null;
  return (
    <section aria-label="Experience and education" className="grid gap-14 md:grid-cols-2 md:gap-16">
      <Column title="Experience" items={of("experience")} Icon={Briefcase} />
      <div className="flex flex-col gap-14">
        <Column title="Education" items={of("education")} Icon={GraduationCap} />
        <Column title="Visiting Positions" items={of("visiting")} Icon={Plane} />
      </div>
      {of("service").length > 0 && (
        <div className="md:col-span-2">
          <Column title="Academic Leadership & Service" items={of("service")} Icon={Landmark} />
        </div>
      )}
    </section>
  );
}
