import { notFound } from "next/navigation";

// Any unknown URL ends up here (proxy.ts rewrites it under /fr), so it gets the site's 404.
export default function UnknownPage() {
  notFound();
}
