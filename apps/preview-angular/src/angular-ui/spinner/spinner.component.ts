import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"
import { spinnerVariants, type SpinnerColor, type SpinnerSize } from "./spinner.variants"

// Raw SVG from @material-symbols/svg-400 (progress_activity, Rounded) —
// single swap point for the spinner glyph.
const SPINNER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5Q707-143 634.5-111.5T480-80Z"/></svg>`

/**
 * Angular port of @force-ui/spinner (radix-force-ui style).
 *
 * Usage:
 *   <span uiSpinner></span>
 *   <span uiSpinner color="primary" size="lg"></span>
 *   <span uiSpinner color="onPrimary"></span>
 *
 * aria-hidden="true" — the spinner is purely visual. The container owns the
 * semantic loading state via aria-busy="true" + an aria-live region.
 * See DIVERGENCES.md §spinner-5.
 *
 * animate-spinner requires --animate-spinner: spin 500ms linear infinite in
 * the consuming app's tailwind.css. See DIVERGENCES.md §spinner-2.
 */
@Component({
  selector: "[uiSpinner]",
  standalone: true,
  templateUrl: "./spinner.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "spinner",
    "aria-hidden": "true",
    "[attr.data-color]": "color()",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class SpinnerComponent {
  readonly color = input<SpinnerColor>("default")
  readonly size = input<SpinnerSize>("sm")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly icon: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(SPINNER_SVG)

  protected readonly classes = computed(() =>
    cn(spinnerVariants({ color: this.color(), size: this.size() }), this.className())
  )
}
