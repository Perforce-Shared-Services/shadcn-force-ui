import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/label (radix-force-ui style).
 *
 * A leaf primitive — a styled `<label>` with no variants. In the Force UI
 * design system the label has no standalone Figma component: it is embedded in
 * the Field and control (Checkbox, …) components "for improved usability". The
 * code registry, however, ships it as a reusable primitive, which is what this
 * port mirrors — form composites pair it with an input/checkbox.
 *
 * Attribute selector — usage:
 *   <label uiLabel for="email">Email</label>
 *
 * The host stays a native `<label>`, so the browser's implicit
 * label→control association (via `for`/`id` or nesting) works for free
 * (WCAG 1.3.1 / 4.1.2) — no Radix `Slot` / `asChild` needed.
 *
 * Disabled styling is driven by the registry's `peer-disabled:*` /
 * `group-data-[disabled=true]:*` classes: place the label as a sibling after a
 * `peer` control, or inside a `group` carrying `data-disabled="true"`, and it
 * dims + drops pointer events automatically.
 */
@Component({
  selector: '[uiLabel]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'label',
    '[class]': 'classes()',
  },
})
export class LabelComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      this.className(),
    ),
  );
}
