import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Calendar } from './';
import type { CalendarCaptionLayout, CalendarMode } from './calendar.component';
import type { ButtonVariant } from '@/app/ui/button';

interface CalendarStoryArgs {
  mode: CalendarMode;
  numberOfMonths: number;
  showOutsideDays: boolean;
  showWeekNumber: boolean;
  captionLayout: CalendarCaptionLayout;
  buttonVariant: ButtonVariant;
  disableWeekends: boolean;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * `[uiCalendar]` is a hand-built date-picker grid — NOT a registry port.
 * `@force-ui/calendar` wraps `react-day-picker` (a headless React widget with
 * no Angular build); this component reimplements the same month-grid,
 * keyboard navigation, and single/multiple/range selection with plain native
 * `Date` arithmetic instead — so neither `react-day-picker` nor `date-fns`
 * ships in this app. See `calendar.component.ts` for the full deviation list.
 *
 * - `mode` — `single` (default), `multiple`, or `range`. Drives the shape of
 *   `selected`.
 * - `selected` / `month` — both two-way (`[(selected)]`, `[(month)]`).
 * - `disabled` — a `(date) => boolean` matcher; combine with `fromDate` /
 *   `toDate` for inclusive bounds.
 * - `captionLayout` — `label` (arrows + text, default) or `dropdown` (native
 *   month/year `<select>`s for fast long-range navigation, e.g. a birthdate).
 *
 * Keyboard: arrow keys move a day at a time, Home/End jump to the visible
 * week's edges, PageUp/PageDown change month (+Shift for a year), Enter/Space
 * selects the focused day — a roving `tabindex` keeps the whole grid one Tab
 * stop (WCAG 2.1.1).
 */
const meta: Meta<CalendarStoryArgs> = {
  title: 'UI/Calendar',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Calendar] })],
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['single', 'multiple', 'range'],
      description: 'Selection shape: a single day, several independent days, or a from/to range.',
      table: { defaultValue: { summary: 'single' } },
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 3, step: 1 },
      description: 'How many months to render side by side.',
      table: { defaultValue: { summary: '1' } },
    },
    showOutsideDays: {
      control: 'boolean',
      description: "Show the leading/trailing days from adjacent months (dimmed, still clickable).",
      table: { defaultValue: { summary: 'true' } },
    },
    showWeekNumber: {
      control: 'boolean',
      description: 'Add a leading ISO week-number column.',
    },
    captionLayout: {
      control: 'inline-radio',
      options: ['label', 'dropdown'],
      description: 'Month caption: static text with arrows, or fast-navigation month/year selects.',
      table: { defaultValue: { summary: 'label' } },
    },
    buttonVariant: {
      control: 'select',
      options: ['ghost', 'outline', 'secondary', 'default', 'destructive', 'link'],
      description: '`ui/button` variant applied to the prev/next month buttons.',
      table: { defaultValue: { summary: 'ghost' } },
    },
    disableWeekends: {
      control: 'boolean',
      description: 'Demo of the `disabled` matcher — disables Saturdays and Sundays.',
    },
  },
  args: {
    mode: 'single',
    numberOfMonths: 1,
    showOutsideDays: true,
    showWeekNumber: false,
    captionLayout: 'label',
    buttonVariant: 'ghost',
    disableWeekends: false,
  },
  render: (args) => ({
    props: {
      ...args,
      selected: undefined,
      month: new Date(),
      disabledFn: args.disableWeekends ? isWeekend : undefined,
    },
    template: `
      <div
        uiCalendar
        [mode]="mode"
        [selected]="selected"
        (selectedChange)="selected = $event"
        [month]="month"
        (monthChange)="month = $event"
        [numberOfMonths]="numberOfMonths"
        [showOutsideDays]="showOutsideDays"
        [showWeekNumber]="showWeekNumber"
        [captionLayout]="captionLayout"
        [buttonVariant]="buttonVariant"
        [disabled]="disabledFn"
        class="w-fit rounded-lg border border-border"
      ></div>
    `,
  }),
};

export default meta;
type Story = StoryObj<CalendarStoryArgs>;

export const Playground: Story = {};

/** Default mode — pick one day. */
export const Single: Story = {
  args: { mode: 'single' },
};

/** Click a start day, then an end day, to select a span. */
export const Range: Story = {
  args: { mode: 'range' },
  render: (args) => ({
    props: {
      ...args,
      selected: { from: new Date(), to: undefined },
      month: new Date(),
    },
    template: `
      <div
        uiCalendar
        mode="range"
        [selected]="selected"
        (selectedChange)="selected = $event"
        [month]="month"
        (monthChange)="month = $event"
        class="w-fit rounded-lg border border-border"
      ></div>
    `,
  }),
};

/** Each day toggles independently, in any order. */
export const Multiple: Story = {
  args: { mode: 'multiple' },
  render: (args) => ({
    props: { ...args, selected: [], month: new Date() },
    template: `
      <div
        uiCalendar
        mode="multiple"
        [selected]="selected"
        (selectedChange)="selected = $event"
        [month]="month"
        (monthChange)="month = $event"
        class="w-fit rounded-lg border border-border"
      ></div>
    `,
  }),
};

/** Two months side by side — the common shape for a range picker. */
export const TwoMonths: Story = {
  args: { mode: 'range', numberOfMonths: 2 },
};

/** Native month/year `<select>`s replace the arrow caption — fast navigation across years (e.g. a birthdate). */
export const DropdownCaption: Story = {
  args: { captionLayout: 'dropdown' },
};

/** The `disabled` matcher (here: weekends) blocks both click and keyboard selection. */
export const DisabledDates: Story = {
  args: { disableWeekends: true },
};

/** A leading ISO week-number column, useful for production/planning calendars. */
export const WeekNumbers: Story = {
  args: { showWeekNumber: true },
};

/** Side-by-side comparison of the primary modes. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      singleSelected: new Date(),
      rangeSelected: { from: new Date(), to: undefined },
      multipleSelected: [],
      month: new Date(),
    },
    template: `
      <div class="flex flex-wrap gap-6">
        <div class="flex flex-col gap-2">
          <span class="text-sm font-medium">Single</span>
          <div uiCalendar mode="single" [selected]="singleSelected" (selectedChange)="singleSelected = $event" [month]="month" class="w-fit rounded-lg border border-border"></div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm font-medium">Range</span>
          <div uiCalendar mode="range" [selected]="rangeSelected" (selectedChange)="rangeSelected = $event" [month]="month" class="w-fit rounded-lg border border-border"></div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm font-medium">Multiple</span>
          <div uiCalendar mode="multiple" [selected]="multipleSelected" (selectedChange)="multipleSelected = $event" [month]="month" class="w-fit rounded-lg border border-border"></div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm font-medium">Dropdown caption</span>
          <div uiCalendar mode="single" captionLayout="dropdown" [month]="month" class="w-fit rounded-lg border border-border"></div>
        </div>
      </div>
    `,
  }),
};
