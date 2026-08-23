import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"

import { cn } from "@/lib/utils"

/**
 * A visual cluster of slots (e.g. 3 digits before a separator). The
 * `cn-input-otp-group` token carries the rounded frame + aria-invalid ring;
 * `flex items-center` is structural.
 *
 * Usage: nest `[uiInputOtpSlot]` children inside; must sit inside `[uiInputOtp]`.
 */
@Component({
  selector: "[uiInputOtpGroup]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./input-otp-group.component.html",
  host: {
    "data-slot": "input-otp-group",
    "[class]": "classes()",
  },
})
export class InputOtpGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-input-otp-group flex items-center", this.className()),
  )
}
