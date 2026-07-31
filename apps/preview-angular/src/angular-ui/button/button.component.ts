import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonSize, type ButtonVariant } from "./button.variants"

// Raw SVG from @material-symbols/svg-400 — single swap point for the spinner glyph.
// Bypassing the sanitizer is safe: this is a bundled static string, not user input.
const SPINNER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5Q707-143 634.5-111.5T480-80Z"/></svg>`

/**
 * Angular port of @force-ui/button (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <button uiButton>Default</button>
 *   <button uiButton variant="destructive" size="sm">Delete</button>
 *   <a uiButton variant="link" href="...">Link</a>
 *
 * The attribute selector keeps native host semantics (button, a) while the
 * component decorates it with variant classes + data-* attributes — Angular's
 * idiomatic equivalent of React's asChild / Radix Slot.
 *
 * Disabled on <a>: native disabled has no effect on anchors. When the host is
 * an <a>, the component uses aria-disabled + tabindex="-1" + a click guard
 * instead (WCAG 2.1.1 / 4.1.2).
 */
@Component({
  selector: "[uiButton]",
  standalone: true,
  template: `@if (loading()) {
  <span class="inline-flex animate-spin" data-slot="button-spinner" aria-hidden="true" [innerHTML]="spinnerIcon"></span>
}
<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "button",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[attr.data-loading]": "loading() ? '' : null",
    "[class]": "classes()",
    "[attr.disabled]": "!isAnchor && inactive() ? '' : null",
    "[attr.aria-disabled]": "isAnchor && inactive() ? 'true' : null",
    "[attr.tabindex]": "isAnchor && inactive() ? '-1' : null",
    "[attr.aria-busy]": "loading() ? 'true' : null",
    "(click)": "onClick($event)",
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>("default")
  readonly size = input<ButtonSize>("default")
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly loading = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly isAnchor =
    (inject(ElementRef).nativeElement as HTMLElement).tagName === "A"

  protected readonly inactive = computed(() => this.disabled() || this.loading())

  protected readonly spinnerIcon: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(SPINNER_SVG)

  protected readonly classes = computed(() =>
    cn(buttonVariants({ variant: this.variant(), size: this.size() }), this.className())
  )

  protected onClick(event: MouseEvent): void {
    if (this.isAnchor && this.inactive()) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }
}
