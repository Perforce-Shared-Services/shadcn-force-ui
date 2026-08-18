import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';

/**
 * Angular port of the shadcn Block `calendar-10` — "Today button."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/card` +
 * `ui/button` primitives — no new cva, no new tokens, no component-level
 * SCSS. Structural reference: the upstream registry's `Calendar10` (a card
 * with a header title/description, a `CardAction` "Today" button that resets
 * both the displayed month and the selection, and the calendar itself in the
 * card content with `bg-transparent p-0` so it sits flush in the card).
 */
@Component({
  selector: 'app-block-calendar-10',
  standalone: true,
  imports: [Button, Calendar, Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div uiCard>
      <div uiCardHeader>
        <h3 uiCardTitle>Appointment</h3>
        <div uiCardDescription>Find a date</div>
        <div uiCardAction>
          <button uiButton size="sm" variant="outline" (click)="resetToToday()">Today</button>
        </div>
      </div>
      <div uiCardContent>
        <div
          uiCalendar
          mode="single"
          [(month)]="month"
          [(selected)]="selected"
          class="bg-transparent p-0"></div>
      </div>
    </div>
  `,
})
export class Calendar10Component {
  protected readonly selected = signal<Date | undefined>(new Date(2025, 5, 12));
  protected readonly month = signal<Date>(new Date());

  protected resetToToday(): void {
    const today = new Date();
    this.month.set(today);
    this.selected.set(today);
  }
}
