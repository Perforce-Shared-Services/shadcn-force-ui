import { computed, contentChild, Directive, forwardRef, input } from '@angular/core';
import {
  RdxPopoverArrowDirective,
  RdxPopoverCloseDirective,
  RdxPopoverContentDirective,
} from '@radix-ng/primitives/popover';

import { cn } from '@/app/lib/utils';

/**
 * Content panel class — verbatim from the @force-ui/popover registry item, plus
 * one a11y addition (`motion-reduce:animate-none`, WCAG 2.3.3).
 *
 * radix-ng portals the styled element through a CDK overlay. Like the tooltip
 * port, radix-ng's `RdxPopoverContentAttributesComponent`-equivalent sets
 * `data-side` / `data-state`, so the registry's `data-[side=…]:slide-in-from-…`
 * entrance-direction classes and the `data-open:` / `data-closed:` animations
 * fire off the data-state bridge.
 *
 * `origin-(--radix-popover-content-transform-origin)` is kept verbatim but inert
 * — radix-ng positions via CDK and never sets that Radix CSS var, so the zoom
 * origin falls back to centre (same documented treatment as the tooltip /
 * dropdown ports' `--radix-*` arbitrary-value classes).
 *
 * Colours are explicit (`bg-popover` / `text-popover-foreground`) and elevation
 * is `ring-1 ring-foreground/10` + `shadow-md` — NO bare `border`, so the
 * bare-`border` → `currentColor` gotcha doesn't apply. `shadow-md` is
 * registry-verbatim (the Force spec elevation table puts popovers at `sm`, but
 * the registry ships `md`; kept verbatim — flag in sync if the spec must win).
 * `outline-hidden` removes the default focus outline on the portalled box (focus
 * lives on the interactive children inside).
 */
const POPOVER_CONTENT_CLASS =
  "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 motion-reduce:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

export { POPOVER_CONTENT_CLASS };

/**
 * Angular port of the positioning half of @force-ui/popover's `PopoverContent`.
 *
 * Applied as a STRUCTURAL directive to an `<ng-template rdxPopoverContent>` —
 * `RdxPopoverContentDirective` (host directive, built on `CdkConnectedOverlay`)
 * portals the template and positions it. React's `PopoverContent` folded the
 * Portal + Content into one element; radix-ng splits positioning (this
 * `<ng-template>`) from the styled box (`[rdxPopoverContentAttributes]` inside).
 *
 * Re-exposes radix's positioning inputs: `side` (default `top`), `sideOffset`,
 * `align` (default `center`), `alignOffset`. CDK does collision flipping. The
 * React defaults are `align="center"`, `sideOffset=4`; popovers usually read best
 * opening `side="bottom"` — pass it explicitly. The interaction outputs
 * (`onOpen` / `onClosed` / `onOverlayEscapeKeyDown` / `onOverlayOutsideClick`)
 * are surfaced for consumers that need to react to open/close.
 */
@Directive({
  selector: '[rdxPopoverContent]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPopoverContentDirective,
      inputs: [
        'side',
        'sideOffset',
        'align',
        'alignOffset',
        'alternatePositionsDisabled',
        'onOverlayEscapeKeyDownDisabled',
        'onOverlayOutsideClickDisabled',
      ],
      outputs: ['onOpen', 'onClosed', 'onOverlayEscapeKeyDown', 'onOverlayOutsideClick'],
    },
  ],
})
export class PopoverContentDirective {}

/**
 * Angular port of the styled half of @force-ui/popover's `PopoverContent` — the
 * visible box. Co-applies with radix-ng's content-attributes component (which is
 * a *component*, so it can't be a `hostDirective` — same constraint as the
 * tooltip / select roots). The radix component supplies `role`, `id`,
 * `data-state`, `data-side` and the animation lifecycle; this directive owns the
 * `[class]` and stamps the registry `data-slot="popover-content"`. The shared
 * `[rdxPopoverContentAttributes]` selector means consumers write one attribute
 * and get both.
 *
 * `class` flows through `cn()` last so callers can override (e.g. widen `w-72`).
 *
 * Accessible name/description: radix-ng's content-attributes component hard-codes
 * `role="dialog"` but wires NO `aria-labelledby` / `aria-describedby`, so a screen
 * reader announces just "dialog" with no name. This directive closes that gap the
 * same way the dialog port does — it content-queries the `[rdxPopoverTitle]` /
 * `[rdxPopoverDescription]` and binds `aria-labelledby` / `aria-describedby` to
 * their generated ids, so the popover is named by its visible title with zero
 * consumer effort (WCAG 1.3.1 / 4.1.2). Both bind `null` when the part is absent
 * (e.g. a content-only popover), leaving the panel unnamed rather than
 * mis-referenced.
 */
@Directive({
  selector: '[rdxPopoverContentAttributes]',
  standalone: true,
  host: {
    'data-slot': 'popover-content',
    '[attr.aria-labelledby]': 'titleEl()?.labelId ?? null',
    '[attr.aria-describedby]': 'descriptionEl()?.descriptionId ?? null',
    '[class]': 'classes()',
  },
})
export class PopoverContentAttributesDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly titleEl = contentChild(forwardRef(() => PopoverTitleDirective));
  protected readonly descriptionEl = contentChild(forwardRef(() => PopoverDescriptionDirective));
  protected readonly classes = computed(() => cn(POPOVER_CONTENT_CLASS, this.className()));
}

/**
 * Angular port of `PopoverHeader` — stacks the title + description. Styling-only
 * directive (the registry header is a plain `<div>`, no radix primitive).
 * Inherits `text-popover-foreground` from the content box.
 */
@Directive({
  selector: '[rdxPopoverHeader]',
  standalone: true,
  host: {
    'data-slot': 'popover-header',
    '[class]': 'classes()',
  },
})
export class PopoverHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('flex flex-col gap-0.5 text-sm', this.className()));
}

/**
 * Angular port of `PopoverTitle`. Styling-only directive (the registry title is a
 * plain `<div>`, no radix primitive). `cn-font-heading` is a genuine Force UI
 * utility that survives verbatim in the built registry (no-op if undefined).
 * Keep it a non-heading element (`<div rdxPopoverTitle>`) as the registry does —
 * a popover is non-modal and its title is decorative. But because radix-ng marks
 * the panel `role="dialog"`, naming it improves the screen-reader announcement —
 * so this self-assigns a stable `id` that `[rdxPopoverContentAttributes]` binds
 * as the panel's `aria-labelledby`. A consumer-supplied `id` is overridden
 * (matching the dialog port); pass `aria-labelledby` on the box yourself if you
 * need a different name source.
 */
let popoverTitleSeq = 0;
@Directive({
  selector: '[rdxPopoverTitle]',
  standalone: true,
  host: {
    'data-slot': 'popover-title',
    '[attr.id]': 'labelId',
    '[class]': 'classes()',
  },
})
export class PopoverTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content box's `aria-labelledby`. */
  readonly labelId = `rdx-popover-title-${popoverTitleSeq++}`;
  protected readonly classes = computed(() => cn('cn-font-heading font-medium', this.className()));
}

/**
 * Angular port of `PopoverDescription`. Styling-only directive (plain `<p>` in
 * the registry). `text-muted-foreground` reads as secondary text against the
 * panel. Self-assigns a stable `id` so `[rdxPopoverContentAttributes]` can bind it
 * as the panel's `aria-describedby` (WCAG 1.3.1 / 4.1.2). A consumer-supplied
 * `id` is overridden.
 */
let popoverDescriptionSeq = 0;
@Directive({
  selector: '[rdxPopoverDescription]',
  standalone: true,
  host: {
    'data-slot': 'popover-description',
    '[attr.id]': 'descriptionId',
    '[class]': 'classes()',
  },
})
export class PopoverDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content box's `aria-describedby`. */
  readonly descriptionId = `rdx-popover-description-${popoverDescriptionSeq++}`;
  protected readonly classes = computed(() => cn('text-muted-foreground', this.className()));
}

/**
 * `PopoverClose` — closes the popover when activated. NOT in the React registry
 * (which exposes no Close part), but radix-ng ships `RdxPopoverCloseDirective`
 * and an interactive popover commonly needs an explicit dismiss control (a
 * "Done" / "Cancel" button, or an icon-only X). Documented radix-ng addition;
 * apply to a `[uiButton]` inside the content. Selector stays native
 * `[rdxPopoverClose]`.
 */
@Directive({
  selector: '[rdxPopoverClose]',
  standalone: true,
  hostDirectives: [RdxPopoverCloseDirective],
  host: {
    'data-slot': 'popover-close',
  },
})
export class PopoverCloseDirective {}

/**
 * `PopoverArrow` — the little pointer toward the trigger. NOT in the React
 * registry, but radix-ng ships `RdxPopoverArrowDirective` (same as the tooltip
 * arrow); a popover anchored to a control reads more clearly with one.
 * Documented radix-ng addition; optional, place inside
 * `[rdxPopoverContentAttributes]`.
 *
 * radix-ng renders a real `<svg>` triangle (`viewBox 0 0 30 10`, polygon base
 * flush to the panel, apex toward the trigger) and sets its size + absolute
 * position inline (default 10×5; the stories pass a slightly wider 16×8).
 * `fill` is an inherited SVG property, so `fill-popover` on this host span
 * cascades into the generated `<polygon>` to match the panel's `bg-popover`.
 *
 * Edge definition is done with a layered `drop-shadow` filter, NOT an SVG
 * `stroke`: a stroke also paints the triangle's BASE edge, leaving a visible
 * hairline seam where the wedge meets the panel. The filter instead follows the
 * rendered shape — a tight near-zero-blur layer acts as a hairline outline along
 * the two slanted edges (echoing the panel's `ring-1 ring-foreground/10`) and a
 * softer offset layer gives the same faint elevation as the panel's `shadow-md`.
 * The base seam stays hidden because the arrow overlaps onto the panel. This is
 * the idiomatic radix/shadcn arrow treatment; the registry ships no arrow, so
 * it's a code-only fix.
 *
 * `z-50` keeps it above sibling content. Tune the shape with `width` / `height`.
 */
@Directive({
  selector: '[rdxPopoverArrow]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPopoverArrowDirective,
      inputs: ['width', 'height'],
    },
  ],
  host: {
    // Decorative — the arrow is a visual pointer with no semantic content; hide
    // its generated <svg> from assistive tech (WCAG 1.1.1).
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class PopoverArrowDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'z-50 fill-popover [filter:drop-shadow(0_0_0.5px_rgb(0_0_0_/_0.14))_drop-shadow(0_2px_2px_rgb(0_0_0_/_0.08))]',
      this.className(),
    ),
  );
}
