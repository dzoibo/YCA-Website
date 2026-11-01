"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { homePath } from "@/lib/i18n/config";
import { useLang } from "@/lib/i18n/context";

export default function NotFound() {
  const { t, lang } = useLang();
  return (
    <main className="grid min-h-svh place-items-center bg-sand px-6 text-center">
      <div>
        <Image
          src="/assets/yca-logo.png"
          alt="YCA OTTAWA"
          width={125}
          height={48}
          className="mx-auto h-12 w-auto mix-blend-multiply"
        />
        <p className="eyebrow mt-10">404</p>
        <h1 className="font-display mt-3 text-[clamp(2rem,4vw,2.8rem)] font-extrabold">
          {t.notFound.title}
        </h1>
        <p className="mt-3 text-stone">{t.notFound.body}</p>
        <Button asChild variant="forest" size="pill" className="mt-8">
          <a href={homePath(lang)}>{t.notFound.cta}</a>
        </Button>
      </div>
    </main>
  );
}
