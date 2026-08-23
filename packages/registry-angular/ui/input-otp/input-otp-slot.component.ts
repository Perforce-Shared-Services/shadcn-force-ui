import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core"

import { cn } from "@/lib/utils"

import { InputOtpComponent } from "./input-otp.component"

/**
 * One character cell of the OTP input.
 *
 * Reads its character and active/caret state from the ancestor
 * `[uiInputOtp]` via `inject(InputOtpComponent)` — the same DI-context
 * pattern `ui/toggle-group` uses for shared group state, since this
 * compound has no radix-ng primitive to lean on.
 *
 * All visual state classes live in the `cn-input-otp-slot` token
 * (`style-force-ui.css`): resting border tier, active ring, invalid ring,
 * disabled fill. This component only adds the structural classes and the
 * `data-active`/`data-disabled` attributes the token's selectors key on.
 *
 * Pass a plain `aria-invalid` attribute (no binding needed) to flag the
 * error state — it flows through as a real DOM attribute and both this
 * slot's own `aria-invalid:` classes and the parent group's
 * `has-aria-invalid:` classes pick it up.
 */
@Component({
  selector: "[uiInputOtpSlot]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./input-otp-slot.component.html",
  host: {
    "data-slot": "input-otp-slot",
    "[attr.data-active]": "isActive()",
    "[attr.data-disabled]": "isDisabled()",
    "[class]": "classes()",
  },
})
export class InputOtpSlotComponent {
  readonly index = input.required<number>()
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly root = inject(InputOtpComponent, { optional: true })

  protected readonly char = computed(() => this.root?.value()[this.index()])

  private readonly activeIndex = computed(() => {
    const maxLength = this.root?.maxLength() ?? 0
    return Math.min(Math.max(this.root?.caretIndex() ?? -1, 0), Math.max(maxLength - 1, 0))
  })

  protected readonly isActive = computed(
    () => !!this.root?.focused() && this.activeIndex() === this.index(),
  )

  protected readonly isDisabled = computed(() => !!this.root?.disabled())

  protected readonly hasFakeCaret = computed(() => this.isActive() && this.char() === undefined)

  protected readonly classes = computed(() =>
    cn(
      "cn-input-otp-slot relative flex items-center justify-center data-[active=true]:z-10",
      this.className(),
    ),
  )
}
