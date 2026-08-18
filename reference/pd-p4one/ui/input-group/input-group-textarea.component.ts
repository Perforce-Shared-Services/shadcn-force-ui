import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';
import { textareaVariants } from '@/app/ui/textarea';

/**
 * `textarea[uiInputGroupTextarea]` — the multi-line control inside
 * `[uiInputGroup]`. Like InputGroupInput, it reuses the standalone textarea
 * style stripped of its own box (no border/ring, transparent, non-resizing)
 * because the group draws the chrome. `data-slot=input-group-control` is what
 * the group's focus-within / aria-invalid selectors key off.
 *
 * Pairs with a `block-end` addon for the counter/action row (e.g. "0/280" + a
 * Post button) — the input-group Figma component's textarea row.
 */
const groupTextareaOverrides =
  'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent';

@Component({
  selector: 'textarea[uiInputGroupTextarea]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input-group-control',
    '[class]': 'classes()',
  },
})
export class InputGroupTextareaComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(textareaVariants({ variant: 'outline' }), groupTextareaOverrides, this.className()),
  );
}
