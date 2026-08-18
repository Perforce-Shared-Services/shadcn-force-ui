import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Navigation row: Previous (start), Skip (middle), Next/Submit (end — only
 * one of the two is ever visible, see those components). Upstream's grid
 * layout classes are plain Tailwind (no opaque `cn-*` hooks) — kept verbatim,
 * including the `col-start-*`/`row-start-*`/`justify-self-*` placement each
 * action button carries so they overlap the same cells rather than needing a
 * `*ngIf`-driven column count.
 */
@Component({
  selector: '[uiQuestionnaireActions]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-actions',
    '[class]': 'classes()',
  },
})
export class QuestionnaireActionsComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2',
      this.className(),
    ),
  );
}
