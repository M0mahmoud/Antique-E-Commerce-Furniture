import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStartOfNextWeek = () => {
  const today = new Date();
  const currentDay = today.getDay();
  // Calculate days until next week's start (assuming week starts on Monday)
  const daysUntilNextWeek = (7 - currentDay + 1) % 7 || 7;
  const nextWeekStart = new Date(
    today.setDate(today.getDate() + daysUntilNextWeek)
  );
  return nextWeekStart.toISOString().split("T")[0];
};
