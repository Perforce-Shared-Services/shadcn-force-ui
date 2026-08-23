import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
import {
  injectCheckboxRootContext,
  RdxCheckboxButtonDirective,
  RdxCheckboxIndicatorDirective,
  RdxCheckboxRootDirective,
} from "@radix-ng/primitives/checkbox"
import { RdxControlValueAccessor } from "@radix-ng/primitives/core"

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
      inputs: ["checked", "value", "disabled", "required", "name", "readonly", "form"],
      outputs: ["checkedChange", "onCheckedChange"],
    },
    RdxCheckboxButtonDirective,
  ],
  host: {
    "data-slot": "checkbox",
    "[class]": "classes()",
  },
})
export class CheckboxComponent implements OnInit {
  private readonly ctx = injectCheckboxRootContext()
  private readonly cva = inject(RdxControlValueAccessor)
  private readonly sanitizer = inject(DomSanitizer)

  /**
   * Guarantee `aria-checked` is always present (WCAG 4.1.2 — `role="checkbox"`
   * requires it). radix-ng v1.x models `checked` with a `false` default so the
   * attribute is normally rendered even without a `[checked]` binding; the
   * seed below is defence-in-depth for any path where the CVA value is still
   * nullish at first render (p4one needed this unconditionally on v0.50.0).
   * A real `[checked]` binding leaves a non-null value before `ngOnInit`, so
   * it's never clobbered.
   */
  ngOnInit(): void {
    if (this.ctx.checked() == null) {
      this.cva.writeValue(false)
    }
  }

  protected readonly indicatorIcon = computed<SafeHtml>(() => {
    const state = this.ctx.state()
    const svg = state === "indeterminate" ? INDETERMINATE_SVG : CHECK_SVG
    return this.sanitizer.bypassSecurityTrustHtml(svg)
  })

  protected readonly classes = computed(() =>
    cn(
      // Hit-area expander (WCAG 2.5.5): the pseudo-element extends the
      // clickable region beyond the visual box; `relative` anchors it.
      "cn-checkbox peer relative after:absolute after:-inset-x-3 after:-inset-y-2 after:content-[''] flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] border transition-colors motion-reduce:transition-none outline-none focus-visible:ring-3 aria-invalid:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
    )
  )
}
