"use client";

import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Handshake,
  Users,
  X,
} from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";

const easeCalm = [0.22, 1, 0.36, 1] as const;

const placeholder =
  "https://docs.google.com/forms/d/e/1FAIpQLSdeMeppoq8YyCiu3CVQVybWrkp0Wh3gK2muOfuCMbZKZO84UQ/viewform?pli=1";
const instagram = "https://www.instagram.com/ycaottawagatineau/";
const photos = {
  hilary: "team-hilary.png",
  anne: "team-anne.png",
  ines: "team-ines-portrait.png",
  franck: "team-franck.png",
  erika: "team-erika.jpg",
  loic: "team-loic.jpg",
  ulrich: "team-ulrich.jpg",
  isabelle: "team-isabelle.jpg",
  leaticia: "team-leaticia.jpg",
  edbi: "team-edbi.jpg",
  joy: "team-joy.jpg",
  fabiola: "team-fabiola.jpg",
  euclide: "team-euclide.jpg",
  ivan: "team-ivan.jpg",
} as const;
const administration = [
  [photos.hilary, "Hilary Dondji", "Founder", "Finance"],
  [photos.anne, "Anne Tembou", "President"],
  [photos.ines, "Ines Ngale", "Vice-President"],
] as const;
const departments = [
  [
    "Marketing",
    "Our outreach, storytelling and social media.",
    [
      [photos.franck, "Franck Pokam", "Marketing Lead"],
      [photos.ines, "Ines Ngale", "Graphic Designer"],
      [photos.erika, "Erika Yimga", "Graphic Designer"],
      [photos.loic, "Loïc Atanga", "Content Creator"],
      [photos.ulrich, "Ulrich Njengoue", "Content Creator"],
    ],
  ],
  [
    "Events",
    "Planning and organising our community events.",
    [
      [photos.isabelle, "Isabelle Fokom", "Events Lead"],
      [photos.leaticia, "Leaticia Nde Mba", "Event Coordinator"],
      [photos.edbi, "Edbi Nocha", "Event Design"],
      [photos.loic, "Loïc Atanga", "Guest Experience"],
      [photos.joy, "Joy Scotia", "Volunteer Coordinator"],
    ],
  ],
  [
    "Sports & Leisure",
    "Healthy lifestyles, teamwork and community pride.",
    [
      [photos.ivan, "Ivan Dzoibo", "Sports & Leisure Lead"],
      [photos.fabiola, "Fabiola Maboga", "Hiking Coordinator"],
      [photos.euclide, "Euclide Wamba", "Sports Coordinator"],
    ],
  ],
  [
    "Operations",
    "Day-to-day operations, finance and partnerships.",
    [
      [photos.hilary, "Hilary Dondji", "Finance"],
      [photos.anne, "Anne Tembou", "Internal Affairs"],
      [photos.ines, "Ines Ngale", "Community Engagement"],
      [photos.erika, "Erika Yimga", "External Affairs"],
    ],
  ],
] as const;
const openRoles = [
  "Marketing",
  "Mentorship",
  "Fundraising & Sponsorship",
  "Events",
  "Administration",
];
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
    "hike-pink-lake.png",
    "Event",
    "Outdoor days",
    "Seasonal · Gatineau Park",
    "Fresh air, good company, and a shared sense of adventure.",
  ],
] as const;
const gallery = [
  ["hike-pink-lake.png", "Outdoor Days - Spring 2026"],
  ["audience-wide.png", "Community Launch - Aug 2025"],
  ["two-women-portrait.png", "Culture Night - Nov 2025"],
  ["team-group.png", "Cultural Festival - Sept 2025"],
  ["speaker-mic.png", "Youth Panel - Oct 2025"],
  ["team-group-2.png", "Chapter Team - Winter 2026"],
  ["two-men-smiling.png", "Networking Mixer - Feb 2026"],
  ["conversation.png", "Social Saturday - Jan 2026"],
] as const;
const partners = [
  ["la-belle-etoile.png", "La Belle Étoile"],
  ["yca-toronto.png", "YCA Toronto"],
  ["cultured-cream.png", "The Cultured Cream Company"],
  ["yum-dairy.png", "Yum Dairy"],
  ["ajc.png", "AJC"],
  ["frontlines.png", "Frontlines"],
  ["club-culture.png", "Club Culture Cité Cameroun"],
  ["cam-student-association.png", "CAM Student Association"],
  ["adn.png", "ADN — Africa Development Network"],
  ["cam-sco.png", "CAM SCO"],
  ["jeunesse-bamileke-ontario.png", "Jeunesse Bamiléké Ontario"],
  ["cyac-calgary.png", "Cameroon Youth Association of Calgary"],
  ["cepap.png", "CEPAP"],
  ["face2face-impact.png", "Face2Face Impact"],
  ["oresi-cleaning.png", "ORESI Cleaning"],
  ["zambou-tax-service.png", "Zambou Tax Service"],
  ["profipreneur.png", "Profipreneur Board"],
  ["ottawa-gatineau-sports.png", "Ottawa Gatineau Sports"],
  ["franck-bikele.png", "Franck BIKELE"],
  ["gofyra.png", "Gofyra"],
] as const;
const values = [
  [Compass, "Know", "Connect to who we are."],
  [Handshake, "Respect", "Treat others with dignity."],
  [Users, "Community", "Build together, empower together."],
] as const;
const goals = [
  [
    "Empower youth",
    "Autonomiser la jeunesse",
    "Provide resources and opportunities for personal growth, leadership, and skill development.",
  ],
  [
    "Promote unity",
    "Promouvoir l’unité",
    "Foster cultural pride and strengthen bonds within the Cameroonian community.",
  ],
  [
    "Build competences",
    "Renforcer les compétences",
    "Encourage education, mentorship, and entrepreneurship for sustainable community growth.",
  ],
  [
    "Make a meaningful impact",
    "Avoir un impact significatif",
    "Drive initiatives that create lasting change and improve lives both locally and globally.",
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

function RevealImage({
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
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      whileInView={reduce ? {} : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: easeCalm }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({
  value,
  className = "",
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

function Nav() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const layoutTransition = {
    duration: reduceMotion ? 0 : 0.45,
    ease: easeCalm,
  };
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
    <>
      <motion.header
        layout={!reduceMotion}
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          layout: layoutTransition,
          default: { duration: 0.6, ease: easeCalm },
        }}
        className={`nav-header${isScrolled ? " is-scrolled" : ""}`}
      >
        <motion.div
          layout={!reduceMotion}
          transition={{ layout: layoutTransition }}
          className={`nav-bar${isScrolled ? " is-scrolled" : ""}`}
        >
          <motion.a
            layout={!reduceMotion}
            transition={{ layout: layoutTransition }}
            href="#top"
            aria-label="YCA OTTAWA home"
          >
            <Image
              src="/assets/yca-logo.png"
              alt="YCA OTTAWA"
              width={125}
              height={48}
              className="h-11 w-auto mix-blend-multiply"
              priority
            />
          </motion.a>
          <motion.nav
            layout={!reduceMotion}
            transition={{ layout: layoutTransition }}
            className="ml-auto hidden items-center gap-7 text-sm font-semibold text-black md:flex"
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="transition-colors hover:text-yellow-400! "
              >
                {label}
              </a>
            ))}
          </motion.nav>
          <motion.div
            layout={!reduceMotion}
            transition={{ layout: layoutTransition }}
            className="flex items-center  gap-3"
          >
            <a
              href="#join"
              className="button hidden bg-[#7c9b76] px-5 py-2!  text-xs text-white md:inline-flex"
            >
              Join Us
            </a>
            <button
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-teal-900/15 text-teal-900 md:hidden"
            >
              <span className="grid h-3 w-4.5 shrink-0 content-between">
                <motion.span
                  className="hamburger-bar"
                  animate={
                    reduceMotion
                      ? undefined
                      : open
                        ? { rotate: 45, y: 5 }
                        : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: easeCalm }}
                />
                <motion.span
                  className="hamburger-bar"
                  animate={reduceMotion ? undefined : { opacity: open ? 0 : 1 }}
                  transition={{ duration: 0.2, ease: easeCalm }}
                />
                <motion.span
                  className="hamburger-bar"
                  animate={
                    reduceMotion
                      ? undefined
                      : open
                        ? { rotate: -45, y: -5 }
                        : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: easeCalm }}
                />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easeCalm }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] isolate bg-teal-950/55 md:hidden"
            />
            <motion.nav
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              style={{ backgroundColor: "#ffffff" }}
              className="fixed inset-y-0 right-0 z-[70] isolate flex w-[82%] max-w-xs flex-col px-6 py-6 shadow-2xl md:hidden"
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
    </>
  );
}

export function LandingPage() {
  const reduce = useReducedMotion();
  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeCalm },
    },
  };
  return (
    <main>
      <section
        id="top"
        className="relative flex min-h-175 items-center overflow-hidden bg-teal-900 pt-16 text-white"
      >
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
          transition={
            reduce
              ? undefined
              : { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src="/assets/hero-steps.png"
            alt="YCA OTTAWA members in traditional Cameroonian dress"
            fill
            priority
            className="object-cover object-[72%_42%]"
            sizes="100vw"
          />
        </motion.div>
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
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={reduce ? undefined : heroContainer}
            className="max-w-162.5"
          >
            <motion.span
              variants={reduce ? undefined : heroItem}
              className="inline-block border border-red-500/60 px-3 py-2 text-[10px] font-extrabold tracking-[.22em] text-yellow-400"
            >
              YCA OTTAWA
            </motion.span>
            <motion.div
              variants={reduce ? undefined : heroItem}
              className="relative mt-6"
            >
              <h1 className="font-display text-[clamp(3rem,6.1vw,5rem)] font-extrabold leading-[.98]">
                <span className="block text-yellow-400">Community.</span>
                <span>Culture. Growth.</span>
              </h1>
              <h1
                aria-hidden="true"
                className="hero-shine pointer-events-none absolute inset-0 select-none font-display text-[clamp(3rem,6.1vw,5rem)] font-extrabold leading-[.98]"
              >
                <span className="block">Community.</span>
                <span>Culture. Growth.</span>
              </h1>
            </motion.div>
            <motion.p
              variants={reduce ? undefined : heroItem}
              className="mt-7 max-w-162.5 text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-white/93"
            >
              YCA was founded in May 2023 with a simple yet powerful visionYCA
              is a non-profit association of young Cameroonians living in
              Ottawa-Gatineau. We create a strong community where culture,
              friendship, and mutual support thrive. Through events, projects,
              and volunteer initiatives, we preserve our heritage while building
              bridges with the wider community.
            </motion.p>
            <motion.div
              variants={reduce ? undefined : heroItem}
              className="mt-9 flex flex-wrap gap-3"
            >
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
            </motion.div>
            <motion.div
              variants={reduce ? undefined : heroItem}
              className="mt-8 flex flex-wrap gap-1.5"
            >
              {["Community", "Culture", "Growth"].map((tag, i) => (
                <Fragment key={tag}>
                  <span className=" px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/85">
                    {tag}
                  </span>

                  {i < 2 && <span>-</span>}
                </Fragment>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      <div className="h-0.75 bg-[repeating-linear-gradient(90deg,rgba(254,209,4,.5)_0_14px,rgba(252,14,14,.22)_14px_22px,transparent_22px_40px)]" />
      <Impact /> <About /> <Team /> <Programs /> <Gallery /> <Join /> <Events />{" "}
      <Partners /> <Footer />
    </main>
  );
}

function Impact() {
  const stats = [
    ["3", "Cities: Toronto, Ottawa-Gatineau & Montréal"],
    ["14", "Team members in Ottawa-Gatineau"],
    ["8", "Events planned, Sept 2026 and beyond"],
    ["6", "Areas of impact, from culture to education"],
  ];
  return (
    <section className="relative overflow-hidden bg-[#f3f1e7] py-20">
      <div className="absolute inset-0 opacity-[.15] bg-[radial-gradient(circle_at_14px_14px,rgba(28,73,60,.28)_2px,transparent_2.5px),repeating-linear-gradient(45deg,rgba(28,73,60,.1)_0_2px,transparent_2px_12px)] bg-size-[56px_56px,18px_18px]" />
      <Reveal className="page-width relative">
        <p className="eyebrow">Our roots</p>
        <h2 className="font-display mt-4 max-w-[18ch] text-[clamp(2rem,3.4vw,2.8rem)] font-extrabold leading-[1.08]">
          Rooted in culture. <span className="marker">Driven by community</span>
          .
        </h2>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#4a5164]">
          Our roots bring us together. Our community moves us forward. YCA is a
          space where young Cameroonians connect, celebrate our heritage,
          support one another, and build a stronger future together.
        </p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([number, label], i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div className="rounded-[10px] border border-teal-900/20 bg-teal-900 p-6">
                <CountUp
                  value={number}
                  className={`font-display block text-5xl font-extrabold ${i % 2 ? "text-[#f7f2e9]" : "text-yellow-400"}`}
                />
                <div className="mt-3 text-[13px] font-semibold text-[#f7f2e9]/75">
                  {label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#6a7563]">
          Toronto was founded in May 2023, Ottawa-Gatineau in May 2025 and
          Montréal in August 2026.
        </p>
        <a href="#programs" className="button group mt-7 bg-[#194d02] ">
          <span className=" text-white flex gap-2 font-medium">
            See what we run{" "}
            <ArrowRight
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              size={16}
            />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
function About() {
  const reduce = useReducedMotion();
  return (
    <section id="who" className="bg-white py-20">
      <div className="page-width">
        <Reveal>
          <p className="eyebrow">Our identity</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,3.4vw,2.8rem)] font-bold">
            Who <span className="marker">We Are</span>
          </h2>
        </Reveal>
        <RevealImage delay={0.1} className="mt-11">
          <figure className="relative overflow-hidden rounded-2xl border border-teal-900/20 shadow-[0_30px_64px_-42px_rgba(28,73,60,.75)]">
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
        </RevealImage>
        <Reveal delay={0.16}>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="font-display text-6xl leading-none text-yellow-400">
                &ldquo;
              </span>
              <p className="-mt-4 max-w-[38ch] text-[clamp(1.1rem,1.5vw,1.35rem)] italic leading-relaxed text-teal-900">
                YCA OTTAWA is a bridge between our Cameroonian roots and our
                life here; a gathering place where community, culture, and
                growth come together.
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
                YCA is a non-profit association of young Cameroonians living in
                Ottawa-Gatineau. Through events, projects, and volunteer
                initiatives, we preserve our heritage while building bridges
                with the wider community.
              </p>
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0, rotate: 0 }}
              whileInView={reduce ? {} : { opacity: 1, rotate: -2 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeCalm }}
              className="rounded-2xl bg-[#12362b] p-7 sm:p-8"
            >
              <p className="eyebrow text-yellow-400!">Our mission</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/90">
                YCA unites young Cameroonians aged 18-35 to build community,
                celebrate culture, and empower one another in Ottawa-Gatineau.
              </p>
              <h3 className="font-display mt-7 border-t border-white/10 pt-6 text-2xl font-bold text-white">
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
            </motion.div>
          </div>
        </Reveal>
        <div className="mt-24">
          <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Our goals</p>
              <h3 className="font-display mt-4 text-[clamp(1.8rem,2.8vw,2.3rem)] font-extrabold leading-[1.1]">
                Together, we <span className="marker">grow stronger</span>.
              </h3>
            </div>
            <p className="font-display text-lg italic text-[#7c9b76]">
              Ensemble, on avance&nbsp;!
            </p>
          </Reveal>
          <div className="relative mt-10 sm:mt-12">
            <motion.div
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={reduce ? {} : { scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, ease: easeCalm }}
              className="absolute inset-x-0 top-[2.1rem] hidden h-px origin-left bg-linear-to-r from-yellow-400 via-[#7c9b76] to-teal-900/30 lg:block"
            />
            <ol className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
              {goals.map(([title, french, copy], i) => (
                <motion.li
                  key={title}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.08,
                    ease: easeCalm,
                  }}
                  className="group relative"
                >
                  <div className="relative z-10 inline-flex items-center gap-3 bg-white pr-3">
                    <span className="goal-number font-display text-[2.8rem] font-extrabold leading-none sm:text-[3.6rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative z-10 size-3 rotate-45 border-2 border-yellow-400 bg-white transition-colors duration-300 group-hover:bg-yellow-400" />
                  </div>
                  <h4 className="font-display mt-4 text-xl font-bold text-teal-900 sm:mt-6">
                    {title}
                  </h4>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[.14em] text-[#7c9b76]">
                    {french}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5a6560]">
                    {copy}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
function TeamCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const last = departments.length - 1;

  const step = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    return (
      card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0")
    );
  };

  const sync = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const end = track.scrollLeft >= max - 4;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(end);
    setActive(
      end ? last : Math.min(last, Math.round(track.scrollLeft / (step() || 1))),
    );
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const goTo = (index: number) =>
    trackRef.current?.scrollTo({
      left: index * step(),
      behavior: reduce ? "auto" : "smooth",
    });

  return (
    <Reveal className="mt-8">
      <div
        ref={trackRef}
        onScroll={sync}
        role="region"
        aria-roledescription="carousel"
        aria-label="YCA working teams"
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 pt-2 outline-none sm:scroll-px-[max(1.75rem,calc((100%-1180px)/2))] sm:px-[max(1.75rem,calc((100%-1180px)/2))]"
      >
        {departments.map(([department, tagline, members], i) => (
          <article
            key={department}
            aria-label={`${department}, ${members.length} members`}
            className={`team-card flex w-[86%] shrink-0 snap-start flex-col rounded-3xl border bg-[#f7f2e9] p-6 sm:w-[72%] sm:p-8 lg:w-[min(620px,54%)] ${i === active ? "border-yellow-400/70 shadow-[0_22px_44px_-30px_rgba(28,73,60,.55)]" : "border-teal-900/10"}`}
          >
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#7c9b76]">
                  Team {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-2 text-[clamp(1.6rem,2.4vw,2rem)] font-extrabold leading-none text-teal-900">
                  {department}
                </h3>
                <p className="mt-3 text-sm italic text-[#5a6560]">{tagline}</p>
              </div>
            </header>
            <ul className="mt-7 grid gap-x-6 gap-y-4 border-t border-teal-900/10 pt-6 sm:grid-cols-2">
              {members.map(([image, name, role]) => {
                const lead = role.includes("Lead");
                return (
                  <li
                    key={`${department}-${name}`}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src={`/assets/${image}`}
                      alt=""
                      width={96}
                      height={96}
                      className={`size-12 shrink-0 rounded-full object-cover object-top ${lead ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-[#f7f2e9]" : "border border-teal-900/15"}`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-teal-900">
                        {name}
                      </p>
                      <p className="text-xs text-[#5a6560]">{role}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
      <div className="page-width mt-2 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous team"
          onClick={() => goTo(Math.max(0, active - 1))}
          disabled={atStart}
          className="grid size-11 place-items-center rounded-full border border-teal-900/20 text-teal-900 transition-colors hover:border-teal-900 hover:bg-teal-900 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {departments.map(([department], i) => (
            <button
              key={department}
              type="button"
              aria-label={`Show ${department} team`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-teal-900" : "w-2 bg-teal-900/25 hover:bg-teal-900/50"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next team"
          onClick={() => goTo(Math.min(last, active + 1))}
          disabled={atEnd}
          className="grid size-11 place-items-center rounded-full border border-teal-900/20 text-teal-900 transition-colors hover:border-teal-900 hover:bg-teal-900 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </Reveal>
  );
}

function Team() {
  return (
    <section id="team" className="bg-white pb-20">
      <div className="page-width">
        <Reveal>
          <p className="eyebrow">Meet our team</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,3.2vw,2.65rem)] font-extrabold">
            The people behind <span className="marker">the chapter</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5a6560]">
            Our administration and four working teams; Marketing, Events, Sports
            &amp; Leisure and Operations. Team as of September 2026.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {administration.map(([image, name, role, also], i) => (
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
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16">
          <p className="eyebrow">The people behind YCA</p>
          <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-[#5a6560]">
            Meet the people bringing our community, culture and initiatives to
            life.
          </p>
        </Reveal>
      </div>
      <TeamCarousel />
      <div className="page-width">
        <Reveal>
          <div className="mt-8 flex flex-col gap-5 rounded-r-lg border-l-4 border-yellow-400 bg-[#f7f2e9] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="font-display text-lg font-bold text-teal-900">
                Want to join the team?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5a6560]">
                We&apos;re looking for people to help with{" "}
                {openRoles.join(", ")}.
              </p>
            </div>
            <a
              href="#join"
              className="button group shrink-0 bg-[#194d02] text-white!"
            >
              Get involved{" "}
              <ArrowRight
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                size={16}
              />
            </a>
          </div>
        </Reveal>
      </div>
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
      <div className="page-width">
        <Reveal>
          <p className="eyebrow">A year in pictures</p>
          <h2 className="font-display mt-4 max-w-xl text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold">
            A year of color,{" "}
            <span className="marker">culture and connection</span>.
          </h2>
        </Reveal>
        <div className="mt-10 grid auto-rows-36.25 grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-42.5">
          {gallery.map(([image, alt], i) => (
            <RevealImage
              key={alt}
              delay={i * 0.05}
              className={`group relative overflow-hidden rounded-lg ${i === 0 ? "col-span-2 row-span-2" : i === 3 ? "row-span-2" : ""}`}
            >
              <figure className="size-full">
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
            </RevealImage>
          ))}
        </div>
        <div className="text-center">
          <a
            href={placeholder}
            target="_blank"
            className="button group mt-8 border border-yellow-400 text-teal-900"
          >
            View More Photos{" "}
            <ArrowRight
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              size={16}
            />
          </a>
        </div>
      </div>
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
          {logoSet.map(([file, name], index) => (
            <span className="partner-logo" key={`${name}-${index}`}>
              <Image
                src={`/assets/partners/${file}`}
                alt={name}
                width={160}
                height={110}
                className="h-full w-auto object-contain"
              />
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
      copy: "For young Cameroonians aged 18-35 and friends of Cameroon in Ottawa-Gatineau. Membership fees will launch once we're officially registered.",
      cta: "Join WhatsApp",
      href: placeholder,
      variant: "green",
    },
    {
      title: "Newcomers",
      copy: "Just landed in Ottawa or Gatineau? Say hello. A mentorship program to welcome and guide newcomers is on our roadmap.",
      cta: "Message us on Instagram",
      href: instagram,
      variant: "gold",
    },
    {
      title: "Partners & sponsors",
      copy: "Our partners and sponsors help us create opportunities and bring our initiatives to life. Let's build something together.",
      cta: "Email the team",
      href: "mailto:ycaottawagatineau@gmail.com",
      variant: "outline",
    },
  ] as const;
  return (
    <section id="join" className="bg-white py-20">
      <div className="page-width">
        <Reveal>
          <p className="eyebrow">Get involved</p>
          <h2 className="font-display mt-4 max-w-xl text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold">
            Join YCA <span className="marker">OTTAWA</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5a6560]">
            Join the WhatsApp community, follow us on social media, or write to
            us. We&apos;d love to have you on board.
          </p>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {involve.map(({ title, copy, cta, href, variant }, i) => (
            <Reveal key={title} delay={i * 0.07}>
              <div className="rounded-2xl bg-[#f3f1e7] p-7 transition-transform duration-300 ease-out hover:-translate-y-1">
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
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  {cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function Events() {
  const events = [
    {
      month: "SEP",
      year: "2026",
      title: "Sport Saturday",
      meta: "Samedi Sportif",
      tag: "Sports & Recreation",
    },
    {
      month: "OCT 02",
      year: "2026",
      title: "Concert: Ya Levis",
      meta: "Ottawa",
      tag: "Community & Culture",
    },
    {
      month: "OCT",
      year: "2026",
      title: "Fall Activity",
      meta: "Activité d’Automne",
      tag: "Sports & Recreation",
    },
    {
      month: "OCT",
      year: "2026",
      title: "Pink October",
      meta: "Octobre Rose",
      tag: "Support & Wellness",
    },
    {
      month: "NOV",
      year: "2026",
      title: "Men’s Movember",
      meta: "Movember pour les hommes",
      tag: "Support & Wellness",
    },
    {
      month: "NOV",
      year: "2026",
      title: "Dimanche Taro",
      meta: "",
      tag: "Community & Culture",
    },
    {
      month: "NOV",
      year: "2026",
      title: "Winter Activity",
      meta: "Activité d’Hiver",
      tag: "Sports & Recreation",
    },
    {
      month: "DEC",
      year: "2026",
      title: "Christmas Potluck",
      meta: "Potluck de Noël",
      tag: "Community & Culture",
    },
    {
      month: "FEB",
      year: "2027",
      title: "Youth Gala",
      meta: "Gala des Jeunes",
      tag: "Community & Culture",
    },
    {
      month: "AUG",
      year: "2027",
      title: "This Is Cameroon Gala",
      meta: "Our hope: to host the national gala in Ottawa",
      tag: "Community & Culture",
    },
  ] as const;
  const categories = [
    "Community & Culture",
    "Sports & Recreation",
    "Support & Wellness",
  ];
  const tagStyle = (tag: string) =>
    tag === "Community & Culture"
      ? "bg-[#194d02] text-white"
      : tag === "Sports & Recreation"
        ? "bg-yellow-400 text-[#14240b]"
        : "bg-[#7c9b76] text-white";
  return (
    <section id="events" className="bg-white py-20">
      <div className="page-width grid gap-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">Up next</p>
            <h2 className="font-display mt-4 max-w-[20ch] text-[clamp(1.8rem,2.8vw,2.2rem)] font-extrabold">
              The season ahead,{" "}
              <span className="marker">Sept&nbsp;2026 &amp; beyond</span>.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#5a6560]">
              Join us for a vibrant series of events designed to connect,
              inspire, and empower our community.
            </p>
            <div className="mt-7 rounded-r-lg border-l-4 border-yellow-400 bg-[#f7f2e9] p-5">
              <h3 className="font-display text-lg font-bold text-teal-900">
                Stay in the loop
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5a6560]">
                Dates and details are shared as they&apos;re confirmed — follow
                @ycaottawagatineau on Instagram or join the WhatsApp community.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {categories.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[.14em] ${tagStyle(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="divide-y divide-teal-900/10 border-t border-teal-900/10">
            {events.map(({ month, year, title, meta, tag }, i) => (
              <Reveal key={title} delay={Math.min(0.1 + i * 0.05, 0.3)}>
                <div className="flex gap-6 py-5">
                  <p className="w-20 shrink-0 text-xs font-bold uppercase leading-relaxed tracking-widest text-[#194d02]">
                    {month}
                    <span className="block font-medium text-[#7c9b76]">
                      {year}
                    </span>
                  </p>
                  <div>
                    <h3 className="font-display text-lg font-bold text-teal-900">
                      {title}
                    </h3>
                    {meta && (
                      <p className="mt-1 text-sm text-[#5a6560]">{meta}</p>
                    )}
                    <span
                      className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.12em] ${tagStyle(tag)}`}
                    >
                      {tag}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <a
            className="button group mt-7 border border-teal-900 text-teal-900"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow for updates{" "}
            <ArrowRight
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              size={16}
            />
          </a>
        </Reveal>
      </div>
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
            Young Cameroonians Association. Uniting, celebrating &amp;
            empowering the Cameroonian community.
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
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              Instagram: @ycaottawagatineau
            </a>
            <a
              href="https://www.tiktok.com/@yca.ottawagatineau"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok: @yca.ottawagatineau
            </a>
            <p>Facebook: YCA Ottawa-Gatineau</p>
            <p>Ottawa &amp; Gatineau, Canada</p>
          </div>
        </div>
      </div>
      <div className="page-width mt-10 flex flex-col gap-2 border-t border-white/20 pt-5 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Young Cameroonians Association, Ottawa-Gatineau.</p>
        <p>Built by the community, for the community.</p>
      </div>
    </footer>
  );
}
