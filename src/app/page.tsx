import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ClientTime from "@/components/ClientTime";
import Link from "next/link";
import fetchSticktimes from "@/lib/fetch";
import { formatDollars } from "@/lib/time";
import rinkMap from "@/lib/rinkMap";

export const revalidate = 3600;

export default async function Home() {
  const sticktimes = await fetchSticktimes();
  return (
    <main className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex-col flex gap-16 items-center justify-between py-16 px-8 sm:px-16 md:p-24">
      <div className="flex flex-col gap-8 text-center sm:text-left">
        <h1 className="text-[#a4e6d0] font-bold text-4xl">SticktimeApp</h1>
        <p className="text-sm px-4 sm:px-0 sm:text-lg">
          Discover and access a comprehensive list of local stick times in the
          Greater Westchester area. Our platform consolidates schedules and
          availability, making it easy to find your preferred ice time in one
          convenient location.
        </p>
      </div>
      <section className="p-3 bg-neutral-900 border-4 rounded-xl w-full">
        <Table>
          <TableCaption className="sr-only">
            A list of local sticktimes.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Rink</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sticktimes.map((sticktime) => {
              const rink = rinkMap(sticktime.rink);
              return (
                <TableRow
                  key={
                    sticktime.rink +
                    sticktime.start.toDateString() +
                    sticktime.end.toDateString()
                  }
                >
                  <TableCell className={rink.style}>
                    <Link
                      href={rink.href}
                      className="font-semibold underline hover:no-underline"
                    >
                      {sticktime.rink}
                    </Link>
                  </TableCell>

                  <ClientTime start={sticktime.start} end={sticktime.end} />

                  <TableCell className="text-right">
                    {formatDollars(sticktime.price)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
