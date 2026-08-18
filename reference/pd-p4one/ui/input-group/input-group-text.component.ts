import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * `[uiInputGroupText]` — muted inline text inside an addon (a prefix/suffix
 * label, a unit, a count). Verbatim from the registry.
 */
const inputGroupTextClasses =
  "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4";

@Component({
  selector: '[uiInputGroupText]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
  },
})
export class InputGroupTextComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(inputGroupTextClasses, this.className()));
}
