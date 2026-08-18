import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type OnDestroy,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { StepperComponent } from './stepper.component';

export type StepperItemState = 'completed' | 'active' | 'inactive';

/**
 * Stepper item — one step's data scope. Wraps a `[uiStepperTrigger]` (or, for
 * non-interactive stepper renderings, a plain `[uiStepperIndicator]` +
 * `[uiStepperTitle]` pair) and exposes `state` to its descendants via DI, the
 * same way `ui/toggle-group-item` reads its parent group.
 *
 * `step` is required and 1-indexed, matching the parent `[uiStepper]`'s
 * `value`. `completed` lets a caller mark a step done out of numeric order
 * (e.g. a step that was skipped as not-applicable); when unset, completion is
 * derived from `step < root.value()`.
 */
@Component({
  selector: '[uiStepperItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'stepper-item',
    '[attr.data-state]': 'state()',
    '[attr.data-orientation]': 'root?.orientation()',
    '[attr.data-disabled]': "disabled() ? '' : null",
    '[attr.aria-current]': "state() === 'active' ? 'step' : null",
    '[class]': 'classes()',
  },
})
export class StepperItemComponent implements OnDestroy {
  readonly step = input.required<number>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly completed = input<boolean | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly root = inject(StepperComponent, { optional: true });

  readonly state = computed<StepperItemState>(() => {
    if (this.completed() === true) return 'completed';
    const current = this.root?.value() ?? 1;
    if (this.completed() === false) return this.step() === current ? 'active' : 'inactive';
    if (this.step() < current) return 'completed';
    return this.step() === current ? 'active' : 'inactive';
  });

  constructor() {
    this.root?.registerItem(this);
  }

  ngOnDestroy(): void {
    this.root?.unregisterItem(this);
  }

  // Always a row (indicator + label side by side) — orientation only changes
  // how the ROOT stacks item-rows (`data-vertical:flex-col` on `[uiStepper]`),
  // never how a single item lays out its own children. An item-level
  // `data-vertical:flex-col` here would stack indicator-above-label inside
  // every item of a vertical stepper, fighting the sidebar-list look
  // `wizard.md` describes (one row per step). Single-child usage (item
  // wrapping one `[uiStepperTrigger]`) is unaffected either way.
  // Dimming lives HERE, once, regardless of whether the item wraps an
  // interactive `[uiStepperTrigger]` or plain non-interactive content — not
  // duplicated on the trigger AND the indicator (opacity compounds visually
  // across nested elements, so two 50% layers read as ~25%, unevenly dimming
  // the indicator relative to the title).
  protected readonly classes = computed(() =>
    cn(
      'group flex items-center gap-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.className(),
    ),
  );
}
