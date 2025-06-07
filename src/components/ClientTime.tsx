"use client";

import { formatDate, formatTime } from "@/lib/utils/time";
import { useEffect, useState } from "react";

import { TableCell } from "./ui/table";

export default function ClientTime({ start, end }: { start: Date; end: Date }) {
  const [date, setDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  useEffect(() => {
    setDate(formatDate(start));
    setStartTime(formatTime(start));
    setEndTime(formatTime(end));
  }, [start, end]);

  return (
    <>
      <TableCell>{date ?? "--/--/----"}</TableCell>
      <TableCell>{startTime ?? "--:-- --"}</TableCell>
      <TableCell>{endTime ?? "--:-- --"}</TableCell>
    </>
  );
}
