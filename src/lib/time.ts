import { format, isToday, isTomorrow, isYesterday } from "date-fns";

import { formatInTimeZone } from "date-fns-tz";

// YYYY-MM-DD
export function getTodaysDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isMoreThanAMonthFromNow(date: Date): boolean {
  const now = new Date();
  const oneWeekInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  return date.getTime() > now.getTime() + oneWeekInMilliseconds;
}

export const TIMEZONE = "America/New_York";

export function formatDate(date: Date): string {
  // Format date in YYYY-MM-DD format
  const dateString = formatInTimeZone(date, TIMEZONE, "yyyy-MM-dd");

  // Check if the date is today, tomorrow, or yesterday
  if (isToday(dateString)) {
    return `${dateString} (Today)`;
  }

  if (isTomorrow(dateString)) {
    return `${dateString} (Tomorrow)`;
  }

  if (isYesterday(dateString)) {
    return `${dateString} (Yesterday)`;
  }

  // If none of the above, return the formatted date
  return dateString;
}

export function formatTime(date: Date): string {
  return formatInTimeZone(date, TIMEZONE, "hh:mm a");
}

export function formatDollars(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
