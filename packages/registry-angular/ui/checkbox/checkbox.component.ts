import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
import {
  injectCheckboxRootContext,
  RdxCheckboxButtonDirective,
  RdxCheckboxIndicatorDirective,
  RdxCheckboxRootDirective,
} from "@radix-ng/primitives/checkbox"

import { cn } from "@/lib/utils"

// Inline Material Symbols Rounded SVGs
const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`
const INDETERMINATE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-440v-80h560v80H200Z"/></svg>`

/**
 * Angular port of @force-ui/checkbox (radix-force-ui style).
 *
 * Attribute selector on a native <button> — usage:
 *   <button uiCheckbox [(checked)]="checked"></button>
 *   <button uiCheckbox [checked]="'indeterminate'"></button>
 *
 * The checked state, keyboard interaction, and ARIA are handled by
 * RdxCheckboxRootDirective. Pair with a <label> for accessible naming.
 */
@Component({
  selector: "button[uiCheckbox]",
  standalone: true,
  imports: [RdxCheckboxIndicatorDirective],
  templateUrl: "./checkbox.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxCheckboxRootDirective,
      inputs: ["checked", "value", "disabled", "required", "name"],
      outputs: ["checkedChange", "onCheckedChange"],
    },
    RdxCheckboxButtonDirective,
  ],
  host: {
    "data-slot": "checkbox",
    "[class]": "classes()",
  },
})
export class CheckboxComponent {
  private readonly ctx = injectCheckboxRootContext()
  private readonly sanitizer = inject(DomSanitizer)

  protected readonly indicatorIcon = computed<SafeHtml>(() => {
    const state = this.ctx.checked()
    const svg = state === "indeterminate" ? INDETERMINATE_SVG : CHECK_SVG
    return this.sanitizer.bypassSecurityTrustHtml(svg)
  })

  protected readonly classes = computed(() =>
    cn(
      "cn-checkbox peer relative flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] border transition-colors motion-reduce:transition-none outline-none focus-visible:ring-3 aria-invalid:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
    )
  )
}
