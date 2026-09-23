export default function SparkleIcon({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`sparkle-twinkle ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 1.5c.5 5.2 1.9 7 7.5 7.5-5.6.5-7 2.3-7.5 7.5-.5-5.2-1.9-7-7.5-7.5 5.6-.5 7-2.3 7.5-7.5Z" />
    </svg>
  );
}
