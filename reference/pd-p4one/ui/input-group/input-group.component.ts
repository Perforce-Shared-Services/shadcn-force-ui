import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import {
  inputGroupVariants,
  type InputGroupVariant,
} from './input-group.variants';

/**
 * Angular port of @force-ui/input-group (radix-force-ui).
 *
 * `[uiInputGroup]` is the wrapper that owns the field chrome (border, focus
 * ring, invalid, disabled) so an `<input uiInputGroupInput>` plus one or more
 * `<div uiInputGroupAddon>` (icons, buttons, text, kbd) read as a single
 * control. The inner input is rendered borderless — the group draws the box.
 *
 * Usage:
 *   <div uiInputGroup>
 *     <div uiInputGroupAddon><svg>...</svg></div>
 *     <input uiInputGroupInput placeholder="Search files and versions" />
 *   </div>
 *
 * Addon icons are inline Material Symbols `<svg>` (imported from
 * `@material-symbols/svg-400/rounded/<name>.svg?raw`); the addon cva sizes and
 * colours them.
 *
 * VARIANT axis (P4 One extension, mirrors `input`): outline (default) / filled
 * / underline / ghost — see input-group.variants.ts. BORDER TIER: like the
 * standalone input (Option B), the resting border is the light `border-border`,
 * reinforced to `border-input` on hover; the group's focus-within rebinds to
 * `border-ring`. Diverges from the registry's resting `border-input` for
 * consistency with `input`.
 *
 * a11y / labelling: the group is `role="group"`. Label the FIELD by giving the
 * inner control an id and a programmatic `<label for>` (the group isn't a
 * labelable element). If the group needs its own announced name, add
 * `aria-label` / `aria-labelledby` on the host. Error state: set `aria-invalid`
 * on the inner control (drives the group's red chrome) AND link a visible
 * message via `aria-describedby` — colour is not a sufficient signal (WCAG
 * 1.4.1). See the WithLabel story.
 */
@Component({
  selector: '[uiInputGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input-group',
    role: 'group',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class InputGroupComponent {
  readonly variant = input<InputGroupVariant>('outline');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(inputGroupVariants({ variant: this.variant() }), this.className()),
  );
}
