// English copy for the landing page. The French dictionary (fr.ts) must mirror this shape.
const nb = " ";

export const en = {
  meta: { title: "YCA Ottawa-Gatineau | Community. Culture. Growth." },
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
      "Members at the Pink Lake trail sign during a hike",
      "Members talking together at a YCA evening event",
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
      "Four working teams: Operations, Marketing, Events and Sports & Leisure.",
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
        "Fresh air, good company, and a shared sense of adventure or just chilling in the sun.",
      ],
    ],
  },
  gallery: {
    eyebrow: "A year in pictures",
    title: ["A year of color, ", "culture and connection", "."],
    captions: [
      "Hiking at Lake Pink - Fall 2026",
      "Power of networking - May 2026",
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
    months: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    featured: "Featured",
    register: "Register",
    emptyTitle: "No upcoming events at the moment",
    emptyBody: "Stay connected — more activities are coming soon.",
    errorTitle: "Events are taking a break",
    errorBody:
      "We couldn't load our events right now. Follow us on Instagram for the latest updates.",
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
