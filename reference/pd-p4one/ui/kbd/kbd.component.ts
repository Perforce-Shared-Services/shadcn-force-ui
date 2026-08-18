import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { kbdVariants, type KbdVariant } from './kbd.variants';

/**
 * Angular port of @force-ui/kbd (radix-force-ui style).
 *
 * Attribute selectors, mirroring the button port: the host stays a native
 * `<kbd>` and the component just decorates it. Two pieces, matching the
 * registry's `Kbd` + `KbdGroup`:
 *
 *   <kbd uiKbd>Ctrl</kbd>
 *   <kbd uiKbd variant="primary">⌘</kbd>            // on a solid/brand surface
 *   <span uiKbdGroup><kbd uiKbd>⌘</kbd><kbd uiKbd>K</kbd></span>
 *
 * `variant="default"` is the muted pill for light surfaces; `variant="primary"`
 * is the translucent pill for placement on a solid/brand surface — e.g. inside
 * a `default` (indigo) button or a tooltip — matching the Figma
 * `Background=Primary` variant. Inside a `data-slot="tooltip-content"` the
 * registry classes auto-invert it regardless of variant.
 *
 * Icons follow the app-wide convention (Material Symbols Rounded glyph or an
 * `<svg>`), projected as content and sized to the key.
 *
 * Parity note: the registry ships only the muted style and a plain group. The
 * `primary` variant + KbdGroup separators are Figma extensions; `primary` is
 * ported (it's needed for kbd on a default button) using the registry's own
 * tooltip-context colours. The Figma KbdGroup `+ Separated` type is not ported.
 */
@Component({
  selector: '[uiKbd]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'kbd',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class KbdComponent {
  readonly variant = input<KbdVariant>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(kbdVariants({ variant: this.variant() }), this.className()),
  );
}

@Component({
  selector: '[uiKbdGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'kbd-group',
    '[class]': 'classes()',
  },
})
export class KbdGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('inline-flex items-center gap-1', this.className()),
  );
}
