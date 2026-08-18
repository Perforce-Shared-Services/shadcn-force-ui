import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { Calendar, type CalendarCaptionLayout } from '@/app/ui/calendar';
import { Label } from '@/app/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectRootDirective,
  SelectTrigger,
  SelectValue,
  SelectValueDirective,
} from '@/app/ui/select';

/**
 * Registry's `CaptionLayout` select options. `ui/calendar`'s own
 * `CalendarCaptionLayout` only distinguishes `'label' | 'dropdown'` — it does
 * not split the dropdown into a month-only or year-only axis (a documented
 * gap on the primitive: "The registry's split 'dropdown-months' /
 * 'dropdown-years' … is not implemented"). All three registry values are
 * kept here as verbatim demo copy/options, but `captionLayout` below
 * resolves every one of them to the primitive's single `'dropdown'` mode —
 * so choosing "Month Only" or "Year Only" is visually identical to "Month
 * and Year" until the primitive gains that split.
 */
type Calendar13Dropdown = 'dropdown' | 'dropdown-months' | 'dropdown-years';

/**
 * Angular port of the shadcn Block `calendar-13` — "With Month and Year
 * Dropdown."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/label` +
 * `ui/select` primitives — no new cva, no new tokens, no component-level
 * SCSS. Structural reference: the upstream registry's `Calendar13` (a single
 * calendar in dropdown caption mode, with a labelled select below it that
 * lets the user switch between month+year / month-only / year-only
 * dropdowns).
 */
@Component({
  selector: 'app-block-calendar-13',
  standalone: true,
  imports: [
    Calendar,
    Label,
    Select,
    SelectRootDirective,
    SelectTrigger,
    SelectValue,
    SelectValueDirective,
    SelectContent,
    SelectItem,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex flex-col gap-4">
      <div
        uiCalendar
        mode="single"
        [(selected)]="date"
        [captionLayout]="captionLayout()"
        class="rounded-lg border border-border shadow-sm"></div>
      <div class="flex flex-col gap-3">
        <label uiLabel for="calendar-13-dropdown" class="px-1">Dropdown</label>
        <div rdxSelect [value]="dropdown()" (onValueChange)="onDropdownChange($event)" [matchTriggerWidth]="true">
          <button rdxSelectTrigger id="calendar-13-dropdown" size="sm" class="w-full bg-background">
            <span rdxSelectValue placeholder="Dropdown"></span>
          </button>
          <div rdxSelectContent>
            <button rdxSelectItem value="dropdown">Month and Year</button>
            <button rdxSelectItem value="dropdown-months">Month Only</button>
            <button rdxSelectItem value="dropdown-years">Year Only</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Calendar13Component {
  protected readonly date = signal<Date | undefined>(new Date(2025, 5, 12));
  protected readonly dropdown = signal<Calendar13Dropdown>('dropdown');

  /** See the `Calendar13Dropdown` doc comment — all three options resolve to `'dropdown'`. */
  protected readonly captionLayout = computed<CalendarCaptionLayout>(() => 'dropdown');

  protected onDropdownChange(value: string): void {
    this.dropdown.set(value as Calendar13Dropdown);
  }
}
