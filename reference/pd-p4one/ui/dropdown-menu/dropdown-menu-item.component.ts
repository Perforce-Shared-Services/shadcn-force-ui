import { booleanAttribute, computed, Directive, input } from '@angular/core';
import { RdxDropdownMenuItemDirective } from '@radix-ng/primitives/dropdown-menu';

import { cn } from '@/app/lib/utils';

/**
 * Item class — verbatim from the @force-ui/dropdown-menu registry item, plus the
 * standard subtle `transition-colors motion-reduce:transition-none` token-fast
 * (150ms) state fade, reduced-motion guarded (WCAG 2.3.3).
 *
 * Unlike the select port (whose items are `tabindex="-1"` active-descendant and
 * needed a `focus:` → `data-highlighted:` remap), CDK Menu items take REAL DOM
 * focus — `RdxDropdownMenuItemDirective` moves focus on pointer-move and via
 * roving tabindex on arrow keys — so the registry's `focus:bg-accent` /
 * `focus:text-accent-foreground` / `…focus:**:text-accent-foreground` classes
 * paint for BOTH keyboard and pointer with no remap. Kept verbatim.
 *
 * `cursor-default` is the registry value (a menu item is not a link) and is kept
 * verbatim — flagged against the spec's "cursor: pointer" for the audit step.
 *
 * `w-full` is added (registry omits it): radix-ng items are CDK `<button>`s that
 * shrink to their content, so without it the item won't fill the panel and the
 * `ml-auto` shortcut can't right-align. Matches the select item, which ships
 * `w-full`. Layout-only — no token/Figma divergence (panel items span the menu).
 *
 * One documented deviation for the icon system (skill §9): `[&_svg]:fill-current`
 * is appended. The registry string was authored for Lucide's stroke-based icons;
 * our projected leading icons are Material Symbols `<svg>` which carry NO `fill`
 * attribute and paint black without it. `fill-current` makes them inherit the
 * item's `currentColor` (so destructive items also tint their icon via the
 * label's `text-destructive`).
 */
const DROPDOWN_MENU_ITEM_CLASS =
  "group/dropdown-menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive";

export { DROPDOWN_MENU_ITEM_CLASS };

export type DropdownMenuItemVariant = 'default' | 'destructive';

/**
 * Angular port of @force-ui/dropdown-menu's `DropdownMenuItem`.
 *
 * Attribute selector on a native `<button>` — radix-ng's `RdxDropdownMenuItemDirective`
 * (host directive) makes it `role="menuitem"` (via CdkMenuItem), wires click +
 * Enter/Space activation through `(onSelect)`, sets `data-highlighted` /
 * `data-disabled`, and participates in the panel's keyboard navigation. MUST sit
 * inside a `[rdxDropdownMenuContent]`. Leading/trailing content (icon, label,
 * `[rdxDropdownMenuShortcut]`) are projected as normal children.
 *
 * `variant` ('default' | 'destructive') and `inset` are shadcn additions the
 * radix directive does not model, so they are stamped here as `data-variant` /
 * `data-inset` to drive the cva classes. A destructive item MUST be preceded by
 * a separator and MUST open a confirmation dialog before executing (spec).
 *
 * Usage: `<button rdxDropdownMenuItem variant="destructive" (onSelect)="remove()">Delete</button>`
 */
@Directive({
  selector: 'button[rdxDropdownMenuItem]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDropdownMenuItemDirective,
      inputs: ['disabled'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-item',
    '[attr.data-variant]': 'variant()',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
})
export class DropdownMenuItemDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly variant = input<DropdownMenuItemVariant>('default');
  readonly inset = input(false, { transform: booleanAttribute });
  protected readonly classes = computed(() => cn(DROPDOWN_MENU_ITEM_CLASS, this.className()));
}
