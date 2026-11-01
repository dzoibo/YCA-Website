// Images and logos used by the landing page sections. Texts (titles, captions, alts) live in
// lib/i18n and are matched to these lists by position, so keep both in the same order.

/** Programs grid, matched with t.programs.items. Files in public/assets. */
export const programs = [
  { image: "audience-wide.png", kind: "pillar" },
  { image: "two-women-talking.png", kind: "pillar" },
  { image: "two-men-smiling.png", kind: "pillar" },
  { image: "conversation.png", kind: "event" },
  { image: "two-women-portrait.png", kind: "event" },
  { image: "hike-pink-lake.png", kind: "event" },
] as const;

/** "A year in pictures", matched with t.gallery.captions. Files in public/assets. */
export const gallery = [
  "hike-pink-lake.png",
  "audience-wide.png",
  "two-women-portrait.png",
  "who_are_we/team-group.png",
  "speaker-mic.png",
  "team-group-2.png",
  "two-men-smiling.png",
  "conversation.png",
] as const;

/**
 * "Who we are" collage, matched with t.about.collageAlts. Files in public/assets/who_are_we.
 * `position` places each photo inside the collage box; the last two intentionally overflow it.
 */
export const collage = [
  { src: "community-jerseys.jpg", position: "left-[31%] top-[5%] z-20 h-[90%] w-[37%]", rotate: -1.5 },
  { src: "dance-outdoors.jpg", position: "left-[1%] top-[3%] z-10 h-[34%] w-[28%]", rotate: -4 },
  { src: "park-gathering.jpg", position: "left-0 top-[46%] z-10 h-[40%] w-[29%]", rotate: 3 },
  { src: "pink-lake-trail.jpg", position: "left-[71%] top-[50%] z-30 h-[58%] w-[25%]", rotate: -3 },
  { src: "evening-talk.jpg", position: "left-[70%] top-0 z-10 h-[44%] w-[33%]", rotate: 3 },
] as const;

/** Partner logos in public/assets/partners. */
export const partners = [
  { logo: "la-belle-etoile.png", name: "La Belle Étoile" },
  { logo: "yca-toronto.png", name: "YCA Toronto" },
  { logo: "cultured-cream.png", name: "The Cultured Cream Company" },
  { logo: "yum-dairy.png", name: "Yum Dairy" },
  { logo: "ajc.png", name: "AJC" },
  { logo: "frontlines.png", name: "Frontlines" },
  { logo: "club-culture.png", name: "Club Culture Cité Cameroun" },
  { logo: "cam-student-association.png", name: "CAM Student Association" },
  { logo: "adn.png", name: "ADN — Africa Development Network" },
  { logo: "cam-sco.png", name: "CAM SCO" },
  { logo: "jeunesse-bamileke-ontario.png", name: "Jeunesse Bamiléké Ontario" },
  { logo: "cyac-calgary.png", name: "Cameroon Youth Association of Calgary" },
  { logo: "cepap.png", name: "CEPAP" },
  { logo: "face2face-impact.png", name: "Face2Face Impact" },
  { logo: "oresi-cleaning.png", name: "ORESI Cleaning" },
  { logo: "zambou-tax-service.png", name: "Zambou Tax Service" },
  { logo: "profipreneur.png", name: "Profipreneur Board" },
  { logo: "ottawa-gatineau-sports.png", name: "Ottawa Gatineau Sports" },
  { logo: "franck-bikele.png", name: "Franck BIKELE" },
  { logo: "gofyra.png", name: "Gofyra" },
] as const;

/** Key figures in the impact section, matched with t.impact.stats. */
export const stats = ["3", "14", "8", "6"] as const;
