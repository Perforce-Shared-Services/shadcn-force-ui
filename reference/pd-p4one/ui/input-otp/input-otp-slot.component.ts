import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { InputOtpComponent } from './input-otp.component';

/**
 * Angular port of @force-ui/input-otp's `InputOTPSlot` — one character cell.
 *
 * Reads its character and active/caret state from the ancestor
 * `[uiInputOtp]` via `inject(InputOtpComponent, { optional: true })` — the
 * same DI-context pattern `ui/toggle-group` and `ui/stepper` use for shared
 * group state, since this compound has no radix-ng primitive to lean on.
 *
 * `transition-all` gets a `motion-reduce:transition-none` guard (WCAG 2.3.3)
 * — a documented addition over the registry string, consistent with every
 * other ported interactive component (see `ui/breadcrumb`'s link). The fake
 * caret's `animate-caret-blink` gets the equivalent `motion-reduce:
 * animate-none` guard for the same reason (post-audit fix — an infinite
 * blink is exactly the kind of motion `prefers-reduced-motion` exists for).
 * Dropped the registry's `duration-1000` on that same element: `tw-animate-
 * css`'s `--animate-caret-blink` token is a hardcoded `1.25s` shorthand, not
 * built on the `--tw-duration` variable a `duration-*` utility overrides, so
 * the class was dead weight even in the registry (post-audit cleanup).
 *
 * Usage: `<div uiInputOtpSlot [index]="0"></div>` inside a `[uiInputOtpGroup]`.
 * Pass a plain `aria-invalid` attribute (no binding needed) to flag the error
 * state — it flows through as a real DOM attribute and both this slot's own
 * `aria-invalid:` classes and the parent group's `has-aria-invalid:` classes
 * pick it up.
 *
 * `data-disabled` is forwarded from the root's `disabled()` signal (same
 * mechanism as `data-active`) so the slot can carry a disabled-specific fill
 * — Figma's Disabled state binds the slot fill to `base/muted` (distinct
 * from the `dark:bg-input/30` tint the other states use), so
 * `data-[disabled=true]:bg-muted` needs its own hook rather than reusing the
 * container's `has-disabled:opacity-50` dimming alone. The `dark:` pairing
 * is written explicitly (not left to `bg-muted`'s own light/dark variable)
 * so its extra selector part reliably outranks `dark:bg-input/30` — same
 * "write both, don't rely on cascade order" convention the registry itself
 * uses for state-dependent dark overrides.
 *
 * RESTING BORDER (post-Figma-review fix, not registry-verbatim): the
 * registry ships `border-input` (heavy, neutral-500) at rest. Figma 81:122's
 * Default/Filled/Disabled states all bind the border to `base/border`
 * (light, neutral-200) instead — the same light-resting/reinforce-on-focus
 * tier `ui/input`'s `outline` variant already uses (see its BORDER TIER
 * note), just without a hover step since this Slot set has no Hover state
 * in Figma. Changed `border-input` -> `border-border` to match; Focus stays
 * `border-ring`, Invalid stays `border-destructive` (unchanged).
 */
@Component({
  selector: '[uiInputOtpSlot]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input-otp-slot',
    '[attr.data-active]': 'isActive()',
    '[attr.data-disabled]': 'isDisabled()',
    '[class]': 'classes()',
  },
  template: `
    {{ char() }}
    @if (hasFakeCaret()) {
      <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div class="h-4 w-px animate-caret-blink motion-reduce:animate-none bg-foreground"></div>
      </div>
    }
  `,
})
export class InputOtpSlotComponent {
  readonly index = input.required<number>();
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly root = inject(InputOtpComponent, { optional: true });

  protected readonly char = computed(() => this.root?.value()[this.index()]);

  private readonly activeIndex = computed(() => {
    const maxLength = this.root?.maxLength() ?? 0;
    return Math.min(Math.max(this.root?.caretIndex() ?? -1, 0), Math.max(maxLength - 1, 0));
  });

  protected readonly isActive = computed(
    () => !!this.root?.focused() && this.activeIndex() === this.index(),
  );

  protected readonly isDisabled = computed(() => !!this.root?.disabled());

  protected readonly hasFakeCaret = computed(() => this.isActive() && this.char() === undefined);

  protected readonly classes = computed(() =>
    cn(
      "relative flex size-8 items-center justify-center border-y border-r border-border text-sm transition-all motion-reduce:transition-none outline-none first:rounded-l-lg first:border-l last:rounded-r-lg aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40 data-[disabled=true]:bg-muted dark:data-[disabled=true]:bg-muted",
      this.className(),
    ),
  );
}
