import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/field — `FieldTitle`.
 *
 * The non-`<label>` heading inside a `FieldContent` (e.g. the title beside a
 * checkbox/switch, where the clickable `FieldLabel` is elsewhere). Carries the
 * same `data-slot="field-label"` so the parent `Field` row alignment still
 * detects it, but renders as a plain `<div>` — it is not an actual form label.
 */
@Component({
  selector: '[uiFieldTitle]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-label',
    '[class]': 'classes()',
  },
})
export class FieldTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
      this.className(),
    ),
  );
}
