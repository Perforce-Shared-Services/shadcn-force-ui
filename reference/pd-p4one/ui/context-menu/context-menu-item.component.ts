import { booleanAttribute, computed, Directive, input } from '@angular/core';
import { RdxContextMenuItemDirective } from '@radix-ng/primitives/context-menu';

import { cn } from '@/app/lib/utils';

/**
 * Item class — the @force-ui/context-menu registry item, aligned to the sibling
 * dropdown-menu's already-audited item string (the two registry strings differ
 * only in the additions below; we keep one canonical shape across the menu
 * family for cohesion). Additions over the raw registry string, all documented:
 *
 * - `w-full` — radix-ng items are CDK `<button>`s that shrink to their content;
 *   without it the item won't fill the panel and the `ml-auto` shortcut can't
 *   right-align. Layout-only, no token/Figma divergence (panel items span the menu).
 * - `transition-colors motion-reduce:transition-none` — the standard subtle,
 *   token-fast (150ms) state fade, reduced-motion guarded (WCAG 2.3.3).
 * - `[&_svg]:fill-current` — our projected leading icons are Material Symbols
 *   `<svg>` which carry NO `fill` attribute and paint black without it (skill §9);
 *   `fill-current` makes them inherit the item's `currentColor` (so destructive
 *   items tint their icon via the label's `text-destructive`).
 * - `not-data-[variant=destructive]:focus:**:text-accent-foreground` — replaces
 *   the registry's `focus:*:[svg]:text-accent-foreground`, so a focused
 *   destructive item keeps its error-coloured icon instead of flipping to accent
 *   (the registry string had both classes apply on focus, recolouring the
 *   destructive glyph). Matches the dropdown-menu fix.
 *
 * Unlike the select port (whose items are `tabindex="-1"` active-descendant and
 * needed a `focus:` → `data-highlighted:` remap), CDK Menu items take REAL DOM
 * focus — `RdxContextMenuItemDirective` moves focus on pointer-move and via
 * roving tabindex on arrow keys — so the registry's `focus:bg-accent` /
 * `focus:text-accent-foreground` classes paint for BOTH keyboard and pointer
 * with no remap.
 *
 * `cursor-default` is the registry value (a menu item is not a link) and is kept
 * verbatim — flagged against the spec's "cursor: pointer" for the audit step.
 */
const CONTEXT_MENU_ITEM_CLASS =
  "group/context-menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive";

export { CONTEXT_MENU_ITEM_CLASS };

export type ContextMenuItemVariant = 'default' | 'destructive';

/**
 * Angular port of @force-ui/context-menu's `ContextMenuItem`.
 *
 * Attribute selector on a native `<button>` — radix-ng's `RdxContextMenuItemDirective`
 * (host directive) makes it `role="menuitem"` (via CdkMenuItem), wires click +
 * Enter/Space activation through `(onSelect)`, sets `data-highlighted` /
 * `data-disabled`, and participates in the panel's keyboard navigation. MUST sit
 * inside a `[rdxContextMenuContent]`. Leading/trailing content (icon, label,
 * `[rdxContextMenuShortcut]`) are projected as normal children.
 *
 * `variant` ('default' | 'destructive') and `inset` are shadcn additions the
 * radix directive does not model, so they are stamped here as `data-variant` /
 * `data-inset` to drive the cva classes. A destructive item MUST be preceded by
 * a separator and MUST open a confirmation dialog before executing (spec).
 *
 * Usage: `<button rdxContextMenuItem variant="destructive" (onSelect)="remove()">Delete</button>`
 */
@Directive({
  selector: 'button[rdxContextMenuItem]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxContextMenuItemDirective,
      inputs: ['disabled'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    'data-slot': 'context-menu-item',
    '[attr.data-variant]': 'variant()',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
})
export class ContextMenuItemDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly variant = input<ContextMenuItemVariant>('default');
  readonly inset = input(false, { transform: booleanAttribute });
  protected readonly classes = computed(() => cn(CONTEXT_MENU_ITEM_CLASS, this.className()));
}
