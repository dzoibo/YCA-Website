"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Spark } from "@/components/shared/spark";
import { collage } from "@/lib/content/media";
import { useLang } from "@/lib/i18n/context";
import { easeCalm } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Editorial collage of community photos; tilted cards that straighten on hover. */
export function PhotoCollage() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  return (
    <div className="relative mb-12 aspect-[1.15] w-full sm:aspect-[1.45]">
      {collage.map(({ src, position, rotate }, i) => (
        <motion.div
          key={src}
          initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, scale: 1, rotate, y: 0 }}
          whileHover={reduce ? undefined : { rotate: 0, scale: 1.04 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: i * 0.09, ease: easeCalm }}
          style={reduce ? { rotate } : undefined}
          className={cn(
            "absolute overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_24px_48px_-24px_rgba(15,54,43,.55)] hover:z-40",
            position,
          )}
        >
          <Image
            src={`/assets/who_are_we/${src}`}
            alt={t.about.collageAlts[i]}
            fill
            sizes="(min-width: 1024px) 300px, 45vw"
            className="object-cover"
          />
        </motion.div>
      ))}
      <Spark className="-left-[3%] -top-[7%] z-30" />
      <Spark className="right-[1%] top-[40%] z-30 -scale-x-100" />
    </div>
  );
}
