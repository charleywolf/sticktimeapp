"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Rink, Sticktime, rinks } from "@/lib/fetch";
import { TableCell, TableRow } from "./ui/table";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import ClientTime from "@/components/ClientTime";
import { FilterIcon } from "lucide-react";
import OnlineRegistration from "@/components/OnlineRegistration";
import TableWrapper from "./TableWrapper";
import clsx from "clsx";
import { formatDollars } from "@/lib/time";
import rinkMap from "@/lib/rinkMap";

export default function Filters({ sticktimes }: { sticktimes: Sticktime[] }) {
  const [disabledRinks, setDisabledRinks] = useState<Rink[]>([]);
  const [rows, setRows] = useState<React.ReactNode | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    const rows = sticktimes.map((sticktime) => {
      const rink = rinkMap(sticktime.rink); // additional rink data

      if (!disabledRinks.includes(sticktime.rink)) {
        count++;

        return (
          <TableRow
            key={
              sticktime.rink +
              sticktime.start.toISOString() +
              sticktime.end.toISOString()
            }
          >
            <TableCell className={clsx(rink.style, "flex gap-2 items-center")}>
              <a
                href={rink.href}
                target="_blank"
                referrerPolicy="no-referrer"
                className="font-semibold flex hover:opacity-80 underline"
              >
                {sticktime.rink}
              </a>
              {rink.onlineRegistration && <OnlineRegistration />}
            </TableCell>

            <ClientTime start={sticktime.start} end={sticktime.end} />

            <TableCell className="text-right">
              {formatDollars(sticktime.price)}
            </TableCell>
          </TableRow>
        );
      }
    });

    setRows(rows);
    setCount(count);
  }, [disabledRinks, sticktimes]);

  const disableRinksChangeHandler = (checked: boolean, rink: Rink) => {
    if (checked) {
      setDisabledRinks((prev) => [...prev, rink]);
    } else {
      setDisabledRinks((prev) => prev.filter((prevRink) => prevRink !== rink));
    }
  };

  return (
    <>
      <span className="text-xs text-neutral-300 pb-2">{count} results</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex w-full items-center gap-2" variant="outline">
            <FilterIcon className="h-4 w-4" /> Filter Rinks
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Remove Rinks</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {rinks.map((rink: Rink) => (
            <DropdownMenuCheckboxItem
              key={rink}
              checked={disabledRinks.includes(rink)}
              onCheckedChange={(checked) =>
                disableRinksChangeHandler(checked, rink)
              }
            >
              {rink}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <TableWrapper>{rows}</TableWrapper>
    </>
  );
}
