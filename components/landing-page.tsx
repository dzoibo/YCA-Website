"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about/about-section";
import { EventsSection } from "@/components/sections/events/events-section";
import { Faq } from "@/components/sections/faq";
import { Gallery } from "@/components/sections/gallery";
import { Hero, HeroRule } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { Join } from "@/components/sections/join";
import { Partners } from "@/components/sections/partners";
import { Programs } from "@/components/sections/programs";
import { TeamSection } from "@/components/sections/team/team-section";
import type { YcaEvent } from "@/lib/events";

type LandingPageProps = { events: YcaEvent[]; eventsError: boolean };

/**
 * The one-page site, in the language of the URL (LangProvider lives in app/[lang]/layout.tsx).
 * Each section is its own module in components/sections.
 */
export function LandingPage({ events, eventsError }: LandingPageProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HeroRule />
        <Impact />
        <AboutSection />
        <TeamSection />
        <Programs />
        <Gallery />
        <Join />
        <EventsSection events={events} error={eventsError} />
        <Faq />
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
