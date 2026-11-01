import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Every crawler is welcome, including AI assistants (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended...): being found and cited by them is a goal of the site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
