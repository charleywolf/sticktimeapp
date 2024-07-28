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
          "z-10 bg-neutral-900 top-0 bottom-0 left-0 right-0 absolute",
          !fullscreen && "hidden"
        )}
      ></div>
      <h1
        className={clsx(
          "absolute z-50 top-3 text-3xl xs:text-4xl font-bold text-[#a4e6d0] left-3 xs:left-1/2 xs:transform xs:-translate-x-1/2",
          !fullscreen && "hidden"
        )}
      >
        SticktimeApp
      </h1>
      <div
        className={clsx(
          "z-20 w-full flex",
          fullscreen
            ? "absolute top-0 bottom-0 border-t-4 mt-16 overflow-scroll"
            : "rounded-xl border-4 bg-neutral-900"
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
