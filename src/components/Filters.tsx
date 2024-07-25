"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterIcon, LocateIcon } from "lucide-react";
import { Rink, Sticktime, rinks } from "@/lib/fetch";
import { TableCell, TableRow } from "./ui/table";
import { isBefore, startOfDay } from "date-fns";
import rinkMap, { rinkData } from "@/lib/rinkMap";
import { useCallback, useEffect, useState } from "react";

import { Button } from "./ui/button";
import ClientTime from "@/components/ClientTime";
import Link from "next/link";
import OnlineRegistration from "@/components/OnlineRegistration";
import TableWrapper from "./TableWrapper";
import clsx from "clsx";
import { formatDollars } from "@/lib/utils/time";
import { toast } from "sonner";

export default function Filters({ sticktimes }: { sticktimes: Sticktime[] }) {
  const [disabledRinks, setDisabledRinks] = useState<Rink[]>([]);
  const [rows, setRows] = useState<React.ReactNode | null>(null);
  const [count, setCount] = useState<number>(0);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [rinkDistance, setRinkDistance] = useState<{ [key: string]: number }>({
    "Ice Hutch": -1,
    WSA: -1,
    Brewster: -1,
    "Twin Rinks": -1,
  });

  useEffect(() => {
    if (location) {
      const calculateCoordinates = async () => {
        const newRinkDistance = {
          "Ice Hutch": -1,
          WSA: -1,
          Brewster: -1,
          "Twin Rinks": -1,
        };

        for (const rink in newRinkDistance) {
          try {
            const anyRink = rink as Rink;
            const rinkCoordinates = rinkData[anyRink].coordinates;

            const result = await fetch("/waze-api", {
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({
                from: { y: location.latitude, x: location.longitude },
                to: {
                  y: rinkCoordinates.latitude,
                  x: rinkCoordinates.longitude,
                },
                nPaths: 3,
                useCase: "LIVEMAP_PLANNING",
                interval: 15,
                arriveAt: true,
              }),
              method: "POST",
              credentials: "omit",
              // "mode": "cors",
              // "redirect": "follow",
              // "referrer": "https://www.waze.com/live-map/directions/the-ice-hutch-garden-ave-655-mount-vernon?to=place.w.187564441.1875513338.843746&from=place.w.187564443.1875513355.662123",
              // "referrerPolicy": "strict-origin-when-cross-origin"
            });

            const body = await result.json();

            console.log(body);

            const seconds = parseInt(
              body.alternatives[0].response.totalSeconds
            );

            if (seconds) newRinkDistance[anyRink] = Math.round(seconds / 60);
          } catch (error) {
            console.error(error);
          }
        }

        setRinkDistance(newRinkDistance);
      };

      calculateCoordinates();
    }
  }, [location]);

  useEffect(() => {
    let count = 0;
    const rows = sticktimes.map((sticktime) => {
      if (
        !disabledRinks.includes(sticktime.rink) &&
        !isBefore(sticktime.start, startOfDay(new Date()))
      ) {
        count++;

        const rink = rinkMap(sticktime.rink); // additional rink data

        return (
          <TableRow
            key={
              sticktime.rink +
              sticktime.start.toISOString() +
              sticktime.end.toISOString()
            }
          >
            <TableCell className={clsx(rink.style, "flex gap-2 items-center")}>
              <Link
                href={rink.href}
                target="_blank"
                className="font-semibold flex hover:opacity-80 underline"
              >
                {sticktime.rink}
              </Link>
              {rink.onlineRegistration && <OnlineRegistration />}
            </TableCell>

            <ClientTime start={sticktime.start} end={sticktime.end} />

            {location !== null && (
              <TableCell>
                {rinkDistance[sticktime.rink] !== -1
                  ? rinkDistance[sticktime.rink] + "m"
                  : "Calculating..."}
              </TableCell>
            )}

            <TableCell className="text-right">
              {formatDollars(sticktime.price)}
            </TableCell>
          </TableRow>
        );
      }
    });

    setRows(rows);
    setCount(count);
  }, [disabledRinks, sticktimes, location, rinkDistance]);

  const disableRinksChangeHandler = (checked: boolean, rink: Rink) => {
    if (checked) {
      setDisabledRinks((prev) => [...prev, rink]);
    } else {
      setDisabledRinks((prev) => prev.filter((prevRink) => prevRink !== rink));
    }
  };

  const locationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        toast.success("Successfully enabled rink distance calculation!");
      },
      () => {
        toast.error("Please enable location access to use this feature.");
      }
    );
  };

  return (
    <>
      <span className="text-xs text-neutral-300 text-left w-full mt-8 sm:mt-0">
        {count} results
      </span>

      <div className="flex flex-col xs:flex-row gap-2 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex w-full items-center gap-2 border-4"
              variant="outline"
            >
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
        <Button
          className="flex w-full items-center gap-2 border-4"
          variant="outline"
          onClick={locationHandler}
          disabled={location !== null}
        >
          <LocateIcon className="h-4 w-4" /> See Distance to Rinks
        </Button>
      </div>

      <TableWrapper distanceEnabled={location !== null}>{rows}</TableWrapper>
    </>
  );
}
