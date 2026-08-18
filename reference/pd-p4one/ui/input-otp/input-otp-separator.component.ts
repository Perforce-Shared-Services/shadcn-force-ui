import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { INPUT_OTP_SEPARATOR_SVG } from './input-otp.icons';

/**
 * Angular port of @force-ui/input-otp's `InputOTPSeparator` — a decorative
 * divider between slot groups (e.g. `123 - 456`).
 *
 * `[&_svg]:fill-current` is a documented addition over the registry class
 * string: Material Symbols SVGs carry no `fill` attribute (unlike the
 * lucide-react `MinusIcon` the registry renders), so without it the glyph
 * paints black instead of inheriting `currentColor` — see the icon-strategy
 * section of the `port-shadcn-component` skill. The selector stays a
 * descendant match (`_`, not `>`), so wrapping the icon in a `<span>` via
 * `[innerHTML]` is safe here (unlike the alert's direct-child grid rules).
 *
 * Usage: `<div uiInputOtpSeparator></div>` between two `[uiInputOtpGroup]`s.
 *
 * `aria-orientation="vertical"` (post-audit addition, not in the registry):
 * a non-focusable `role="separator"` defaults to horizontal per the WAI-ARIA
 * separator pattern, which means "divides content stacked vertically." This
 * one sits between groups arranged side by side and divides them left/right
 * — the ARIA-correct orientation for that is `vertical`, regardless of the
 * glyph drawn on it (a horizontal dash, purely visual).
 */
@Component({
  selector: '[uiInputOtpSeparator]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input-otp-separator',
    role: 'separator',
    'aria-orientation': 'vertical',
    class: "flex items-center [&_svg:not([class*='size-'])]:size-4 [&_svg]:fill-current",
  },
  template: `<span [innerHTML]="icon" aria-hidden="true"></span>`,
})
export class InputOtpSeparatorComponent {
  protected readonly icon: SafeHtml;

  constructor(sanitizer: DomSanitizer) {
    this.icon = sanitizer.bypassSecurityTrustHtml(INPUT_OTP_SEPARATOR_SVG);
  }
}
