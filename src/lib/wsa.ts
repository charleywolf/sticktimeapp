import { getDateOneMonthFromNow, getTodaysDate } from "./time";

import { Sticktime } from "./fetch";

export default async function wsa(): Promise<Sticktime[]> {
  const pageLength = process.env.NODE_ENV === "development" ? 500 : 500;
  const result = await fetch(
    `https://apps.daysmartrecreation.com/dash/jsonapi/api/v1/events?cache[save]=false&page[size]=${pageLength}&sort=start&company=wsa&filter[start__gte]=${getTodaysDate()}%2000%3A00%3A00&filter[start__lte]=${getDateOneMonthFromNow()}%2023%3A59%3A59&filter[resource.facility.my_sam_visible]=true&filter[eventType.code__not]=L&filter[eventType.id]=3&filter[resource.facility.id]=1&filterRelations[comments.comment_type]=public&include=homeTeam.league.programType%2CvisitingTeam.league.programType%2Csummary%2Cresource.facility%2CresourceArea%2Ccomments%2CeventType`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

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
          start: new Date(event.attributes.start),
          end: new Date(event.attributes.end),
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

  console.log(sticktimes.filter((sticktime) => sticktime !== null));

  return sticktimes.filter((sticktime) => sticktime !== null);
}
