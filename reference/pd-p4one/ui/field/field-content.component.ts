import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/field — `FieldContent`.
 *
 * Wraps a `FieldTitle`/`FieldDescription` pair next to an inline control in a
 * horizontal field (e.g. a checkbox row): the control sits beside this block,
 * which stacks the title over its description. Its presence is what the parent
 * `Field` horizontal/responsive variants detect
 * (`has-[>[data-slot=field-content]]`) to top-align the row.
 */
@Component({
  selector: '[uiFieldContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-content',
    '[class]': 'classes()',
  },
})
export class FieldContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'group/field-content flex flex-1 flex-col gap-0.5 leading-snug',
      this.className(),
    ),
  );
}
