"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealImage } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { gallery } from "@/lib/content/media";
import { useLang } from "@/lib/i18n/context";
import { links } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Bento grid of photos: the first is large, the fourth is tall. */
const tileSpan = (i: number) =>
  i === 0 ? "col-span-2 row-span-2" : i === 3 ? "row-span-2" : "";

export function Gallery() {
  const { t } = useLang();
  return (
    <section id="year" className="bg-white py-20">
      <div className="page-width">
        <Reveal>
          <SectionHeading
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            titleClassName="max-w-xl"
          />
        </Reveal>
        <div className="mt-10 grid auto-rows-36.25 grid-cols-2 gap-3 md:auto-rows-42.5 md:grid-cols-4">
          {gallery.map((image, i) => {
            const caption = t.gallery.captions[i];
            return (
              <RevealImage
                key={image}
                delay={i * 0.05}
                className={cn("group relative overflow-hidden rounded-lg", tileSpan(i))}
              >
                <figure className="relative size-full">
                  <Image
                    src={`/assets/${image}`}
                    alt={caption}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-teal-900/80 p-3 text-xs font-medium text-white transition duration-300 group-hover:translate-y-0">
                    {caption}
                  </figcaption>
                </figure>
              </RevealImage>
            );
          })}
        </div>
        <div className="text-center">
          <Button
            asChild
            variant="outline-yellow"
            size="pill"
            className="mt-8"
          >
            <a href={links.instagram} target="_blank" rel="noopener noreferrer">
              {t.gallery.cta}
              <ArrowRight
                className="transition-transform duration-300 group-hover/button:translate-x-1"
                size={16}
              />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
