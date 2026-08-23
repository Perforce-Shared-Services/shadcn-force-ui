import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
import { NgxSonnerToaster, type Position, type Theme, type ToastOptions } from "ngx-sonner"

import { cn } from "@/lib/utils"

import { sonnerVariants } from "./sonner.variants"
import {
  SONNER_ERROR_SVG,
  SONNER_INFO_SVG,
  SONNER_LOADING_SVG,
  SONNER_SUCCESS_SVG,
  SONNER_WARNING_SVG,
} from "./sonner.icons"

/**
 * Angular port of @force-ui/sonner (force-ui style). There is no radix-ng
 * primitive for this — `sonner` isn't a Radix pattern — so this wraps the
 * dedicated Angular port of the toast library, `ngx-sonner`
 * (`NgxSonnerToaster` / `toast()`), which mirrors the same
 * `theme` / `position` / `toastOptions` shaped API as React's `sonner`.
 *
 * Usage — render once (e.g. in the app shell), then call `toast()` from
 * anywhere, exactly like upstream:
 *   <ui-sonner-toaster />
 *   ...
 *   import { toast } from "ngx-sonner"
 *   toast.success("Version saved")
 *
 * Style wiring (component-level; no global CSS tokens exist for sonner):
 *  - `--normal-*` vars map to Force surface tokens (Force toast spec) and
 *    resolve per `.dark` automatically.
 *  - `richColors` is wired to the same status tokens `ui/alert`/`ui/badge`
 *    use for their tinted variants via ngx-sonner's named override hooks
 *    (`--ngx-sonner-toast-{status}-*`, plus the `-dark-` twins read when
 *    `theme` is `'dark'`) so tinted toasts render with Force colors instead
 *    of ngx-sonner's hardcoded HSL defaults.
 *  - `style` / `toastOptions` are merged with these defaults rather than
 *    replacing them, so callers can extend without restating `--normal-bg`.
 *  - The registry reads `theme` from `next-themes`; Angular has no equivalent
 *    here, so `theme` is a plain input defaulting to `'light'`. Only
 *    ngx-sonner's internal neutral palette needs this input — the Force
 *    token-driven colors above track `.dark` regardless.
 */
const DEFAULT_STYLE: Record<string, string> = {
  "--normal-bg": "var(--surface)",
  "--normal-text": "var(--surface-foreground)",
  "--normal-border": "var(--border)",
  "--border-radius": "var(--radius)",
  // Explicit width per the Force toast spec.
  "--width": "312px",

  "--ngx-sonner-toast-success-background": "var(--success-subtle)",
  "--ngx-sonner-toast-success-border": "var(--success)",
  "--ngx-sonner-toast-success-color": "var(--success)",
  "--ngx-sonner-toast-dark-success-background": "var(--success-subtle)",
  "--ngx-sonner-toast-dark-success-border": "var(--success)",
  "--ngx-sonner-toast-dark-success-color": "var(--success)",

  "--ngx-sonner-toast-info-background": "var(--info-subtle)",
  "--ngx-sonner-toast-info-border": "var(--info)",
  "--ngx-sonner-toast-info-color": "var(--info)",
  "--ngx-sonner-toast-dark-info-background": "var(--info-subtle)",
  "--ngx-sonner-toast-dark-info-border": "var(--info)",
  "--ngx-sonner-toast-dark-info-color": "var(--info)",

  "--ngx-sonner-toast-warning-background": "var(--warning-subtle)",
  "--ngx-sonner-toast-warning-border": "var(--warning)",
  "--ngx-sonner-toast-warning-color": "var(--warning)",
  "--ngx-sonner-toast-dark-warning-background": "var(--warning-subtle)",
  "--ngx-sonner-toast-dark-warning-border": "var(--warning)",
  "--ngx-sonner-toast-dark-warning-color": "var(--warning)",

  "--ngx-sonner-toast-error-background": "var(--error-subtle)",
  "--ngx-sonner-toast-error-border": "var(--error)",
  "--ngx-sonner-toast-error-color": "var(--error)",
  "--ngx-sonner-toast-dark-error-background": "var(--error-subtle)",
  "--ngx-sonner-toast-dark-error-border": "var(--error)",
  "--ngx-sonner-toast-dark-error-color": "var(--error)",
}

/**
 * Matches the registry's toastOptions: top-aligns the icon with the title
 * (`!items-start` beats ngx-sonner's own non-important `align-items: center`)
 * and brands the action/cancel buttons with primary/secondary tokens instead
 * of ngx-sonner's hardcoded neutral fill.
 */
const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  classes: {
    toast: "cn-toast !items-start",
    actionButton: "!bg-primary !text-primary-foreground",
    cancelButton: "!bg-secondary !text-secondary-foreground",
  },
}

/** Toaster shell — mount once, drive with `toast()` calls. */
@Component({
  selector: "ui-sonner-toaster",
  standalone: true,
  imports: [NgxSonnerToaster],
  templateUrl: "./sonner.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonnerToasterComponent {
  /** ngx-sonner's neutral palette; Force token colors track `.dark` independently. */
  readonly theme = input<Theme>("light")
  readonly position = input<Position>("bottom-right")
  readonly richColors = input(false, { transform: booleanAttribute })
  /** Defaults to `true` (WCAG 2.2.1 explicit dismiss + Force toast spec header
   * affordance); diverges from ngx-sonner's own `false` default. */
  readonly closeButton = input(true, { transform: booleanAttribute })
  readonly expand = input(false, { transform: booleanAttribute })
  readonly duration = input(4000, { transform: numberAttribute })
  readonly visibleToasts = input(3, { transform: numberAttribute })
  readonly offset = input<string | number | null>(null)
  readonly invert = input(false, { transform: booleanAttribute })
  readonly style = input<Record<string, string> | undefined>(undefined)
  readonly toastOptions = input<ToastOptions | undefined>(undefined)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly hostClass = computed(() => cn(sonnerVariants(), this.className()))

  protected readonly mergedStyle = computed(() => ({ ...DEFAULT_STYLE, ...this.style() }))

  protected readonly mergedToastOptions = computed(() => ({
    ...DEFAULT_TOAST_OPTIONS,
    ...this.toastOptions(),
    classes: {
      ...DEFAULT_TOAST_OPTIONS.classes,
      ...this.toastOptions()?.classes,
    },
  }))

  private readonly sanitizer = inject(DomSanitizer)

  /**
   * Inline SVGs (single swap point in `sonner.icons.ts`). Static, trusted
   * source strings — bypassing the sanitizer is safe and necessary (Angular's
   * HTML sanitizer strips `<svg>` from raw `[innerHTML]`).
   */
  protected readonly icons: Record<string, SafeHtml> = {
    success: this.sanitizer.bypassSecurityTrustHtml(SONNER_SUCCESS_SVG),
    info: this.sanitizer.bypassSecurityTrustHtml(SONNER_INFO_SVG),
    warning: this.sanitizer.bypassSecurityTrustHtml(SONNER_WARNING_SVG),
    error: this.sanitizer.bypassSecurityTrustHtml(SONNER_ERROR_SVG),
    loading: this.sanitizer.bypassSecurityTrustHtml(SONNER_LOADING_SVG),
  }
}
