/** Author string with the professor's name in bold. */
export function Authors({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(De Masi,?\s*S\.?)/g);
  return (
    <span className={className}>
      {parts.map((p, i) => (/^De Masi/.test(p) ? <strong key={i} className="font-semibold text-heading">{p}</strong> : <span key={i}>{p}</span>))}
    </span>
  );
}
