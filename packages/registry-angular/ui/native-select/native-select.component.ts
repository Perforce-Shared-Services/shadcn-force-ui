import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"

import { NATIVE_SELECT_ICON_SVG } from "./native-select.icons"
import { nativeSelectVariants, type NativeSelectSize } from "./native-select.variants"

/**
 * Angular port of @force-ui/native-select (force-ui style).
 *
 * The registry's single `NativeSelect` React component renders both the
 * outer positioning `<div>` AND the inner `<select>` (spreading all select
 * props onto it). An Angular attribute-selector component can't render
 * markup outside its own host, so the port splits into two components:
 *
 *   <div uiNativeSelectWrapper>
 *     <select uiNativeSelect>
 *       <option uiNativeSelectOption value="1">One</option>
 *     </select>
 *   </div>
 *
 * Keeping `<select>` as the real host (see NativeSelectComponent) means
 * ngModel / formControlName / (change) / [disabled] all bind natively — no
 * input/output forwarding needed.
 */

/**
 * The WRAPPER half: positioning `<div>` with the decorative chevron overlay.
 *
 * The chevron is purely decorative (`aria-hidden`) — the native `<select>`
 * already announces itself and its options to assistive tech.
 *
 * Disabled dimming lives here (`has-[select:disabled]:opacity-50`), not on
 * the field, because the chevron must dim along with the select — matches
 * `input`/`select-trigger` visually even though the opacity is applied one
 * level up the tree. `[&_svg]:fill-current` covers Material Symbols'
 * fill-based glyphs.
 */
@Component({
  selector: "[uiNativeSelectWrapper]",
  standalone: true,
  templateUrl: "./native-select-wrapper.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "native-select-wrapper",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class NativeSelectWrapperComponent {
  readonly size = input<NativeSelectSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly icon: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(NATIVE_SELECT_ICON_SVG)

  protected readonly classes = computed(() =>
    cn(
      "group/native-select relative w-fit has-[select:disabled]:opacity-50 [&_svg]:fill-current",
      this.className()
    )
  )
}

/**
 * The FIELD half (see above for the split rationale).
 *
 * Attribute selector on the native `<select>` — usage:
 *   <select uiNativeSelect>...</select>
 *   <select uiNativeSelect data-size="sm">...</select>
 *   <select uiNativeSelect aria-invalid="true">...</select>
 *
 * Always nest inside `<div uiNativeSelectWrapper>` for the chevron overlay
 * and disabled-opacity chrome.
 *
 * Accessibility: pair with a programmatic `<label for>` (WCAG 1.3.1 / 4.1.2);
 * error state needs native `aria-invalid="true"` PLUS a visible message
 * linked via `aria-describedby` (WCAG 1.4.1 / 3.3.1) — colour alone isn't a
 * sufficient signal.
 */
@Component({
  selector: "select[uiNativeSelect]",
  standalone: true,
  templateUrl: "./native-select.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "native-select",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class NativeSelectComponent {
  /**
   * Styling-only prop driving the token's data-[size=sm] rules. Emitted as
   * `data-size`, never as `[attr.size]` — an `[attr.size]` binding would
   * collide with the native `<select size>` content attribute (visible row
   * count / listbox-vs-dropdown rendering) and turn `sm` into a literal
   * 2-row native listbox.
   */
  readonly size = input<NativeSelectSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(nativeSelectVariants({ size: this.size() }), this.className())
  )
}

/**
 * `bg-[Canvas] text-[CanvasText]` are CSS system-color keywords — the real
 * OS-native `<option>` popup ignores ordinary `background`/`color` values on
 * most platforms, so we target the system listbox colors instead of a Force
 * UI token (same choice as the React registry source).
 *
 * KNOWN LIMITATION: because of that, the options popup itself can't be themed
 * to match Force UI's light/dark palette on platforms that honor the system
 * keywords — only the closed field (the wrapper/select) is themeable. Use
 * `ui-select` instead when the open panel's appearance matters.
 */
@Component({
  selector: "option[uiNativeSelectOption]",
  standalone: true,
  templateUrl: "./native-select.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "native-select-option",
    "[class]": "classes()",
  },
})
export class NativeSelectOptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("bg-[Canvas] text-[CanvasText]", this.className())
  )
}

/** See NativeSelectOptionComponent for the system-color rationale. */
@Component({
  selector: "optgroup[uiNativeSelectOptGroup]",
  standalone: true,
  templateUrl: "./native-select.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "native-select-optgroup",
    "[class]": "classes()",
  },
})
export class NativeSelectOptGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("bg-[Canvas] text-[CanvasText]", this.className())
  )
}
