import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/field — `FieldGroup`.
 *
 * Vertical stack of multiple `Field`s. Owns the `@container/field-group`
 * container context that the `Field` `responsive` orientation queries against
 * (`@md/field-group:*`), so a responsive field only flips to horizontal once
 * its `FieldGroup` is wide enough. Also the `group/field-group` ancestor for the
 * `FieldSeparator` outline-variant spacing.
 */
@Component({
  selector: '[uiFieldGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-group',
    '[class]': 'classes()',
  },
})
export class FieldGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
      this.className(),
    ),
  );
}
