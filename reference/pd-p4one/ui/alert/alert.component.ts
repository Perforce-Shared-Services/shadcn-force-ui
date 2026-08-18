import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { type AlertIcon, ALERT_ICON_SVG, DEFAULT_VARIANT_ICON } from './alert.icons';
import { alertVariants, type AlertVariant } from './alert.variants';

/**
 * Angular port of @force-ui/alert (radix-force-ui style).
 *
 * Attribute selectors — the host element keeps its native semantics and the
 * components decorate it with the variant-derived classes plus the data-*
 * attributes that downstream theming and the cross-framework test suites rely
 * on for parity with the React/Vue/Svelte siblings.
 *
 * Usage:
 *   <div uiAlert variant="warning">
 *     <div uiAlertTitle>Heads up</div>
 *     <div uiAlertDescription>Something happened.</div>
 *     <div uiAlertAction><button uiButton size="xs">Undo</button></div>
 *   </div>
 *
 * The leading icon is built-in and resolves per variant (`icon="auto"`, the
 * default). Pass an explicit `icon` name to override, or `icon="none"` to drop
 * it. The icon is decorative (`aria-hidden`) — the title text carries meaning.
 *
 * ARIA: `role` is derived from the variant — error-class variants
 * (destructive/warning) announce assertively (`role="alert"` / `aria-live`
 * `assertive`); neutral/positive/informational variants announce politely
 * (`role="status"` / `aria-live="polite"`) so they don't interrupt a screen
 * reader. Override with the `role` / `live` inputs when the context demands it
 * (e.g. an info alert injected after a user action).
 */
@Component({
  selector: '[uiAlert]',
  standalone: true,
  template: `
    @if (resolvedSafeSvg(); as svg) {
      <span
        class="shrink-0 [&>svg]:size-4 [&>svg]:fill-current"
        data-slot="alert-icon"
        aria-hidden="true"
        [innerHTML]="svg"
      ></span>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'alert',
    '[attr.role]': 'resolvedRole()',
    '[attr.aria-live]': 'resolvedLive()',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class AlertComponent {
  readonly variant = input<AlertVariant>('default');
  /** `'auto'` (per-variant default), `'none'`, or an explicit icon name. */
  readonly icon = input<AlertIcon | 'auto' | 'none'>('auto');
  /** `'auto'` derives the ARIA role from the variant; override when needed. */
  readonly role = input<'auto' | 'alert' | 'status'>('auto');
  /** `'auto'` derives politeness from the variant; override when needed. */
  readonly live = input<'auto' | 'off' | 'polite' | 'assertive'>('auto');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Variants that should interrupt the user (assertive announcement). */
  private isAssertive = computed(
    () => this.variant() === 'destructive' || this.variant() === 'warning',
  );

  protected readonly resolvedIcon = computed<AlertIcon | null>(() => {
    const icon = this.icon();
    if (icon === 'none') return null;
    if (icon === 'auto') return DEFAULT_VARIANT_ICON[this.variant()];
    return icon;
  });

  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Sanitizer-trusted inline SVG for the resolved icon (or null when hidden).
   * The markup is bundled from `@material-symbols/svg-400` at build time — a
   * trusted, static source — so bypassing the sanitizer is safe and necessary
   * (Angular's HTML sanitizer strips `<svg>` from `[innerHTML]`).
   */
  protected readonly resolvedSafeSvg = computed<SafeHtml | null>(() => {
    const icon = this.resolvedIcon();
    return icon ? this.sanitizer.bypassSecurityTrustHtml(ALERT_ICON_SVG[icon]) : null;
  });

  protected readonly resolvedRole = computed(() => {
    const role = this.role();
    return role === 'auto' ? (this.isAssertive() ? 'alert' : 'status') : role;
  });

  protected readonly resolvedLive = computed(() => {
    const live = this.live();
    return live === 'auto' ? (this.isAssertive() ? 'assertive' : 'polite') : live;
  });

  protected readonly classes = computed(() =>
    cn(alertVariants({ variant: this.variant() }), this.className()),
  );
}

@Component({
  selector: '[uiAlertTitle]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'alert-title',
    '[class]': 'classes()',
  },
})
export class AlertTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'cn-font-heading font-medium group-has-[>[data-slot=alert-icon]]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiAlertDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'alert-description',
    '[class]': 'classes()',
  },
})
export class AlertDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      // Neutral muted description for every variant (tinted-callout pattern):
      // only the title + icon carry the status colour; the body stays readable.
      "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiAlertAction]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'alert-action',
    '[class]': 'classes()',
  },
})
export class AlertActionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('absolute top-2 right-2', this.className()),
  );
}
