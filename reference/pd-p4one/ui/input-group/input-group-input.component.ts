import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';
import { inputVariants } from '@/app/ui/input';

/**
 * `input[uiInputGroupInput]` — the control inside `[uiInputGroup]`. It's the
 * standalone input's outline style stripped of its own box (no border, no ring,
 * transparent bg) because the group draws the chrome. `data-slot=input-group-control`
 * is what the group's focus-within / aria-invalid selectors key off.
 */
const groupInputOverrides =
  'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent';

@Component({
  selector: 'input[uiInputGroupInput]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input-group-control',
    '[class]': 'classes()',
  },
})
export class InputGroupInputComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(inputVariants({ variant: 'outline' }), groupInputOverrides, this.className()),
  );
}
