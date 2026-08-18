import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, Directive, forwardRef, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxDialogContentDirective, RdxDialogCloseDirective, RdxDialogDescriptionDirective, RdxDialogTitleDirective } from '@radix-ng/primitives/dialog';

import { cn } from '@/app/lib/utils';
import { Button } from '../button';
import { DIALOG_CLOSE_SVG } from './dialog.icons';

/**
 * Panel class — from the @force-ui/dialog registry `DialogContent`, with the
 * CDK-Dialog divergences:
 *
 * - Dropped `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50`:
 *   CDK Dialog centers the overlay pane itself (GlobalPositionStrategy) and owns
 *   the z-index, so the panel must NOT re-position. Added `relative` so the
 *   absolute close button anchors to the panel (the registry relied on `fixed`).
 * - Width `w-full max-w-[calc(100%-2rem)] sm:max-w-sm` → `w-[calc(100vw-2rem)]
 *   max-w-sm`: without the registry's `fixed w-full` the CDK pane is auto-width,
 *   so the panel needs an explicit width — viewport-minus-margins, capped at
 *   `sm` (24rem). Same end result as the registry (full width on mobile, 24rem
 *   on desktop).
 *
 * `bg-popover` + `ring-foreground/10` are explicit colours (no bare-`border`
 * gotcha). `motion-reduce:animate-none` guards the open/close zoom+fade for
 * `prefers-reduced-motion` (WCAG 2.3.3); the `data-open:`/`data-closed:` variants
 * fire off the `data-state` that `RdxDialogContentDirective` sets.
 */
const DIALOG_CONTENT_CLASS =
  "relative grid w-[calc(100vw-2rem)] max-w-sm gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none motion-reduce:animate-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

export { DIALOG_CONTENT_CLASS };

/**
 * Angular port of @force-ui/dialog's `DialogContent` — the centered panel.
 * Lives inside the `<ng-template>` the trigger portals through CDK Dialog.
 *
 * `RdxDialogContentDirective` (host directive) supplies `role="dialog"` and the
 * `data-state` (open/closed) that drives the entrance/exit animation, and exposes
 * `close()` / `dismiss()`. The close (X) button is the registry's
 * `DialogPrimitive.Close` + ghost icon button: a raw inline Material Symbols
 * `<svg>` (swap-point `dialog.icons.ts`) on a `[uiButton]` carrying
 * `[rdxDialogClose]`, shown unless `showCloseButton` is false. `aria-label="Close"`
 * names the icon-only button; the glyph is decorative (`aria-hidden`).
 *
 * Accessible name/description: `RdxDialogContentDirective` (host directive)
 * hard-codes `aria-labelledby="true"` / `aria-describedby="true"` — literal
 * strings, not id refs, so they name nothing. This component overrides both by
 * content-querying the `[rdxDialogTitle]` / `[rdxDialogDescription]` and binding
 * `aria-labelledby` / `aria-describedby` to their generated ids, so the dialog is
 * named by its visible title with zero consumer effort (WCAG 1.3.1 / 4.1.2). The
 * CDK dialog container (a separate outer `role="dialog"`) is additionally named
 * by the trigger config's `ariaLabel` when provided.
 */
@Component({
  selector: '[rdxDialogContent]',
  standalone: true,
  imports: [Button, RdxDialogCloseDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxDialogContentDirective],
  host: {
    'data-slot': 'dialog-content',
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
        class="absolute top-2 right-2"
      >
        <span class="inline-flex [&>svg]:fill-current" aria-hidden="true" [innerHTML]="closeIcon"></span>
      </button>
    }
  `,
})
export class DialogContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly showCloseButton = input(true, { transform: booleanAttribute });
  protected readonly titleEl = contentChild(forwardRef(() => DialogTitleDirective));
  protected readonly descriptionEl = contentChild(forwardRef(() => DialogDescriptionDirective));
  /** Sanitizer-trusted inline close SVG (bundled, static — bypass is safe + required). */
  protected readonly closeIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    DIALOG_CLOSE_SVG,
  );
  protected readonly classes = computed(() => cn(DIALOG_CONTENT_CLASS, this.className()));
}

/**
 * Angular port of `DialogHeader` — stacks the title + description. Styling-only
 * div (the registry header is a plain `<div>`, no radix primitive).
 */
@Directive({
  selector: '[rdxDialogHeader]',
  standalone: true,
  host: {
    'data-slot': 'dialog-header',
    '[class]': 'classes()',
  },
})
export class DialogHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn('flex flex-col gap-2', this.className()));
}

/**
 * Angular port of `DialogFooter` — the action bar at the bottom. Styling-only div.
 * `border-border` is added to the registry's bare `border-t` (which would resolve
 * to `currentColor` here — this app declares no global `* { border-color }`).
 * Stacks reversed on mobile (primary action last in DOM, bottom visually) and
 * right-aligns on `sm+`, matching the registry.
 */
@Directive({
  selector: '[rdxDialogFooter]',
  standalone: true,
  host: {
    'data-slot': 'dialog-footer',
    '[class]': 'classes()',
  },
})
export class DialogFooterDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t border-border bg-muted/50 p-4 sm:flex-row sm:justify-end',
      this.className(),
    ),
  );
}

/**
 * Angular port of `DialogTitle`. Wraps radix-ng's `RdxDialogTitleDirective`
 * (host directive). `cn-font-heading` is a genuine Force UI utility that survives
 * verbatim in the built registry (no-op if undefined). Use a heading element
 * (`<h2 rdxDialogTitle>`) so the dialog has a proper accessible name.
 *
 * `text-popover-foreground` is added (registry relies on inheriting it from the
 * content): a `<h2>` title otherwise picks up the app's global Angular Material
 * heading colour (a near-white headline token) and renders invisible on the
 * light panel. Explicit token, same class of fix as the bare-`border` global
 * leak — token-only, flips light↔dark with the panel.
 *
 * Self-assigns a stable `id` so `[rdxDialogContent]` can bind `aria-labelledby`
 * to it (the dialog's accessible name). A consumer-supplied `id` wins.
 */
let dialogTitleSeq = 0;
@Directive({
  selector: '[rdxDialogTitle]',
  standalone: true,
  hostDirectives: [RdxDialogTitleDirective],
  host: {
    'data-slot': 'dialog-title',
    '[attr.id]': 'labelId',
    '[class]': 'classes()',
  },
})
export class DialogTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content's `aria-labelledby`. */
  readonly labelId = `rdx-dialog-title-${dialogTitleSeq++}`;
  protected readonly classes = computed(() =>
    cn('cn-font-heading text-base leading-none font-medium text-popover-foreground', this.className()),
  );
}

/**
 * Angular port of `DialogDescription`. Wraps radix-ng's
 * `RdxDialogDescriptionDirective`. The `*:[a]:…` rules style any anchor in the
 * description (underline + hover recolor), verbatim from the registry.
 *
 * Self-assigns a stable `id` so `[rdxDialogContent]` can bind `aria-describedby`
 * to it. A consumer-supplied `id` wins.
 */
let dialogDescriptionSeq = 0;
@Directive({
  selector: '[rdxDialogDescription]',
  standalone: true,
  hostDirectives: [RdxDialogDescriptionDirective],
  host: {
    'data-slot': 'dialog-description',
    '[attr.id]': 'descriptionId',
    '[class]': 'classes()',
  },
})
export class DialogDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content's `aria-describedby`. */
  readonly descriptionId = `rdx-dialog-description-${dialogDescriptionSeq++}`;
  protected readonly classes = computed(() =>
    cn(
      'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
      this.className(),
    ),
  );
}
