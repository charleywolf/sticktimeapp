import { TIMEZONE, getDateOneMonthFromNow, getTodaysDate } from "../utils/time";

import { Sticktime } from "../fetch";
import { fromZonedTime } from "date-fns-tz";

export default async function chelseapiersct(): Promise<Sticktime[]> {
  const result = await fetch(
    "https://myaccount.chelseapiers.com/api/classes/search-booking-participations",
    {
      method: "POST",
      body: JSON.stringify({
        activityGroupIds: [],
        activityIds: [8327],
        centers: [18],
        dateFrom: getTodaysDate(),
        dateTo: getDateOneMonthFromNow(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
      },
    }
  );

  const events = await result.json();

  const sticktimes: Sticktime[] = events.map((event: any) => {
    if (event.booking.name === "Stick & Puck") {
      return {
        start: fromZonedTime(
          `${event.booking.date}T${event.booking.startTime}:00.000Z`,
          TIMEZONE
        ),
        end: fromZonedTime(
          `${event.booking.date}T${event.booking.endTime}:00.000Z`,
          TIMEZONE
        ),
        rink: "Chelsea Piers CT",
        price: 25,
        spotsLeft: event.booking.classCapacity - event.booking.bookedCount,
      };
    }
  });

  return sticktimes;
}
