import { afterNextRender, booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, Injector, model, signal } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"
import { Button as ButtonDirective, buttonVariants, type ButtonVariant } from "@/angular-ui/button"

import {
  CALENDAR_DROPDOWN_CARET_SVG,
  CALENDAR_NEXT_MONTH_SVG,
  CALENDAR_PREVIOUS_MONTH_SVG,
} from "./calendar.icons"
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
} from "./calendar.utils"

export type { CalendarDay, CalendarMode, CalendarSelected, DateRange } from "./calendar.utils"

export type CalendarCaptionLayout = "label" | "dropdown"

/**
 * Angular port of the Force UI calendar (date picker grid), built on plain
 * native `Date` arithmetic — the React registry wraps `react-day-picker`,
 * a headless React widget with no Angular build and no radix-ng equivalent.
 * Per the maintainer's bundle-cost call, this ports the same public shape —
 * `mode`/`selected`/`month`/`numberOfMonths`/`disabled`/`captionLayout` —
 * using `calendar.utils.ts` instead of pulling in `react-day-picker` +
 * `date-fns`. Neither ends up as a consumer dependency.
 *
 * Part mapping (React → Angular):
 *
 *   <Calendar />            → <div uiCalendar mode="single" [(selected)]="d">
 *   DayPicker grid state    → resolved directly on the day <button> (see
 *                             dayButtonClasses()); the registry hangs
 *                             today/outside/disabled/selected classes on the
 *                             <td> via DayPicker's modifier plumbing, but the
 *                             button is the visible element here and the <td>
 *                             is a plain structural cell.
 *   rtl:**:[.rdp-button_*]  → `rtl:rotate-180` applied to this component's own
 *                             chevron spans (DayPicker's internal classnames
 *                             don't exist in this build).
 *   components.DayButton    → not supported (see calendar-custom-days demo
 *                             Callout); captionLayout 'dropdown-months' /
 *                             'dropdown-years' and the `required` prop are
 *                             documented gaps.
 *
 * Deviation kept from p4one: day cells render `buttonVariants({ variant:
 * "ghost" })` directly rather than the `uiButton` directive. The directive's
 * host `[attr.tabindex]` binding applies AFTER template bindings on the same
 * element and silently overwrites a day cell's roving-tabindex
 * `[attr.tabindex]`, defeating the single-Tab-stop grid (WCAG 2.1.1). The
 * nav prev/next buttons still use `uiButton`.
 *
 * Usage:
 *   <div uiCalendar mode="single" [(selected)]="selectedDay"></div>
 *   <div uiCalendar mode="range" [(selected)]="range" [numberOfMonths]="2"></div>
 *   <div uiCalendar mode="multiple" [(selected)]="days" [disabled]="isWeekend"></div>
 *
 * Accessibility: each month is a labelled `<table>` (`<caption class="sr-only">`)
 * with `scope="col"` weekday headers. Keyboard model matches the APG
 * date-picker-grid pattern: arrows move one day/week, Home/End jump to the
 * week's start/end, PageUp/PageDown (+Shift for a year) change month,
 * Enter/Space selects — roving `tabindex` keeps the grid a single Tab stop.
 */
@Component({
  selector: "[uiCalendar]",
  standalone: true,
  imports: [ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./calendar.component.html",
  host: {
    "data-slot": "calendar",
    "[class]": "rootClasses()",
    "[attr.id]": "id()",
    "[attr.aria-label]": "ariaLabel()",
    "(keydown)": "onGridKeydown($event)",
  },
})
export class CalendarComponent {
  readonly mode = input<CalendarMode>("single")
  readonly selected = model<CalendarSelected>(undefined)
  readonly month = model<Date>(startOfMonth(new Date()))
  readonly numberOfMonths = input<number>(1)
  readonly showOutsideDays = input(true, { transform: booleanAttribute })
  readonly showWeekNumber = input(false, { transform: booleanAttribute })
  readonly weekStartsOn = input<number>(0)
  readonly disabled = input<((date: Date) => boolean) | undefined>(undefined)
  readonly fromDate = input<Date | undefined>(undefined)
  readonly toDate = input<Date | undefined>(undefined)
  readonly captionLayout = input<CalendarCaptionLayout>("label")
  readonly buttonVariant = input<ButtonVariant>("ghost")
  readonly id = input<string | undefined>(undefined)
  readonly ariaLabel = input<string | undefined>(undefined, { alias: "aria-label" })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  /** Roving-tabindex focus target; not necessarily `selected` (arrow keys move it freely). */
  protected readonly focusedDate = signal<Date>(startOfDay(new Date()))

  /** Guards the one-time "snap month/focus to the initial selection" effect below. */
  private hasSnappedToInitialSelection = false

  private readonly hostEl = inject(ElementRef).nativeElement as HTMLElement
  private readonly injector = inject(Injector)
  private readonly sanitizer = inject(DomSanitizer)

  protected readonly previousIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    CALENDAR_PREVIOUS_MONTH_SVG,
  )
  protected readonly nextIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    CALENDAR_NEXT_MONTH_SVG,
  )
  protected readonly dropdownCaret: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    CALENDAR_DROPDOWN_CARET_SVG,
  )

  constructor() {
    // `selected` (and `month`) may arrive as a bound value only after this
    // instance is constructed — signal inputs/models hold just their default
    // during field initializers, not yet the caller's binding. So the "default
    // to the selection's month" behavior has to happen reactively, once.
    effect(() => {
      const value = this.selected()
      if (this.hasSnappedToInitialSelection || value === undefined) return
      this.hasSnappedToInitialSelection = true
      const day = firstDateOf(value)
      if (day) {
        this.month.set(startOfMonth(day))
        this.focusedDate.set(day)
      }
    })
  }

  protected readonly rootClasses = computed(() =>
    cn(
      "cn-calendar group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
      this.className(),
    ),
  )

  protected readonly displayedMonths = computed(() => {
    const count = Math.max(1, this.numberOfMonths())
    const base = startOfMonth(this.month())
    return Array.from({ length: count }, (_, i) => addMonths(base, i))
  })

  protected readonly weekdayLabels = computed(() => getWeekdayLabels(this.weekStartsOn()))

  protected readonly monthOptions = computed(() =>
    Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: new Date(2024, i, 1).toLocaleDateString(undefined, { month: "short" }),
    })),
  )

  protected readonly yearOptions = computed(() => {
    const from = this.fromDate()
    const to = this.toDate()
    const currentYear = this.month().getFullYear()
    const startYear = from ? from.getFullYear() : currentYear - 100
    const endYear = to ? to.getFullYear() : currentYear + 10
    return Array.from({ length: Math.max(1, endYear - startYear + 1) }, (_, i) => startYear + i)
  })

  protected readonly canGoToPreviousMonth = computed(() => {
    const from = this.fromDate()
    if (!from) return true
    const previousMonthEnd = addDays(startOfMonth(this.month()), -1)
    return previousMonthEnd.getTime() >= startOfDay(from).getTime()
  })

  protected readonly canGoToNextMonth = computed(() => {
    const to = this.toDate()
    if (!to) return true
    const lastDisplayed = this.displayedMonths().at(-1) ?? this.month()
    const nextMonthStart = addMonths(startOfMonth(lastDisplayed), 1)
    return nextMonthStart.getTime() <= startOfDay(to).getTime()
  })

  protected weeksFor(month: Date): CalendarDay[][] {
    return getCalendarWeeks(month, this.weekStartsOn())
  }

  protected dayKeyOf(date: Date): string {
    return dayKey(date)
  }

  protected monthLabel(month: Date): string {
    return month.toLocaleDateString(undefined, { month: "long", year: "numeric" })
  }

  protected monthOnlyLabel(month: Date): string {
    return month.toLocaleDateString(undefined, { month: "short" })
  }

  protected weekNumber(date: Date): number {
    // ISO 8601 week number.
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dayNumber = (target.getDay() + 6) % 7
    target.setDate(target.getDate() - dayNumber + 3)
    const firstThursday = target.getTime()
    target.setMonth(0, 1)
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
    }
    return 1 + Math.round((firstThursday - target.getTime()) / (7 * 24 * 3600 * 1000))
  }

  protected isToday(date: Date): boolean {
    return isSameDay(date, new Date())
  }

  protected isFocusedDay(date: Date): boolean {
    return isSameDay(date, this.focusedDate())
  }

  protected isDisabled(date: Date): boolean {
    const from = this.fromDate()
    const to = this.toDate()
    if (from && date.getTime() < startOfDay(from).getTime()) return true
    if (to && date.getTime() > startOfDay(to).getTime()) return true
    const matcher = this.disabled()
    return matcher ? matcher(date) : false
  }

  protected isSelected(date: Date): boolean {
    const value = this.selected()
    if (!value) return false
    if (value instanceof Date) return isSameDay(value, date)
    if (Array.isArray(value)) return value.some((d) => isSameDay(d, date))
    return isDateInRange(date, value)
  }

  protected isSelectedSingle(date: Date): boolean {
    return this.mode() !== "range" && this.isSelected(date)
  }

  protected isRangeStart(date: Date): boolean {
    const value = this.selected() as DateRange | undefined
    return this.mode() === "range" && !!value?.from && isSameDay(value.from, date)
  }

  protected isRangeEnd(date: Date): boolean {
    const value = this.selected() as DateRange | undefined
    if (this.mode() !== "range" || !value?.to) return false
    return isSameDay(value.to, date)
  }

  protected isRangeMiddle(date: Date): boolean {
    const value = this.selected() as DateRange | undefined
    if (this.mode() !== "range" || !value?.from || !value.to) return false
    return isDateInRange(date, value) && !this.isRangeStart(date) && !this.isRangeEnd(date)
  }

  protected dayButtonClasses(day: CalendarDay): string {
    const rangeStart = this.isRangeStart(day.date)
    const rangeEnd = this.isRangeEnd(day.date)
    const rangeMiddle = this.isRangeMiddle(day.date)
    const selectedSingle = this.isSelectedSingle(day.date)
    const anySelectionState = rangeStart || rangeEnd || rangeMiddle || selectedSingle
    const today = this.isToday(day.date) && !anySelectionState
    const hidden = day.outside && !this.showOutsideDays()

    return cn(
      // buttonVariants (not `uiButton`) — see the class docblock: the
      // directive's host `[attr.tabindex]` binding clobbers the roving
      // tabindex on day cells.
      buttonVariants({ variant: "ghost" }),
      "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 font-normal leading-none motion-reduce:transition-none dark:hover:text-foreground [&_svg]:fill-current",
      rangeStart && "rounded-(--cell-radius) rounded-l-(--cell-radius) bg-primary text-primary-foreground",
      rangeEnd && "rounded-(--cell-radius) rounded-r-(--cell-radius) bg-primary text-primary-foreground",
      rangeMiddle && "rounded-none bg-muted text-foreground",
      selectedSingle && "bg-primary text-primary-foreground",
      today && "bg-muted text-foreground",
      day.outside && !anySelectionState && "text-muted-foreground",
      hidden && "invisible pointer-events-none",
      "disabled:pointer-events-none disabled:bg-transparent disabled:text-muted-foreground disabled:opacity-50",
    )
  }

  protected onDayClick(day: CalendarDay): void {
    if (this.isDisabled(day.date)) return
    this.selectDay(day.date)
    this.setFocusedDate(day.date)
  }

  protected onMonthOptionChange(event: Event, displayedMonth: Date): void {
    const monthIndex = Number((event.target as HTMLSelectElement).value)
    this.setMonthAndResyncFocus(new Date(displayedMonth.getFullYear(), monthIndex, 1))
  }

  protected onYearOptionChange(event: Event, displayedMonth: Date): void {
    const year = Number((event.target as HTMLSelectElement).value)
    this.setMonthAndResyncFocus(new Date(year, displayedMonth.getMonth(), 1))
  }

  protected goToPreviousMonth(): void {
    if (!this.canGoToPreviousMonth()) return
    this.setMonthAndResyncFocus(addMonths(this.month(), -1))
  }

  protected goToNextMonth(): void {
    if (!this.canGoToNextMonth()) return
    this.setMonthAndResyncFocus(addMonths(this.month(), 1))
  }

  /**
   * Nav buttons and the month/year dropdowns change `month` without ever
   * touching a day cell — left alone, the roving-tabindex day (`focusedDate`)
   * stays pinned to the OLD month, so once it's no longer in the displayed
   * grid, every day button renders `tabindex="-1"` and the grid becomes
   * completely untabbable (WCAG 2.1.1). Clamp the focus target's day-of-month
   * into the new month whenever it's changed through one of these paths.
   */
  private setMonthAndResyncFocus(target: Date): void {
    this.month.set(target)
    const lastDayOfMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
    const day = Math.min(this.focusedDate().getDate(), lastDayOfMonth)
    this.focusedDate.set(new Date(target.getFullYear(), target.getMonth(), day))
  }

  protected onGridKeydown(event: KeyboardEvent): void {
    const current = this.focusedDate()
    let next: Date | undefined

    switch (event.key) {
      case "ArrowLeft":
        next = addDays(current, -1)
        break
      case "ArrowRight":
        next = addDays(current, 1)
        break
      case "ArrowUp":
        next = addDays(current, -7)
        break
      case "ArrowDown":
        next = addDays(current, 7)
        break
      case "Home":
        next = startOfWeek(current, this.weekStartsOn())
        break
      case "End":
        next = endOfWeek(current, this.weekStartsOn())
        break
      case "PageUp":
        // Day-preserving shift — APG date-picker-grid keeps the day of
        // month/year when paging.
        next = event.shiftKey
          ? new Date(current.getFullYear() - 1, current.getMonth(), current.getDate())
          : new Date(current.getFullYear(), current.getMonth() - 1, current.getDate())
        break
      case "PageDown":
        next = event.shiftKey
          ? new Date(current.getFullYear() + 1, current.getMonth(), current.getDate())
          : new Date(current.getFullYear(), current.getMonth() + 1, current.getDate())
        break
      case "Enter":
      case " ":
        if (!this.isDisabled(current)) {
          event.preventDefault()
          this.selectDay(current)
        }
        return
      default:
        return
    }

    event.preventDefault()
    this.setFocusedDate(next)
  }

  private setFocusedDate(date: Date): void {
    this.focusedDate.set(date)
    if (!isSameMonth(date, this.month())) {
      this.month.set(startOfMonth(date))
    }
    afterNextRender(
      () => {
        this.hostEl.querySelector<HTMLButtonElement>(`[data-day-key="${dayKey(date)}"]`)?.focus()
      },
      { injector: this.injector },
    )
  }

  private selectDay(date: Date): void {
    const mode = this.mode()
    if (mode === "single") {
      const current = this.selected() as Date | undefined
      this.selected.set(current && isSameDay(current, date) ? undefined : startOfDay(date))
      return
    }
    if (mode === "multiple") {
      const current = (this.selected() as Date[] | undefined) ?? []
      const exists = current.some((d) => isSameDay(d, date))
      this.selected.set(
        exists ? current.filter((d) => !isSameDay(d, date)) : [...current, startOfDay(date)],
      )
      return
    }
    // range
    const current = this.selected() as DateRange | undefined
    if (!current?.from || current.to) {
      this.selected.set({ from: startOfDay(date), to: undefined })
      return
    }
    this.selected.set(
      date.getTime() < current.from.getTime()
        ? { from: startOfDay(date), to: current.from }
        : { from: current.from, to: startOfDay(date) },
    )
  }
}

/** First concrete `Date` inside a `CalendarSelected` value, regardless of mode. */
function firstDateOf(value: CalendarSelected): Date | undefined {
  if (value instanceof Date) return startOfDay(value)
  if (Array.isArray(value)) return value.length ? startOfDay(value[0]) : undefined
  if (value && typeof value === "object" && "from" in value && value.from) {
    return startOfDay(value.from)
  }
  return undefined
}
