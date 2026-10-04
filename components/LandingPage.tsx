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
  ChevronDown,
  Compass,
  Globe,
  Handshake,
  Users,
  X,
} from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { LangProvider, useLang, type Lang } from "./i18n";

const easeCalm = [0.22, 1, 0.36, 1] as const;

const placeholder =
  "https://docs.google.com/forms/d/e/1FAIpQLSdeMeppoq8YyCiu3CVQVybWrkp0Wh3gK2muOfuCMbZKZO84UQ/viewform?pli=1";
const instagram = "https://www.instagram.com/ycaottawagatineau/";
const navHrefs = ["#who", "#programs", "#year", "#events"];
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
const departments = [
  [
    "operations",
    [
      [photos.hilary, "Hilary Dondji", false],
      [photos.anne, "Anne Tembou", false],
      [photos.ines, "Ines Ngale", false],
      [photos.erika, "Erika Yimga", false],
    ],
  ],
  [
    "marketing",
    [
      [photos.franck, "Franck Pokam", true],
      [photos.ines, "Ines Ngale", false],
      [photos.erika, "Erika Yimga", false],
      [photos.loic, "Loïc Atanga", false],
      [photos.ulrich, "Ulrich Njengoue", false],
    ],
  ],
  [
    "events",
    [
      [photos.isabelle, "Isabelle Fokom", true],
      [photos.leaticia, "Leaticia Nde Mba", false],
      [photos.edbi, "Edbi Nocha", false],
      [photos.loic, "Loïc Atanga", false],
      [photos.joy, "Joy Scotia", false],
    ],
  ],
  [
    "sports",
    [
      [photos.ivan, "Ivan Dzoibo", true],
      [photos.fabiola, "Fabiola Maboga", false],
      [photos.euclide, "Euclide Wamba", false],
    ],
  ],
] as const;
const programs = [
  ["audience-wide.png", "pillar"],
  ["two-women-talking.png", "pillar"],
  ["two-men-smiling.png", "pillar"],
  ["conversation.png", "event"],
  ["two-women-portrait.png", "event"],
  ["hike-pink-lake.png", "event"],
] as const;
const gallery = [
  "hike-pink-lake.png",
  "audience-wide.png",
  "two-women-portrait.png",
  "who_are_we/team-group.png",
  "speaker-mic.png",
  "team-group-2.png",
  "two-men-smiling.png",
  "conversation.png",
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
const valueIcons = [Compass, Handshake, Users];
// Order matches t.about.collageAlts. The last two intentionally overflow the grid.
const collage = [
  ["community-jerseys.jpg", "left-[31%] top-[5%] z-20 h-[90%] w-[37%]", -1.5],
  ["dance-outdoors.jpg", "left-[1%] top-[3%] z-10 h-[34%] w-[28%]", -4],
  ["park-gathering.jpg", "left-0 top-[46%] z-10 h-[40%] w-[29%]", 3],
  ["hike-boardwalk.jpg", "left-[71%] top-[50%] z-30 h-[58%] w-[25%]", -3],
  ["panel-audience.png", "left-[70%] top-0 z-10 h-[42%] w-[35%]", 3],
] as const;

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={`pointer-events-none absolute size-[clamp(1.6rem,4vw,2.6rem)] ${className}`}
    >
      <g stroke="#fed104" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M5 24 15 25" />
        <path d="M9 9 17 17" />
        <path d="M23 3 24 13" />
      </g>
    </svg>
  );
}
const stats = ["3", "14", "8", "6"];
const joinLinks = [
  [placeholder, "green"],
  [instagram, "gold"],
  ["mailto:ycaottawagatineau@gmail.com", "outline"],
] as const;
const eventMeta = [
  ["2026", "sports"],
  ["2026", "culture"],
  ["2026", "sports"],
  ["2026", "wellness"],
  ["2026", "wellness"],
  ["2026", "culture"],
  ["2026", "sports"],
  ["2026", "culture"],
  ["2027", "culture"],
  ["2027", "culture"],
] as const;
type EventCategory = (typeof eventMeta)[number][1];

function Title({ parts }: { parts: string[] }) {
  const [before, marker, after] = parts;
  return (
    <>
      {before}
      <span className="marker">{marker}</span>
      {after}
    </>
  );
}

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

const languages = [
  ["en", "English"],
  ["fr", "Français"],
] as const;

function LanguageSwitcher({ up = false }: { up?: boolean }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.nav.language}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-teal-900 transition-colors hover:bg-teal-900/5"
      >
        <Globe size={17} strokeWidth={1.8} />
        <span className="font-bold">{lang.toUpperCase()}</span>
        <ChevronDown
          size={15}
          strokeWidth={2.2}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        role="menu"
        inert={!open}
        initial={false}
        animate={
          open
            ? { opacity: 1, y: 0, scale: 1, visibility: "visible" }
            : {
                opacity: 0,
                y: up ? 6 : -6,
                scale: 0.97,
                transitionEnd: { visibility: "hidden" },
              }
        }
        transition={{ duration: reduce ? 0 : 0.18, ease: easeCalm }}
        style={{ visibility: "hidden" }}
        className={`absolute z-80 w-48 rounded-2xl border border-teal-900/10 bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(15,54,43,.35)] ${up ? "bottom-full left-0 mb-2 origin-bottom-left" : "right-0 top-full mt-2 origin-top-right"}`}
      >
        {languages.map(([code, label]) => (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={lang === code}
                lang={code}
                onClick={() => choose(code)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[15px] transition-colors ${lang === code ? "bg-[#f3f1e7] font-bold text-[#194d02]" : "text-teal-900 hover:bg-teal-900/5"}`}
              >
                {label}
                <span
                  className={`text-[11px] font-bold tracking-[.12em] ${lang === code ? "text-[#7c9b76]" : "text-teal-900/40"}`}
                >
                  {code.toUpperCase()}
                </span>
              </button>
            ))}
      </motion.div>
    </div>
  );
}

function Nav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const layoutTransition = {
    duration: reduceMotion ? 0 : 0.45,
    ease: easeCalm,
  };
  const links = t.nav.links.map((label, i) => [label, navHrefs[i]] as const);
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
            aria-label={t.nav.home}
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
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <a
              href="#join"
              className="button hidden bg-[#7c9b76] px-5 py-2!  text-xs text-white md:inline-flex"
            >
              {t.nav.join}
            </a>
            <button
              aria-label={open ? t.nav.close : t.nav.open}
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
                  aria-label={t.nav.close}
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
                {t.nav.join}
              </a>
              <div className="-ml-2.5 mt-4 border-t border-teal-900/8 pt-4">
                <LanguageSwitcher up />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function LandingPage() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}

function Page() {
  const { t } = useLang();
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
            alt={t.hero.imageAlt}
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
                <span className="block text-yellow-400">{t.hero.line1}</span>
                <span>{t.hero.line2}</span>
              </h1>
              <h1
                aria-hidden="true"
                className="hero-shine pointer-events-none absolute inset-0 select-none font-display text-[clamp(3rem,6.1vw,5rem)] font-extrabold leading-[.98]"
              >
                <span className="block">{t.hero.line1}</span>
                <span>{t.hero.line2}</span>
              </h1>
            </motion.div>
            <motion.p
              variants={reduce ? undefined : heroItem}
              className="mt-7 max-w-162.5 text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-white/93"
            >
              {t.hero.body}
            </motion.p>
            <motion.div
              variants={reduce ? undefined : heroItem}
              className="mt-9 flex flex-wrap gap-3"
            >
              <a className="button bg-yellow-400 text-[#14240b]" href="#join">
                {t.hero.ctaJoin}
              </a>
              <a className="button bg-[#194d02] text-white" href="#join">
                {t.hero.ctaInvolved}
              </a>
              <a
                className="button border border-white/70 text-white"
                href="#events"
              >
                {t.hero.ctaEvents}
              </a>
            </motion.div>
            <motion.div
              variants={reduce ? undefined : heroItem}
              className="mt-8 flex flex-wrap gap-1.5"
            >
              {t.hero.tags.map((tag, i) => (
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
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-[#f3f1e7] py-20">
      <div className="absolute inset-0 opacity-[.15] bg-[radial-gradient(circle_at_14px_14px,rgba(28,73,60,.28)_2px,transparent_2.5px),repeating-linear-gradient(45deg,rgba(28,73,60,.1)_0_2px,transparent_2px_12px)] bg-size-[56px_56px,18px_18px]" />
      <Reveal className="page-width relative">
        <p className="eyebrow">{t.impact.eyebrow}</p>
        <h2 className="font-display mt-4 max-w-[18ch] text-[clamp(2rem,3.4vw,2.8rem)] font-extrabold leading-[1.08]">
          <Title parts={t.impact.title} />
        </h2>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#4a5164]">
          {t.impact.body}
        </p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((number, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-[10px] border border-teal-900/20 bg-teal-900 p-6">
                <CountUp
                  value={number}
                  className={`font-display block text-5xl font-extrabold ${i % 2 ? "text-[#f7f2e9]" : "text-yellow-400"}`}
                />
                <div className="mt-3 text-[13px] font-semibold text-[#f7f2e9]/75">
                  {t.impact.stats[i]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#6a7563]">
          {t.impact.founding}
        </p>
        <a href="#programs" className="button group mt-7 bg-[#194d02] ">
          <span className=" text-white flex gap-2 font-medium">
            {t.impact.cta}{" "}
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
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [logoBefore, logoStrong, logoAfter] = t.about.logoText;
  return (
    <section id="who" className="overflow-x-clip bg-white py-20">
      <div className="page-width">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:items-center lg:gap-14">
          <Reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="font-display mt-4 text-[clamp(2.2rem,4vw,3.3rem)] font-extrabold leading-[1.05]">
              <Title parts={t.about.title} />
            </h2>
            <p className="mt-4 max-w-[26ch] text-[16.5px] leading-relaxed text-[#5a6560]">
              {t.about.subtitle}
            </p>
          </Reveal>
          <div className="relative mb-12 aspect-[1.15] w-full sm:aspect-[1.45]">
            {collage.map(([src, position, rotate], i) => (
              <motion.div
                key={src}
                initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: 0, y: 20 }}
                whileInView={reduce ? {} : { opacity: 1, scale: 1, rotate, y: 0 }}
                whileHover={reduce ? undefined : { rotate: 0, scale: 1.04 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.09, ease: easeCalm }}
                style={reduce ? { rotate } : undefined}
                className={`absolute overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_24px_48px_-24px_rgba(15,54,43,.55)] hover:z-40 ${position}`}
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
        </div>
        <Reveal delay={0.16}>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="font-display text-6xl leading-none text-yellow-400">
                &ldquo;
              </span>
              <p className="-mt-4 max-w-[38ch] text-[clamp(1.1rem,1.5vw,1.35rem)] italic leading-relaxed text-teal-900">
                {t.about.quote}
              </p>
              <div className="mt-7 flex items-center gap-4 rounded-2xl bg-[#f3f1e7] p-6">
                <div className="shrink-0">
                  <Image
                    src="/assets/yca-logo.png"
                    alt={t.about.logoAlt}
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
                    {logoBefore}
                    <strong className="text-teal-900">{logoStrong}</strong>
                    {logoAfter}
                  </p>
                </div>
              </div>
              <p className="mt-7 text-[15px] leading-relaxed text-[#4a5164]">
                {t.about.body}
              </p>
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0, rotate: 0 }}
              whileInView={reduce ? {} : { opacity: 1, rotate: -2 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeCalm }}
              className="rounded-2xl bg-[#12362b] p-7 sm:p-8"
            >
              <p className="eyebrow text-yellow-400!">
                {t.about.missionEyebrow}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/90">
                {t.about.mission}
              </p>
              <h3 className="font-display mt-7 border-t border-white/10 pt-6 text-2xl font-bold text-white">
                {t.about.valuesTitle}
              </h3>
              <div className="mt-6 grid gap-5">
                {t.about.values.map(([title, copy], i) => {
                  const Icon = valueIcons[i];
                  return (
                    <div
                      key={i}
                      className={`flex gap-4 pb-5 ${i < t.about.values.length - 1 ? "border-b border-white/10" : ""}`}
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
                  );
                })}
              </div>
            </motion.div>
          </div>
        </Reveal>
        <div className="mt-24">
          <Reveal>
            <p className="eyebrow">{t.about.goalsEyebrow}</p>
            <h3 className="font-display mt-4 text-[clamp(1.8rem,2.8vw,2.3rem)] font-extrabold leading-[1.1]">
              <Title parts={t.about.goalsTitle} />
            </h3>
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
              {t.about.goals.map(([title, copy], i) => (
                <motion.li
                  key={i}
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
                  <p className="mt-2 text-sm leading-relaxed text-[#5a6560]">
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
  const { t } = useLang();
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
        aria-label={t.team.carousel}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 pt-2 outline-none sm:scroll-px-[max(1.75rem,calc((100%-1180px)/2))] sm:px-[max(1.75rem,calc((100%-1180px)/2))]"
      >
        {departments.map(([key, members], i) => {
          const department = t.team.departments[key];
          return (
            <article
              key={key}
              aria-label={`${department.name}, ${t.team.members(members.length)}`}
              className={`team-card flex w-[86%] shrink-0 snap-start flex-col rounded-3xl border bg-[#f7f2e9] p-6 sm:w-[72%] sm:p-8 lg:w-[min(620px,54%)] ${i === active ? "border-yellow-400/70 shadow-[0_22px_44px_-30px_rgba(28,73,60,.55)]" : "border-teal-900/10"}`}
            >
              <header className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[clamp(1.6rem,2.4vw,2rem)] font-extrabold leading-none text-teal-900">
                    {department.name}
                  </h3>
                  <p className="mt-3 text-sm italic text-[#5a6560]">
                    {department.tagline}
                  </p>
                </div>
              </header>
              <ul className="mt-7 grid gap-x-6 gap-y-4 border-t border-teal-900/10 pt-6 sm:grid-cols-2">
                {members.map(([image, name, lead], m) => (
                  <li
                    key={`${key}-${name}`}
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
                      <p className="text-xs text-[#5a6560]">
                        {department.roles[m]}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="page-width mt-2 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label={t.team.previous}
          onClick={() => goTo(Math.max(0, active - 1))}
          disabled={atStart}
          className="grid size-11 place-items-center rounded-full border border-teal-900/20 text-teal-900 transition-colors hover:border-teal-900 hover:bg-teal-900 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {departments.map(([key], i) => (
            <button
              key={key}
              type="button"
              aria-label={t.team.show(t.team.departments[key].name)}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-teal-900" : "w-2 bg-teal-900/25 hover:bg-teal-900/50"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={t.team.next}
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
  const { t } = useLang();
  return (
    <section id="team" className="bg-white pb-20">
      <div className="page-width">
        <Reveal>
          <p className="eyebrow">{t.team.eyebrow}</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,3.2vw,2.65rem)] font-extrabold">
            <Title parts={t.team.title} />
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5a6560]">
            {t.team.intro}
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <p className="eyebrow">{t.team.peopleEyebrow}</p>
          <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-[#5a6560]">
            {t.team.peopleIntro}
          </p>
        </Reveal>
      </div>
      <TeamCarousel />
      <div className="page-width">
        <Reveal>
          <div className="mt-8 flex flex-col gap-5 rounded-r-lg border-l-4 border-yellow-400 bg-[#f7f2e9] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="font-display text-lg font-bold text-teal-900">
                {t.team.joinTitle}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5a6560]">
                {t.team.joinIntro} {t.team.openRoles.join(", ")}.
              </p>
            </div>
            <a
              href="#join"
              className="button group shrink-0 bg-[#194d02] text-white!"
            >
              {t.team.joinCta}{" "}
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
  const { t } = useLang();
  return (
    <section id="programs" className="bg-[#e9e1ce] py-20">
      <Reveal className="page-width">
        <p className="eyebrow">{t.programs.eyebrow}</p>
        <h2 className="font-display mt-4 text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold">
          <Title parts={t.programs.title} />
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(([image, kind], i) => {
            const [title, meta, copy] = t.programs.items[i];
            return (
              <Reveal key={image} delay={i * 0.04}>
                <article className="photo-card h-full">
                  <div className="relative aspect-[1.7]">
                    <Image
                      src={`/assets/${image}`}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <span
                      className={`absolute left-3 top-3 rounded px-2 py-1 text-[9px] font-extrabold uppercase tracking-[.14em] ${kind === "pillar" ? "bg-[#7c9b76] text-white" : "bg-[#e3c067] text-teal-900"}`}
                    >
                      {t.programs.kinds[kind]}
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
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
function Gallery() {
  const { t } = useLang();
  return (
    <section id="year" className="bg-white py-20">
      <div className="page-width">
        <Reveal>
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2 className="font-display mt-4 max-w-xl text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold">
            <Title parts={t.gallery.title} />
          </h2>
        </Reveal>
        <div className="mt-10 grid auto-rows-36.25 grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-42.5">
          {gallery.map((image, i) => {
            const caption = t.gallery.captions[i];
            return (
              <RevealImage
                key={image}
                delay={i * 0.05}
                className={`group relative overflow-hidden rounded-lg ${i === 0 ? "col-span-2 row-span-2" : i === 3 ? "row-span-2" : ""}`}
              >
                <figure className="size-full">
                  <Image
                    src={`/assets/${image}`}
                    alt={caption}
                    fill
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
          <a
            href={placeholder}
            target="_blank"
            className="button group mt-8 border border-yellow-400 text-teal-900"
          >
            {t.gallery.cta}{" "}
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
  const { t } = useLang();
  const logoSet = [...partners, ...partners];
  return (
    <section
      aria-labelledby="partners-heading"
      className="overflow-hidden border-b border-teal-900/8 bg-white py-16"
    >
      <Reveal className="page-width">
        <p className="eyebrow">{t.partners.eyebrow}</p>
        <h2
          id="partners-heading"
          className="font-display mt-3 text-[clamp(1.8rem,2.7vw,2.2rem)] font-extrabold"
        >
          <Title parts={t.partners.title} />
        </h2>
      </Reveal>
      <div className="partner-marquee mt-10" aria-label={t.partners.aria}>
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
  const { t } = useLang();
  return (
    <section id="join" className="bg-white py-20">
      <div className="page-width">
        <Reveal>
          <p className="eyebrow">{t.join.eyebrow}</p>
          <h2 className="font-display mt-4 max-w-xl text-[clamp(2rem,3.2vw,2.5rem)] font-extrabold">
            <Title parts={t.join.title} />
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[#5a6560]">
            {t.join.body}
          </p>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {joinLinks.map(([href, variant], i) => {
            const [title, copy, cta] = t.join.cards[i];
            return (
              <Reveal key={href} delay={i * 0.07}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Events() {
  const { t } = useLang();
  const tagStyle = (tag: EventCategory) =>
    tag === "culture"
      ? "bg-[#194d02] text-white"
      : tag === "sports"
        ? "bg-yellow-400 text-[#14240b]"
        : "bg-[#7c9b76] text-white";
  const categories: EventCategory[] = ["culture", "sports", "wellness"];
  return (
    <section id="events" className="bg-white py-20">
      <div className="page-width grid gap-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">{t.events.eyebrow}</p>
            <h2 className="font-display mt-4 max-w-[20ch] text-[clamp(1.8rem,2.8vw,2.2rem)] font-extrabold">
              <Title parts={t.events.title} />
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#5a6560]">
              {t.events.body}
            </p>
            <div className="mt-7 rounded-r-lg border-l-4 border-yellow-400 bg-[#f7f2e9] p-5">
              <h3 className="font-display text-lg font-bold text-teal-900">
                {t.events.loopTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5a6560]">
                {t.events.loopBody}
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {categories.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[.14em] ${tagStyle(tag)}`}
                >
                  {t.events.categories[tag]}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="divide-y divide-teal-900/10 border-t border-teal-900/10">
            {eventMeta.map(([year, tag], i) => {
              const [month, title, meta] = t.events.items[i];
              return (
                <Reveal key={i} delay={Math.min(0.1 + i * 0.05, 0.3)}>
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
                        {t.events.categories[tag]}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <a
            className="button group mt-7 border border-teal-900 text-teal-900"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.events.cta}{" "}
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
  const { t } = useLang();
  return (
    <footer className="bg-[#7c9b76] py-14 pb-8 text-white">
      <div className="page-width grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image
            src="/assets/yca-logo.png"
            alt={t.footer.logoAlt}
            width={132}
            height={54}
            className="h-12 w-auto mix-blend-multiply"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
            {t.footer.tagline}
          </p>
        </div>
        <div>
          <p className="eyebrow text-yellow-400!">{t.footer.explore}</p>
          <div className="mt-4 grid gap-2.5 text-sm text-white/90">
            {t.nav.links.map((label, i) => (
              <a
                key={navHrefs[i]}
                href={navHrefs[i]}
                className="transition-color hover:text-yellow-400! "
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-yellow-400!">{t.footer.connect}</p>
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
            <p>{t.footer.location}</p>
          </div>
        </div>
      </div>
      <div className="page-width mt-10 flex flex-col gap-2 border-t border-white/20 pt-5 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.copyright}</p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  );
}
