import { Rink } from "./rinks";
import brewster from "./rinks/brewster";
import chelseapiersct from "./rinks/chelseapiersct";
import icehutch from "./rinks/icehutch";
import twinrinks from "./rinks/twinrinks";
import wsa from "./rinks/wsa";

export const pageLength = process.env.NODE_ENV === "development" ? 50 : 500; // DaySmart Recreation API
export interface Sticktime {
  start: Date;
  end: Date;
  rink: Rink;
  price: number;
  spotsLeft?: number;
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
    ...(await twinrinks()),
    ...(await chelseapiersct()),
  ];

  return sticktimes.sort((a, b) => a.start.getTime() - b.start.getTime());
}
