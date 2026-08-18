import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { QuestionnaireComponent } from './questionnaire.component';

/**
 * "Question X of Y" counter, read from the parent `[uiQuestionnaire]`. Text
 * size/weight verified against Figma (28979:9974): `text-xs font-medium
 * text-muted-foreground` — upstream's own class (`cn-questionnaire-progress
 * min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground
 * tabular-nums`) only carried the opaque `cn-questionnaire-progress` hook,
 * so the Figma sizing corrects the earlier guess (no explicit size at all).
 *
 * `role="progressbar"` matches upstream's "Progress exposed as named
 * progressbar" accessibility note; `aria-valuetext` carries the same text
 * shown visually so it reads identically either way. "Named" means an
 * accessible NAME too (axe `aria-progressbar-name`, caught live in this
 * component's Storybook axe pass) — `ariaLabel` defaults to "Questionnaire
 * progress" and is overridable per instance.
 *
 * `[steps]` (default off): Figma's component has a SECOND, hidden-by-default
 * "Progress Steps" slot (28979:9970) — a row of `total()` rounded-full bars,
 * filled `bg-primary` up to the active item, `bg-muted` after — as an
 * alternate to the text counter (both bound to the same `current()`/
 * `total()`, never both rendered). Exposed here as a boolean render-mode
 * rather than a second component, since it's the same data, just a
 * different visual.
 *
 * Upstream also supports a `render` prop for fully custom progress markup
 * (see the Dialog example, `Question {current} of {total}` inside a
 * `<span>`). Angular has no render-prop equivalent — `current()`/`total()`
 * are public on `[uiQuestionnaire]`, so a caller who needs custom markup
 * skips this component and reads those signals directly instead.
 *
 * `aria-live="polite"` (paired with the existing `role="progressbar"`):
 * a value change on an unfocused, non-live element isn't reliably announced
 * by screen readers, so a keyboard user clicking Next got no confirmation
 * the step actually advanced — caught in the ux-auditor pass (WCAG 4.1.3).
 */
@Component({
  selector: '[uiQuestionnaireProgress]',
  standalone: true,
  template: `
    @if (steps()) {
      @for (filled of segments(); track $index) {
        <span
          data-slot="questionnaire-progress-step"
          [class]="
            filled
              ? 'h-1.5 flex-1 rounded-full bg-primary transition-colors motion-reduce:transition-none'
              : 'h-1.5 flex-1 rounded-full bg-muted transition-colors motion-reduce:transition-none'
          "
        ></span>
      }
    } @else {
      {{ label() }}
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'questionnaire-progress',
    role: 'progressbar',
    'aria-live': 'polite',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-valuenow]': 'root?.current()',
    '[attr.aria-valuemin]': '1',
    '[attr.aria-valuemax]': 'root?.total()',
    '[attr.aria-valuetext]': 'label()',
    '[class]': 'classes()',
  },
})
export class QuestionnaireProgressComponent {
  readonly ariaLabel = input('Questionnaire progress', { alias: 'ariaLabel' });
  readonly steps = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly root = inject(QuestionnaireComponent, { optional: true });

  protected readonly label = computed(() => `Question ${this.root?.current() ?? 1} of ${this.root?.total() ?? 1}`);

  protected readonly segments = computed(() => {
    const total = this.root?.total() ?? 0;
    const current = this.root?.current() ?? 0;
    return Array.from({ length: total }, (_, i) => i < current);
  });

  protected readonly classes = computed(() =>
    cn(
      this.steps()
        ? 'flex w-full items-center gap-1.5'
        : 'w-fit min-w-[14ch] text-xs font-medium text-muted-foreground tabular-nums',
      this.className(),
    ),
  );
}
