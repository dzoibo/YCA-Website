"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about/about-section";
import { EventsSection } from "@/components/sections/events/events-section";
import { Gallery } from "@/components/sections/gallery";
import { Hero, HeroRule } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { Join } from "@/components/sections/join";
import { Partners } from "@/components/sections/partners";
import { Programs } from "@/components/sections/programs";
import { TeamSection } from "@/components/sections/team/team-section";
import type { YcaEvent } from "@/lib/events";
import { LangProvider } from "@/lib/i18n/context";

type LandingPageProps = { events: YcaEvent[]; eventsError: boolean };

/** The one-page site. Each section is its own module in components/sections. */
export function LandingPage({ events, eventsError }: LandingPageProps) {
  return (
    <LangProvider>
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
        <Partners />
      </main>
      <SiteFooter />
    </LangProvider>
  );
}
