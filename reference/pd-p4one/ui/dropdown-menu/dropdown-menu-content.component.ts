import { booleanAttribute, computed, contentChild, Directive, forwardRef, input } from '@angular/core';
import {
  RdxDropdownMenuContentDirective,
  RdxDropdownMenuSeparatorDirective,
} from '@radix-ng/primitives/dropdown-menu';

import { cn } from '@/app/lib/utils';

/**
 * Panel class — verbatim from the @force-ui/dropdown-menu registry item.
 *
 * radix-ng portals this element through a CDK overlay; `RdxDropdownMenuContentDirective`
 * (host directive, built on `CdkMenu`) supplies `role="menu"`, roving-tabindex
 * keyboard navigation (arrows / Home / End / typeahead / Escape per WAI-ARIA),
 * and `data-state` (open/closed) so the `data-open:animate-in fade-in-0
 * zoom-in-95` entrance fires off the data-state bridge. `motion-reduce:animate-none`
 * guards the entrance/exit for `prefers-reduced-motion` (WCAG 2.3.3).
 *
 * `cn-menu-target` / `cn-menu-translucent` are genuine Force UI utilities that
 * survive in the built registry JSON — copied verbatim (no-op if undefined).
 * `bg-popover` + `ring-foreground/10` are explicit colours, so the bare-`border`
 * currentColor gotcha doesn't apply (no border-border needed).
 *
 * Three `(--radix-*)` arbitrary-value classes are kept VERBATIM but are inert
 * under CDK — radix-ng positions via CDK overlay (popper-style) and never sets
 * the Radix CSS vars `--radix-dropdown-menu-content-available-height`,
 * `--radix-dropdown-menu-trigger-width`, or `…-transform-origin`. With the vars
 * undefined those declarations are ignored, which yields exactly the spec
 * behaviour: width is auto with a `min-w-32` (128px) floor that grows to fit the
 * longest label, no height cap (action menus are short — ~8 items), and a
 * centre transform-origin for the open zoom. Same documented-inert treatment as
 * the per-`data-[side=…]` slide classes below (radix-ng never sets `data-side`).
 */
const DROPDOWN_MENU_CONTENT_CLASS =
  "cn-menu-target cn-menu-translucent z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto scrollbar-overlay rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 motion-reduce:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

export { DROPDOWN_MENU_CONTENT_CLASS };

/**
 * Angular port of @force-ui/dropdown-menu's `DropdownMenuContent` — the floating
 * panel. Lives inside the `<ng-template>` the trigger portals. Items, separators,
 * labels, and groups are its direct children.
 *
 * The React `DropdownMenuContent` accepts `align` / `sideOffset` — in this port
 * those are set on the TRIGGER (`[rdxDropdownMenuTrigger]`) instead, since
 * radix-ng's CDK trigger owns positioning. Documented parity shift.
 */
@Directive({
  selector: '[rdxDropdownMenuContent]',
  standalone: true,
  hostDirectives: [RdxDropdownMenuContentDirective],
  host: {
    'data-slot': 'dropdown-menu-content',
    '[class]': 'classes()',
  },
})
export class DropdownMenuContentDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(DROPDOWN_MENU_CONTENT_CLASS, this.className()));
}

/**
 * Angular port of `DropdownMenuGroup` — groups related items under `role="group"`.
 *
 * radix-ng's dropdown package ships no group directive (only a radio group), so
 * this is a thin styling/semantics directive: it stamps `role="group"` and the
 * registry `data-slot` directly. The registry `DropdownMenuGroup` carries no
 * class of its own. Pair with a `[rdxDropdownMenuLabel]`: the group binds
 * `aria-labelledby` to the label's id so a screen reader announces the group by
 * its visible name (a bare `role="group"` is otherwise nameless — WCAG 1.3.1 /
 * 4.1.2). Same pattern as the select port.
 */
@Directive({
  selector: '[rdxDropdownMenuGroup]',
  standalone: true,
  host: {
    'data-slot': 'dropdown-menu-group',
    role: 'group',
    '[attr.aria-labelledby]': 'label()?.labelId ?? null',
    '[class]': 'classes()',
  },
})
export class DropdownMenuGroupDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly label = contentChild(forwardRef(() => DropdownMenuLabelDirective));
  protected readonly classes = computed(() => cn(this.className()));
}

/**
 * Angular port of `DropdownMenuLabel` — a non-interactive heading for a group.
 *
 * Verbatim registry class. `inset` adds `data-inset` → `pl-7` to align the label
 * with items that reserve a leading-icon gutter.
 *
 * Sentence-case heading (matches the registry + Figma), bumped to `font-semibold`
 * for a stronger group heading (maintainer 2026-06-10 — preferred over the spec's
 * uppercase section-heading treatment). Registry base was `text-xs font-medium
 * text-muted-foreground`.
 *
 * Self-assigns a stable `id` (host binding) so an enclosing `[rdxDropdownMenuGroup]`
 * can wire `aria-labelledby` to it (WCAG 1.3.1 / 4.1.2). A consumer-supplied `id`
 * wins over the generated one.
 */
let dropdownMenuLabelSeq = 0;
@Directive({
  selector: '[rdxDropdownMenuLabel]',
  standalone: true,
  host: {
    'data-slot': 'dropdown-menu-label',
    '[attr.id]': 'labelId',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
})
export class DropdownMenuLabelDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Stable id so a parent group can reference it via `aria-labelledby`. */
  readonly labelId = `rdx-dropdown-menu-label-${dropdownMenuLabelSeq++}`;
  protected readonly classes = computed(() =>
    cn('px-1.5 py-1 text-xs font-semibold text-muted-foreground data-inset:pl-7', this.className()),
  );
}

/**
 * Angular port of `DropdownMenuSeparator` — a hairline divider between groups.
 * radix-ng's `RdxDropdownMenuSeparatorDirective` (host directive) supplies
 * `role="separator"`. Verbatim registry class.
 */
@Directive({
  selector: '[rdxDropdownMenuSeparator]',
  standalone: true,
  hostDirectives: [RdxDropdownMenuSeparatorDirective],
  host: {
    'data-slot': 'dropdown-menu-separator',
    '[class]': 'classes()',
  },
})
export class DropdownMenuSeparatorDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('-mx-1 my-1 h-px bg-border', this.className()));
}

/**
 * Angular port of `DropdownMenuShortcut` — trailing muted text for a keyboard
 * hint (e.g. `⌘C`). Plain styling directive on a `<span>`; verbatim registry
 * class. `group-focus/dropdown-menu-item:text-accent-foreground` recolours it
 * when its parent item is focused (the item carries `group/dropdown-menu-item`).
 */
@Directive({
  selector: 'span[rdxDropdownMenuShortcut]',
  standalone: true,
  host: {
    'data-slot': 'dropdown-menu-shortcut',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class DropdownMenuShortcutDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground',
      this.className(),
    ),
  );
}
