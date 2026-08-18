import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { BUTTON_SPINNER_SVG } from './button.icons';
import {
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from './button.variants';

/**
 * Angular port of @force-ui/button (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <button uiButton>Default</button>
 *   <button uiButton variant="destructive" size="sm">Delete</button>
 *   <a uiButton variant="link" href="...">Link button</a>
 *
 * Using an attribute selector is Angular's idiomatic answer to React's
 * `asChild` / Radix `Slot`: the host element keeps its native semantics
 * (button, a, etc.) and the component just decorates it with the
 * variant-derived classes plus the data-* attributes that downstream theming
 * and tests rely on for parity with the React/Vue/Svelte siblings.
 *
 * Disabled / loading semantics (the reason this component reads its host tag):
 * a native `<button>` has a real `disabled` that drops it from the tab order,
 * but `<a>` has none — a "disabled" anchor would stay keyboard-operable and
 * navigate on Enter (WCAG 2.1.1 / 4.1.2). So the component applies the right
 * mechanism per host: native `disabled` on `<button>`, and
 * `aria-disabled` + `tabindex="-1"` + a click guard on `<a>`. `loading` counts
 * as inactive too, adds `aria-busy` (WCAG 4.1.3) and a leading spinner —
 * matching the Figma `State=Loading` variant.
 *
 * Accessibility notes:
 * - `size="icon*"` renders no text. The host MUST carry an `aria-label`, or the
 *   button is unnamed to screen readers (WCAG 4.1.2). Mark the glyph
 *   `aria-hidden="true"`.
 * - Use `<a uiButton>` for navigation only, always with a real `href`; prefer
 *   `<button uiButton>` for click actions.
 */
@Component({
  selector: '[uiButton]',
  standalone: true,
  template:
    '@if (loading()) {<span class="inline-flex animate-spin" data-slot="button-spinner" aria-hidden="true" [innerHTML]="spinnerIcon"></span>}<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'button',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-loading]': "loading() ? '' : null",
    '[class]': 'classes()',
    // Native disabled only works on <button>; never emit it on <a>.
    '[attr.disabled]': "!isAnchor && inactive() ? '' : null",
    // Anchors get the ARIA equivalents instead.
    '[attr.aria-disabled]': "isAnchor && inactive() ? 'true' : null",
    '[attr.tabindex]': "isAnchor && inactive() ? '-1' : null",
    '[attr.aria-busy]': "loading() ? 'true' : null",
    '(click)': 'onClick($event)',
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('default');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Host tag drives which disabled mechanism applies (see class JSDoc). */
  protected readonly isAnchor =
    (inject(ElementRef).nativeElement as HTMLElement).tagName === 'A';

  /** Disabled or loading — both block interaction. */
  protected readonly inactive = computed(() => this.disabled() || this.loading());

  /**
   * Inline SVG spinner (single swap point). The markup is bundled from
   * `@material-symbols/svg-400` at build time — a trusted, static source — so
   * bypassing the sanitizer is safe and necessary (Angular's HTML sanitizer
   * strips `<svg>` from `[innerHTML]`).
   */
  protected readonly spinnerIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    BUTTON_SPINNER_SVG,
  );

  protected readonly classes = computed(() =>
    cn(buttonVariants({ variant: this.variant(), size: this.size() }), this.className()),
  );

  /**
   * Native `<button disabled>` already swallows clicks; this guard is for the
   * `<a>` host, where `aria-disabled` is advisory only and the anchor would
   * still navigate. Block activation while inactive.
   */
  protected onClick(event: MouseEvent): void {
    if (this.isAnchor && this.inactive()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
