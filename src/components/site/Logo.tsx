import SparkleIcon from "./SparkleIcon";

export default function Logo({
  className = "",
  starClassName = "",
}: {
  className?: string;
  starClassName?: string;
}) {
  return (
    <span className={`group inline-flex items-start gap-0.5 ${className}`}>
      <span className="font-display font-semibold lowercase leading-none tracking-tight">
        weddite
      </span>
      <SparkleIcon
        className={`h-[0.42em] w-[0.42em] shrink-0 text-clay transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-125 ${starClassName}`}
      />
    </span>
  );
}
