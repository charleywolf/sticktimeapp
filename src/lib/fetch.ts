import icehutch from "./icehutch";

export interface Sticktime {
  start: Date;
  end: Date;
  rink: "Ice Hutch";
  price: number;
}

/**
 * all helper functions should return sticktimes
 *  - from today's date starting at 0:00
 *  - to the end of the month (use isMoreThanAMonthFromNow)
 **/

/**
 * Returns sticktimes from local rinks in ascending order in terms of date time, from today to the end of the month.
 *
 * @export
 * @async
 * @returns {Promise<Sticktime[]>}
 */
export default async function fetchSticktimes(): Promise<Sticktime[]> {
  return await icehutch();
}
