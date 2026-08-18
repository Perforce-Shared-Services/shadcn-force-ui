import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  Injector,
  model,
  signal,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { Button, buttonVariants, type ButtonVariant } from '@/app/ui/button';

import {
  CALENDAR_DROPDOWN_CARET_SVG,
  CALENDAR_NEXT_MONTH_SVG,
  CALENDAR_PREVIOUS_MONTH_SVG,
} from './calendar.icons';
import {
  addDays,
  addMonths,
  type CalendarDay,
  type CalendarMode,
  type CalendarSelected,
  dayKey,
  type DateRange,
  endOfWeek,
  getCalendarWeeks,
  getWeekdayLabels,
  isDateInRange,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from './calendar.utils';

export type { CalendarDay, CalendarMode, CalendarSelected, DateRange } from './calendar.utils';

export type CalendarCaptionLayout = 'label' | 'dropdown';

/**
 * Angular build of a Force UI-style calendar (date picker grid) — leaf
 * component, not a registry port.
 *
 * NOT a byte-parity port: `@force-ui/calendar` wraps `react-day-picker`
 * (`DayPicker`), a headless React widget with no Angular build and no
 * radix-ng equivalent — its month-grid generation, keyboard roving-tabindex,
 * and range/multiple selection state all live inside that library. Per the
 * maintainer's bundle-cost call (2026-07), this ports the same public shape
 * — `mode`/`selected`/`month`/`numberOfMonths`/`disabled`/`captionLayout` —
 * using plain native `Date` arithmetic (see `calendar.utils.ts`) instead of
 * pulling in `react-day-picker` + `date-fns`. Neither ends up as an app
 * dependency — the actual bundle-cost impact of choosing this component is
 * therefore ~0, not the weight implied by the upstream deps.
 *
 * Deliberate structural deviations from the registry (documented, same spirit
 * as `ui/input-otp`'s caret-alignment deviation):
 * - The registry's `week`/`weekdays` rows are DayPicker-generated `<tr>`s
 *   whose Tailwind classes (`flex`, `mt-2`) only work because DayPicker also
 *   ships its own base stylesheet (`react-day-picker/style.css`) setting
 *   `display: flex` on those rows first — margin/flex don't apply to a
 *   plain `<tr>` otherwise. This port doesn't import that stylesheet, so it
 *   uses a plain `<table>` with `w-(--cell-size)` on each weekday `<th>` for
 *   equal-width columns instead of reproducing the flex override. (Do NOT
 *   add `table-fixed`/`w-full` to the `<table>` itself to "help" this — a
 *   `w-full` table inside a `w-fit` ancestor resolves against the AVAILABLE
 *   width, not the ancestor's fit-content result, so the whole calendar
 *   balloons to fill its container instead of hugging its ~7×28px content.
 *   Caught visually, not from any tool — the component silently rendered at
 *   viewport width in every story.)
 * - The registry hangs `today`/`outside`/`disabled`/`selected` state classes
 *   on the `<td>` day wrapper (relying on DayPicker's own modifier-to-
 *   className plumbing); this port resolves the same states directly on the
 *   day `<button>` (see `dayButtonClasses()`) since that's the element that's
 *   actually visible — the `<td>` here is a plain structural cell.
 * - `rtl:**:[.rdp-button_next>svg]:rotate-180` (registry) targets DayPicker's
 *   own internal classnames, which don't exist in this port; the equivalent
 *   `cn-rtl-flip` utility is applied directly to this component's own chevron
 *   icons instead.
 * - `captionLayout` supports `'label'` and `'dropdown'` (month + year native
 *   `<select>`s, styled the same way DayPicker itself does — a transparent
 *   `<select>` absolutely overlaid on a styled label). The registry's split
 *   `'dropdown-months'` / `'dropdown-years'` (only one axis as a dropdown) is
 *   not implemented — a documented gap, add if a consumer needs it.
 * - No `required` (single-mode "can't deselect") prop — a documented gap.
 * - Day cells render `buttonVariants({ variant: 'ghost' })` directly rather
 *   than the `uiButton` directive (the nav prev/next buttons still use it,
 *   see `buttonVariant`). `ButtonComponent`'s own host binding
 *   `'[attr.tabindex]': "isAnchor && inactive() ? '-1' : null"` always
 *   resolves to `null` for a `<button>` host, and directive host bindings
 *   apply AFTER a template's own bindings on the same element — so it
 *   silently overwrote a day cell's roving-tabindex `[attr.tabindex]` on
 *   every render, defeating the single-Tab-stop grid entirely (caught via
 *   `document.activeElement` + `getAttribute('tabindex')` in Storybook, not
 *   by reading the code — the keyboard-driven `.focus()` calls still "worked"
 *   because a native `<button>` is always in the natural Tab order regardless
 *   of the attribute). Using the plain `buttonVariants()` function keeps the
 *   ghost hover/focus/disabled styling with no host bindings to collide.
 *
 * Usage:
 *   <div uiCalendar mode="single" [(selected)]="selectedDay"></div>
 *   <div uiCalendar mode="range" [(selected)]="selectedRange" [numberOfMonths]="2"></div>
 *   <div uiCalendar mode="multiple" [(selected)]="selectedDays" [disabled]="isWeekend"></div>
 *
 * - `mode` — `'single' | 'multiple' | 'range'` (default `'single'`), mirroring
 *   `react-day-picker`'s own prop values (not modeled as an enum — matches
 *   every other ported `cva`/variant-shaped prop in `ui/*`, e.g.
 *   `StepperOrientation`).
 * - `selected` — two-way (`[(selected)]`); shape depends on `mode`: a single
 *   `Date`, a `Date[]`, or a `{ from, to? }` range.
 * - `month` — two-way (`[(month)]`); the currently displayed month (any day
 *   within it). Defaults to the month containing `selected` (single/range) or
 *   today.
 * - `numberOfMonths` — how many months to render side by side (default 1).
 * - `disabled` — `(date: Date) => boolean` matcher; combined with
 *   `fromDate`/`toDate` bounds when present.
 * - `fromDate` / `toDate` — inclusive bounds; days outside are disabled and
 *   month navigation past them is blocked.
 * - `weekStartsOn` — 0 (Sunday, default) through 6 (Saturday).
 * - `showOutsideDays` — leading/trailing days from adjacent months (default
 *   true); when false they're rendered `invisible` (keeps grid alignment).
 * - `showWeekNumber` — an extra leading ISO-ish week-number column.
 * - `captionLayout` — `'label'` (default, arrows + text) or `'dropdown'`.
 * - `buttonVariant` — `ui/button` variant for the prev/next nav buttons
 *   (default `'ghost'`), forwarded from the registry's `buttonVariant` prop.
 *
 * Accessibility: each month is a labelled `<table>` (`<caption
 * class="sr-only">`) with `scope="col"` weekday headers. Keyboard model
 * matches the APG date-picker-grid pattern: arrow keys move one day/week,
 * Home/End jump to the visible week's start/end, PageUp/PageDown (+Shift for
 * a year) change month, Enter/Space selects — a roving `tabindex` keeps the
 * whole grid a single Tab stop (WCAG 2.1.1).
 */
@Component({
  selector: '[uiCalendar]',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'calendar',
    '[class]': 'rootClasses()',
    '[attr.id]': 'id()',
    '[attr.aria-label]': 'ariaLabel()',
    '(keydown)': 'onGridKeydown($event)',
  },
  template: `
    <div class="relative flex flex-col gap-4 md:flex-row">
      @for (displayedMonth of displayedMonths(); track displayedMonth.getTime(); let mi = $index) {
        <div class="flex w-full flex-col gap-4">
          <div class="absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1">
            @if (mi === 0) {
              <button
                uiButton
                type="button"
                [variant]="buttonVariant()"
                class="size-(--cell-size) select-none p-0 motion-reduce:transition-none disabled:bg-transparent disabled:opacity-50"
                [disabled]="!canGoToPreviousMonth()"
                (click)="goToPreviousMonth()"
                aria-label="Previous month"
              >
                <span aria-hidden="true" class="cn-rtl-flip" [innerHTML]="previousIcon"></span>
              </button>
            } @else {
              <span class="size-(--cell-size)"></span>
            }
            @if (mi === displayedMonths().length - 1) {
              <button
                uiButton
                type="button"
                [variant]="buttonVariant()"
                class="size-(--cell-size) select-none p-0 motion-reduce:transition-none disabled:bg-transparent disabled:opacity-50"
                [disabled]="!canGoToNextMonth()"
                (click)="goToNextMonth()"
                aria-label="Next month"
              >
                <span aria-hidden="true" class="cn-rtl-flip" [innerHTML]="nextIcon"></span>
              </button>
            } @else {
              <span class="size-(--cell-size)"></span>
            }
          </div>

          @if (captionLayout() === 'dropdown') {
            <div class="flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium">
              <span class="cn-calendar-dropdown-root relative inline-flex items-center rounded-(--cell-radius) has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50">
                <select
                  name="calendar-month"
                  class="absolute inset-0 cursor-pointer appearance-none bg-transparent opacity-0"
                  [attr.aria-label]="'Month, ' + monthLabel(displayedMonth)"
                  (change)="onMonthOptionChange($event, displayedMonth)"
                >
                  @for (monthOption of monthOptions(); track monthOption.value) {
                    <option [value]="monthOption.value" [selected]="monthOption.value === displayedMonth.getMonth()">{{ monthOption.label }}</option>
                  }
                </select>
                <span class="pointer-events-none flex items-center gap-1 rounded-(--cell-radius) text-sm [&_svg]:size-3.5 [&_svg]:fill-current [&_svg]:text-muted-foreground">
                  {{ monthOnlyLabel(displayedMonth) }}
                  <span aria-hidden="true" [innerHTML]="dropdownCaret"></span>
                </span>
              </span>
              <span class="cn-calendar-dropdown-root relative inline-flex items-center rounded-(--cell-radius) has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50">
                <select
                  name="calendar-year"
                  class="absolute inset-0 cursor-pointer appearance-none bg-transparent opacity-0"
                  [attr.aria-label]="'Year, ' + monthLabel(displayedMonth)"
                  (change)="onYearOptionChange($event, displayedMonth)"
                >
                  @for (yearOption of yearOptions(); track yearOption) {
                    <option [value]="yearOption" [selected]="yearOption === displayedMonth.getFullYear()">{{ yearOption }}</option>
                  }
                </select>
                <span class="pointer-events-none flex items-center gap-1 rounded-(--cell-radius) text-sm [&_svg]:size-3.5 [&_svg]:fill-current [&_svg]:text-muted-foreground">
                  {{ displayedMonth.getFullYear() }}
                  <span aria-hidden="true" [innerHTML]="dropdownCaret"></span>
                </span>
              </span>
            </div>
          } @else {
            <div class="flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)">
              <span class="select-none text-sm font-medium">{{ monthLabel(displayedMonth) }}</span>
            </div>
          }

          <table role="grid" class="border-collapse">
            <caption class="sr-only">{{ monthLabel(displayedMonth) }}</caption>
            <thead>
              <tr role="row">
                @if (showWeekNumber()) {
                  <th scope="col" role="columnheader" class="w-(--cell-size) select-none"></th>
                }
                @for (weekdayLabel of weekdayLabels(); track weekdayLabel) {
                  <th
                    scope="col"
                    role="columnheader"
                    class="w-(--cell-size) select-none rounded-(--cell-radius) py-1 text-xs font-normal text-muted-foreground"
                  >
                    {{ weekdayLabel }}
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (week of weeksFor(displayedMonth); track week[0].date.getTime()) {
                <tr role="row">
                  @if (showWeekNumber()) {
                    <td role="gridcell" class="select-none py-0.5 text-center text-xs text-muted-foreground">
                      {{ weekNumber(week[0].date) }}
                    </td>
                  }
                  @for (day of week; track dayKeyOf(day.date)) {
                    <td role="gridcell" class="group/day relative aspect-square h-full w-full select-none rounded-(--cell-radius) p-0 py-0.5 text-center">
                      <button
                        type="button"
                        [class]="dayButtonClasses(day)"
                        [attr.tabindex]="isFocusedDay(day.date) ? 0 : -1"
                        [attr.aria-selected]="isSelected(day.date) ? 'true' : null"
                        [attr.aria-hidden]="day.outside && !showOutsideDays() ? 'true' : null"
                        [attr.data-day-key]="dayKeyOf(day.date)"
                        [disabled]="isDisabled(day.date) || (day.outside && !showOutsideDays())"
                        (click)="onDayClick(day)"
                      >
                        {{ day.date.getDate() }}
                      </button>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class CalendarComponent {
  readonly mode = input<CalendarMode>('single');
  readonly selected = model<CalendarSelected>(undefined);
  readonly month = model<Date>(startOfMonth(new Date()));
  readonly numberOfMonths = input<number>(1);
  readonly showOutsideDays = input(true, { transform: booleanAttribute });
  readonly showWeekNumber = input(false, { transform: booleanAttribute });
  readonly weekStartsOn = input<number>(0);
  readonly disabled = input<((date: Date) => boolean) | undefined>(undefined);
  readonly fromDate = input<Date | undefined>(undefined);
  readonly toDate = input<Date | undefined>(undefined);
  readonly captionLayout = input<CalendarCaptionLayout>('label');
  readonly buttonVariant = input<ButtonVariant>('ghost');
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Roving-tabindex focus target; not necessarily `selected` (arrow keys move it freely). */
  protected readonly focusedDate = signal<Date>(startOfDay(new Date()));

  /** Guards the one-time "snap month/focus to the initial selection" effect below. */
  private hasSnappedToInitialSelection = false;

  private readonly hostEl = inject(ElementRef).nativeElement as HTMLElement;
  private readonly injector = inject(Injector);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly previousIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    CALENDAR_PREVIOUS_MONTH_SVG,
  );
  protected readonly nextIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    CALENDAR_NEXT_MONTH_SVG,
  );
  protected readonly dropdownCaret: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    CALENDAR_DROPDOWN_CARET_SVG,
  );

  constructor() {
    // `selected` (and `month`) may arrive as a bound value only after this
    // instance is constructed — signal inputs/models hold just their default
    // during field initializers, not yet the caller's binding (Angular writes
    // bound values in right after construction, before the first CD pass).
    // So the "default to the selection's month" behavior has to happen
    // reactively, once, rather than as a field-initializer computation.
    effect(() => {
      const value = this.selected();
      if (this.hasSnappedToInitialSelection || value === undefined) return;
      this.hasSnappedToInitialSelection = true;
      const day = firstDateOf(value);
      if (day) {
        this.month.set(startOfMonth(day));
        this.focusedDate.set(day);
      }
    });
  }

  protected readonly rootClasses = computed(() =>
    cn(
      "group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
      this.className(),
    ),
  );

  protected readonly displayedMonths = computed(() => {
    const count = Math.max(1, this.numberOfMonths());
    const base = startOfMonth(this.month());
    return Array.from({ length: count }, (_, i) => addMonths(base, i));
  });

  protected readonly weekdayLabels = computed(() => getWeekdayLabels(this.weekStartsOn()));

  protected readonly monthOptions = computed(() =>
    Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: new Date(2024, i, 1).toLocaleDateString(undefined, { month: 'short' }),
    })),
  );

  protected readonly yearOptions = computed(() => {
    const from = this.fromDate();
    const to = this.toDate();
    const currentYear = this.month().getFullYear();
    const startYear = from ? from.getFullYear() : currentYear - 100;
    const endYear = to ? to.getFullYear() : currentYear + 10;
    return Array.from({ length: Math.max(1, endYear - startYear + 1) }, (_, i) => startYear + i);
  });

  protected readonly canGoToPreviousMonth = computed(() => {
    const from = this.fromDate();
    if (!from) return true;
    const previousMonthEnd = addDays(startOfMonth(this.month()), -1);
    return previousMonthEnd.getTime() >= startOfDay(from).getTime();
  });

  protected readonly canGoToNextMonth = computed(() => {
    const to = this.toDate();
    if (!to) return true;
    const lastDisplayed = this.displayedMonths().at(-1) ?? this.month();
    const nextMonthStart = addMonths(startOfMonth(lastDisplayed), 1);
    return nextMonthStart.getTime() <= startOfDay(to).getTime();
  });

  protected weeksFor(month: Date): CalendarDay[][] {
    return getCalendarWeeks(month, this.weekStartsOn());
  }

  protected dayKeyOf(date: Date): string {
    return dayKey(date);
  }

  protected monthLabel(month: Date): string {
    return month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  }

  protected monthOnlyLabel(month: Date): string {
    return month.toLocaleDateString(undefined, { month: 'short' });
  }

  protected weekNumber(date: Date): number {
    // ISO 8601 week number.
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayNumber = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNumber + 3);
    const firstThursday = target.getTime();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.round((firstThursday - target.getTime()) / (7 * 24 * 3600 * 1000));
  }

  protected isToday(date: Date): boolean {
    return isSameDay(date, new Date());
  }

  protected isFocusedDay(date: Date): boolean {
    return isSameDay(date, this.focusedDate());
  }

  protected isDisabled(date: Date): boolean {
    const from = this.fromDate();
    const to = this.toDate();
    if (from && date.getTime() < startOfDay(from).getTime()) return true;
    if (to && date.getTime() > startOfDay(to).getTime()) return true;
    const matcher = this.disabled();
    return matcher ? matcher(date) : false;
  }

  protected isSelected(date: Date): boolean {
    const value = this.selected();
    if (!value) return false;
    if (value instanceof Date) return isSameDay(value, date);
    if (Array.isArray(value)) return value.some((d) => isSameDay(d, date));
    return isDateInRange(date, value);
  }

  protected isSelectedSingle(date: Date): boolean {
    return this.mode() !== 'range' && this.isSelected(date);
  }

  protected isRangeStart(date: Date): boolean {
    const value = this.selected() as DateRange | undefined;
    return this.mode() === 'range' && !!value?.from && isSameDay(value.from, date);
  }

  protected isRangeEnd(date: Date): boolean {
    const value = this.selected() as DateRange | undefined;
    if (this.mode() !== 'range' || !value?.to) return false;
    return isSameDay(value.to, date);
  }

  protected isRangeMiddle(date: Date): boolean {
    const value = this.selected() as DateRange | undefined;
    if (this.mode() !== 'range' || !value?.from || !value.to) return false;
    return isDateInRange(date, value) && !this.isRangeStart(date) && !this.isRangeEnd(date);
  }

  protected dayButtonClasses(day: CalendarDay): string {
    const rangeStart = this.isRangeStart(day.date);
    const rangeEnd = this.isRangeEnd(day.date);
    const rangeMiddle = this.isRangeMiddle(day.date);
    const selectedSingle = this.isSelectedSingle(day.date);
    const anySelectionState = rangeStart || rangeEnd || rangeMiddle || selectedSingle;
    const today = this.isToday(day.date) && !anySelectionState;
    const hidden = day.outside && !this.showOutsideDays();

    return cn(
      // buttonVariants (not `uiButton`) — see the header's "hand-port deviation"
      // note: ButtonComponent's own host `[attr.tabindex]` binding
      // unconditionally clobbers a template-level `[attr.tabindex]` on the
      // same element (host bindings apply after template bindings), which
      // silently defeats roving tabindex on every day cell. Using the plain
      // `buttonVariants()` function keeps the ghost hover/focus/disabled
      // styling without the directive's host bindings.
      buttonVariants({ variant: 'ghost' }),
      'relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 font-normal leading-none motion-reduce:transition-none dark:hover:text-foreground',
      rangeStart && 'rounded-(--cell-radius) rounded-l-(--cell-radius) bg-primary text-primary-foreground',
      rangeEnd && 'rounded-(--cell-radius) rounded-r-(--cell-radius) bg-primary text-primary-foreground',
      rangeMiddle && 'rounded-none bg-muted text-foreground',
      selectedSingle && 'bg-primary text-primary-foreground',
      today && 'bg-muted text-foreground',
      day.outside && !anySelectionState && 'text-muted-foreground',
      hidden && 'invisible pointer-events-none',
      'disabled:pointer-events-none disabled:bg-transparent disabled:text-muted-foreground disabled:opacity-50',
    );
  }

  protected onDayClick(day: CalendarDay): void {
    if (this.isDisabled(day.date)) return;
    this.selectDay(day.date);
    this.setFocusedDate(day.date);
  }

  protected onMonthOptionChange(event: Event, displayedMonth: Date): void {
    const monthIndex = Number((event.target as HTMLSelectElement).value);
    this.setMonthAndResyncFocus(new Date(displayedMonth.getFullYear(), monthIndex, 1));
  }

  protected onYearOptionChange(event: Event, displayedMonth: Date): void {
    const year = Number((event.target as HTMLSelectElement).value);
    this.setMonthAndResyncFocus(new Date(year, displayedMonth.getMonth(), 1));
  }

  protected goToPreviousMonth(): void {
    if (!this.canGoToPreviousMonth()) return;
    this.setMonthAndResyncFocus(addMonths(this.month(), -1));
  }

  protected goToNextMonth(): void {
    if (!this.canGoToNextMonth()) return;
    this.setMonthAndResyncFocus(addMonths(this.month(), 1));
  }

  /**
   * Nav buttons and the month/year dropdowns change `month` without ever
   * touching a day cell — left alone, the roving-tabindex day (`focusedDate`)
   * stays pinned to the OLD month, so once it's no longer in the displayed
   * grid, every day button renders `tabindex="-1"` and the grid becomes
   * completely untabbable (WCAG 2.1.1). Clamp the focus target's day-of-month
   * into the new month whenever it's changed through one of these paths —
   * in-grid arrow-key navigation goes through `setFocusedDate` instead, which
   * already keeps the two in sync.
   */
  private setMonthAndResyncFocus(target: Date): void {
    this.month.set(target);
    const lastDayOfMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    const day = Math.min(this.focusedDate().getDate(), lastDayOfMonth);
    this.focusedDate.set(new Date(target.getFullYear(), target.getMonth(), day));
  }

  protected onGridKeydown(event: KeyboardEvent): void {
    const current = this.focusedDate();
    let next: Date | undefined;

    switch (event.key) {
      case 'ArrowLeft':
        next = addDays(current, -1);
        break;
      case 'ArrowRight':
        next = addDays(current, 1);
        break;
      case 'ArrowUp':
        next = addDays(current, -7);
        break;
      case 'ArrowDown':
        next = addDays(current, 7);
        break;
      case 'Home':
        next = startOfWeek(current, this.weekStartsOn());
        break;
      case 'End':
        next = endOfWeek(current, this.weekStartsOn());
        break;
      case 'PageUp':
        // Day-preserving shift (unlike `addMonths`, which is for month-block
        // references and always resets to the 1st) — APG date-picker-grid
        // keeps the day of month/year when paging.
        next = event.shiftKey
          ? new Date(current.getFullYear() - 1, current.getMonth(), current.getDate())
          : new Date(current.getFullYear(), current.getMonth() - 1, current.getDate());
        break;
      case 'PageDown':
        next = event.shiftKey
          ? new Date(current.getFullYear() + 1, current.getMonth(), current.getDate())
          : new Date(current.getFullYear(), current.getMonth() + 1, current.getDate());
        break;
      case 'Enter':
      case ' ':
        if (!this.isDisabled(current)) {
          event.preventDefault();
          this.selectDay(current);
        }
        return;
      default:
        return;
    }

    event.preventDefault();
    this.setFocusedDate(next);
  }

  private setFocusedDate(date: Date): void {
    this.focusedDate.set(date);
    if (!isSameMonth(date, this.month())) {
      this.month.set(startOfMonth(date));
    }
    afterNextRender(
      () => {
        this.hostEl.querySelector<HTMLButtonElement>(`[data-day-key="${dayKey(date)}"]`)?.focus();
      },
      { injector: this.injector },
    );
  }

  private selectDay(date: Date): void {
    const mode = this.mode();
    if (mode === 'single') {
      const current = this.selected() as Date | undefined;
      this.selected.set(current && isSameDay(current, date) ? undefined : startOfDay(date));
      return;
    }
    if (mode === 'multiple') {
      const current = (this.selected() as Date[] | undefined) ?? [];
      const exists = current.some((d) => isSameDay(d, date));
      this.selected.set(
        exists ? current.filter((d) => !isSameDay(d, date)) : [...current, startOfDay(date)],
      );
      return;
    }
    // range
    const current = this.selected() as DateRange | undefined;
    if (!current?.from || current.to) {
      this.selected.set({ from: startOfDay(date), to: undefined });
      return;
    }
    this.selected.set(
      date.getTime() < current.from.getTime()
        ? { from: startOfDay(date), to: current.from }
        : { from: current.from, to: startOfDay(date) },
    );
  }
}

/** First concrete `Date` inside a `CalendarSelected` value, regardless of mode. */
function firstDateOf(value: CalendarSelected): Date | undefined {
  if (value instanceof Date) return startOfDay(value);
  if (Array.isArray(value)) return value.length ? startOfDay(value[0]) : undefined;
  if (value && typeof value === 'object' && 'from' in value && value.from) {
    return startOfDay(value.from);
  }
  return undefined;
}
