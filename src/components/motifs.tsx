/* Line-art motifs, drawn in khaki. Decorative only (aria-hidden). Never more than one in view. */

type SvgProps = { className?: string; color?: string };

/** Conch spiral, three strokes and three waves. Once: the home hero or the statement band. */
export function Conch({ className = "w-[120px]", color = "var(--color-khaki)" }: SvgProps) {
  return (
    <svg className={className} viewBox="74 22 162 72" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M 80 60 Q 80 30 110 30 Q 140 30 140 60 Q 140 85 115 85 Q 95 85 95 70 Q 95 60 105 60 Q 110 60 110 65" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="140" cy="32" r="4" fill={color} />
      <line x1="170" y1="35" x2="170" y2="85" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="182" y1="35" x2="182" y2="85" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="194" y1="35" x2="194" y2="85" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 210 42 q 5 -6 10 0 q 5 6 10 0" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 210 60 q 5 -6 10 0 q 5 6 10 0" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 210 78 q 5 -6 10 0 q 5 6 10 0" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Feather / quill. In the footer. Variant "a" has seed dots, "b" is plainer. */
export function Feather({ className = "w-8", color = "var(--color-khaki)", variant = "a" }: SvgProps & { variant?: "a" | "b" }) {
  const barbs =
    variant === "a"
      ? ["M 40 30 Q 25 38 22 50", "M 40 50 Q 22 58 18 72", "M 41 70 Q 20 80 14 96", "M 42 92 Q 18 102 10 122", "M 44 116 Q 18 130 12 150", "M 46 140 Q 22 154 18 174"]
      : ["M 40 30 Q 25 38 22 50", "M 40 55 Q 20 64 16 78", "M 42 82 Q 18 94 12 112", "M 44 110 Q 18 124 12 144", "M 46 138 Q 22 152 18 172"];
  return (
    <svg className={className} viewBox="0 0 80 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M 40 10 Q 40 100 50 195" stroke={color} strokeWidth="1.5" fill="none" />
      {barbs.map((d) => (
        <path key={d} d={d} stroke={color} strokeWidth="1.2" fill="none" />
      ))}
      <circle cx="40" cy="12" r="3" fill={color} />
      {variant === "a" && (
        <>
          <circle cx="36" cy="20" r="1.5" fill={color} />
          <circle cx="32" cy="28" r="1.2" fill={color} />
        </>
      )}
    </svg>
  );
}

/** Wave, line, wave. Under a page title or as a section divider. */
export function WaveRule({ className = "block w-[150px]", color = "var(--color-khaki)", dots = true }: SvgProps & { dots?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 130 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M 4 7 q 4 -5 8 0 q 4 5 8 0 q 4 -5 8 0" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 32 7 L 100 7" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 100 7 q 4 -5 8 0 q 4 5 8 0 q 4 -5 8 0" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {dots && (
        <>
          <circle cx="2" cy="7" r="1.2" fill="var(--color-gold)" />
          <circle cx="128" cy="7" r="1.2" fill="var(--color-gold)" />
        </>
      )}
    </svg>
  );
}
