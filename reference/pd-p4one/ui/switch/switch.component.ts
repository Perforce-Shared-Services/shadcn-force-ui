import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type OnInit,
} from '@angular/core';
import { RdxControlValueAccessor } from '@radix-ng/primitives/core';
import {
  injectSwitchRootContext,
  RdxSwitchRootDirective,
  RdxSwitchThumbDirective,
} from '@radix-ng/primitives/switch';

import { cn } from '@/app/lib/utils';

import { SWITCH_BASE_CLASS, SWITCH_THUMB_CLASS, type SwitchSize } from './switch.variants';

/**
 * Angular port of @force-ui/switch (radix-force-ui style).
 *
 * Attribute selector on a native `<button>` — Angular's idiomatic answer to
 * React's Radix `Switch.Root`. The host MUST be a `<button>`: the radix-ng
 * `RdxSwitchRootDirective` (applied as a host directive) turns it into an
 * accessible switch — `role="switch"`, `aria-checked`, `data-state`,
 * Space-to-toggle, Enter suppressed per WAI-ARIA — and provides the form-bound
 * state context the thumb reads.
 *
 * A switch promises IMMEDIATE effect (commit on flip, no Save button). For a
 * value that's submitted later, use the checkbox instead — see the
 * `toggle-switch` Force spec pattern.
 *
 * Usage:
 *   <button uiSwitch [(checked)]="autoSync" aria-label="Auto-sync on save"></button>
 *   <button uiSwitch size="sm" [(checked)]="enabled"></button>
 *   <button uiSwitch [(checked)]="allowPublic" aria-invalid="true"></button>
 *   <button uiSwitch disabled [checked]="true" aria-label="Locked by admin"></button>
 *
 * Inputs/outputs forwarded from the radix host directive:
 * - `checked` — `boolean`, two-way (`[(checked)]`); `defaultChecked` for the
 *   uncontrolled initial state.
 * - `disabled`, `required`, `id`, `aria-label`, `aria-labelledby`.
 * - `checkedChange` / `onCheckedChange` — emitted on toggle.
 *
 * Local inputs:
 * - `size` — `'sm' | 'default'` (default `'default'`); bound to `data-size`,
 *   which the thumb reads via `group-data-[size=...]/switch` to size itself.
 *
 * The switch is single-colour. For a destructive/invalid affordance set
 * `aria-invalid="true"` (destructive border), matching the Figma `State=Invalid`
 * variant — there is no separate red-fill "danger" colour.
 *
 * Accessibility:
 * - A switch with no programmatically-associated label MUST carry an
 *   `aria-label` (or `aria-labelledby`) on the host, or it is unnamed to screen
 *   readers (WCAG 4.1.2). Write the label in positive terms describing the ON
 *   effect ("Email notifications", not "Disable notifications").
 * - State is conveyed by thumb POSITION (left/right) as well as track colour,
 *   so it never relies on colour alone.
 */
@Component({
  selector: 'button[uiSwitch]',
  standalone: true,
  imports: [RdxSwitchThumbDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxSwitchRootDirective,
      inputs: [
        'checked',
        'defaultChecked',
        'disabled',
        'required',
        'id',
        'aria-label',
        'aria-labelledby',
      ],
      outputs: ['checkedChange', 'onCheckedChange'],
    },
  ],
  host: {
    'data-slot': 'switch',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
  template: `
    <span
      rdxSwitchThumb
      data-slot="switch-thumb"
      [class]="thumbClass"
    ></span>
  `,
})
export class SwitchComponent implements OnInit {
  readonly size = input<SwitchSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Provided by the `RdxSwitchRootDirective` host directive on this element. */
  private readonly rootContext = injectSwitchRootContext();
  private readonly cva = inject(RdxControlValueAccessor);

  /**
   * Guarantee `aria-checked` is always present (WCAG 4.1.2 — `role="switch"`
   * requires it). radix-ng binds `aria-checked` to the control-value-accessor's
   * value, which stays nullish until a `checked`/`defaultChecked` binding writes
   * it — so a bare `<button uiSwitch>` (no `[checked]`) renders with NO
   * `aria-checked` at all (axe `aria-required-attr`, critical). Seed the CVA to
   * the resting off state when the consumer hasn't supplied one; a real binding
   * leaves a non-null value before `ngOnInit`, so it's never clobbered.
   */
  ngOnInit(): void {
    if (this.rootContext?.checked() == null) {
      this.cva.writeValue(false);
    }
  }

  protected readonly thumbClass = SWITCH_THUMB_CLASS;

  protected readonly classes = computed(() => cn(SWITCH_BASE_CLASS, this.className()));
}
