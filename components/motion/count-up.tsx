"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeCalm } from "@/lib/motion";

/** Counts from 0 up to `value` (e.g. "14" or "8+") when it scrolls into view. */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1,
      ease: easeCalm,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);
  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
