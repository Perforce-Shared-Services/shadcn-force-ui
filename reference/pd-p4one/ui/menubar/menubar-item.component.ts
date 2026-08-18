import { booleanAttribute, computed, Directive, input } from '@angular/core';
import { RdxMenuItemDirective } from '@radix-ng/primitives/menu';

import { cn } from '@/app/lib/utils';

/**
 * Item class — aligned to the sibling dropdown-menu / context-menu's
 * already-audited item string (one canonical shape across the menu family).
 * Additions over the raw `@force-ui/menubar` registry string:
 *
 * - `w-full` — radix-ng items are CDK `<button>`s that shrink to their
 *   content; without it the item won't fill the panel and the `ml-auto`
 *   shortcut can't right-align.
 * - `transition-colors motion-reduce:transition-none` — the standard subtle,
 *   token-fast (150ms) state fade, reduced-motion guarded (WCAG 2.3.3).
 * - `[&_svg]:fill-current` — our projected leading icons are Material Symbols
 *   `<svg>` which carry NO `fill` attribute and paint black without it
 *   (skill §9); `fill-current` makes them inherit the item's `currentColor`.
 * - Dropped the registry's trailing `!` on `data-[variant=destructive]:*:[svg]:text-destructive!`
 *   — the sibling ports carry the unmodified (non-`!`) form; keeping one
 *   canonical shape across the family.
 *
 * CDK Menu items take REAL DOM focus — `RdxMenuBarItemDirective` moves focus
 * on pointer-move and via roving tabindex on arrow keys — so the registry's
 * `focus:bg-accent` / `focus:text-accent-foreground` classes paint for BOTH
 * keyboard and pointer with no remap (same as the sibling ports).
 *
 * `cursor-default` is the registry value (a menu item is not a link) and is
 * kept verbatim — flagged against the spec's "cursor: pointer" for the audit
 * step.
 */
const MENUBAR_ITEM_CLASS =
  "group/menubar-item relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive";

export { MENUBAR_ITEM_CLASS };

export type MenubarItemVariant = 'default' | 'destructive';

/**
 * Angular port of @force-ui/menubar's `MenubarItem`.
 *
 * Built directly against the GENERIC `@radix-ng/primitives/menu`
 * `RdxMenuItemDirective` rather than the menubar package's own
 * `RdxMenuBarItemDirective` wrapper (which does nothing but re-forward
 * `disabled`/`onSelect` from the same generic directive — no menubar-specific
 * behavior of its own). Composing through that extra wrapper layer THREE
 * host-directive levels deep (ours → `RdxMenuBarItemDirective` →
 * `RdxMenuItemDirective`) all re-declaring the same `disabled` input hits a
 * genuine Angular compiler bug: `setAllInputsForProperty` throws `TypeError:
 * undefined is not iterable` writing to a transformed (`booleanAttribute`)
 * input re-exposed at 3 host-directive levels, and the exception silently
 * aborts the SAME change-detection pass the just-opened panel's overlay
 * position strategy runs in — the panel renders with the right content but
 * never receives its `top`/`left`, landing at the viewport's (0,0). Confirmed
 * via the browser console stack (`writeToDirectiveInput` → `ɵɵproperty` →
 * `attachTemplatePortal` → `open()`) reproduced with nothing but a 2nd
 * `[disabled]`-bound item in the panel — content, icons, and shortcuts were
 * all ruled out first. Dropping to 2 levels (this directive → the generic
 * `RdxMenuItemDirective` directly) removes the duplicate re-declaration and
 * resolves it; same technique already used for the checkbox/radio items.
 *
 * `RdxMenuItemDirective` (host directive) makes it `role="menuitem"` (via
 * `CdkMenuItem`), wires click + Enter/Space activation through `(onSelect)`,
 * sets `data-highlighted` / `data-disabled`, and participates in the panel's
 * keyboard navigation. MUST sit inside a `[rdxMenubarContent]`.
 * Leading/trailing content (icon, label, `[rdxMenubarShortcut]`) are
 * projected as normal children.
 *
 * `variant` ('default' | 'destructive') and `inset` are shadcn additions the
 * radix directive does not model, so they are stamped here as `data-variant` /
 * `data-inset` to drive the cva classes. A destructive item MUST be preceded
 * by a separator and MUST open a confirmation dialog before executing (spec).
 *
 * Usage: `<button rdxMenubarItem variant="destructive" (onSelect)="remove()">Delete</button>`
 */
@Directive({
  selector: 'button[rdxMenubarItem]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuItemDirective,
      inputs: ['disabled'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    'data-slot': 'menubar-item',
    '[attr.data-variant]': 'variant()',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
})
export class MenubarItemDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly variant = input<MenubarItemVariant>('default');
  readonly inset = input(false, { transform: booleanAttribute });
  protected readonly classes = computed(() => cn(MENUBAR_ITEM_CLASS, this.className()));
}
