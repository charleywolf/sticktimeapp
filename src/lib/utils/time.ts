import { addDays, format, isToday, isTomorrow, isYesterday } from "date-fns";

import { formatInTimeZone } from "date-fns-tz";

export function getTodaysDate(): string {
  const now = new Date();

  return formatInTimeZone(now, TIMEZONE, "yyyy-MM-dd"); // Convert the date back to the original time zone
}

export function getTomorrowsDate(): string {
  const now = new Date();
  const zonedDate = formatInTimeZone(now, TIMEZONE, "yyyy-MM-dd"); // Convert current date to the specified time zone
  const tomorrow = addDays(zonedDate, 1); // Add one day

  return formatInTimeZone(tomorrow, TIMEZONE, "yyyy-MM-dd"); // Convert the date back to the original time zone
}

export function getDateOneMonthFromNow(): string {
  const today = new Date();
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  // Check if the date is invalid (e.g., April 31st)
  if (nextMonth.getMonth() !== (today.getMonth() + 1) % 12) {
    // If invalid, set the date to the last day of the month
    nextMonth.setDate(0);
  }

  const year = nextMonth.getFullYear();
  const month = String(nextMonth.getMonth() + 1).padStart(2, "0");
  const day = String(nextMonth.getDate()).padStart(2, "0");

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
  const dateString = format(date, "MM/dd/yyyy");

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
  return format(date, "hh:mm a");
}

export function formatDollars(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
