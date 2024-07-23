import icehutch from "./icehutch";

export interface Sticktime {
  start: Date;
  end: Date;
  location: "Ice Hutch";
  price: number;
}

/**
 * all helper functions should return sticktimes
 *  - from today's date starting at 0:00
 *  - to the end of the month (use isMoreThanAMonthFromNow)
 **/

export default async function fetchSticktimes(): Promise<Sticktime[]> {
  return await icehutch();
}
