import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
} from "@angular/core"
import { RdxControlValueAccessor } from "@radix-ng/primitives/core"
import { injectSwitchContext, RdxSwitchRoot, RdxSwitchThumb } from "@radix-ng/primitives/switch"

import { cn } from "@/lib/utils"

export type SwitchSize = "default" | "sm"

/**
 * Angular port of @force-ui/switch (radix-force-ui style).
 *
 * Attribute selector on a native <button> — usage:
 *   <button uiSwitch [(checked)]="enabled"></button>
 *   <button uiSwitch size="sm" [checked]="true"></button>
 */
@Component({
  selector: "button[uiSwitch]",
  standalone: true,
  imports: [RdxSwitchThumb],
  templateUrl: "./switch.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxSwitchRoot,
      inputs: ["checked", "defaultChecked", "disabled", "required"],
      outputs: ["checkedChange", "onCheckedChange"],
    },
  ],
  host: {
    "data-slot": "switch",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class SwitchComponent implements OnInit {
  readonly size = input<SwitchSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly ctx = injectSwitchContext()
  private readonly cva = inject(RdxControlValueAccessor)

  /**
   * Guarantee `aria-checked` is always present (WCAG 4.1.2 — `role="switch"`
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

  // Static string — no signal reads, so `computed()` would be noise. The host
  // button already establishes the `switch` named group via classes().
  protected readonly thumbClass =
    "cn-switch-thumb pointer-events-none block rounded-full ring-0 transition-transform motion-reduce:transition-none"

  protected readonly classes = computed(() =>
    cn(
      // Hit-area expander (WCAG 2.5.5): pseudo-element extends the clickable
      // region beyond the visual track; `relative` anchors it.
      "cn-switch peer relative after:absolute after:-inset-x-3 after:-inset-y-2 after:content-[''] group/switch inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors motion-reduce:transition-none outline-none focus-visible:ring-3 aria-invalid:ring-3 enabled:cursor-pointer data-disabled:cursor-not-allowed data-disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50",
      this.className()
    )
  )
}
