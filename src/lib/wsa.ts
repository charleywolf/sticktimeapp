import {
  getDateOneMonthFromNow,
  getTodaysDate,
  getTomorrowsDate,
} from "./time";

import { Sticktime } from "./fetch";

function mapEventsToSticktimes(events: any): (Sticktime | null)[] {
  return events.data.map((event: any) => ({
    start: new Date(event.attributes.start),
    end: new Date(event.attributes.end),
    rink: "WSA",
    price: 25,
  }));
}

export default async function wsa(): Promise<Sticktime[]> {
  const result = await fetch(
    `
https://apps.daysmartrecreation.com/dash/jsonapi/api/v1/events?cache[save]=false&page[size]=50&sort=end%2Cstart&include=summary%2Ccomments%2Cresource.facility.address%2Cresource.address%2CeventType.product.locations%2ChomeTeam.facility.address%2ChomeTeam.league.season.priorities.memberships%2ChomeTeam.league.season.priorities.activatedBySeasons%2ChomeTeam.programType%2ChomeTeam.product%2ChomeTeam.product.locations%2ChomeTeam.sport&filter[id__in]=122078%2C122052%2C121969&filter[start_date__gte]=${getTodaysDate()}&filter[start_date__lte]=${getDateOneMonthFromNow()}&filter[unconstrained]=1&filterRelations[comments.comment_type]=public&company=wsa`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const result2 = await fetch(
    `https://apps.daysmartrecreation.com/dash/jsonapi/api/v1/events?cache[save]=false&page[size]=50&sort=end%2Cstart&include=summary%2Ccomments%2Cresource.facility.address%2Cresource.address%2CeventType.product.locations%2ChomeTeam.facility.address%2ChomeTeam.league.season.priorities.memberships%2ChomeTeam.league.season.priorities.activatedBySeasons%2ChomeTeam.programType%2ChomeTeam.product%2ChomeTeam.product.locations%2ChomeTeam.sport&filter[id__in]=122054%2C121971%2C122080&filter[start_date__gte]=${getTomorrowsDate()}&filter[start_date__lte]=${getDateOneMonthFromNow()}&filter[unconstrained]=1&filterRelations[comments.comment_type]=public&company=wsa`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const events = await result.json();
  const events2 = await result2.json();

  return [
    ...mapEventsToSticktimes(events),
    ...mapEventsToSticktimes(events2),
  ].filter((sticktime) => sticktime !== null);
}
