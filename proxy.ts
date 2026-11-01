import { NextResponse, type NextRequest } from "next/server";
import { defaultLang, LANG_COOKIE } from "@/lib/i18n/config";

/**
 * Language routing. French pages are served at the root ("/", rewritten internally to
 * app/[lang] with lang=fr) and English ones under "/en".
 *
 * On the home page only, a visitor who hasn't picked a language yet and whose browser
 * prefers another language than French is redirected to "/en". Search engine crawlers send
 * no Accept-Language header, so they always get the canonical French page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // "/fr/..." duplicates the root URLs: send it to the clean address.
  if (pathname === `/${defaultLang}` || pathname.startsWith(`/${defaultLang}/`)) {
    url.pathname = pathname.slice(defaultLang.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  if (pathname === "/" && preferredLang(request) === "en") {
    url.pathname = "/en";
    return NextResponse.redirect(url, 307);
  }

  url.pathname = `/${defaultLang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

function preferredLang(request: NextRequest) {
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  if (saved === "fr" || saved === "en") return saved;
  const header = request.headers.get("accept-language");
  if (!header) return defaultLang;
  // First language by quality, e.g. "en-CA,en;q=0.9,fr;q=0.8" -> "en".
  const [top] = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter(({ tag, q }) => tag && tag !== "*" && q > 0)
    .sort((a, b) => b.q - a.q);
  if (!top || top.tag.startsWith("fr")) return "fr";
  return "en";
}

export const config = {
  // Pages only: skip Next internals, API routes and any file with an extension
  // (assets, icons, robots.txt, sitemap.xml, llms.txt, Open Graph images).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
