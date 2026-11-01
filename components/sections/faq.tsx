"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/lib/i18n/context";

/**
 * Frequently asked questions, also published as FAQPage structured data. Answers stay in the
 * HTML when collapsed (forceMount, hidden with CSS on data-state) so search engines and AI
 * crawlers can read them.
 */
export function Faq() {
  const { t } = useLang();
  return (
    <section id="faq" className="bg-sand py-20">
      <div className="page-width grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <Reveal>
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="border-t border-teal-900/10">
            {t.faq.items.map(([question, answer], i) => (
              <AccordionItem
                key={i}
                value={`q${i}`}
                className="border-b border-teal-900/10 [&_[data-slot=accordion-content][data-state=closed]]:hidden"
              >
                <AccordionTrigger className="gap-4 rounded-none py-5 text-base font-bold text-teal-900 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-sage">
                  {question}
                </AccordionTrigger>
                <AccordionContent
                  forceMount
                  className="pb-5 text-[15px] leading-relaxed text-stone"
                >
                  <p>{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
