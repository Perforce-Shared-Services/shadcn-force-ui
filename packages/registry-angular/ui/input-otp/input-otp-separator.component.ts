import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { INPUT_OTP_SEPARATOR_SVG } from "./input-otp.icons"

/**
 * Decorative divider between slot groups (e.g. `123 - 456`).
 *
 * `[&_svg]:fill-current` is required for Material Symbols SVGs — they carry
 * no `fill` attribute and would paint black without it. The selector stays
 * a descendant match (`_`, not `>`), so wrapping the icon in a `<span>` via
 * `[innerHTML]` is safe here.
 *
 * `aria-orientation="vertical"`: a non-focusable `role="separator"` defaults
 * to horizontal per the WAI-ARIA separator pattern ("divides content stacked
 * vertically"); this one divides groups arranged side by side, so the
 * ARIA-correct orientation is vertical regardless of the horizontal dash
 * drawn on it.
 */
@Component({
  selector: "[uiInputOtpSeparator]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./input-otp-separator.component.html",
  host: {
    "data-slot": "input-otp-separator",
    role: "separator",
    "aria-orientation": "vertical",
    class: "cn-input-otp-separator flex items-center [&_svg]:fill-current",
  },
})
export class InputOtpSeparatorComponent {
  protected readonly icon: SafeHtml

  constructor(sanitizer: DomSanitizer) {
    this.icon = sanitizer.bypassSecurityTrustHtml(INPUT_OTP_SEPARATOR_SVG)
  }
}
