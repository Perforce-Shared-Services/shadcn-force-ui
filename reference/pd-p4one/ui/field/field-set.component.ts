import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/field — `FieldSet`.
 *
 * A native `<fieldset>` that groups related fields under one `<legend>`
 * (`FieldLegend`). Tightens its gap when it directly wraps a checkbox- or
 * radio-group. Host stays a real `<fieldset>` for the native grouping
 * semantics.
 *
 *   <fieldset uiFieldSet>
 *     <legend uiFieldLegend>Notifications</legend>
 *     …fields…
 *   </fieldset>
 */
@Component({
  selector: 'fieldset[uiFieldSet]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-set',
    '[class]': 'classes()',
  },
})
export class FieldSetComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
      this.className(),
    ),
  );
}
