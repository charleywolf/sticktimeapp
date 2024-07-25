import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableWrapper({
  children,
  distanceEnabled,
}: {
  children: React.ReactNode;
  distanceEnabled: boolean;
}) {
  return (
    <div className="bg-neutral-900 border-4 rounded-xl w-full p-3 flex">
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
            {distanceEnabled && <TableHead>Distance</TableHead>}
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
}
