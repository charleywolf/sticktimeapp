import { ChevronLeftCircle, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Star from "./Star";

export default function Content({
  name,
  googleMapsEmbed,
  href,
  notes,
  rules,
  onlineRegistration,
  equipmentRequired,
  skaterLimit,
  stars,
}: {
  name: string;
  href: string;
  googleMapsEmbed: string;
  notes?: { title: string; desc: string }[];
  rules?: string[];
  onlineRegistration: string;
  equipmentRequired: string;
  skaterLimit?: number | string;
  stars?: 1 | 2 | 3 | 4 | 5;
}) {
  return (
    <main className="gap-12 md:gap-16 flex-col flex items-center justify-between py-16 px-8 sm:px-16 md:px-24">
      <section className="flex flex-col gap-2 w-full">
        <h1 className="w-full text-left sm:text-center text-3xl font-bold">
          <a
            href={href}
            target="_blank"
            referrerPolicy="no-referrer"
            className="hover:opacity-80"
          >
            {name}
          </a>
        </h1>

        {stars && (
          <>
            <div className="flex py-2 sm:justify-center items-center gap-1">
              <Star fill={stars > 0} />
              <Star fill={stars > 1} />
              <Star fill={stars > 2} />
              <Star fill={stars > 3} />
              <Star fill={stars > 4} />
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger className="ml-3">
                    <InfoIcon className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent
                    className="w-40 ml-1 border-4"
                    align="start"
                    side="right"
                  >
                    <p className="text-xs">
                      This rating reflects the quality of stick times at this
                      location, based on the experiences of numerous players.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="w-full flex sm:justify-center mt-2">
              <Button
                asChild
                className="text-xl w-fit flex gap-2 justify-center items-center"
              >
                <Link href="/">
                  <ChevronLeftCircle className="h-full" />
                  Return Home
                </Link>
              </Button>
            </div>
          </>
        )}
      </section>

      <div className="w-full flex flex-col gap-12 lg:grid grid-cols-2">
        <section id="rink-content" className="w-full flex flex-col gap-6">
          <div>
            <h2>Equipment Requirement</h2>
            <p>{equipmentRequired}</p>
          </div>
          <div>
            <h2>Online Registration</h2>
            <p>{onlineRegistration}</p>
          </div>
          <div>
            <h2>Skater Limit</h2>
            <p>{skaterLimit ?? "None"}</p>
          </div>
          {rules && (
            <div>
              <h2>Rules</h2>
              <ul className="list-disc pl-6 py-2 flex flex-col gap-2">
                {rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
          {notes &&
            notes.map((note) => (
              <div key={note.title}>
                <h2>{note.title}</h2>
                <p>{note.desc}</p>
              </div>
            ))}
        </section>
        <section className="w-full">
          <iframe
            className="aspect-square w-full h-full rounded-2xl border-4 bg-white border-neutral-400"
            src={googleMapsEmbed}
          />
        </section>
      </div>
    </main>
  );
}
