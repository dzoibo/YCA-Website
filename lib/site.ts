// Contact details and navigation shared by the header, footer and call-to-action sections.

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
