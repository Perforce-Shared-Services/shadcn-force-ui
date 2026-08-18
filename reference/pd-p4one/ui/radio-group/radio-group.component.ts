import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxRadioGroupDirective } from '@radix-ng/primitives/radio';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/radio-group (radix-force-ui style) — the group root.
 *
 * Attribute selector — Angular's idiomatic answer to React's
 * `RadioGroup.Root`. Apply to any container; the radix-ng
 * `RdxRadioGroupDirective` host directive makes it an accessible
 * `role="radiogroup"` with single-selection state, roving-focus arrow-key
 * navigation, and a `ControlValueAccessor` for forms.
 *
 * Usage:
 *   <div uiRadioGroup [(value)]="quality" aria-label="Export quality">
 *     <label class="flex items-center gap-2.5">
 *       <button uiRadioGroupItem value="draft"></button> Draft
 *     </label>
 *     <label class="flex items-center gap-2.5">
 *       <button uiRadioGroupItem value="final"></button> Final
 *     </label>
 *   </div>
 *
 * Inputs/outputs forwarded from the radix host directive:
 * - `value` — `string | null`, two-way (`[(value)]`); the selected item's value.
 * - `defaultValue`, `disabled`, `required`, `orientation`.
 * - `valueChange` / `onValueChange` — emitted on selection.
 *
 * Accessibility: the group needs an accessible name (`aria-label` or
 * `aria-labelledby`, e.g. a `<legend>` / heading). Arrow keys move selection
 * between items (roving focus); Tab enters/leaves the group as one stop.
 */
@Component({
  selector: '[uiRadioGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxRadioGroupDirective,
      inputs: ['value', 'defaultValue', 'disabled', 'required', 'orientation'],
      outputs: ['valueChange', 'onValueChange'],
    },
  ],
  host: {
    'data-slot': 'radio-group',
    '[class]': 'classes()',
  },
  template: '<ng-content />',
})
export class RadioGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn('grid w-full gap-2', this.className()));
}
