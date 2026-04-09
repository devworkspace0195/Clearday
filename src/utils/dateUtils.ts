/** Returns midnight (start) of a given date in local time. */
export const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Returns midnight (start) of today in local time. */
export const todayStart = (): Date => startOfDay(new Date());

/** Returns midnight (start) of tomorrow in local time. */
export const tomorrowStart = (): Date => {
  const d = todayStart();
  d.setDate(d.getDate() + 1);
  return d;
};

/** Returns midnight (start) of the day after tomorrow. */
export const dayAfterTomorrowStart = (): Date => {
  const d = tomorrowStart();
  d.setDate(d.getDate() + 1);
  return d;
};

/** Returns true when a timestamp falls within today (local time). */
export const isToday = (timestamp: number): boolean => {
  const t = todayStart().getTime();
  return timestamp >= t && timestamp < t + 86_400_000;
};

/** Returns true when a timestamp falls within tomorrow (local time). */
export const isTomorrow = (timestamp: number): boolean => {
  const t = tomorrowStart().getTime();
  return timestamp >= t && timestamp < t + 86_400_000;
};

/** Formats a time-only timestamp as "3:30 PM". */
export const formatTime = (timestamp: number): string =>
  new Date(timestamp).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

/**
 * Formats a due-date timestamp for display.
 * "Today" | "Tomorrow" | "Mon, Jan 1"
 */
export const formatDueDate = (timestamp: number): string => {
  const todayMs = startOfDay(new Date()).getTime();
  const tomorrowMs = todayMs + 86_400_000;

  if (timestamp >= todayMs && timestamp < tomorrowMs) {
    return 'Today';
  }
  if (timestamp >= tomorrowMs && timestamp < tomorrowMs + 86_400_000) {
    return 'Tomorrow';
  }
  return new Date(timestamp).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};
