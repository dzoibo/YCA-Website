import { cn } from "@/lib/utils";

/** Three yellow strokes, the decorative "spark" placed around photos. */
export function Spark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-[clamp(1.6rem,4vw,2.6rem)]",
        className,
      )}
    >
      <g stroke="#fed104" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M5 24 15 25" />
        <path d="M9 9 17 17" />
        <path d="M23 3 24 13" />
      </g>
    </svg>
  );
}
