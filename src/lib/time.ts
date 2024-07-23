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
