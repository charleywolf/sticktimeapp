import brewster from "./brewster";
import icehutch from "./icehutch";
import wsa from "./wsa";

export type Rink = "Ice Hutch" | "WSA" | "Brewster";

export const pageLength = process.env.NODE_ENV === "development" ? 50 : 500; // DaySmart Recreation API
export interface Sticktime {
  start: Date;
  end: Date;
  rink: Rink;
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
  const sticktimes = [
    ...(await icehutch()),
    ...(await wsa()),
    ...(await brewster()),
  ];

  return sticktimes.sort((a, b) => a.start.getTime() - b.start.getTime());
}
