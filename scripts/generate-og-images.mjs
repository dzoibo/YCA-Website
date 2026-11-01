// Generates the social sharing images (Open Graph) in public/og, one per language.
// Run after changing the hero photo or slogan:  node scripts/generate-og-images.mjs
// JPEG rather than PNG keeps them light enough for WhatsApp, Facebook and LinkedIn previews.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const copy = {
  fr: {
    line1: "Communauté.",
    line2: "Culture. Croissance.",
    tagline: "Association des jeunes Camerounais d’Ottawa-Gatineau",
  },
  en: {
    line1: "Community.",
    line2: "Culture. Growth.",
    tagline: "Young Cameroonians Association of Ottawa-Gatineau",
  },
};

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const overlay = ({ line1, line2, tagline }) => `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#1c493c" stop-opacity=".94"/>
      <stop offset=".42" stop-color="#1c493c" stop-opacity=".82"/>
      <stop offset=".7" stop-color="#1c493c" stop-opacity=".3"/>
      <stop offset="1" stop-color="#1c493c" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#shade)"/>
  <rect x="72" y="92" width="302" height="40" fill="none" stroke="#ef4444" stroke-opacity=".7"/>
  <text x="88" y="118" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700"
    letter-spacing="3.7" fill="#fed104">YCA OTTAWA-GATINEAU</text>
  <text font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="84" letter-spacing="-3.5">
    <tspan x="66" y="262" fill="#fed104">${escape(line1)}</tspan>
    <tspan x="66" y="352" fill="#ffffff">${escape(line2)}</tspan>
  </text>
  <text x="72" y="430" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#ffffff"
    fill-opacity=".92">${escape(tagline)}</text>
  <text x="72" y="540" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700"
    fill="#fed104">ycaottawagatineau.ca</text>
  <rect x="0" y="${HEIGHT - 8}" width="${WIDTH}" height="8" fill="#fed104" fill-opacity=".85"/>
</svg>`;

await mkdir("public/og", { recursive: true });

const photo = await sharp("public/assets/hero-steps.png")
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "right" })
  .toBuffer();

for (const [lang, text] of Object.entries(copy)) {
  const out = `public/og/og-${lang}.jpg`;
  const info = await sharp(photo)
    .composite([{ input: Buffer.from(overlay(text)) }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(`${out}: ${Math.round(info.size / 1024)} KB`);
}
