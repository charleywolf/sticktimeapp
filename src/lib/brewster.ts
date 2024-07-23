import { TIMEZONE, getDateOneMonthFromNow, getTodaysDate } from "./time";

import { Sticktime } from "./fetch";
import { fromZonedTime } from "date-fns-tz";

export default async function wsa(): Promise<Sticktime[]> {
  const data = {
    LocationId: "18274",
    Sunday: "true",
    Monday: "true",
    Tuesday: "true",
    Wednesday: "true",
    Thursday: "true",
    Friday: "true",
    Saturday: "true",
    StartTime: "12:00 AM",
    EndTime: "12:00 AM",
    StartDate: getTodaysDate(),
    EndDate: getDateOneMonthFromNow(),
    "ReservationTypes[0].Selected": "true",
    "ReservationTypes[0].Id": "-1",
    "ReservationTypes[1].Id": "271672",
    "Resources[0].Selected": "true",
    "Resources[0].Id": "-1",
  };

  const result = await fetch(
    "https://brewstericearena.ezfacility.com/Sessions/FilterResults",
    {
      next: {
        revalidate: 3600,
      },
      method: "POST",
      body: new URLSearchParams(data),
    }
  );

  const events = await result.json();

  const sticktimes: Sticktime[] = events.map((event: any) => {
    return {
      start: fromZonedTime(event.start, TIMEZONE),
      end: fromZonedTime(event.end, TIMEZONE),
      rink: "Brewster",
      price: 20,
    };
  });

  return sticktimes;
}
