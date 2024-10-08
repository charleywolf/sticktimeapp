// price is 25.00

import { getTodaysDate, isMoreThanAMonthFromNow } from "../utils/time";

import { Sticktime } from "../fetch";

export default async function icehutch(): Promise<Sticktime[]> {
  const result = await fetch(
    // NOTE: This API key can only be used for this endpoint and for public-facing requests, so it's okay. Also, there is no cost for additional calendar requests (see: https://developers.google.com/calendar/api/guides/quota).
    // This was obtained from the publically facing icehutch.com website.
    `https://www.googleapis.com/calendar/v3/calendars/sandra@icehutch.com/events?key=AIzaSyA4x4wZZ0GGtnm-iR9iozrdpE49SwO28rY&singleEvents=True&maxResults=9999&timeMin=${getTodaysDate()}T00:00:00-07:00&timeZone=America/New_York`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const events = await result.json();

  const sticktimes: (Sticktime | null)[] = events.items.map((event: any) => {
    if (event.summary.trim() === "Stick Time")
      return {
        price: 25,
        rink: "Ice Hutch",
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
      };
    else return null;
  });

  const nonnullSticktimes = sticktimes.filter(
    (sticktime) => sticktime !== null
  );

  return nonnullSticktimes.filter(
    (sticktime) => !isMoreThanAMonthFromNow(sticktime.end)
  );
}
