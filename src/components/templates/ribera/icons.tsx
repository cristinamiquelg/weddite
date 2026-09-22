type IconProps = { className?: string };

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Simple generic line icons in the same spirit as the reference design's
// coral illustrations, standing in until real artwork is dropped in.

export function PlaceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M24 6c-7.7 0-14 6.1-14 13.6C10 29 24 42 24 42s14-13 14-22.4C38 12.1 31.7 6 24 6Z" />
      <circle cx="24" cy="19.5" r="5.2" />
    </svg>
  );
}

export function DressIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M18 6h12l-2 8 6 26H14l6-26-2-8Z" />
      <path d="M18 6c0 3.3 2.7 6 6 6s6-2.7 6-6" />
      <path d="M16 22h16" />
    </svg>
  );
}

export function BusIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="12" width="34" height="22" rx="4" />
      <path d="M7 24h34" />
      <path d="M14 12V8h20v4" />
      <circle cx="15" cy="38" r="3" />
      <circle cx="33" cy="38" r="3" />
      <path d="M13 18h6M29 18h6" />
    </svg>
  );
}

export function HotelIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 42V14l14-8 14 8v28" />
      <path d="M10 42h28" />
      <path d="M18 42V26h12v16" />
      <path d="M18 18h.01M30 18h.01M18 22h.01M30 22h.01" />
    </svg>
  );
}

export function SprigIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 48 60" fill="none" stroke="currentColor" strokeWidth={1.3} className={className}>
      <path d="M24 6v48" />
      <path d="M24 16c-6-2-10-8-10-8s2 8 10 10" />
      <path d="M24 16c6-2 10-8 10-8s-2 8-10 10" />
      <path d="M24 30c-6-2-10-8-10-8s2 8 10 10" />
      <path d="M24 30c6-2 10-8 10-8s-2 8-10 10" />
      <path d="M24 44c-5-1-8-6-8-6s1 6 8 8" />
      <path d="M24 44c5-1 8-6 8-6s-1 6-8 8" />
    </svg>
  );
}
