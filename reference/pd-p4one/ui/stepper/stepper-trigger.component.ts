import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { StepperComponent } from './stepper.component';
import { StepperItemComponent } from './stepper-item.component';

/**
 * Stepper trigger — the clickable button wrapping an item's indicator +
 * label. MUST sit inside a `[uiStepperItem]`. Clicking it moves the parent
 * `[uiStepper]`'s `value` to this item's `step`.
 *
 * When the root is `linear`, a click that would skip over an unvisited,
 * non-disabled step is ignored — matches the common "can't skip ahead"
 * wizard convention (disabled steps, e.g. "not applicable", are freely
 * skippable — see `StepperComponent.canAdvanceTo`). Navigating BACK to any
 * earlier step is always allowed, since Force's wizard composition requires
 * previously entered data to stay editable and pre-populated (`wizard.md`,
 * "Preserve entered data when the user navigates Back").
 *
 * `aria-current="step"` and the disabled dimming both live on the parent
 * `[uiStepperItem]`, not here — that way both apply identically whether or
 * not a trigger is present (see `StepperItemComponent`).
 *
 * Always lays out as a row (indicator + label side by side); under a
 * vertical `[uiStepper]` it stays a row but left-aligns, matching
 * `wizard.md`'s sidebar sketch (icon, then title/description stacked to its
 * right) — only the ROOT stacks rows into a column for vertical mode.
 *
 * For a step list that should not be directly clickable at all (Force's
 * `wizard.md` sidebar: "Step items are not interactive — the user cannot
 * click a step in the sidebar to jump to it"), omit this component entirely
 * and render `[uiStepperIndicator]` / `[uiStepperTitle]` as plain content
 * inside the `[uiStepperItem]` instead of wrapping them in a trigger button.
 */
@Component({
  selector: 'button[uiStepperTrigger]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'stepper-trigger',
    '[attr.disabled]': "isDisabled() ? '' : null",
    '[attr.data-orientation]': 'root?.orientation()',
    '[class]': 'classes()',
    '(click)': 'onClick()',
  },
})
export class StepperTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly root = inject(StepperComponent, { optional: true });
  protected readonly item = inject(StepperItemComponent, { optional: true });

  protected readonly isDisabled = computed(() => this.item?.disabled() ?? false);

  protected onClick(): void {
    if (!this.root || !this.item || this.isDisabled()) return;
    const targetStep = this.item.step();
    if (!this.root.canAdvanceTo(targetStep)) return;
    this.root.value.set(targetStep);
  }

  protected readonly classes = computed(() =>
    cn(
      'flex flex-col items-center gap-1 rounded-md p-1 text-center outline-none transition-colors',
      'data-vertical:flex-row data-vertical:items-center data-vertical:gap-2 data-vertical:text-left',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none',
      'motion-reduce:transition-none',
      this.className(),
    ),
  );
}
