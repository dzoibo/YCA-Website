import { cn } from "@/lib/utils";

/** Renders [before, highlighted, after] with the yellow marker under the middle part. */
export function MarkedTitle({ parts }: { parts: readonly string[] }) {
  const [before, marker, after] = parts;
  return (
    <>
      {before}
      <span className="marker">{marker}</span>
      {after}
    </>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

type SectionHeadingProps = {
  eyebrow: string;
  title: readonly string[];
  intro?: string;
  /** Heading level: sections use h2, sub-sections h3. */
  as?: "h2" | "h3";
  id?: string;
  titleClassName?: string;
  introClassName?: string;
};

/** Eyebrow + marked display title + optional intro, the opening of every landing section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  id,
  titleClassName,
  introClassName,
}: SectionHeadingProps) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading
        id={id}
        className={cn(
          "font-display mt-4 text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold",
          titleClassName,
        )}
      >
        <MarkedTitle parts={title} />
      </Heading>
      {intro && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[16.5px] leading-relaxed text-stone",
            introClassName,
          )}
        >
          {intro}
        </p>
      )}
    </>
  );
}
