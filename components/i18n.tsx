"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "fr";

const STORAGE_KEY = "yca-lang";
const nb = " ";

const en = {
  meta: { title: "YCA Ottawa | Community. Culture. Growth." },
  nav: {
    links: ["Our Story", "Programs", "Gallery", "Events"],
    join: "Join Us",
    open: "Open navigation",
    close: "Close navigation",
    home: "YCA OTTAWA home",
    language: "Change language",
  },
  hero: {
    line1: "Community.",
    line2: "Culture. Growth.",
    body: "YCA was founded in May 2023 with a simple yet powerful vision. YCA is a non-profit association of young Cameroonians living in Ottawa-Gatineau. We create a strong community where culture, friendship, and mutual support thrive. Through events, projects, and volunteer initiatives, we preserve our heritage while building bridges with the wider community.",
    ctaJoin: "Join Us",
    ctaInvolved: "Get Involved",
    ctaEvents: "Our Events",
    tags: ["Community", "Culture", "Growth"],
    imageAlt: "YCA OTTAWA members in traditional Cameroonian dress",
  },
  impact: {
    eyebrow: "Our roots",
    title: ["Rooted in culture. ", "Driven by community", "."],
    body: "Our roots bring us together. Our community moves us forward. YCA is a space where young Cameroonians connect, celebrate our heritage, support one another, and build a stronger future together.",
    stats: [
      "Cities: Toronto, Ottawa-Gatineau & Montréal",
      "Team members in Ottawa-Gatineau",
      "Events planned, Sept 2026 and beyond",
      "Areas of impact, from culture to education",
    ],
    founding:
      "Toronto was founded in May 2023, Ottawa-Gatineau in May 2025 and Montréal in August 2026.",
    cta: "See what we run",
  },
  about: {
    eyebrow: "Our identity",
    title: ["Who ", "We Are", ""],
    subtitle: "Our community, our moments, our story.",
    collageAlts: [
      "YCA members smiling together in Cameroon jerseys",
      "Members dancing together outdoors",
      "A YCA gathering in the park",
      "Members walking a forest boardwalk on a hike",
      "Members listening during a YCA panel",
    ],
    quote:
      "YCA OTTAWA is a bridge between our Cameroonian roots and our life here; a gathering place where community, culture, and growth come together.",
    logoAlt: "YCA logo",
    logoText: [
      "Our logo's running figure represents ",
      "youth in motion;",
      " always learning, connecting, and moving forward together, carrying the colors of home wherever we go.",
    ],
    body: "YCA is a non-profit association of young Cameroonians living in Ottawa-Gatineau. Through events, projects, and volunteer initiatives, we preserve our heritage while building bridges with the wider community.",
    missionEyebrow: "Our mission",
    mission:
      "YCA unites young Cameroonians aged 18-35 to build community, celebrate culture, and empower one another in Ottawa-Gatineau.",
    valuesTitle: "Core Values",
    values: [
      ["Know", "Connect to who we are."],
      ["Respect", "Treat others with dignity."],
      ["Community", "Build together, empower together."],
    ],
    goalsEyebrow: "Our goals",
    goalsTitle: ["Together, we ", "grow stronger", "."],
    goals: [
      [
        "Empower youth",
        "Provide resources and opportunities for personal growth, leadership, and skill development.",
      ],
      [
        "Promote unity",
        "Foster cultural pride and strengthen bonds within the Cameroonian community.",
      ],
      [
        "Build competences",
        "Encourage education, mentorship, and entrepreneurship for sustainable community growth.",
      ],
      [
        "Make a meaningful impact",
        "Drive initiatives that create lasting change and improve lives both locally and globally.",
      ],
    ],
  },
  team: {
    eyebrow: "Meet our team",
    title: ["The people behind ", "the chapter", ""],
    intro:
      "Four working teams: Operations, Marketing, Events and Sports & Leisure. Team as of September 2026.",
    peopleEyebrow: "The people behind YCA",
    peopleIntro:
      "Meet the people bringing our community, culture and initiatives to life.",
    carousel: "YCA working teams",
    members: (n: number) => `${n} members`,
    previous: "Previous team",
    next: "Next team",
    show: (name: string) => `Show ${name} team`,
    departments: {
      marketing: {
        name: "Marketing",
        tagline: "Our outreach, storytelling and social media.",
        roles: [
          "Marketing Lead",
          "Graphic Designer",
          "Graphic Designer",
          "Content Creator",
          "Content Creator",
        ],
      },
      events: {
        name: "Events",
        tagline: "Planning and organising our community events.",
        roles: [
          "Events Lead",
          "Event Coordinator",
          "Event Design",
          "Guest Experience",
          "Volunteer Coordinator",
        ],
      },
      sports: {
        name: "Sports & Leisure",
        tagline: "Healthy lifestyles, teamwork and community pride.",
        roles: [
          "Sports & Leisure Lead",
          "Hiking Coordinator",
          "Sports Coordinator",
        ],
      },
      operations: {
        name: "Operations",
        tagline: "Day-to-day operations, finance and partnerships.",
        roles: [
          "Finance",
          "Internal Affairs",
          "Community Engagement",
          "External Affairs",
        ],
      },
    },
    joinTitle: "Want to join the team?",
    joinIntro: "We're looking for people to help with",
    openRoles: [
      "Marketing",
      "Mentorship",
      "Fundraising & Sponsorship",
      "Events",
      "Administration",
    ],
    joinCta: "Get involved",
  },
  programs: {
    eyebrow: "What we run",
    title: ["Three pillars, ", "six ways in", "."],
    kinds: { pillar: "Pillar", event: "Event" },
    items: [
      [
        "Community gatherings",
        "Ottawa & Gatineau",
        "Easy ways to meet people, share a meal, and feel at home.",
      ],
      [
        "Cultural exchange",
        "Quarterly",
        "Celebrating Cameroonian culture with the wider community.",
      ],
      [
        "Professional growth",
        "With local partners",
        "Conversations, workshops, and connections that move us forward.",
      ],
      [
        "Social Saturdays",
        "Monthly · Ottawa",
        "A relaxed gathering for new faces and familiar ones.",
      ],
      [
        "Culture nights",
        "Summer · Gatineau",
        "Music, food, stories, and a little piece of home.",
      ],
      [
        "Outdoor days",
        "Seasonal · Gatineau Park",
        "Fresh air, good company, and a shared sense of adventure.",
      ],
    ],
  },
  gallery: {
    eyebrow: "A year in pictures",
    title: ["A year of color, ", "culture and connection", "."],
    captions: [
      "Outdoor Days - Spring 2026",
      "Community Launch - Aug 2025",
      "Culture Night - Nov 2025",
      "Cultural Festival - Sept 2025",
      "Youth Panel - Oct 2025",
      "Chapter Team - Winter 2026",
      "Networking Mixer - Feb 2026",
      "Social Saturday - Jan 2026",
    ],
    cta: "View More Photos",
  },
  partners: {
    eyebrow: "Our partners",
    title: ["Trusted by our ", "community & partners", "."],
    aria: "Partner organizations",
  },
  join: {
    eyebrow: "Get involved",
    title: ["Join YCA ", "OTTAWA", "."],
    body: "Join the WhatsApp community, follow us on social media, or write to us. We'd love to have you on board.",
    cards: [
      [
        "Members",
        "For young Cameroonians aged 18-35 and friends of Cameroon in Ottawa-Gatineau. Membership fees will launch once we're officially registered.",
        "Join WhatsApp",
      ],
      [
        "Newcomers",
        "Just landed in Ottawa or Gatineau? Say hello. A mentorship program to welcome and guide newcomers is on our roadmap.",
        "Message us on Instagram",
      ],
      [
        "Partners & sponsors",
        "Our partners and sponsors help us create opportunities and bring our initiatives to life. Let's build something together.",
        "Email the team",
      ],
    ],
  },
  events: {
    eyebrow: "Up next",
    title: ["The season ahead, ", `Sept${nb}2026 & beyond`, "."],
    body: "Join us for a vibrant series of events designed to connect, inspire, and empower our community.",
    loopTitle: "Stay in the loop",
    loopBody:
      "Dates and details are shared as they're confirmed, follow @ycaottawagatineau on Instagram or join the WhatsApp community.",
    categories: {
      culture: "Community & Culture",
      sports: "Sports & Recreation",
      wellness: "Support & Wellness",
    },
    items: [
      ["SEP", "Sport Saturday", ""],
      ["OCT 02", "Concert: Ya Levis", "Ottawa"],
      ["OCT", "Fall Activity", ""],
      ["OCT", "Pink October", ""],
      ["NOV", "Men’s Movember", ""],
      ["NOV", "Dimanche Taro", ""],
      ["NOV", "Winter Activity", ""],
      ["DEC", "Christmas Potluck", ""],
      ["FEB", "Youth Gala", ""],
      [
        "AUG",
        "This Is Cameroon Gala",
        "Our hope: to host the national gala in Ottawa",
      ],
    ],
    cta: "Follow for updates",
  },
  footer: {
    logoAlt: "YCA OTTAWA",
    tagline:
      "Young Cameroonians Association. Uniting, celebrating & empowering the Cameroonian community.",
    explore: "Explore",
    connect: "Connect",
    location: "Ottawa & Gatineau, Canada",
    copyright: "© 2026 Young Cameroonians Association, Ottawa-Gatineau.",
    built: "Built by the community, for the community.",
  },
};

export type Dict = typeof en;

const fr: Dict = {
  meta: { title: "YCA Ottawa | Communauté. Culture. Croissance." },
  nav: {
    links: ["Notre histoire", "Programmes", "Galerie", "Événements"],
    join: "Nous rejoindre",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
    home: "Accueil YCA OTTAWA",
    language: "Changer de langue",
  },
  hero: {
    line1: "Communauté.",
    line2: "Culture. Croissance.",
    body: "YCA a été fondée en mai 2023 avec une vision simple mais puissante. YCA est une association à but non lucratif de jeunes Camerounais vivant à Ottawa-Gatineau. Nous créons une communauté solide où la culture, l’amitié et l’entraide s’épanouissent. Grâce à des événements, des projets et des initiatives bénévoles, nous préservons notre patrimoine tout en bâtissant des ponts avec la communauté élargie.",
    ctaJoin: "Nous rejoindre",
    ctaInvolved: "S’impliquer",
    ctaEvents: "Nos événements",
    tags: ["Communauté", "Culture", "Croissance"],
    imageAlt: "Membres de YCA OTTAWA en tenue traditionnelle camerounaise",
  },
  impact: {
    eyebrow: "Nos racines",
    title: ["Ancrés dans la culture. ", "Portés par la communauté", "."],
    body: "Nos racines nous rassemblent. Notre communauté nous fait avancer. YCA est un espace où les jeunes Camerounais se connectent, célèbrent leur héritage, se soutiennent et bâtissent ensemble un avenir plus fort.",
    stats: [
      `Villes${nb}: Toronto, Ottawa-Gatineau et Montréal`,
      "Membres de l’équipe à Ottawa-Gatineau",
      "Événements prévus dès septembre 2026",
      "Domaines d’impact, de la culture à l’éducation",
    ],
    founding:
      "Toronto a vu le jour en mai 2023, Ottawa-Gatineau en mai 2025 et Montréal en août 2026.",
    cta: "Découvrir nos activités",
  },
  about: {
    eyebrow: "Notre identité",
    title: ["Qui ", "sommes-nous", `${nb}?`],
    subtitle: "Notre communauté, nos moments, notre histoire.",
    collageAlts: [
      "Des membres de YCA souriants en maillots du Cameroun",
      "Des membres qui dansent ensemble en plein air",
      "Un rassemblement de YCA dans un parc",
      "Des membres en randonnée sur une passerelle en forêt",
      "Des membres à l’écoute lors d’un panel de YCA",
    ],
    quote:
      "YCA OTTAWA est un pont entre nos racines camerounaises et notre vie ici ; un lieu de rassemblement où la communauté, la culture et la croissance se rejoignent.",
    logoAlt: "Logo YCA",
    logoText: [
      "La silhouette en mouvement de notre logo représente ",
      `une jeunesse en marche${nb};`,
      " qui apprend, se connecte et avance ensemble, en portant partout les couleurs de chez nous.",
    ],
    body: "YCA est une association à but non lucratif de jeunes Camerounais vivant à Ottawa-Gatineau. Grâce à des événements, des projets et des initiatives bénévoles, nous préservons notre patrimoine tout en bâtissant des ponts avec la communauté élargie.",
    missionEyebrow: "Notre mission",
    mission:
      "YCA unit les jeunes Camerounais âgés de 18 à 35 ans pour bâtir une communauté, célébrer la culture et s’entraider à Ottawa-Gatineau.",
    valuesTitle: "Nos valeurs",
    values: [
      ["Connaître", "Se relier à qui nous sommes."],
      ["Respect", "Traiter les autres avec dignité."],
      ["Communauté", "Bâtir ensemble, grandir ensemble."],
    ],
    goalsEyebrow: "Nos objectifs",
    goalsTitle: ["Ensemble, ", "on avance", "."],
    goals: [
      [
        "Autonomiser la jeunesse",
        "Offrir des ressources et des opportunités pour la croissance personnelle, le leadership et le développement des compétences.",
      ],
      [
        "Promouvoir l’unité",
        "Favoriser la fierté culturelle et renforcer les liens au sein de la communauté camerounaise.",
      ],
      [
        "Renforcer les compétences",
        "Encourager l’éducation, le mentorat et l’entrepreneuriat pour une croissance communautaire durable.",
      ],
      [
        "Avoir un impact significatif",
        "Mener des initiatives qui créent un changement durable et améliorent des vies, ici comme ailleurs.",
      ],
    ],
  },
  team: {
    eyebrow: "Notre équipe",
    title: ["Celles et ceux qui font ", "vivre la section", ""],
    intro:
      "Quatre équipes de travail : Opérations, Marketing, Événements, et Sports et loisirs. Équipe en date de septembre 2026.",
    peopleEyebrow: "Les visages de YCA",
    peopleIntro:
      "Découvrez les personnes qui font vivre notre communauté, notre culture et nos initiatives.",
    carousel: "Équipes de travail de YCA",
    members: (n: number) => `${n} membres`,
    previous: "Équipe précédente",
    next: "Équipe suivante",
    show: (name: string) => `Voir l’équipe ${name}`,
    departments: {
      marketing: {
        name: "Marketing",
        tagline: "Notre rayonnement, nos récits et nos réseaux sociaux.",
        roles: [
          "Responsable marketing",
          "Graphiste",
          "Graphiste",
          "Créateur de contenu",
          "Créateur de contenu",
        ],
      },
      events: {
        name: "Événements",
        tagline: "Planifier et organiser nos événements communautaires.",
        roles: [
          "Responsable des événements",
          "Coordinatrice événementielle",
          "Conception d’événements",
          "Expérience des invités",
          "Coordinatrice des bénévoles",
        ],
      },
      sports: {
        name: "Sports et loisirs",
        tagline: "Modes de vie sains, esprit d’équipe et fierté communautaire.",
        roles: [
          "Responsable sports et loisirs",
          "Responsable des randonnées",
          "Coordinateur des activités sportives",
        ],
      },
      operations: {
        name: "Opérations",
        tagline: "Opérations quotidiennes, finances et partenariats.",
        roles: [
          "Finances",
          "Affaires internes",
          "Engagement communautaire",
          "Affaires externes",
        ],
      },
    },
    joinTitle: `Envie de rejoindre l’équipe${nb}?`,
    joinIntro: "Nous cherchons des personnes pour nous aider en",
    openRoles: [
      "marketing",
      "mentorat",
      "collecte de fonds et commandites",
      "événements",
      "administration",
    ],
    joinCta: "S’impliquer",
  },
  programs: {
    eyebrow: "Nos activités",
    title: ["Trois piliers, ", "six façons de participer", "."],
    kinds: { pillar: "Pilier", event: "Événement" },
    items: [
      [
        "Rencontres communautaires",
        "Ottawa et Gatineau",
        "Des occasions simples de rencontrer du monde, de partager un repas et de se sentir chez soi.",
      ],
      [
        "Échanges culturels",
        "Chaque trimestre",
        "Célébrer la culture camerounaise avec la communauté élargie.",
      ],
      [
        "Développement professionnel",
        "Avec nos partenaires locaux",
        "Des discussions, des ateliers et des rencontres qui nous font avancer.",
      ],
      [
        "Samedis sociaux",
        "Chaque mois · Ottawa",
        "Un rendez-vous détendu pour les nouveaux visages comme pour les habitués.",
      ],
      [
        "Soirées culturelles",
        "Été · Gatineau",
        "De la musique, de la nourriture, des histoires et un petit bout de chez nous.",
      ],
      [
        "Journées plein air",
        "Selon la saison · Parc de la Gatineau",
        "Du grand air, de la bonne compagnie et un esprit d’aventure partagé.",
      ],
    ],
  },
  gallery: {
    eyebrow: "Une année en images",
    title: ["Une année de couleurs, ", "de culture et de liens", "."],
    captions: [
      "Journées plein air - printemps 2026",
      "Lancement communautaire - août 2025",
      "Soirée culturelle - nov. 2025",
      "Festival culturel - sept. 2025",
      "Panel jeunesse - oct. 2025",
      "Équipe de la section - hiver 2026",
      "Soirée réseautage - févr. 2026",
      "Samedi social - janv. 2026",
    ],
    cta: "Voir plus de photos",
  },
  partners: {
    eyebrow: "Nos partenaires",
    title: ["La confiance de notre ", "communauté et de nos partenaires", "."],
    aria: "Organisations partenaires",
  },
  join: {
    eyebrow: "S’impliquer",
    title: ["Rejoindre YCA ", "OTTAWA", "."],
    body: "Rejoignez la communauté WhatsApp, suivez-nous sur les réseaux sociaux ou écrivez-nous. Nous serions ravis de vous compter parmi nous.",
    cards: [
      [
        "Membres",
        "Pour les jeunes Camerounais de 18 à 35 ans et les amis du Cameroun à Ottawa-Gatineau. Les frais d’adhésion seront lancés une fois l’association officiellement enregistrée.",
        "Rejoindre WhatsApp",
      ],
      [
        "Nouveaux arrivants",
        `Vous venez d’arriver à Ottawa ou à Gatineau${nb}? Dites-nous bonjour. Un programme de mentorat pour accueillir et accompagner les nouveaux arrivants est en préparation.`,
        "Nous écrire sur Instagram",
      ],
      [
        "Partenaires et commanditaires",
        "Nos partenaires et commanditaires nous aident à créer des opportunités et à donner vie à nos initiatives. Construisons quelque chose ensemble.",
        "Écrire à l’équipe",
      ],
    ],
  },
  events: {
    eyebrow: "À venir",
    title: ["La saison à venir, ", `sept.${nb}2026 et au-delà`, "."],
    body: "Joignez-vous à nous pour une série d’activités dynamiques conçues pour rassembler, inspirer et autonomiser notre communauté.",
    loopTitle: "Restez informés",
    loopBody: `Les dates et les détails sont partagés dès qu’ils sont confirmés${nb}: suivez @ycaottawagatineau sur Instagram ou rejoignez la communauté WhatsApp.`,
    categories: {
      culture: "Communauté et culture",
      sports: "Sports et loisirs",
      wellness: "Soutien et bien-être",
    },
    items: [
      ["SEPT", "Samedi Sportif", ""],
      ["2 OCT", `Concert${nb}: Ya Levis`, "Ottawa"],
      ["OCT", "Activité d’Automne", ""],
      ["OCT", "Octobre Rose", ""],
      ["NOV", "Movember pour les hommes", ""],
      ["NOV", "Dimanche Taro", ""],
      ["NOV", "Activité d’Hiver", ""],
      ["DÉC", "Potluck de Noël", ""],
      ["FÉVR", "Gala des Jeunes", ""],
      [
        "AOÛT",
        "Gala This Is Cameroon",
        `Notre souhait${nb}: accueillir le gala national à Ottawa`,
      ],
    ],
    cta: "Suivre les nouvelles",
  },
  footer: {
    logoAlt: "YCA OTTAWA",
    tagline:
      "Association des Jeunes Camerounais. Unir, célébrer et autonomiser la communauté camerounaise.",
    explore: "Explorer",
    connect: "Contact",
    location: "Ottawa et Gatineau, Canada",
    copyright: "© 2026 Association des Jeunes Camerounais, Ottawa-Gatineau.",
    built: "Bâti par la communauté, pour la communauté.",
  },
};

const dictionaries: Record<Lang, Dict> = { en, fr };

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dict };

const LangContext = createContext<LangContextValue | null>(null);

function preferredLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") return saved;
  } catch {}
  const browser = navigator.languages?.[0] ?? navigator.language ?? "en";
  return browser.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(preferredLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const desired = dictionaries[lang].meta.title;
    const apply = () => {
      if (document.title !== desired) document.title = desired;
    };
    apply();
    // Next.js streams its static metadata title in after hydration and would overwrite ours.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
