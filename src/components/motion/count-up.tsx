"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Splits "120+", "$4.9k", "95%" into prefix / number / suffix. */
export function parseStat(value: string) {
  // "2,100+" → thousands separator (comma followed by exactly three digits)
  const t = value.trim().match(/^([^\d-]*)(\d{1,3}(?:,\d{3})+)(.*)$/);
  if (t) return { prefix: t[1], num: Number(t[2].replace(/,/g, "")), decimals: 0, suffix: t[3], thousands: true };
  const m = value.trim().match(/^([^\d-]*)(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return null;
  const num = Number(m[2].replace(",", "."));
  const decimals = (m[2].split(/[.,]/)[1] ?? "").length;
  return { prefix: m[1], num, decimals, suffix: m[3], thousands: false };
}

/** Counts up to the number inside `value` when it scrolls into view. Non-numeric values render as-is. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const parsed = parseStat(value);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!parsed || !inView) return;
    if (reduce) {
      setN(parsed.num);
      return;
    }
    const controls = animate(0, parsed.num, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setN });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  if (!parsed) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>
        {parsed.prefix}
        {parsed.thousands ? Math.round(n).toLocaleString("en-US") : n.toFixed(parsed.decimals)}
        {parsed.suffix}
      </span>
    </span>
  );
}
