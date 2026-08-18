import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Stepper step label. Reads its parent `[uiStepperItem]`'s `data-state` via
 * the shared `group` ancestor class (same mechanism `ui/toggle-group-item`
 * uses) to bump weight/colour on the active step — `wizard.md`'s "Active…
 * step label uses … font-weight-semibold". No `text-interactive-active`
 * equivalent token exists in this app's palette, so active resolves to
 * `text-foreground` (full-strength) over the default `text-muted-foreground`,
 * the same muted→foreground swap `ui/accordion`'s trigger uses for its own
 * open state.
 */
@Component({
  selector: '[uiStepperTitle]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'stepper-title',
    '[class]': 'classes()',
  },
})
export class StepperTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors motion-reduce:transition-none',
      'group-data-[state=active]:text-foreground group-data-[state=active]:font-semibold',
      'group-data-[state=completed]:text-foreground',
      this.className(),
    ),
  );
}
