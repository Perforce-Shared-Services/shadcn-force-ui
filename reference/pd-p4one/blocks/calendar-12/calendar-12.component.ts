import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar, type DateRange } from '@/app/ui/calendar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectRootDirective,
  SelectTrigger,
  SelectValue,
  SelectValueDirective,
} from '@/app/ui/select';

/** Registry's `localizedStrings` map — copy-title/description pairs keyed by locale. */
type Calendar12Locale = 'en' | 'es';

const LOCALIZED_STRINGS: Record<Calendar12Locale, { title: string; description: string }> = {
  en: {
    title: 'Book an appointment',
    description: 'Select the dates for your appointment',
  },
  es: {
    title: 'Reserva una cita',
    description: 'Selecciona las fechas para tu cita',
  },
};

/**
 * Angular port of the shadcn Block `calendar-12` — "Localized calendar."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/card` +
 * `ui/select` primitives — no new cva, no new tokens, no component-level
 * SCSS. Structural reference: the upstream registry's `Calendar12` (a card
 * whose title/description swap between English and Spanish copy via a select
 * in the header's `CardAction`, and a range calendar in the content).
 *
 * Deviation: the registry also passes `locale={locale === "es" ? es : enUS}`
 * to `react-day-picker`, translating weekday/month names inside the grid
 * itself. `ui/calendar` has no `locale` prop (it always renders via the
 * browser's default locale — see `CalendarComponent.monthLabel`/
 * `weekdayLabels`), so only the card copy actually localizes here; the
 * calendar grid's own day/month names do not. Documented gap on the
 * primitive, not something this block can compose around.
 */
@Component({
  selector: 'app-block-calendar-12',
  standalone: true,
  imports: [
    Calendar,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardContent,
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
    <div uiCard>
      <div uiCardHeader class="border-b">
        <h3 uiCardTitle>{{ strings().title }}</h3>
        <div uiCardDescription>{{ strings().description }}</div>
        <div uiCardAction>
          <div rdxSelect [value]="locale()" (onValueChange)="onLocaleChange($event)" [matchTriggerWidth]="true">
            <button rdxSelectTrigger class="w-[100px]">
              <span rdxSelectValue placeholder="Language"></span>
            </button>
            <div rdxSelectContent>
              <button rdxSelectItem value="es">Español</button>
              <button rdxSelectItem value="en">English</button>
            </div>
          </div>
        </div>
      </div>
      <div uiCardContent>
        <div
          uiCalendar
          mode="range"
          [(selected)]="dateRange"
          [numberOfMonths]="2"
          buttonVariant="outline"
          class="bg-transparent p-0"></div>
      </div>
    </div>
  `,
})
export class Calendar12Component {
  protected readonly locale = signal<Calendar12Locale>('es');
  protected readonly strings = signal(LOCALIZED_STRINGS.es);

  protected readonly dateRange = signal<DateRange | undefined>({
    from: new Date(2025, 8, 9),
    to: new Date(2025, 8, 17),
  });

  protected onLocaleChange(value: string): void {
    const locale = value as Calendar12Locale;
    this.locale.set(locale);
    this.strings.set(LOCALIZED_STRINGS[locale]);
  }
}
