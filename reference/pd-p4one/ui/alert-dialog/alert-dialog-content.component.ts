import {
  type AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  Directive,
  forwardRef,
  inject,
  input,
  isDevMode,
} from '@angular/core';
import {
  RdxDialogContentDirective,
  RdxDialogDescriptionDirective,
  RdxDialogRef,
  RdxDialogTitleDirective,
} from '@radix-ng/primitives/dialog';

import { cn } from '@/app/lib/utils';

/** Alert-dialog panel size. The registry ships only these two (no md/lg/…). */
export type AlertDialogSize = 'default' | 'sm';

/**
 * Panel class — from the @force-ui/alert-dialog registry `AlertDialogContent`,
 * with the same CDK-Dialog divergences the `dialog` port documents:
 *
 * - Dropped `fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2`:
 *   CDK Dialog centers the overlay pane itself (GlobalPositionStrategy) and owns
 *   the z-index, so the panel must NOT re-position. Added `relative`.
 * - Width `w-full` → `w-[calc(100vw-2rem)]`: without the registry's
 *   `fixed w-full` the CDK pane is auto-width, so the panel needs an explicit
 *   width (viewport-minus-margins). The `data-[size=…]:max-w-*` caps are kept
 *   verbatim, so the size variants still clamp the panel exactly as the registry.
 * - `motion-reduce:animate-none` guards the open/close zoom+fade for
 *   `prefers-reduced-motion` (WCAG 2.3.3).
 *
 * `group/alert-dialog-content` is preserved — the header/footer/media/title
 * `group-data-[size]/…` and `group-has-data-[slot=…]/…` selectors all target it.
 * `bg-popover` + `ring-foreground/10` are explicit colours (no bare-`border`
 * gotcha). The `data-open:`/`data-closed:` variants fire off the `data-state`
 * that the host `RdxDialogContentDirective` sets. NO close (X) button: an alert
 * dialog requires a deliberate footer choice.
 */
const ALERT_DIALOG_CONTENT_CLASS =
  "group/alert-dialog-content relative grid w-[calc(100vw-2rem)] gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none motion-reduce:animate-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

export { ALERT_DIALOG_CONTENT_CLASS };

/**
 * Angular port of @force-ui/alert-dialog's `AlertDialogContent` — the centered
 * panel. Lives inside the `<ng-template>` the trigger portals through CDK Dialog.
 *
 * The host directive is `RdxDialogContentDirective` (NOT the barebones
 * alert-dialog primitive — see the trigger's rationale). It supplies the
 * `data-state` (open/closed) that drives the entrance/exit animation and exposes
 * `close()` / `dismiss()`. This component overrides its hard-coded
 * `role="dialog"` with `role="alertdialog"` so screen readers announce the
 * panel immediately (Force spec / radix parity), and sets `aria-modal="true"`.
 *
 * Accessible name/description: `RdxDialogContentDirective` hard-codes
 * `aria-labelledby="true"` / `aria-describedby="true"` (literal strings that name
 * nothing). This component overrides both by content-querying the
 * `[rdxAlertDialogTitle]` / `[rdxAlertDialogDescription]` and binding to their
 * generated ids, so the alert is named by its visible title with zero consumer
 * effort (WCAG 1.3.1 / 4.1.2) — the same fix the dialog port applies.
 *
 * Keyboard-trap guard (WCAG 2.1.2): an alert dialog disables backdrop-click and
 * Escape dismissal, so a footer `[rdxAlertDialogAction]` / `[rdxAlertDialogCancel]`
 * is the ONLY exit. If a consumer ships neither, the user is trapped. We can't
 * force the markup, so in dev mode we content-query both and warn when both are
 * absent — surfacing the trap at author time.
 */
@Component({
  selector: '[rdxAlertDialogContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxDialogContentDirective],
  host: {
    'data-slot': 'alert-dialog-content',
    '[attr.data-size]': 'size()',
    '[attr.role]': '"alertdialog"',
    '[attr.aria-modal]': '"true"',
    '[attr.aria-labelledby]': 'titleEl()?.labelId ?? null',
    '[attr.aria-describedby]': 'descriptionEl()?.descriptionId ?? null',
    '[class]': 'classes()',
  },
  template: '<ng-content />',
})
export class AlertDialogContentComponent implements AfterContentInit {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly size = input<AlertDialogSize>('default');
  protected readonly titleEl = contentChild(forwardRef(() => AlertDialogTitleDirective));
  protected readonly descriptionEl = contentChild(forwardRef(() => AlertDialogDescriptionDirective));
  private readonly actions = contentChildren(forwardRef(() => AlertDialogActionDirective), {
    descendants: true,
  });
  private readonly cancels = contentChildren(forwardRef(() => AlertDialogCancelDirective), {
    descendants: true,
  });
  protected readonly classes = computed(() => cn(ALERT_DIALOG_CONTENT_CLASS, this.className()));

  ngAfterContentInit(): void {
    if (isDevMode() && this.actions().length === 0 && this.cancels().length === 0) {
      console.warn(
        '[rdxAlertDialogContent] has no [rdxAlertDialogAction] or [rdxAlertDialogCancel] button. ' +
          'An alert dialog cannot be dismissed by backdrop click or Escape, so without a footer ' +
          'action the user has no way out (WCAG 2.1.2: No Keyboard Trap). Add at least one ' +
          '[rdxAlertDialogCancel] (and usually an [rdxAlertDialogAction]).',
      );
    }
  }
}

/**
 * Angular port of `AlertDialogHeader` — a grid that centers the (optional) media,
 * title, and description, and switches to left-aligned on `sm+` for the `default`
 * size. The `has-data-[slot=alert-dialog-media]` / `group-data-[size]` selectors
 * are verbatim and depend on the `group/alert-dialog-content` + the media slot.
 * Styling-only div (no radix primitive).
 */
@Directive({
  selector: '[rdxAlertDialogHeader]',
  standalone: true,
  host: {
    'data-slot': 'alert-dialog-header',
    '[class]': 'classes()',
  },
})
export class AlertDialogHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
      this.className(),
    ),
  );
}

/**
 * Angular port of `AlertDialogFooter` — the action bar. `border-border` is added
 * to the registry's bare `border-t` (which would resolve to `currentColor` here —
 * this app declares no global `* { border-color }`, §8 gotcha). For the `sm` size
 * the two actions become an equal 2-column grid; otherwise they stack reversed on
 * mobile and right-align on `sm+`. Styling-only div.
 */
@Directive({
  selector: '[rdxAlertDialogFooter]',
  standalone: true,
  host: {
    'data-slot': 'alert-dialog-footer',
    '[class]': 'classes()',
  },
})
export class AlertDialogFooterDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t border-border bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
      this.className(),
    ),
  );
}

/**
 * Angular port of `AlertDialogMedia` — a rounded tile that hosts a single
 * decorative status icon above/beside the title (e.g. a warning glyph on a
 * destructive confirm). Project a direct-child `<svg>`; the
 * `*:[svg:not([class*='size-'])]:size-6` rule sizes it (so keep the icon a direct
 * child — see §8). Styling-only div. The icon is decorative; mark it
 * `aria-hidden="true"` at the call site (the title carries the meaning).
 */
@Directive({
  selector: '[rdxAlertDialogMedia]',
  standalone: true,
  host: {
    'data-slot': 'alert-dialog-media',
    '[class]': 'classes()',
  },
})
export class AlertDialogMediaDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
      this.className(),
    ),
  );
}

/**
 * Angular port of `AlertDialogTitle`. Wraps radix-ng's `RdxDialogTitleDirective`.
 * `cn-font-heading` is a genuine Force UI utility that survives verbatim in the
 * built registry (no-op if undefined). Use a heading element
 * (`<h2 rdxAlertDialogTitle>`) so the alert has a proper accessible name.
 *
 * `text-popover-foreground` is added (registry relies on inheriting it): a `<h2>`
 * otherwise picks up the app's global Angular Material heading colour (a
 * near-white headline token) and renders invisible on the light panel — the same
 * documented divergence as the dialog title. Self-assigns a stable `id` so
 * `[rdxAlertDialogContent]` can bind `aria-labelledby` to it; a consumer `id` wins.
 */
let alertDialogTitleSeq = 0;
@Directive({
  selector: '[rdxAlertDialogTitle]',
  standalone: true,
  hostDirectives: [RdxDialogTitleDirective],
  host: {
    'data-slot': 'alert-dialog-title',
    '[attr.id]': 'labelId',
    '[class]': 'classes()',
  },
})
export class AlertDialogTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content's `aria-labelledby`. */
  readonly labelId = `rdx-alert-dialog-title-${alertDialogTitleSeq++}`;
  protected readonly classes = computed(() =>
    cn(
      'cn-font-heading text-base font-medium text-popover-foreground sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
      this.className(),
    ),
  );
}

/**
 * Angular port of `AlertDialogDescription`. Wraps radix-ng's
 * `RdxDialogDescriptionDirective`. The `*:[a]:…` rules style any anchor in the
 * description (underline + hover recolor), verbatim from the registry.
 * Self-assigns a stable `id` for the content's `aria-describedby`; a consumer
 * `id` wins.
 */
let alertDialogDescriptionSeq = 0;
@Directive({
  selector: '[rdxAlertDialogDescription]',
  standalone: true,
  hostDirectives: [RdxDialogDescriptionDirective],
  host: {
    'data-slot': 'alert-dialog-description',
    '[attr.id]': 'descriptionId',
    '[class]': 'classes()',
  },
})
export class AlertDialogDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content's `aria-describedby`. */
  readonly descriptionId = `rdx-alert-dialog-description-${alertDialogDescriptionSeq++}`;
  protected readonly classes = computed(() =>
    cn(
      'text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
      this.className(),
    ),
  );
}

/**
 * Angular port of `AlertDialogAction` — the confirm button. Like the registry's
 * radix `Action`, it CLOSES the dialog on click; the consumer's own `(click)`
 * still fires, so wire the actual confirm work there. Applied to a `[uiButton]`
 * (set `variant="destructive"` for a delete, `variant="default"` otherwise) so the
 * footer keeps full button styling. `data-slot="alert-dialog-action"` is the
 * test-hook / theming contract.
 */
@Directive({
  selector: '[rdxAlertDialogAction]',
  standalone: true,
  host: {
    // Default to type="button" — these are applied to a bare `[uiButton]`
    // (which sets no type), so without this a `<button>` in a form would submit
    // it. A consumer can still set type="submit" explicitly to override.
    type: 'button',
    'data-slot': 'alert-dialog-action',
    '(click)': 'onClick()',
  },
})
export class AlertDialogActionDirective {
  private readonly ref = inject(RdxDialogRef);
  protected onClick(): void {
    // close() requires a result arg (typed `void` here); dismiss() is a no-op
    // for alert dialogs (isAlert short-circuits it), so close with no result.
    this.ref.close(undefined);
  }
}

/**
 * Angular port of `AlertDialogCancel` — the dismiss button. Closes the dialog on
 * click (radix `Cancel` parity). Applied to a `[uiButton]` (recommended
 * `variant="outline"`). This is the alert dialog's only no-op escape route, so it
 * should always be present. `data-slot="alert-dialog-cancel"`.
 */
@Directive({
  selector: '[rdxAlertDialogCancel]',
  standalone: true,
  host: {
    // See AlertDialogActionDirective — default type="button" to avoid an
    // accidental form submit; a consumer can override with type="submit".
    type: 'button',
    'data-slot': 'alert-dialog-cancel',
    '(click)': 'onClick()',
  },
})
export class AlertDialogCancelDirective {
  private readonly ref = inject(RdxDialogRef);
  protected onClick(): void {
    // dismiss() is a no-op for alert dialogs (isAlert short-circuits it), so
    // close with no result.
    this.ref.close(undefined);
  }
}
