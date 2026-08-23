/**
 * Pure date-grid helpers backing `ui/calendar`. Plain `Date` arithmetic —
 * NOT date-fns. The registry's `calendar.tsx` depends on `date-fns` only to
 * feed `react-day-picker`'s grid engine; since this port reimplements the
 * grid natively (see `calendar.component.ts` header), neither `date-fns` nor
 * `react-day-picker` is a dependency of this app. Native Date math is a few
 * dozen lines and keeps the bundle-cost bucket's actual bundle cost at zero.
 */

export interface DateRange {
  from: Date | undefined;
  to?: Date;
}

export type CalendarMode = 'single' | 'multiple' | 'range';
export type CalendarSelected = Date | Date[] | DateRange | undefined;

export interface CalendarDay {
  date: Date;
  /** Falls outside the month currently being rendered (leading/trailing week padding). */
  outside: boolean;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addDays(date: Date, amount: number): Date {
  const next = startOfDay(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

/** `weekStartsOn`: 0 = Sunday .. 6 = Saturday, matching `Date#getDay()`. */
export function startOfWeek(date: Date, weekStartsOn: number): Date {
  const offset = (date.getDay() - weekStartsOn + 7) % 7;
  return addDays(date, -offset);
}

export function endOfWeek(date: Date, weekStartsOn: number): Date {
  return addDays(startOfWeek(date, weekStartsOn), 6);
}

/** Stable per-day key for DOM lookup / `*ngFor` tracking — local calendar date, not UTC. */
export function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/** Full 7-day-wide weeks covering `month`, padded to week boundaries on both ends. */
export function getCalendarWeeks(month: Date, weekStartsOn: number): CalendarDay[][] {
  const gridStart = startOfWeek(startOfMonth(month), weekStartsOn);
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const gridEnd = endOfWeek(monthEnd, weekStartsOn);

  const weeks: CalendarDay[][] = [];
  let cursor = gridStart;
  while (cursor.getTime() <= gridEnd.getTime()) {
    const week: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      week.push({ date: cursor, outside: !isSameMonth(cursor, month) });
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

/**
 * Locale-aware 2-letter weekday labels (`Su`, `Mo`, …), starting from
 * `weekStartsOn`. Intl has no built-in 2-letter weekday format (`narrow`
 * collapses Tue/Thu to the same "T"), so this takes the first 2 characters
 * of the locale's `short` name — matches the Force UI calendar spec's
 * compact header while staying locale-driven rather than a hardcoded table.
 */
export function getWeekdayLabels(weekStartsOn: number): string[] {
  // 2024-01-07 is a Sunday — an arbitrary fixed reference week, offset to weekStartsOn.
  const referenceSunday = new Date(2024, 0, 7);
  return Array.from({ length: 7 }, (_, i) =>
    addDays(referenceSunday, weekStartsOn + i)
      .toLocaleDateString(undefined, { weekday: 'short' })
      .slice(0, 2),
  );
}

export function isDateInRange(date: Date, range: DateRange): boolean {
  if (!range.from) return false;
  const to = range.to ?? range.from;
  const [start, end] =
    range.from.getTime() <= to.getTime() ? [range.from, to] : [to, range.from];
  const time = startOfDay(date).getTime();
  return time >= startOfDay(start).getTime() && time <= startOfDay(end).getTime();
}
