import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/field — `FieldDescription`.
 *
 * Muted helper text under a field's control. A native `<p>`. The base string's
 * adjacency selectors tighten the top margin when it follows a `FieldLegend` or
 * sits last, and style any inline `<a>` (underline, primary on hover). Wire it
 * to the control with `aria-describedby` so it's announced.
 */
@Component({
  selector: 'p[uiFieldDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-description',
    '[class]': 'classes()',
  },
})
export class FieldDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
      'last:mt-0 nth-last-2:-mt-1',
      '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
      this.className(),
    ),
  );
}
