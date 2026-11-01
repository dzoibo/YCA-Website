"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { programs } from "@/lib/content/media";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function Programs() {
  const { t } = useLang();
  return (
    <section id="programs" className="bg-parchment py-20">
      <Reveal className="page-width">
        <SectionHeading eyebrow={t.programs.eyebrow} title={t.programs.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(({ image, kind }, i) => {
            const [title, meta, copy] = t.programs.items[i];
            return (
              <Reveal key={image} delay={i * 0.04}>
                <Card className="photo-card h-full gap-0 rounded-[11px] py-0 ring-0">
                  <div className="relative aspect-[1.7]">
                    <Image
                      src={`/assets/${image}`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <Badge
                      className={cn(
                        "absolute left-3 top-3 h-auto rounded border-0 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[.14em]",
                        kind === "pillar"
                          ? "bg-sage text-white"
                          : "bg-gold text-teal-900",
                      )}
                    >
                      {t.programs.kinds[kind]}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8b93a7]">
                      {meta}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-bold">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">
                      {copy}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
