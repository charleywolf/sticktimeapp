import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatDollars, formatTime } from "@/lib/time";

import Link from "next/link";
import fetchSticktimes from "@/lib/fetch";
import rinkMap from "@/lib/rinkMap";

export const revalidate = 3600;

export default async function Home() {
  const sticktimes = await fetchSticktimes();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
                className={rink.bg}
              >
                <TableCell className="font-medium">
                  <Link
                    href={rink.href}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    {sticktime.rink}
                  </Link>
                </TableCell>
                <TableCell>{formatDate(sticktime.start)}</TableCell>
                <TableCell>{formatTime(sticktime.start)}</TableCell>
                <TableCell>{formatTime(sticktime.end)}</TableCell>
                <TableCell className="text-right">
                  {formatDollars(sticktime.price)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
