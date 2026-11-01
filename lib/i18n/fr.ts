import type { Dict } from "./en";

const nb = " ";

export const fr: Dict = {
  meta: { title: "YCA Ottawa-Gatineau | Communauté. Culture. Croissance." },
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
    ctaInvolved: "Rejoindre",
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
      "Des membres devant le panneau du sentier du Lac-Pink lors d’une randonnée",
      "Des membres qui échangent lors d’une soirée de YCA",
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
      "Quatre équipes de travail : Opérations, Marketing, Événements, et Sports et loisirs.",
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
    joinCta: "Rejoindre",
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
        "Jours en plein air",
        "Saisonnier · Parc de la Gatineau",
        "Air frais, bonne compagnie et esprit d'aventure partagé ou simplement un bon moment au soleil.",
      ],
    ],
  },
  gallery: {
    eyebrow: "Une année en images",
    title: ["Une année de couleurs, ", "de culture et de liens", "."],
    captions: [
      "Randonnée au lac Pink - Automne 2026",
      "Puissance du réseautage - Mai 2026",
      "Soirée culturelle - Nov 2025",
      "Festival culturel - Sept 2025",
      "Panel des jeunes - Oct 2025",
      "Équipe du chapitre - Hiver 2026",
      "Mixer de réseautage - Fév 2026",
      "Samedi social - Jan 2026",
    ],
    cta: "Voir plus de photos",
  },
  partners: {
    eyebrow: "Nos partenaires",
    title: ["La confiance de notre ", "communauté et de nos partenaires", "."],
    aria: "Organisations partenaires",
  },
  join: {
    eyebrow: "Rejoindre",
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
    months: [
      "JANV",
      "FÉVR",
      "MARS",
      "AVR",
      "MAI",
      "JUIN",
      "JUIL",
      "AOÛT",
      "SEPT",
      "OCT",
      "NOV",
      "DÉC",
    ],
    featured: "À la une",
    register: "S’inscrire",
    emptyTitle: "Aucun événement à venir pour le moment",
    emptyBody: "Restez connectés : d’autres activités arrivent bientôt.",
    errorTitle: "Nos événements font une petite pause",
    errorBody:
      "Impossible de charger nos événements pour le moment. Suivez-nous sur Instagram pour les dernières nouvelles.",
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
