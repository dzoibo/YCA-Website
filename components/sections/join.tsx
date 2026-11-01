"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLang } from "@/lib/i18n/context";
import { isExternal, links } from "@/lib/site";

// One per card in t.join.cards: Members, Newcomers, Partners & sponsors.
const ways = [
  { href: links.whatsapp, variant: "forest" },
  { href: links.instagram, variant: "gold" },
  { href: links.email, variant: "outline-brand" },
] as const;

export function Join() {
  const { t } = useLang();
  return (
    <section id="join" className="bg-white py-20">
      <div className="page-width">
        <Reveal>
          <SectionHeading
            eyebrow={t.join.eyebrow}
            title={t.join.title}
            intro={t.join.body}
            titleClassName="max-w-xl"
          />
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {ways.map(({ href, variant }, i) => {
            const [title, copy, cta] = t.join.cards[i];
            const external = isExternal(href);
            return (
              <Reveal key={i} delay={i * 0.07}>
                <Card className="h-full gap-0 rounded-2xl bg-sand p-7 ring-0 has-data-[slot=card-footer]:pb-7 transition-transform duration-300 ease-out hover:-translate-y-1">
                  <CardHeader className="gap-0 px-0">
                    <CardTitle
                      role="heading"
                      aria-level={3}
                      className="font-display text-xl font-bold leading-normal text-teal-900"
                    >
                      {title}
                    </CardTitle>
                    <CardDescription className="mt-3 leading-relaxed text-stone">
                      {copy}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-6 border-0 bg-transparent p-0">
                    <Button asChild variant={variant} size="pill">
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                      >
                        {cta}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
