import { TIMEZONE, getDateOneMonthFromNow, getTodaysDate } from "../utils/time";

import { Sticktime } from "../fetch";
import { fromZonedTime } from "date-fns-tz";

export default async function wsa(): Promise<Sticktime[]> {
  const link = `https://apps.daysmartrecreation.com/dash/jsonapi/api/v1/events?cache[save]=false&page[size]=${400}&sort=end%2Cstart&include=summary%2Ccomments%2Cresource.facility.address%2Cresource.address%2CeventType.product.locations%2ChomeTeam.facility.address%2ChomeTeam.league.season.priorities.memberships%2ChomeTeam.league.season.priorities.activatedBySeasons%2ChomeTeam.programType%2ChomeTeam.product%2ChomeTeam.product.locations%2ChomeTeam.sport&filter[id__in]=155959%2C156090%2C156095%2C155989%2C156078%2C156019%2C156084&filter[start_date__gte]=${getTodaysDate()}&filter[start_date__lte]=${getDateOneMonthFromNow()}&filter[unconstrained]=1&filter[homeTeam.sport_id__in]=20&filterRelations[comments.comment_type]=public&company=wsa`;

  console.log("Fetching WSA sticktimes from:", link);

  const result = await fetch(link, {
    next: {
      revalidate: 3600,
    },
  });

  try {
    const events = await result.json();

    const sticktimes: (Sticktime | null)[] = events.data.map((event: any) => {
      try {
        const element = events.included.find(
          (item: any) => item.id === event.relationships.homeTeam.data.id
        );

        if (
          element &&
          element.type === "teams" &&
          element.attributes.name.includes("Stick") &&
          element.attributes.name.includes("Time")
        ) {
          return {
            start: fromZonedTime(event.attributes.start, TIMEZONE),
            end: fromZonedTime(event.attributes.end, TIMEZONE),
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
