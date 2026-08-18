import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, Directive, forwardRef, inject, input, isDevMode } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxDialogContentDirective, RdxDialogCloseDirective, RdxDialogDescriptionDirective, RdxDialogTitleDirective } from '@radix-ng/primitives/dialog';

import { cn } from '@/app/lib/utils';
import { Button } from '../button';
import { SHEET_CLOSE_SVG } from './sheet.icons';

/** The edge a sheet slides in from — the registry `side` prop, verbatim. */
export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * Panel class — from the @force-ui/sheet registry `SheetContent`, verbatim per
 * `data-[side=…]` positioning + slide/fade animations, with these deliberate,
 * documented divergences:
 *
 * - Kept `fixed` (the registry pins the panel to a viewport edge). Unlike the
 *   dialog port — which DROPPED `fixed` because CDK Dialog centers its pane — a
 *   sheet must NOT be centered: the `fixed` + `data-[side]:inset-*` classes pin
 *   it to the edge relative to the viewport, escaping CDK's centered pane. `z-50`
 *   is intra-pane ordering (CDK owns the real layer z-index at the pane level);
 *   left verbatim, harmless.
 * - Added `border-border`: the registry's directional `data-[side]:border-t/r/b/l`
 *   set border WIDTH only and rely on the upstream global `* { border-color:
 *   var(--border) }`, which this app does NOT declare (it would bleed into
 *   Angular Material). Under Tailwind v4 a bare directional border falls back to
 *   `currentColor` → a border in the text colour. `border-border` supplies the
 *   token colour; only the side with a width shows it.
 * - Added `motion-reduce:transition-none motion-reduce:animate-none`: the
 *   registry ships neither, but WCAG 2.3.3 (`prefers-reduced-motion`) requires
 *   the slide/fade + the `transition duration-200` be suppressed. a11y, not
 *   polish.
 * - Dropped `SheetOverlay` entirely (its own registry element with
 *   `bg-black/10 backdrop-blur-xs`): the backdrop here is the CDK scrim
 *   (`cdk-overlay-dark-backdrop`), same as the dialog port — CDK owns it. A
 *   custom lighter scrim would need overlay-level global CSS; deferred for
 *   parity with the existing dialog behaviour.
 *
 * `bg-popover` / `text-popover-foreground` are explicit colours. The
 * `data-open:`/`data-closed:` variants fire off the `data-state` that
 * `RdxDialogContentDirective` sets on this host; `data-[side=…]` fires off the
 * `data-side` bound from the `side` input.
 */
const SHEET_CONTENT_CLASS =
  "fixed z-50 flex flex-col gap-4 border-border bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out motion-reduce:transition-none motion-reduce:animate-none data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10";

export { SHEET_CONTENT_CLASS };

/**
 * Angular port of @force-ui/sheet's `SheetContent` — the edge-pinned drawer
 * panel. Lives inside the `<ng-template>` the trigger portals through CDK Dialog.
 *
 * `RdxDialogContentDirective` (host directive) supplies `role="dialog"` and the
 * `data-state` (open/closed) that drives the slide/fade animation, and exposes
 * `close()` / `dismiss()`. `side` (default `right`) is bound to `data-side`,
 * which selects the positioning + slide direction. The close (X) button is the
 * registry's `SheetPrimitive.Close` + ghost icon button: a raw inline Material
 * Symbols `<svg>` (swap-point `sheet.icons.ts`) on a `[uiButton]` carrying
 * `[rdxDialogClose]`, shown unless `showCloseButton` is false. `aria-label="Close"`
 * names the icon-only button; the glyph is decorative (`aria-hidden`).
 *
 * Accessible name/description: `RdxDialogContentDirective` hard-codes
 * `aria-labelledby="true"` / `aria-describedby="true"` — literal strings that name
 * nothing. This component overrides both by content-querying `[rdxSheetTitle]` /
 * `[rdxSheetDescription]` and binding `aria-labelledby` / `aria-describedby` to
 * their generated ids, so the sheet is named by its visible title with zero
 * consumer effort (WCAG 1.3.1 / 4.1.2). Two accessible-name sources coexist by
 * design (same as the dialog port): the outer CDK dialog container is named by
 * `ariaLabel` on the trigger's `[rdxSheetConfig]` when provided, and this inner
 * content is named by `aria-labelledby` (its `[rdxSheetTitle]`). Keep the two in
 * agreement (pass the title text as `ariaLabel`) — they name nested landmarks,
 * not competing names on one element. If a consumer omits BOTH `[rdxSheetTitle]`
 * and `ariaLabel`, the sheet has no accessible name (WCAG 4.1.2); a dev-mode
 * warning below flags the missing title so it surfaces in development.
 *
 * The close (X) button sits at `top-3 right-3` — registry-verbatim for the sheet
 * (the dialog registry uses `top-2 right-2`; the two components differ upstream).
 */
@Component({
  selector: '[rdxSheetContent]',
  standalone: true,
  imports: [Button, RdxDialogCloseDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxDialogContentDirective],
  host: {
    'data-slot': 'sheet-content',
    '[attr.data-side]': 'side()',
    '[attr.aria-labelledby]': 'titleEl()?.labelId ?? null',
    '[attr.aria-describedby]': 'descriptionEl()?.descriptionId ?? null',
    '[class]': 'classes()',
  },
  template: `
    <ng-content />
    @if (showCloseButton()) {
      <button
        uiButton
        variant="ghost"
        size="icon-sm"
        rdxDialogClose
        type="button"
        aria-label="Close"
        class="absolute top-3 right-3"
      >
        <span class="inline-flex [&>svg]:fill-current" aria-hidden="true" [innerHTML]="closeIcon"></span>
      </button>
    }
  `,
})
export class SheetContentComponent implements AfterContentInit {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** The edge the sheet slides in from (drives positioning + animation). */
  readonly side = input<SheetSide>('right');
  /**
   * Show the corner ✕ close button (default true). When set false, give the
   * footer an explicit neutral dismiss action (e.g. "Cancel" / "Keep editing") —
   * a binary-only footer leaves Escape / backdrop-click as the only way out,
   * which users won't reliably discover on a drawer (NN/g H3, user control).
   */
  readonly showCloseButton = input(true, { transform: booleanAttribute });
  protected readonly titleEl = contentChild(forwardRef(() => SheetTitleDirective));
  protected readonly descriptionEl = contentChild(forwardRef(() => SheetDescriptionDirective));
  /** Sanitizer-trusted inline close SVG (bundled, static — bypass is safe + required). */
  protected readonly closeIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    SHEET_CLOSE_SVG,
  );
  protected readonly classes = computed(() => cn(SHEET_CONTENT_CLASS, this.className()));

  /**
   * A11y guardrail (WCAG 4.1.2): a `role="dialog"` needs an accessible name.
   * Without a projected `[rdxSheetTitle]` — and if the trigger also passes no
   * `ariaLabel` — the sheet ends up unnamed. Nothing in the type system enforces
   * a title, so warn in dev mode (stripped from production builds) to surface the
   * omission during development.
   */
  ngAfterContentInit(): void {
    if (isDevMode() && !this.titleEl()) {
      console.warn(
        '[rdxSheetContent] has no [rdxSheetTitle] — the sheet may lack an accessible name. Add a title, or pass ariaLabel on the trigger\'s [rdxSheetConfig].',
      );
    }
  }
}

/**
 * Angular port of `SheetHeader` — stacks the title + description at the top of
 * the panel. Styling-only div (registry: a plain `<div>`, no radix primitive).
 */
@Directive({
  selector: '[rdxSheetHeader]',
  standalone: true,
  host: {
    'data-slot': 'sheet-header',
    '[class]': 'classes()',
  },
})
export class SheetHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('flex flex-col gap-0.5 p-4', this.className()));
}

/**
 * Angular port of `SheetFooter` — the action bar pinned to the bottom of the
 * panel (`mt-auto` pushes it down within the flex column). Styling-only div,
 * verbatim from the registry.
 */
@Directive({
  selector: '[rdxSheetFooter]',
  standalone: true,
  host: {
    'data-slot': 'sheet-footer',
    '[class]': 'classes()',
  },
})
export class SheetFooterDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn('mt-auto flex flex-col gap-2 p-4', this.className()),
  );
}

/**
 * Angular port of `SheetTitle`. Wraps radix-ng's `RdxDialogTitleDirective` (host
 * directive). `cn-font-heading` is a genuine Force UI utility that survives
 * verbatim in the built registry (no-op if undefined). Use a heading element
 * (`<h2 rdxSheetTitle>`) so the sheet has a proper accessible name.
 *
 * `text-foreground` is registry-verbatim (the sheet title uses `text-foreground`,
 * not the dialog's `text-popover-foreground`). Both resolve on the popover
 * surface; kept as the registry has it.
 *
 * Self-assigns a stable `id` so `[rdxSheetContent]` can bind `aria-labelledby` to
 * it (the sheet's accessible name). A consumer-supplied `id` wins.
 */
let sheetTitleSeq = 0;
@Directive({
  selector: '[rdxSheetTitle]',
  standalone: true,
  hostDirectives: [RdxDialogTitleDirective],
  host: {
    'data-slot': 'sheet-title',
    '[attr.id]': 'labelId',
    '[class]': 'classes()',
  },
})
export class SheetTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content's `aria-labelledby`. */
  readonly labelId = `rdx-sheet-title-${sheetTitleSeq++}`;
  protected readonly classes = computed(() =>
    cn('cn-font-heading text-base font-medium text-foreground', this.className()),
  );
}

/**
 * Angular port of `SheetDescription`. Wraps radix-ng's
 * `RdxDialogDescriptionDirective`. Registry-verbatim `text-sm text-muted-foreground`.
 *
 * Self-assigns a stable `id` so `[rdxSheetContent]` can bind `aria-describedby` to
 * it. A consumer-supplied `id` wins.
 */
let sheetDescriptionSeq = 0;
@Directive({
  selector: '[rdxSheetDescription]',
  standalone: true,
  hostDirectives: [RdxDialogDescriptionDirective],
  host: {
    'data-slot': 'sheet-description',
    '[attr.id]': 'descriptionId',
    '[class]': 'classes()',
  },
})
export class SheetDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content's `aria-describedby`. */
  readonly descriptionId = `rdx-sheet-description-${sheetDescriptionSeq++}`;
  protected readonly classes = computed(() =>
    cn('text-sm text-muted-foreground', this.className()),
  );
}
