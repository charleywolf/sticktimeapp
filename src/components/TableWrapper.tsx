import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import clsx from "clsx";

export default function TableWrapper({
  children,
  fullscreen,
  distanceEnabled,
}: {
  children: React.ReactNode;
  distanceEnabled: boolean;
  fullscreen: boolean;
}) {
  return (
    <>
      <div
        className={clsx(
          "absolute w-full h-16 z-10 bg-neutral-900 text-3xl xs:text-4xl top-0 flex items-center p-3 xs:text-center xs:justify-center font-bold text-[#a4e6d0]",
          !fullscreen && "hidden"
        )}
      >
        <h1>SticktimeApp</h1>
      </div>
      <div
        className={clsx(
          "z-20 w-full flex bg-neutral-900",
          fullscreen
            ? "absolute top-0 bottom-0 border-t-4 mt-16 overflow-scroll"
            : "rounded-xl border-4"
        )}
      >
        <div className="p-3 w-full">
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
                {distanceEnabled && <TableHead>Driving Time</TableHead>}
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{children}</TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
