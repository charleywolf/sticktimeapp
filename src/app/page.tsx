import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatDollars, formatTime } from "@/lib/time";

import fetchSticktimes from "@/lib/fetch";

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
          {sticktimes.map((sticktime) => (
            <TableRow
              key={
                sticktime.rink +
                sticktime.start.toDateString() +
                sticktime.end.toDateString()
              }
            >
              <TableCell className="font-medium">{sticktime.rink}</TableCell>
              <TableCell>{formatDate(sticktime.start)}</TableCell>
              <TableCell>{formatTime(sticktime.start)}</TableCell>
              <TableCell>{formatTime(sticktime.end)}</TableCell>
              <TableCell className="text-right">
                {formatDollars(sticktime.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
