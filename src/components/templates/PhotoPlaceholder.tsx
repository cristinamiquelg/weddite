const PATTERNS = [
  "radial-gradient(circle at 30% 30%, var(--w-accent-soft), transparent 60%)",
  "radial-gradient(circle at 70% 70%, var(--w-accent-soft), transparent 60%)",
  "linear-gradient(135deg, var(--w-accent-soft), transparent 70%)",
];

export default function PhotoPlaceholder({
  caption,
  index = 0,
  className = "",
}: {
  caption?: string;
  index?: number;
  className?: string;
}) {
  return (
    <figure
      className={`relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--w-line)] bg-[var(--w-surface)] ${className}`}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundImage: PATTERNS[index % PATTERNS.length] }}
      />
      <svg
        viewBox="0 0 24 24"
        className="relative h-8 w-8 text-[var(--w-accent)] opacity-60"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7.5A1.5 1.5 0 0 1 4.5 6h2.379a1.5 1.5 0 0 0 1.06-.44l1.122-1.12A1.5 1.5 0 0 1 10.12 4h3.76a1.5 1.5 0 0 1 1.06.44l1.122 1.12a1.5 1.5 0 0 0 1.06.44H19.5A1.5 1.5 0 0 1 21 7.5v10A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10Z"
        />
        <circle cx="12" cy="12.5" r="3.3" />
      </svg>
      {caption ? (
        <figcaption className="relative mt-3 px-4 text-center text-xs tracking-wide text-[var(--w-ink-soft)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
