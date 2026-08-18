import { booleanAttribute, computed, contentChild, Directive, forwardRef, input } from '@angular/core';
import {
  RdxContextMenuContentDirective,
  RdxContextMenuSeparatorDirective,
} from '@radix-ng/primitives/context-menu';

import { cn } from '@/app/lib/utils';

/**
 * Panel class — verbatim from the @force-ui/context-menu registry item, plus the
 * same two documented additions the sibling dropdown-menu carries: `scrollbar-overlay`
 * (the panel scrolls — `overflow-y-auto`) and `motion-reduce:animate-none` /
 * `data-[state=closed]:overflow-hidden` (WCAG 2.3.3 reduced-motion guard on the
 * entrance/exit).
 *
 * radix-ng portals this element through a CDK overlay; `RdxContextMenuContentDirective`
 * (host directive, built on `CdkMenu`) supplies `role="menu"`, roving-tabindex
 * keyboard navigation (arrows / Home / End / typeahead / Escape per WAI-ARIA),
 * and `data-state` (open/closed) so the `data-open:animate-in fade-in-0
 * zoom-in-95` entrance fires off the data-state bridge.
 *
 * `cn-menu-target` / `cn-menu-translucent` are genuine Force UI utilities that
 * survive in the built registry JSON — copied verbatim (no-op if undefined).
 * `bg-popover` + `ring-foreground/10` are explicit colours, so the bare-`border`
 * currentColor gotcha doesn't apply (no border-border needed).
 *
 * Two `(--radix-*)` arbitrary-value classes are kept VERBATIM but are inert
 * under CDK — radix-ng positions via CDK overlay and never sets the Radix CSS
 * vars `--radix-context-menu-content-available-height` or `…-transform-origin`.
 * With the vars undefined those declarations are ignored, which yields exactly
 * the spec behaviour: width is auto with a `min-w-36` (144px) floor that grows
 * to fit the longest label, no height cap (action menus are short), and a centre
 * transform-origin for the open zoom. Same documented-inert treatment as the
 * per-`data-[side=…]` slide classes (radix-ng never sets `data-side`). Unlike
 * the dropdown panel there is no `w-(--radix-…-trigger-width)` — a context menu
 * sizes to its content, not to a trigger.
 */
const CONTEXT_MENU_CONTENT_CLASS =
  "cn-menu-target cn-menu-translucent z-50 max-h-(--radix-context-menu-content-available-height) min-w-36 origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto scrollbar-overlay rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 motion-reduce:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

export { CONTEXT_MENU_CONTENT_CLASS };

/**
 * Angular port of @force-ui/context-menu's `ContextMenuContent` — the floating
 * panel. Lives inside the `<ng-template>` the trigger portals. Items, separators,
 * labels, and groups are its direct children.
 *
 * radix-ng's CDK trigger owns positioning, so the React `ContextMenuContent`
 * `side` prop has no equivalent here (a context menu always opens at the cursor).
 * Documented parity shift.
 */
@Directive({
  selector: '[rdxContextMenuContent]',
  standalone: true,
  hostDirectives: [RdxContextMenuContentDirective],
  host: {
    'data-slot': 'context-menu-content',
    '[class]': 'classes()',
  },
})
export class ContextMenuContentDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(CONTEXT_MENU_CONTENT_CLASS, this.className()));
}

/**
 * Angular port of `ContextMenuGroup` — groups related items under `role="group"`.
 *
 * radix-ng's context-menu package ships no group directive (only a radio group),
 * so this is a thin styling/semantics directive: it stamps `role="group"` and
 * the registry `data-slot` directly. The registry `ContextMenuGroup` carries no
 * class of its own. Pair with a `[rdxContextMenuLabel]`: the group binds
 * `aria-labelledby` to the label's id so a screen reader announces the group by
 * its visible name (a bare `role="group"` is otherwise nameless — WCAG 1.3.1 /
 * 4.1.2). Same pattern as the dropdown-menu and select ports.
 */
@Directive({
  selector: '[rdxContextMenuGroup]',
  standalone: true,
  host: {
    'data-slot': 'context-menu-group',
    role: 'group',
    '[attr.aria-labelledby]': 'label()?.labelId ?? null',
    '[class]': 'classes()',
  },
})
export class ContextMenuGroupDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly label = contentChild(forwardRef(() => ContextMenuLabelDirective));
  protected readonly classes = computed(() => cn(this.className()));
}

/**
 * Angular port of `ContextMenuLabel` — a non-interactive heading for a group.
 *
 * `inset` adds `data-inset` → `pl-7` to align the label with items that reserve
 * a leading-icon gutter. Bumped to `font-semibold` for a stronger group heading,
 * matching the sibling dropdown-menu (maintainer 2026-06-10 — preferred over the
 * spec's uppercase section-heading treatment). Registry base was `text-xs
 * font-medium text-muted-foreground`.
 *
 * Self-assigns a stable `id` (host binding) so an enclosing `[rdxContextMenuGroup]`
 * can wire `aria-labelledby` to it (WCAG 1.3.1 / 4.1.2). A consumer-supplied `id`
 * wins over the generated one.
 */
let contextMenuLabelSeq = 0;
@Directive({
  selector: '[rdxContextMenuLabel]',
  standalone: true,
  host: {
    'data-slot': 'context-menu-label',
    '[attr.id]': 'labelId',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[class]': 'classes()',
  },
})
export class ContextMenuLabelDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly inset = input(false, { transform: booleanAttribute });
  /** Stable id so a parent group can reference it via `aria-labelledby`. */
  readonly labelId = `rdx-context-menu-label-${contextMenuLabelSeq++}`;
  protected readonly classes = computed(() =>
    cn('px-1.5 py-1 text-xs font-semibold text-muted-foreground data-inset:pl-7', this.className()),
  );
}

/**
 * Angular port of `ContextMenuSeparator` — a hairline divider between groups.
 * radix-ng's `RdxContextMenuSeparatorDirective` (host directive) supplies
 * `role="separator"`. Verbatim registry class.
 */
@Directive({
  selector: '[rdxContextMenuSeparator]',
  standalone: true,
  hostDirectives: [RdxContextMenuSeparatorDirective],
  host: {
    'data-slot': 'context-menu-separator',
    '[class]': 'classes()',
  },
})
export class ContextMenuSeparatorDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('-mx-1 my-1 h-px bg-border', this.className()));
}

/**
 * Angular port of `ContextMenuShortcut` — trailing muted text for a keyboard
 * hint (e.g. `⌘C`). Plain styling directive on a `<span>`; verbatim registry
 * class. `group-focus/context-menu-item:text-accent-foreground` recolours it
 * when its parent item is focused (the item carries `group/context-menu-item`).
 *
 * `aria-hidden="true"` is intentional, not an oversight: the menu item's text
 * content is its accessible name, and the shortcut glyph is visual-only
 * supplementary info — a screen reader announcing "Open ⌘ O" would be noise.
 * Don't remove it.
 *
 * The glyph string is the caller's content. P4 One ships on Windows too, where
 * `⌘`/`⌥` are not valid modifiers — callers are responsible for rendering the
 * platform-appropriate symbol (`Ctrl`/`Alt` vs `⌘`/`⌥`). This directive only
 * styles whatever text it's given.
 */
@Directive({
  selector: 'span[rdxContextMenuShortcut]',
  standalone: true,
  host: {
    'data-slot': 'context-menu-shortcut',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class ContextMenuShortcutDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'ml-auto text-xs tracking-widest text-muted-foreground group-focus/context-menu-item:text-accent-foreground',
      this.className(),
    ),
  );
}
