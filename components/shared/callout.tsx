import { cn } from "@/lib/utils";

/** Cream box with a yellow left rule, for side notes like "Stay in the loop". */
export function Callout({
  title,
  children,
  action,
  className,
}: {
  title: string;
  children: React.ReactNode;
  /** Optional call-to-action shown on the right from `sm` up. */
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-r-lg border-l-4 border-yellow-400 bg-cream p-5",
        action &&
          "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:p-6",
        className,
      )}
    >
      <div>
        <h3 className="font-display text-lg font-bold text-teal-900">
          {title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone">
          {children}
        </p>
      </div>
      {action}
    </div>
  );
}
