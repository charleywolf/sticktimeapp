import { Sticktime, pageLength } from "./fetch";
import { getDateOneMonthFromNow, getTodaysDate } from "./time";

export default async function twinrinks(): Promise<Sticktime[]> {
  const result = await fetch(
    `https://apps.daysmartrecreation.com/dash/jsonapi/api/v1/events?cache[save]=false&page[size]=${pageLength}&sort=start&company=stamford&filter[start__gte]=${getTodaysDate()}%2000%3A00%3A00&filter[start__lte]=${getDateOneMonthFromNow()}%2023%3A59%3A59&filter[resource.facility.my_sam_visible]=true&filter[eventType.code__not]=L&filter[eventType.id]=8&filter[resource.facility.id]=1&filterRelations[comments.comment_type]=public&include=homeTeam.league.programType%2CvisitingTeam.league.programType%2Csummary%2Cresource.facility%2CresourceArea%2Ccomments%2CeventType`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const events = await result.json();

  const sticktimes: Sticktime[] = events.data.map((event: any) => {
    return {
      start: new Date(event.attributes.start_gmt),
      end: new Date(event.attributes.end_gmt),
      rink: "Twin Rinks",
      price: 25,
    };
  });

  return sticktimes;
}
