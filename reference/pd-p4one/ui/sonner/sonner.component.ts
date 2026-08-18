import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { NgxSonnerToaster, type Position, type Theme, type ToastOptions } from 'ngx-sonner';

import { cn } from '@/app/lib/utils';

import { SONNER_ICON_SVG } from './sonner.icons';

/**
 * The registry's own `sonner.tsx` maps these to `var(--popover)` /
 * `var(--popover-foreground)`. The Force spec's `toast.md` calls for
 * `--force-color-bg-surface` and a fixed 312px width instead — both map
 * cleanly onto tokens this app already ships (`--surface` /
 * `--surface-foreground`, used the same way by `ui/card`), so this is a
 * deliberate, spec-driven deviation from the registry string rather than a
 * byte-identical copy. `z-index` is intentionally left at ngx-sonner's own
 * built-in default (999999999, well above anything CDK overlays use) — the
 * Force `--force-z-index-toast` (800) scale isn't wired into this app's
 * `tailwind.css` yet (no `--z-index-*` tokens exist here at all).
 */
/**
 * `richColors` (per-type tinted backgrounds) is ngx-sonner's own feature, not
 * something this wrapper builds — but its injected stylesheet exposes named
 * CSS custom property *override hooks* per status
 * (`--ngx-sonner-toast-{status}-background/border/color`, and a `-dark-`
 * prefixed twin read only when the `theme` input is `'dark'`) that fall back
 * to hardcoded, non-Force HSL values when unset. Point every hook at the same
 * Force status tokens `ui/alert`/`ui/badge` already use for their tinted
 * variant (`bg-{status}-subtle` + `text-{status}`) so `richColors` renders
 * with Force colors instead of ngx-sonner's defaults. `var(--{status})` /
 * `var(--{status}-subtle)` already resolve per `.dark-theme`, so the `-dark-`
 * hooks get the same expressions — harmless now (this app's toaster `theme`
 * never flips to `'dark'`) and correct if it ever does.
 *
 * Verified against Figma 2026-07-02: the "Sonner" component set gained a
 * `Type` variant axis (Default/Success/Warning/Info/Error) using the exact
 * same `base/{status}` / `base/{status}-subtle` variables this object binds
 * to — see the `sonner` entry in `.claude/figma-component-map.json`. The
 * base container was also rebound there from `base/popover` to a new
 * `base/surface` (aliasing 6. FUI Semantic `bg/surface`), closing the gap
 * with `--normal-bg` below.
 */
const RICH_COLOR_STYLE: Record<string, string> = {
  '--ngx-sonner-toast-success-background': 'var(--success-subtle)',
  '--ngx-sonner-toast-success-border': 'var(--success)',
  '--ngx-sonner-toast-success-color': 'var(--success)',
  '--ngx-sonner-toast-dark-success-background': 'var(--success-subtle)',
  '--ngx-sonner-toast-dark-success-border': 'var(--success)',
  '--ngx-sonner-toast-dark-success-color': 'var(--success)',
  '--ngx-sonner-toast-info-background': 'var(--info-subtle)',
  '--ngx-sonner-toast-info-border': 'var(--info)',
  '--ngx-sonner-toast-info-color': 'var(--info)',
  '--ngx-sonner-toast-dark-info-background': 'var(--info-subtle)',
  '--ngx-sonner-toast-dark-info-border': 'var(--info)',
  '--ngx-sonner-toast-dark-info-color': 'var(--info)',
  '--ngx-sonner-toast-warning-background': 'var(--warning-subtle)',
  '--ngx-sonner-toast-warning-border': 'var(--warning)',
  '--ngx-sonner-toast-warning-color': 'var(--warning)',
  '--ngx-sonner-toast-dark-warning-background': 'var(--warning-subtle)',
  '--ngx-sonner-toast-dark-warning-border': 'var(--warning)',
  '--ngx-sonner-toast-dark-warning-color': 'var(--warning)',
  '--ngx-sonner-toast-error-background': 'var(--error-subtle)',
  '--ngx-sonner-toast-error-border': 'var(--error)',
  '--ngx-sonner-toast-error-color': 'var(--error)',
  '--ngx-sonner-toast-dark-error-background': 'var(--error-subtle)',
  '--ngx-sonner-toast-dark-error-border': 'var(--error)',
  '--ngx-sonner-toast-dark-error-color': 'var(--error)',
};

const DEFAULT_STYLE: Record<string, string> = {
  '--normal-bg': 'var(--surface)',
  '--normal-text': 'var(--surface-foreground)',
  '--normal-border': 'var(--border)',
  '--border-radius': 'var(--radius)',
  '--width': '312px',
  ...RICH_COLOR_STYLE,
};

/**
 * `cn-toast` is copied verbatim from the registry's `sonner.tsx`. It has no
 * matching `@utility` in `tailwind.css` today (same no-op-until-synced
 * treatment as `alert`'s `cn-font-heading` — see port-shadcn-component §7):
 * it's a placeholder for a Force UI utility class that hasn't been published
 * to this app's token layer yet. Do not strip it and do not invent a
 * definition; sync it from the upstream Force UI stylesheet when it lands.
 *
 * `!items-start` top-aligns the icon with the title instead of ngx-sonner's
 * own `align-items: center` (which centers the icon across the full
 * title+description block once a description is present — the Figma
 * component aligns the icon to the title). The bare `[data-sonner-toast]
 * [data-styled=true]` rule this overrides has no exposed CSS-var hook (unlike
 * the color hooks above), so this is the one layout property fixable within
 * `toastOptions.classes` despite that: Tailwind's `!` important modifier
 * beats the plain (non-`!important`) declaration regardless of selector
 * specificity or injection order.
 *
 * `actionButton`/`cancelButton` use the same `!important` trick to match the
 * Figma "Sonner / Action" component (`Default` = `bg-primary` "Undo",
 * `Secondary` = `bg-secondary` "Cancel" — the exact classes `ui/button`'s
 * `default`/`secondary` variants use) instead of ngx-sonner's own hardcoded
 * `background: var(--normal-text)` / `#00000014`. This reclassifies what the
 * first audit pass filed as a specificity-blocked backlog item — the `!`
 * modifier sidesteps that fight the same way `!items-start` does above.
 * `font-size`/`padding`/`border-radius`/target-size on these buttons are
 * still hardcoded in ngx-sonner's stylesheet and stay backlog (out of scope
 * here: color only, not box model).
 */
const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  classes: {
    toast: 'cn-toast !items-start',
    actionButton: '!bg-primary !text-primary-foreground',
    cancelButton: '!bg-secondary !text-secondary-foreground',
  },
};

/**
 * Angular port of @force-ui/sonner (radix-force-ui style).
 *
 * The registry wraps the third-party `sonner` React toast library, reading
 * the app's theme via `next-themes` and layering Force UI tokens on top
 * (`--normal-bg` -> `var(--popover)`, etc). There is no radix-ng primitive for
 * this — `sonner` isn't a Radix pattern — so this wraps the dedicated Angular
 * port, `ngx-sonner` (`NgxSonnerToaster` / `toast()`), which mirrors the same
 * `theme` / `position` / `toastOptions` shaped API.
 *
 * Usage — render once (e.g. in the app shell), then call `toast()` from
 * anywhere, exactly like upstream:
 *   <ui-sonner-toaster />
 *   ...
 *   import { toast } from 'ngx-sonner';
 *   toast.success('Version saved');
 *
 * Parity notes / divergences from the registry string:
 *  - The registry reads `theme` from `next-themes`' `useTheme()`. This app has
 *    no runtime dark/light theme service yet (dark mode is driven purely by
 *    the `.dark-theme` ancestor class + CSS custom properties — see
 *    `tailwind.css`), so `theme` defaults to `'light'` here and is a plain
 *    input the consumer can bind once such a service exists. The `--normal-*`
 *    CSS vars below already track `.dark-theme` automatically since they
 *    resolve to Force tokens; only ngx-sonner's *internal* neutral palette
 *    (used for the default border/close-button/action-button colors) needs
 *    the `theme` input to flip.
 *  - `icons` (an object prop on the React `Sonner`) has no ngx-sonner
 *    equivalent — icons are projected content matching `[success-icon]` /
 *    `[info-icon]` / `[warning-icon]` / `[error-icon]` / `[loading-icon]`
 *    (see `sonner.icons.ts` for the parity gap on the entrance animation).
 *  - `style` / `toastOptions` are merged with the Force UI defaults rather
 *    than fully replaced, so a caller can extend them without having to
 *    restate `--normal-bg` etc (the registry's plain object-spread would
 *    silently drop them if a caller passed either prop).
 *
 * Scope decision against the Force design spec (`patterns/components/toast.md`,
 * confirmed with the maintainer): the spec describes a richer Toast than the
 * registry ships — a fixed 312px width, `--force-color-bg-surface` background,
 * a header slot where close-button/timestamp/CTA are mutually exclusive, a
 * named `brand` variant, and an optional 4px left accent border. This port is
 * intentionally **thin, matching the registry**: it wires the token-level
 * asks that drop in for free (312px width, surface background — both above),
 * but keeps ngx-sonner's own toast markup (icon + title + description +
 * action + cancel + close) rather than hand-building a custom
 * `toast.custom()` content renderer. The timestamp/CTA-exclusive header,
 * `brand` variant, and bordered accent are NOT implemented — same
 * documented-gap treatment as `ui/dialog`'s parity notes, not a silent
 * omission.
 *
 * Audit follow-ups (2026-07-02, `ux-auditor`) fixed here: status icons carry
 * `text-{success,warning,info,error}` **when `richColors` is on** (NN/g H6 —
 * color reinforces the glyph instead of every icon rendering in the neutral
 * toast text color); when `richColors` is off the icon stays neutral
 * (`fill-current` inherits `--normal-text`, i.e. `--surface-foreground`) so
 * the icon's color tracks the same on/off toggle as the toast body's own
 * tinting, rather than always being colored regardless of `richColors`;
 * `closeButton` now defaults `true` (see its own doc comment).
 *
 * Audit findings NOT fixable within this component's contract (CSS custom
 * properties / `toastOptions.classes` / the 5 icon slots) — backlog, not
 * silently dropped: ngx-sonner's own injected stylesheet hardcodes a
 * non-token `font-size: 13px`, `box-shadow`, and `padding` on the toast, plus
 * sub-32px action/cancel/close button hit targets (colors are fixed — see
 * `DEFAULT_TOAST_OPTIONS` above — but box model isn't); `role`/`aria-live`
 * never varies by toast type (always `role="status"`, `aria-live="assertive"`
 * only behind a manual per-call `important` flag) unlike `ui/alert`'s
 * variant-driven liveness — fixing this needs a `toast.error`/`toast.warning`
 * call-site wrapper, not a change here.
 */
@Component({
  selector: 'ui-sonner-toaster',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      [class]="hostClass()"
      [style]="mergedStyle()"
      [toastOptions]="mergedToastOptions()"
      [theme]="theme()"
      [position]="position()"
      [richColors]="richColors()"
      [closeButton]="closeButton()"
      [expand]="expand()"
      [duration]="duration()"
      [visibleToasts]="visibleToasts()"
      [offset]="offset()"
      [invert]="invert()"
    >
      <span success-icon aria-hidden="true" class="mt-0.5 [&>svg]:size-4 [&>svg]:fill-current" [class.text-success]="richColors()" [innerHTML]="icons.success"></span>
      <span info-icon aria-hidden="true" class="mt-0.5 [&>svg]:size-4 [&>svg]:fill-current" [class.text-info]="richColors()" [innerHTML]="icons.info"></span>
      <span warning-icon aria-hidden="true" class="mt-0.5 [&>svg]:size-4 [&>svg]:fill-current" [class.text-warning]="richColors()" [innerHTML]="icons.warning"></span>
      <span error-icon aria-hidden="true" class="mt-0.5 [&>svg]:size-4 [&>svg]:fill-current" [class.text-error]="richColors()" [innerHTML]="icons.error"></span>
      <span loading-icon aria-hidden="true" class="animate-spin mt-0.5 [&>svg]:size-4 [&>svg]:fill-current" [innerHTML]="icons.loading"></span>
    </ngx-sonner-toaster>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonnerToasterComponent {
  readonly theme = input<Theme>('light');
  readonly position = input<Position>('bottom-right');
  readonly richColors = input(false, { transform: booleanAttribute });
  /** Force spec (`toast.md`): a close button is the default header-right
   * affordance, present "unless replaced by a CTA or timestamp" — and WCAG
   * 2.2.1 wants an explicit way to act on the auto-dismiss timer beyond
   * hover. Default `true` diverges from ngx-sonner's own `false` default. */
  readonly closeButton = input(true, { transform: booleanAttribute });
  readonly expand = input(false, { transform: booleanAttribute });
  readonly duration = input(4000, { transform: numberAttribute });
  readonly visibleToasts = input(3, { transform: numberAttribute });
  readonly offset = input<string | number | null>(null);
  readonly invert = input(false, { transform: booleanAttribute });
  readonly style = input<Record<string, string> | undefined>(undefined);
  readonly toastOptions = input<ToastOptions | undefined>(undefined);
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly hostClass = computed(() => cn('toaster group', this.className()));

  protected readonly mergedStyle = computed(() => ({ ...DEFAULT_STYLE, ...this.style() }));

  protected readonly mergedToastOptions = computed(() => ({
    ...DEFAULT_TOAST_OPTIONS,
    ...this.toastOptions(),
    classes: {
      ...DEFAULT_TOAST_OPTIONS.classes,
      ...this.toastOptions()?.classes,
    },
  }));

  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Inline SVGs (single swap point). Bundled from `@material-symbols/svg-400`
   * at build time — a trusted, static source — so bypassing the sanitizer is
   * safe and necessary (Angular's HTML sanitizer strips `<svg>` from a raw
   * `[innerHTML]`).
   */
  protected readonly icons: Record<keyof typeof SONNER_ICON_SVG, SafeHtml> = {
    success: this.sanitizer.bypassSecurityTrustHtml(SONNER_ICON_SVG.success),
    info: this.sanitizer.bypassSecurityTrustHtml(SONNER_ICON_SVG.info),
    warning: this.sanitizer.bypassSecurityTrustHtml(SONNER_ICON_SVG.warning),
    error: this.sanitizer.bypassSecurityTrustHtml(SONNER_ICON_SVG.error),
    loading: this.sanitizer.bypassSecurityTrustHtml(SONNER_ICON_SVG.loading),
  };
}
