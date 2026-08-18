import { Directive, computed, contentChild, forwardRef, input } from '@angular/core';
import {
  RdxSelectContentDirective,
  RdxSelectGroupDirective,
  RdxSelectLabelDirective,
  RdxSelectSeparatorDirective,
} from '@radix-ng/primitives/select';

import { cn } from '@/app/lib/utils';

/**
 * Base content class — verbatim from the @force-ui/select registry item.
 *
 * radix-ng portals this element through a CDK overlay; `RdxSelectContentDirective`
 * (host directive) supplies `role="listbox"` and `data-state` (open/closed), so
 * the `data-open:animate-in fade-in-0 zoom-in-95` entrance fires off the
 * data-state bridge. `cn-menu-target` / `cn-menu-translucent` are genuine Force
 * UI utilities that survive in the built registry JSON — copied verbatim (no-op
 * if undefined). `bg-popover` + `ring-foreground/10` are explicit colours, so the
 * bare-`border` currentColor gotcha doesn't apply.
 *
 * Width: `w-full` fills the CDK overlay pane, which radix-ng sizes to
 * `min-width = trigger width` (the `--radix-select-trigger-width` var doesn't
 * cascade — the panel is portaled to `<body>`), so the panel matches the trigger
 * width and grows wider only for longer option labels. `min-w-36` is the floor.
 * `max-h-[18rem]` (288px, within the spec's 200–300px) caps the panel and pairs
 * with `overflow-y-auto` to scroll long lists — replacing the registry's
 * `max-h-(--radix-select-content-available-height)` (a Radix-set var radix-ng
 * doesn't provide; without the cap the panel could overflow the viewport).
 * `origin-top` anchors the open zoom to the top edge (panel opens downward), in
 * place of the registry's `origin-(--radix-select-content-transform-origin)` var.
 *
 * Parity gap (kept inert for verbatim-ness): the per-`data-[side=…]` slide-in
 * directions + popper translate offsets — radix-ng positions via CDK
 * (popper-style, opens below / flips above), not Radix's item-aligned mode, and
 * never sets `data-side`, so those classes don't fire. Item-aligned positioning
 * (panel overlapping the trigger with the selected row on the trigger's text
 * line) is NOT supported by radix-ng; popper-below is the intended behaviour
 * (maintainer decision 2026-06-10).
 */
const SELECT_CONTENT_CLASS =
  "cn-menu-target cn-menu-translucent relative z-50 max-h-[18rem] w-full min-w-36 origin-top overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 motion-reduce:animate-none scrollbar-overlay data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1";

export { SELECT_CONTENT_CLASS };

/**
 * Angular port of @force-ui/select's `SelectContent` — the dropdown panel.
 *
 * Items are direct children (`<div rdxSelectContent><button rdxSelectItem>…`); the
 * registry's `SelectScrollUpButton` / `SelectScrollDownButton` / `Viewport`
 * wrappers are omitted because radix-ng ships no equivalent — the panel scrolls
 * natively via `overflow-y-auto`. (Documented parity gap.)
 */
@Directive({
  // Selector is the native `[rdxSelectContent]` — the radix-ng root projects via
  // `<ng-content select="[rdxSelectContent]">` and projection matches the LITERAL
  // template attribute, so the panel must wear the radix attribute. Styling +
  // behaviour (`hostDirectives`) ride on top; consumers never import the raw
  // directive, so there's no double instance. (See SelectRootDirective for the
  // family's naming rationale — the whole select family uses `rdxSelect*`.)
  selector: '[rdxSelectContent]',
  standalone: true,
  hostDirectives: [RdxSelectContentDirective],
  host: {
    'data-slot': 'select-content',
    '[class]': 'classes()',
  },
})
export class SelectContentDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(SELECT_CONTENT_CLASS, this.className()));
}

/**
 * Angular port of `SelectLabel` — a non-interactive heading for a group.
 *
 * Self-assigns a stable `id` (host binding) so the enclosing `[rdxSelectGroup]`
 * can wire `aria-labelledby` to it — radix-ng's `RdxSelectLabelDirective` sets no
 * id and its `RdxSelectGroupDirective` sets `role="group"` without a name, so the
 * group would otherwise be announced nameless (WCAG 4.1.2). A consumer-supplied
 * `id` wins over the generated one.
 */
let selectLabelSeq = 0;
@Directive({
  selector: '[rdxSelectLabel]',
  standalone: true,
  hostDirectives: [RdxSelectLabelDirective],
  host: {
    'data-slot': 'select-label',
    '[attr.id]': 'labelId',
    '[class]': 'classes()',
  },
})
export class SelectLabelDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id so a parent group can reference it via `aria-labelledby`. */
  readonly labelId = `rdx-select-label-${selectLabelSeq++}`;
  protected readonly classes = computed(() =>
    // Sentence-case group heading, bumped to font-semibold for a stronger label
    // (maintainer 2026-06-10), matching the dropdown-menu label. Registry base
    // was text-xs text-muted-foreground (no weight).
    cn('px-1.5 py-1 text-xs font-semibold text-muted-foreground', this.className()),
  );
}

/**
 * Angular port of `SelectGroup` — groups related items (`role="group"` via
 * radix-ng). Pair with a `[rdxSelectLabel]`: the group binds `aria-labelledby` to
 * the label's id so screen readers announce the group by its visible name
 * (radix-ng's primitive does not wire this — WCAG 4.1.2).
 */
@Directive({
  selector: '[rdxSelectGroup]',
  standalone: true,
  hostDirectives: [RdxSelectGroupDirective],
  host: {
    'data-slot': 'select-group',
    '[attr.aria-labelledby]': 'label()?.labelId ?? null',
    '[class]': 'classes()',
  },
})
export class SelectGroupDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly label = contentChild(forwardRef(() => SelectLabelDirective));
  // No own padding — the content panel provides the inner `p-1` inset so items
  // (grouped or not) float off the panel edges; the group only needs scroll margin.
  protected readonly classes = computed(() => cn('scroll-my-1', this.className()));
}

/** Angular port of `SelectSeparator` — a hairline divider between groups. */
@Directive({
  selector: '[rdxSelectSeparator]',
  standalone: true,
  hostDirectives: [RdxSelectSeparatorDirective],
  host: {
    'data-slot': 'select-separator',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class SelectSeparatorDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn('pointer-events-none -mx-1 my-1 h-px bg-border', this.className()),
  );
}
