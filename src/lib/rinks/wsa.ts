import {
  TIMEZONE,
  getDateOneMonthFromNow,
  getDatesInRange,
  getTodaysDate,
} from "../utils/time";

import { Sticktime } from "../fetch";
import { fromZonedTime } from "date-fns-tz";

export default async function wsa(): Promise<Sticktime[]> {
  return getSticktimes(getTodaysDate(), getDateOneMonthFromNow(), 200);
  // const dates = getDatesInRange(getTodaysDate(), getDateOneMonthFromNow());
  // const sticktimes =
  // for (const date of dates) {
  //   console.log("Fetching WSA sticktimes for date:", date);
  //   const daysSticktimes = await getDaySticktimes(date);
  //   console.log(daysSticktimes);
  //   sticktimes.push(...daysSticktimes);
  // }
  // return sticktimes;
}

async function getSticktimes(
  startDate: string,
  endDate: string,
  size: number
): Promise<Sticktime[]> {
  const baseUrl = `https://apps.daysmartrecreation.com/dash/jsonapi/api/v1/events`;

  const params: Record<string, string> = {
    "cache[save]": "false",
    "page[size]": size.toString(),
    sort: "end,start",
    include: `summary,comments,resource.facility.address,resource.address,eventType.product.locations,homeTeam.facility.address,homeTeam.league.season.priorities.memberships,homeTeam.league.season.priorities.activatedBySeasons,homeTeam.programType,homeTeam.product,homeTeam.product.locations,homeTeam.sport`,
    // "filter[id__in]": "",
    "filter[start_date__gte]": startDate,
    "filter[start_date__lte]": endDate,
    "filter[unconstrained]": "1",
    "filterRelations[comments.comment_type]": "public",
    company: "wsa",
  };

  const queryString = new URLSearchParams(params).toString();

  const url = `${baseUrl}?${queryString}`;

  try {
    console.log("Fetching WSA sticktimes from link:", url);
    const result = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });

    const events = await result.json();
    const summaries = events.included.filter(
      (element: any) => element.type === "event-summaries"
    );
    const sticktimes: (Sticktime | null)[] = summaries.map((event: any) => {
      try {
        const element = event;

        if (
          element.attributes &&
          element.attributes.name &&
          element.attributes.name.includes("Stick")
        ) {
          return {
            start: fromZonedTime(event.attributes.start_date, TIMEZONE),
            end: fromZonedTime(event.attributes.end_date, TIMEZONE),
            rink: "WSA",
            price: 25,
          };
        } else {
          return null;
        }
      } catch (e) {
        console.error("Error parsing WSA event", e);
        return null;
      }
    });

    return sticktimes.filter((sticktime) => sticktime !== null);
  } catch (e: unknown) {
    console.error("Error fetching wsa sticktimes:\n", e);
    return [];
  }
}
