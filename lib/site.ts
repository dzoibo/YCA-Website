// Site identity, contact details and navigation, shared by the UI, metadata and structured data.

/** Canonical origin. The apex domain redirects here (configured in Vercel). */
export const SITE_URL = "https://www.ycaottawagatineau.ca";

export const SITE_NAME = "YCA Ottawa-Gatineau";
export const ORG_NAME = "Young Cameroonians Association Ottawa-Gatineau";
export const ORG_NAME_FR = "Association des jeunes Camerounais d’Ottawa-Gatineau";

export const EMAIL = "ycaottawagatineau@gmail.com";

export const links = {
  instagram: "https://www.instagram.com/ycaottawagatineau/",
  // No public WhatsApp invite link yet: the "Join WhatsApp" button points to Instagram until one exists.
  whatsapp: "https://www.instagram.com/ycaottawagatineau/",
  tiktok: "https://www.tiktok.com/@yca.ottawagatineau",
  email: `mailto:${EMAIL}`,
} as const;

// Section anchors, in the same order as t.nav.links.
export const navHrefs = ["#who", "#programs", "#year", "#events"] as const;

export const isExternal = (href: string) => href.startsWith("http");
