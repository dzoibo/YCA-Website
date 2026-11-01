"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Department } from "@/lib/content/team";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/** One working team: name, tagline and its members with their roles. */
export function DepartmentCard({
  department: { key, members },
  active,
}: {
  department: Department;
  /** The card currently snapped in the carousel gets a yellow border. */
  active: boolean;
}) {
  const { t } = useLang();
  const copy = t.team.departments[key];
  return (
    <Card
      className={cn(
        "h-full gap-0 rounded-3xl border bg-cream p-6 ring-0 transition-[border-color,box-shadow] duration-400 sm:p-8",
        active
          ? "border-yellow-400/70 shadow-[0_22px_44px_-30px_rgba(28,73,60,.55)]"
          : "border-teal-900/10",
      )}
    >
      <CardHeader className="gap-0 px-0">
        <CardTitle
          role="heading"
          aria-level={3}
          className="font-display text-[clamp(1.6rem,2.4vw,2rem)] font-extrabold leading-none text-teal-900"
        >
          {copy.name}
        </CardTitle>
        <CardDescription className="mt-3 italic text-stone">
          {copy.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ul className="mt-7 grid gap-x-6 gap-y-4 border-t border-teal-900/10 pt-6 sm:grid-cols-2">
          {members.map(({ photo, name, lead }, m) => (
            <li key={name} className="flex items-center gap-3">
              <Image
                src={`/assets/${photo}`}
                alt=""
                width={96}
                height={96}
                className={cn(
                  "size-12 shrink-0 rounded-full object-cover object-top",
                  lead
                    ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-cream"
                    : "border border-teal-900/15",
                )}
              />
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-teal-900">
                  {name}
                </p>
                <p className="text-xs text-stone">{copy.roles[m]}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
