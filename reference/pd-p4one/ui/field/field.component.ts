import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { fieldVariants, type FieldOrientation } from './field.variants';

/**
 * Angular port of @force-ui/field (radix-force-ui style) — `Field`.
 *
 * The single-field wrapper: groups one control with its label, description and
 * error. `role="group"` ties the parts together for assistive tech. Emits
 * `data-orientation` so the parent `fieldVariants` row/column layout applies,
 * and `data-invalid` (bound from the `invalid` input) which flips the whole
 * field's text to `text-destructive`.
 *
 *   <div uiField>
 *     <label uiFieldLabel for="name">Version name</label>
 *     <input uiInput id="name" />
 *     <p uiFieldDescription>Shown in the timeline.</p>
 *   </div>
 */
@Component({
  selector: '[uiField]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'field',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-invalid]': 'invalid() ? true : null',
    '[class]': 'classes()',
  },
})
export class FieldComponent {
  readonly orientation = input<FieldOrientation>('vertical');
  /**
   * Marks the whole field invalid — turns the label/title text
   * `text-destructive` via the `data-[invalid=true]:*` base class. Pair with the
   * control's own `aria-invalid` and a `FieldError` for the announced message.
   */
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      fieldVariants({ orientation: this.orientation() }),
      // The base string's `data-[invalid=true]:text-destructive` does not render
      // here — this app's Tailwind v4 build emits no `data-[attr=value]:` variant
      // utilities — so the invalid text color is applied from the `invalid`
      // input directly. The `data-invalid` attribute is still reflected on the
      // host (external styling); descendants inherit this `text-destructive`.
      this.invalid() ? 'text-destructive' : '',
      this.className(),
    ),
  );
}
