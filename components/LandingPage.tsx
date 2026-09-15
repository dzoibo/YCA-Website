"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  Menu,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const placeholder = "https://example.com";
const team = [
  [
    "team-hilary.png",
    "Hilary Dondji",
    "President",
    "Leading the chapter with care, vision, and community at heart.",
  ],
  [
    "team-ines-portrait.png",
    "Ines Ngale",
    "Vice President",
    "Building meaningful connections across Ottawa-Gatineau.",
  ],
  [
    "team-anne.png",
    "Anne Tembou",
    "Secretary",
    "Keeping the chapter organized and moving together.",
  ],
  [
    "team-franck.png",
    "Franck Pokam",
    "Communications",
    "Telling our story and keeping the community informed.",
  ],
  [
    "team-mylena-2.png",
    "Myléna Mfegue",
    "Treasurer",
    "Supporting a strong, sustainable chapter.",
  ],
] as const;
const programs = [
  [
    "audience-wide.png",
    "Pillar",
    "Community gatherings",
    "Ottawa & Gatineau",
    "Easy ways to meet people, share a meal, and feel at home.",
  ],
  [
    "two-women-talking.png",
    "Pillar",
    "Cultural exchange",
    "Quarterly",
    "Celebrating Cameroonian culture with the wider community.",
  ],
  [
    "two-men-smiling.png",
    "Pillar",
    "Professional growth",
    "With local partners",
    "Conversations, workshops, and connections that move us forward.",
  ],
  [
    "conversation.png",
    "Event",
    "Social Saturdays",
    "Monthly · Ottawa",
    "A relaxed gathering for new faces and familiar ones.",
  ],
  [
    "two-women-portrait.png",
    "Event",
    "Culture nights",
    "Summer · Gatineau",
    "Music, food, stories, and a little piece of home.",
  ],
  [
    "audience-profile.png",
    "Event",
    "Outdoor days",
    "Seasonal · Gatineau Park",
    "Fresh air, good company, and a shared sense of adventure.",
  ],
] as const;
const gallery = [
  ["audience-wide.png", "Community Launch - Aug 2025"],
  ["two-women-portrait.png", "Culture Night - Nov 2025"],
  ["team-group.png", "Cultural Festival - Sept 2025"],
  ["speaker-mic.png", "Youth Panel - Oct 2025"],
  ["team-group-2.png", "Chapter Team - Winter 2026"],
  ["two-men-smiling.png", "Networking Mixer - Feb 2026"],
  ["conversation.png", "Social Saturday - Jan 2026"],
] as const;
const partners = [
  "Bytown Career Co.",
  "Kola Mentorship",
  "Gatineau Commons",
  "NOËL KITCHEN",
  "Sparks St. Studio",
  "Rideau Collective",
  "MAPI",
  "North Star Youth",
];
const values = [
  [
    Users,
    "Community Engagement",
    "Building real connections and networking opportunities",
  ],
  [
    Sparkles,
    "Cultural Celebration",
    "Honoring and sharing our heritage through vibrant events",
  ],
  [GraduationCap, "Youth Growth", "Developing the next generation of leaders"],
  [
    Handshake,
    "Local Partnership",
    "Strengthening ties with organizations across Ottawa-Gatineau",
  ],
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.17 }}
      transition={{ duration: 0.62, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const links = [
    ["Our Story", "#who"],
    ["Programs", "#programs"],
    ["Gallery", "#year"],
    ["Events", "#events"],
  ];
  useEffect(() => {
    const updateNav = () => {
      const sentinel = document.getElementById("scroll-sentinel");
      const scrolled = sentinel
        ? sentinel.getBoundingClientRect().bottom <= 20
        : window.scrollY > 60;
      setIsScrolled(scrolled);
    };
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      window.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header className={`nav-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className={`nav-bar${isScrolled ? " is-scrolled" : ""}`}>
        <a href="#top" aria-label="YCA OTTAWA home">
          <Image
            src="/assets/yca-logo.png"
            alt="YCA OTTAWA"
            width={125}
            height={48}
            className="h-11 w-auto mix-blend-multiply"
            priority
          />
        </a>
        <nav className="ml-auto hidden items-center gap-7 text-sm font-semibold text-black md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="transition-colors hover:text-yellow-400! "
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center  gap-3">
          <a
            href="#join"
            className="button hidden bg-[#7c9b76] px-5 py-1.5  text-[13px] text-white md:inline-flex"
          >
            Join Us
          </a>
          <button
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="ml-auto grid size-10 place-items-center rounded-full border border-teal-900/15 text-teal-900 md:hidden"
          >
            {open ? <X size={19} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-teal-950/50 md:hidden"
            />
            <motion.nav
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-xs flex-col bg-white px-6 py-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/assets/yca-logo.png"
                  alt="YCA OTTAWA"
                  width={110}
                  height={44}
                  className="h-10 w-auto mix-blend-multiply"
                />
                <button
                  aria-label="Close navigation"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full border border-teal-900/15 text-teal-900"
                >
                  <X size={19} />
                </button>
              </div>
              <div className="mt-8 grid gap-1">
                {links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="border-b border-teal-900/8 py-3.5 text-base font-semibold text-teal-900"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="button mt-auto bg-[#7c9b76] text-white"
              >
                Join Us
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export function LandingPage() {
  return (
    <main>
      <section
        id="top"
        className="relative flex min-h-175 items-center overflow-hidden bg-teal-900 pt-16 text-white"
      >
        <Image
          src="/assets/hero-steps.png"
          alt="YCA OTTAWA members in traditional Cameroonian dress"
          fill
          priority
          className="object-cover object-[72%_42%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(28,73,60,.91),rgba(28,73,60,.82)_34%,rgba(28,73,60,.57)_52%,rgba(28,73,60,.1)_82%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent via-teal-900/60 to-teal-900" />
        <div
          id="scroll-sentinel"
          aria-hidden="true"
          className="pointer-events-none invisible absolute left-0 top-0 h-20 w-px"
        />
        <Nav />
        <div className="page-width relative py-24 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-162.5"
          >
            <span className="inline-block border border-red-500/60 px-3 py-2 text-[10px] font-extrabold tracking-[.22em] text-yellow-400">
              YCA OTTAWA
            </span>
            <h1 className="font-display mt-6 text-[clamp(3rem,6.1vw,5rem)] font-extrabold leading-[.98]">
              <span className="block text-yellow-400">Community.</span>
              <span>Culture. Growth.</span>
            </h1>
            <p className="mt-7 max-w-162.5 text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-white/93">
              Young Cameroonian Association Ottawa-Gatineau connects, empowers,
              and supports young Cameroonians in the region. Since launching in
              August 2025, we&apos;ve hosted 10+ events, reached over 100 young
              Cameroonians, and partnered with 10+ local organizations.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="button bg-yellow-400 text-[#14240b]" href="#join">
                Join Us
              </a>
              <a className="button bg-[#194d02] text-white" href="#join">
                Get Involved
              </a>
              <a
                className="button border border-white/70 text-white"
                href="#events"
              >
                Our Events
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {["Community", "Culture", "Growth"].map((tag, i) => (
                <>
                  <span
                    key={tag}
                    className={` px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/85"}`}
                  >
                    {tag}
                  </span>

                  {i < 2 && <span>-</span>}
                </>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <div className="h-0.75 bg-[repeating-linear-gradient(90deg,rgba(254,209,4,.5)_0_14px,rgba(252,14,14,.22)_14px_22px,transparent_22px_40px)]" />
      <Impact /> <About /> <Team /> <Programs /> <Gallery /> <Partners />{" "}
      <Join /> <Events /> <Footer />
    </main>
  );
}

function Impact() {
  const stats = [
    ["10+", "Events hosted"],
    ["100+", "Young Cameroonians reached"],
    ["10+", "Local partnerships"],
    ["2", "Events every month"],
  ];
  return (
    <section className="relative overflow-hidden bg-[#f3f1e7] py-20">
      <div className="absolute inset-0 opacity-[.15] bg-[radial-gradient(circle_at_14px_14px,rgba(28,73,60,.28)_2px,transparent_2.5px),repeating-linear-gradient(45deg,rgba(28,73,60,.1)_0_2px,transparent_2px_12px)] bg-size-[56px_56px,18px_18px]" />
      <Reveal className="page-width relative">
        <p className="eyebrow">2025–26 Community Impact</p>
        <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,3.4vw,2.8rem)] font-extrabold leading-[1.08]">
          A chapter that shows up,{" "}
          <span className="marker">month after month</span>.
        </h2>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#4a5164]">
          Since launching in August 2025, every gathering has brought new faces
          into the room — students, newcomers and young professionals across
          Ottawa and Gatineau.
        </p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([number, label], i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="rounded-[10px] border border-teal-900/20 bg-teal-900 p-6">
                <div
                  className={`font-display text-5xl font-extrabold ${i % 2 ? "text-[#f7f2e9]" : "text-yellow-400"}`}
                >
                  {number}
                </div>
                <div className="mt-3 text-[13px] font-semibold text-[#f7f2e9]/75">
                  {label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#6a7563]">
          Counts are chapter-tracked across our monthly meetups, culture nights
          and partner workshops in Ottawa and Gatineau.
        </p>
        <a href="#programs" className="button mt-7 bg-[#194d02] ">
          <span className=" text-white flex gap-2 font-medium">
            See what we run <ArrowRight className="ml-2" size={16} />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
function About() {
  return (
    <section id="who" className="bg-white py-20">
      <Reveal className="page-width">
        <p className="eyebrow">Our identity</p>
        <h2 className="font-display mt-4 text-[clamp(2rem,3.4vw,2.8rem)] font-bold">
          Who <span className="marker">We Are</span>
        </h2>
        <figure className="relative mt-11 overflow-hidden rounded-2xl border border-teal-900/20 shadow-[0_30px_64px_-42px_rgba(28,73,60,.75)]">
          <Image
            src="/assets/team-photo-wide.png"
            alt="YCA OTTAWA members together"
            width={1200}
            height={560}
            className="h-[clamp(260px,34vw,420px)] w-full object-cover object-[center_34%]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-teal-900/90 to-transparent px-7 pb-5 pt-12 text-base italic text-[#f7f2e9]">
            Our community, together.
          </figcaption>
        </figure>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-display text-6xl leading-none text-yellow-400">
              &ldquo;
            </span>
            <p className="-mt-4 max-w-[38ch] text-[clamp(1.1rem,1.5vw,1.35rem)] italic leading-relaxed text-teal-900">
              YCA OTTAWA is a bridge between our Cameroonian roots and our life
              here; a gathering place where community, culture, and growth come
              together.
            </p>
            <div className="mt-7 flex items-center gap-4 rounded-2xl bg-[#f3f1e7] p-6">
              <div className="shrink-0">
                <Image
                  src="/assets/yca-logo.png"
                  alt="YCA logo"
                  width={72}
                  height={72}
                  className="h-14 w-auto mix-blend-multiply"
                />
              </div>
              <div>
                <div className="mb-2 flex gap-1">
                  <span className="size-2.5 rounded-sm bg-teal-900" />
                  <span className="size-2.5 rounded-sm bg-red-600" />
                  <span className="size-2.5 rounded-sm bg-yellow-400" />
                </div>
                <p className="text-sm leading-relaxed text-[#4a5164]">
                  Our logo&apos;s running figure represents{" "}
                  <strong className="text-teal-900">youth in motion;</strong>{" "}
                  always learning, connecting, and moving forward together,
                  carrying the colors of home wherever we go.
                </p>
              </div>
            </div>
            <p className="mt-7 text-[15px] leading-relaxed text-[#4a5164]">
              Through community, culture, and growth, YCA OTTAWA strengthens the
              bonds that unite young Cameroonians across the region.
            </p>
          </div>
          <div className="rounded-2xl bg-[#12362b] -rotate-2 p-7 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-white">
              Core Values
            </h3>
            <div className="mt-6 grid gap-5">
              {values.map(([Icon, title, copy], i) => (
                <div
                  key={title}
                  className={`flex gap-4 pb-5 ${i < values.length - 1 ? "border-b border-white/10" : ""}`}
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-yellow-400/50 text-yellow-400">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-yellow-400/80">
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function Team() {
  return (
    <section id="team" className="bg-white pb-20">
      <Reveal className="page-width">
        <p className="eyebrow">Meet our team</p>
        <h2 className="font-display mt-4 text-[clamp(2rem,3.2vw,2.65rem)] font-extrabold">
          The people behind <span className="marker">the chapter</span>
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {team.map(([image, name, role, copy], i) => (
            <Reveal key={name} delay={i * 0.05}>
              <article>
                <div className="photo-card aspect-[.85]">
                  <Image
                    src={`/assets/${image}`}
                    alt={name}
                    width={500}
                    height={600}
                    className="size-full object-cover object-top"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[.15em] text-[#7c9b76]">
                  {role}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#5a6560]">
                  {copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
function Programs() {
  return (
    <section id="programs" className="bg-[#e9e1ce] py-20">
      <Reveal className="page-width">
        <p className="eyebrow">What we run</p>
        <h2 className="font-display mt-4 text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold">
          Three pillars, <span className="marker">six ways in</span>.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(([image, kind, title, meta, copy], i) => (
            <Reveal key={title} delay={i * 0.04}>
              <article className="photo-card h-full">
                <div className="relative aspect-[1.7]">
                  <Image
                    src={`/assets/${image}`}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded px-2 py-1 text-[9px] font-extrabold uppercase tracking-[.14em] ${kind === "Pillar" ? "bg-[#7c9b76] text-white" : "bg-[#e3c067] text-teal-900"}`}
                  >
                    {kind}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8b93a7]">
                    {meta}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-bold">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a6560]">
                    {copy}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
function Gallery() {
  return (
    <section id="year" className="bg-white py-20">
      <Reveal className="page-width">
        <p className="eyebrow">A year in pictures</p>
        <h2 className="font-display mt-4 max-w-xl text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold">
          A year of color,{" "}
          <span className="marker">culture and connection</span>.
        </h2>
        <div className="mt-10 grid auto-rows-36.25 grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-42.5">
          {gallery.map(([image, alt], i) => (
            <figure
              key={alt}
              className={`group relative overflow-hidden rounded-lg ${i === 0 ? "col-span-2 row-span-2" : i === 3 ? "row-span-2" : ""}`}
            >
              <Image
                src={`/assets/${image}`}
                alt={alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-teal-900/80 p-3 text-xs font-medium text-white transition duration-300 group-hover:translate-y-0">
                {alt}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="text-center">
          <a
            href={placeholder}
            target="_blank"
            className="button mt-8 border border-yellow-400 text-teal-900"
          >
            View More Photos <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
function Partners() {
  const logoSet = [...partners, ...partners];
  return (
    <section
      aria-labelledby="partners-heading"
      className="overflow-hidden border-b border-teal-900/8 bg-white py-16"
    >
      <Reveal className="page-width">
        <p className="eyebrow">Our partners</p>
        <h2
          id="partners-heading"
          className="font-display mt-3 text-[clamp(1.8rem,2.7vw,2.2rem)] font-extrabold"
        >
          Trusted by our{" "}
          <span className="marker">community &amp; partners</span>.
        </h2>
      </Reveal>
      <div className="partner-marquee mt-10" aria-label="Partner organizations">
        <div className="partner-track">
          {logoSet.map((partner, index) => (
            <span className="partner-logo" key={`${partner}-${index}`}>
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
function Join() {
  const involve = [
    {
      title: "Members",
      copy: "Free to join, ages 16-35, Cameroonian by birth, heritage or heart.",
      cta: "Join WhatsApp",
      href: placeholder,
      variant: "green",
    },
    {
      title: "Newcomers",
      copy: "Just landed in Ottawa or Gatineau? Tell us a bit and we'll pair you with someone.",
      cta: "Membership form",
      href: placeholder,
      variant: "gold",
    },
    {
      title: "Partners",
      copy: "Host a workshop, sponsor an event, or bring mentors to a hike.",
      cta: "Email the team",
      href: "mailto:ycaottawagatineau@gmail.com",
      variant: "outline",
    },
  ] as const;
  return (
    <section id="join" className="bg-white py-20">
      <Reveal className="page-width">
        <p className="eyebrow">Get involved</p>
        <h2 className="font-display mt-4 max-w-xl text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold">
          Join YCA <span className="marker">OTTAWA</span>.
        </h2>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5a6560]">
          Two ways in: drop into the WhatsApp community to see what&apos;s next,
          or fill the short form and we&apos;ll reach out before the next
          gathering.
        </p>
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {involve.map(({ title, copy, cta, href, variant }) => (
            <div key={title} className="rounded-2xl bg-[#f3f1e7] p-7">
              <h3 className="font-display text-xl font-bold text-teal-900">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5a6560]">
                {copy}
              </p>
              <a
                className={`button mt-6 ${
                  variant === "green"
                    ? "bg-[#194d02] text-white!"
                    : variant === "gold"
                      ? "bg-[#e3c067] text-teal-900"
                      : "border border-teal-900 text-teal-900"
                }`}
                href={href}
                target={href === placeholder ? "_blank" : undefined}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
function Events() {
  const events = [
    {
      date: "SEP 05",
      title: "Back-to-school welcome",
      meta: "Ottawa · new students & newcomers",
      tag: "Social Saturday",
    },
    {
      date: "SEP 20",
      title: "CV & interview clinic",
      meta: "Gatineau · with a local partner",
      tag: "Networking",
    },
    {
      date: "OCT 04",
      title: "Culture night, food & makossa",
      meta: "Ottawa · bring a dish",
      tag: "Social Saturday",
    },
  ] as const;
  const tagStyle = (tag: string) =>
    tag === "Social Saturday" || tag === "Hike"
      ? "bg-[#194d02] text-white"
      : "bg-yellow-400 text-[#14240b]";
  return (
    <section id="events" className="bg-white py-20">
      <Reveal className="page-width">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Up next</p>
            <h2 className="font-display mt-4 max-w-[18ch] text-[clamp(1.8rem,2.8vw,2.2rem)] font-extrabold">
              <span className="marker">Two gatherings</span> a month, all year
              long.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#5a6560]">
              Everything is announced in the WhatsApp community first. Newcomers
              are always welcome to their first event without signing up for
              anything.
            </p>
            <div className="mt-7 rounded-r-lg border-l-4 border-yellow-400 bg-[#f7f2e9] p-5">
              <h3 className="font-display text-lg font-bold text-teal-900">
                New events added monthly
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5a6560]">
                Socials, barbecues, hikes and networking nights — rotating
                between Ottawa and Gatineau.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Social Saturday", "Barbecue", "Hike", "Networking"].map(
                (tag, i) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[.14em] ${i % 2 ? "bg-yellow-400 text-[#14240b]" : "bg-[#194d02] text-white"}`}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
          <div>
            <div className="divide-y divide-teal-900/10 border-t border-teal-900/10">
              {events.map(({ date, title, meta, tag }) => (
                <div key={title} className="flex gap-6 py-5">
                  <p className="w-16 shrink-0 text-xs font-bold uppercase tracking-widest text-[#194d02]">
                    {date}
                  </p>
                  <div>
                    <h3 className="font-display text-lg font-bold text-teal-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-[#5a6560]">{meta}</p>
                    <span
                      className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.12em] ${tagStyle(tag)}`}
                    >
                      {tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <a
              className="button mt-7 border border-teal-900 text-teal-900"
              href={placeholder}
              target="_blank"
            >
              See all events <ArrowRight className="ml-2" size={16} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function Footer() {
  return (
    <footer className="bg-[#7c9b76] py-14 pb-8 text-white">
      <div className="page-width grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image
            src="/assets/yca-logo.png"
            alt="YCA OTTAWA"
            width={132}
            height={54}
            className="h-12 w-auto mix-blend-multiply"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
            Young Cameroonian Association | Community. Culture. Growth.
          </p>
        </div>
        <div>
          <p className="eyebrow text-yellow-400!">Explore</p>
          <div className="mt-4 grid gap-2.5 text-sm text-white/90">
            {[
              ["Our Story", "#who"],
              ["Programs", "#programs"],
              ["Gallery", "#year"],
              ["Events", "#events"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="transition-color hover:text-yellow-400! "
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-yellow-400!">Connect</p>
          <div className="mt-4 grid gap-2.5 text-sm text-white/90">
            <a
              className="font-bold text-yellow-400"
              href="mailto:ycaottawagatineau@gmail.com"
            >
              ycaottawagatineau@gmail.com
            </a>
            <a href={placeholder} target="_blank">
              @ycaottawagatineau
            </a>
            <p>Ottawa &amp; Gatineau, Canada</p>
          </div>
        </div>
      </div>
      <div className="page-width mt-10 flex flex-col gap-2 border-t border-white/20 pt-5 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 YCA OTTAWA. A volunteer-run chapter.</p>
        <p>Built by the community, for the community.</p>
      </div>
    </footer>
  );
}
