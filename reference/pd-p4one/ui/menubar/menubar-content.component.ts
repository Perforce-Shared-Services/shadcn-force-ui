import { booleanAttribute, computed, contentChild, Directive, forwardRef, input } from '@angular/core';
import { RdxMenuBarContentDirective, RdxMenubarSeparatorDirective } from '@radix-ng/primitives/menubar';

import { cn } from '@/app/lib/utils';

/**
 * Panel class — aligned to the sibling dropdown-menu / context-menu's
 * already-audited content string (same canonical shape across the menu
 * family, minus the dropdown's `w-(--radix-…-trigger-width)`: the upstream
 * `@force-ui/menubar` registry doesn't size the panel to its trigger either,
 * so this matches context-menu's content-sized shape). Additions over the raw
 * `@force-ui/menubar` registry string (which only ships `min-w-36
 * origin-(…) overflow-hidden`): `max-h-(--radix-menubar-content-available-height)`,
 * `overflow-x-hidden overflow-y-auto scrollbar-overlay` (the panel scrolls
 * instead of clipping when a submenu-less panel grows long), and
 * `motion-reduce:animate-none` / `data-[state=closed]:overflow-hidden` /
 * `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95`
 * (WCAG 2.3.3 reduced-motion guard + exit animation, both missing upstream).
 *
 * radix-ng portals this element through a CDK overlay; `RdxMenuBarContentDirective`
 * (host directive, wrapping the generic `@radix-ng/primitives/menu`
 * `RdxMenuContentDirective` over `CdkMenu`) supplies `role="menu"`,
 * roving-tabindex keyboard navigation (arrows / Home / End / typeahead /
 * Escape per WAI-ARIA), and `data-state` (open/closed) so the
 * `data-open:animate-in fade-in-0 zoom-in-95` entrance fires off the
 * data-state bridge.
 *
 * `cn-menu-target` / `cn-menu-translucent` are genuine Force UI utilities that
 * survive in the built registry JSON — copied verbatim (no-op if undefined).
 * `bg-popover` + `ring-foreground/10` are explicit colours, so the bare-`border`
 * currentColor gotcha (skill §8) doesn't apply.
 *
 * FLAGGED Figma divergence (2026-07-01, `Menubar / Menu` node 210:3534):
 * Figma draws the panel with a literal `border border-[base/border]` (1px,
 * `#e9e9ee`), not a `ring`. This matches the sibling dropdown-menu/context-menu
 * code, which also uses `ring-1 ring-foreground/10` with no note in their
 * manifest entries that the ring-vs-border choice was Figma-reconciled — same
 * unrecorded-drift pattern as the checkbox/radio indicator alignment below.
 * Kept `ring` here for menu-family cohesion (maintainer decision, 2026-07-01);
 * fixing it would mean touching all three components together.
 *
 * The `(--radix-menubar-content-…)` arbitrary-value classes are kept VERBATIM
 * but are inert under CDK — radix-ng positions via CDK overlay and never sets
 * those Radix CSS vars. With the vars undefined those declarations are
 * ignored, which yields exactly the spec behaviour: width is auto with a
 * `min-w-36` (144px) floor, no height cap for a short panel, and a centre
 * transform-origin for the open zoom. Same documented-inert treatment as the
 * per-`data-[side=…]` slide classes (radix-ng never sets `data-side`).
 */
const MENUBAR_CONTENT_CLASS =
  "cn-menu-target cn-menu-translucent z-50 max-h-(--radix-menubar-content-available-height) min-w-36 origin-(--radix-menubar-content-transform-origin) overflow-x-hidden overflow-y-auto scrollbar-overlay rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 motion-reduce:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

export { MENUBAR_CONTENT_CLASS };

/**
 * Angular port of @force-ui/menubar's `MenubarContent` — the floating panel a
 * `[rdxMenubarTrigger]` opens. Lives inside the `<ng-template>` the trigger
 * portals. Items, separators, labels, and groups are its direct children.
 *
 * The React `MenubarContent` accepts `align` / `alignOffset` / `sideOffset` —
 * in this port those are set on the TRIGGER (`[rdxMenubarTrigger]`) instead,
 * since radix-ng's CDK trigger owns positioning. Documented parity shift,
 * same as the sibling dropdown-menu/context-menu ports.
 */
@Directive({
  selector: '[rdxMenubarContent]',
  standalone: true,
  hostDirectives: [RdxMenuBarContentDirective],
  host: {
    'data-slot': 'menubar-content',
    '[class]': 'classes()',
  },
})
export class MenubarContentDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(MENUBAR_CONTENT_CLASS, this.className()));
}

/**
 * Angular port of `MenubarGroup` — groups related items under `role="group"`.
 *
 * radix-ng's menubar package ships no plain group directive (only a radio
 * group), so this is a thin styling/semantics directive: it stamps
 * `role="group"` and the registry `data-slot` directly. The registry
 * `MenubarGroup` carries no class of its own. Pair with a `[rdxMenubarLabel]`:
 * the group binds `aria-labelledby` to the label's id so a screen reader
 * announces the group by its visible name (a bare `role="group"` is otherwise
 * nameless — WCAG 1.3.1 / 4.1.2). Same pattern as the dropdown-menu and
 * context-menu ports.
 */
@Directive({
  selector: '[rdxMenubarGroup]',
  standalone: true,
  host: {
    'data-slot': 'menubar-group',
    role: 'group',
    '[attr.aria-labelledby]': 'label()?.labelId ?? null',
    '[class]': 'classes()',
  },
})
export class MenubarGroupDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly label = contentChild(forwardRef(() => MenubarLabelDirective));
  protected readonly classes = computed(() => cn(this.className()));
}

/**
 * Angular port of `MenubarLabel` — a non-interactive heading for a group.
 *
 * `inset` adds `data-inset` → `pl-7` to align the label with items that
 * reserve a leading-icon gutter. Bumped to `font-semibold` for a stronger
 * group heading, matching the sibling dropdown-menu/context-menu (maintainer
 * 2026-06-10 — preferred over the spec's uppercase section-heading
 * treatment). Registry base was `text-xs font-medium`.
 *
 * Self-assigns a stable `id` (host binding) so an enclosing `[rdxMenubarGroup]`
 * can wire `aria-labelledby` to it (WCAG 1.3.1 / 4.1.2). A consumer-supplied
 * `id` wins over the generated one.
 */
let menubarLabelSeq = 0;
@Directive({
  selector: '[rdxMenubarLabel]',
  standalone: true,
  host: {
    'data-slot': 'menubar-label',
    '[attr.id]': 'labelId',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
})
export class MenubarLabelDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Stable id so a parent group can reference it via `aria-labelledby`. */
  readonly labelId = `rdx-menubar-label-${menubarLabelSeq++}`;
  protected readonly classes = computed(() =>
    cn('px-1.5 py-1 text-sm font-semibold data-inset:pl-7', this.className()),
  );
}

/**
 * Angular port of `MenubarSeparator` — a hairline divider between groups.
 * `RdxMenubarSeparatorDirective` (host directive, wrapping the generic
 * `RdxMenuSeparatorDirective`) supplies `role="separator"`. Verbatim registry
 * class.
 */
@Directive({
  selector: '[rdxMenubarSeparator]',
  standalone: true,
  hostDirectives: [RdxMenubarSeparatorDirective],
  host: {
    'data-slot': 'menubar-separator',
    '[class]': 'classes()',
  },
})
export class MenubarSeparatorDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('-mx-1 my-1 h-px bg-border', this.className()));
}

/**
 * Angular port of `MenubarShortcut` — trailing muted text for a keyboard hint
 * (e.g. `Ctrl+S`). Plain styling directive on a `<span>`; verbatim registry
 * class. `group-focus/menubar-item:text-accent-foreground` recolours it when
 * its parent item is focused (the item carries `group/menubar-item`).
 *
 * `aria-hidden="true"` is intentional, not an oversight — same reasoning as
 * the sibling ports: the item's text content is its accessible name, and the
 * shortcut glyph is visual-only supplementary info.
 *
 * P4 One ships on Windows too, where `⌘`/`⌥` are not valid modifiers —
 * callers render the platform-appropriate symbol (`Ctrl`/`Alt` vs `⌘`/`⌥`);
 * this directive only styles whatever text it's given.
 */
@Directive({
  selector: 'span[rdxMenubarShortcut]',
  standalone: true,
  host: {
    'data-slot': 'menubar-shortcut',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class MenubarShortcutDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'ml-auto text-xs tracking-widest text-muted-foreground group-focus/menubar-item:text-accent-foreground',
      this.className(),
    ),
  );
}
