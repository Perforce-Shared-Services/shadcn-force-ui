import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  signal,
  viewChild,
} from "@angular/core"

import { cn } from "@/lib/utils"

/**
 * Per-character regex sources, mirroring the upstream `input-otp` npm
 * package's exported constants (plain strings, not `RegExp` objects — pass
 * one to `pattern`).
 */
export const REGEXP_ONLY_DIGITS = "^\\d+$"
export const REGEXP_ONLY_CHARS = "^[a-zA-Z]+$"
export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$"

/**
 * Angular port of the registry's InputOTP root.
 *
 * NOT a DOM-level port of the React `input-otp` package (a headless widget
 * with no Angular build and no radix-ng equivalent — verified: radix-ng
 * v1.x ships no input-otp module). That package sizes an invisible native
 * `<input>` so its native caret lands pixel-perfect under the visible slot
 * boxes via measured letter-spacing. This port keeps the same public shape
 * (Root/Group/Slot/Separator, `data-slot`/`data-active` attributes, `cn-*`
 * token classes on the visible parts) and the same headless contract — one
 * real `<input>` drives focus/keyboard/paste/mobile IME/screen readers, and
 * the slots are purely decorative `<div>`s reacting to shared state — but
 * stretches the real input over the FULL slot row (`absolute inset-0`)
 * instead of pixel-aligning a caret. Documented, deliberate deviation.
 *
 * The input carries `z-20` because each slot is itself `position:
 * relative`; a relatively-positioned box with later tree order paints OVER
 * an absolutely-positioned earlier sibling at the same (auto) z-index, so
 * without an explicit higher z-index the slots would swallow every click
 * before it reaches the input.
 *
 * Per the upstream package's own prop routing, `data-slot="input-otp"` and
 * `id`/`name`/`required`/`pattern`/`disabled` all land on the real
 * `<input>`, NOT the container `<div>` — static attributes that would leak
 * onto the host are nulled in the `host` block below for that reason.
 *
 * Usage:
 *   <div uiInputOtp [maxLength]="6" [(value)]="code">
 *     <div uiInputOtpGroup>
 *       <div uiInputOtpSlot [index]="0"></div>
 *     </div>
 *   </div>
 */
@Component({
  selector: "[uiInputOtp]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./input-otp.component.html",
  host: {
    // `relative` anchors the absolutely positioned hidden `<input>` below.
    "[class]": "containerClasses()",
    // Force id/name/pattern/aria-* off the host: a caller's static attribute
    // would render on BOTH this wrapper and the real `<input>` (duplicate
    // ids break `label[for]`). They belong on the real `<input>` only.
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.pattern]": "null",
    "[attr.required]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-invalid]": "null",
    "[attr.aria-describedby]": "null",
  },
})
export class InputOtpComponent {
  readonly value = model<string>("")
  readonly maxLength = input<number>(6)
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly required = input(false, { transform: booleanAttribute })
  readonly pattern = input<string | undefined>(undefined)
  readonly name = input<string | undefined>(undefined)
  readonly id = input<string | undefined>(undefined)
  readonly ariaLabel = input<string | undefined>(undefined, { alias: "aria-label" })
  readonly ariaInvalid = input(false, { alias: "aria-invalid", transform: booleanAttribute })
  readonly describedBy = input<string | undefined>(undefined, { alias: "aria-describedby" })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  /** Caret position inside the hidden input. Read by `InputOtpSlotComponent` to pick the active slot. */
  readonly caretIndex = signal(0)
  /** Whether the hidden input has focus. Read by `InputOtpSlotComponent` for the active ring + fake caret. */
  readonly focused = signal(false)

  private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>("inputEl")

  protected readonly inputMode = computed(() =>
    this.pattern() === REGEXP_ONLY_DIGITS ? "numeric" : "text",
  )

  // `relative flex items-center has-disabled:opacity-50` are structural classes
  // shared with the React source; `cn-input-otp` supplies the gap token.
  protected readonly containerClasses = computed(() =>
    cn(
      "cn-input-otp relative flex items-center has-disabled:opacity-50",
      this.className(),
    ),
  )

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    const raw = target.value
    const pattern = this.pattern()
    const re = pattern ? new RegExp(pattern) : null
    const filtered = re
      ? Array.from(raw)
          .filter((ch) => re.test(ch))
          .join("")
      : raw
    const next = filtered.slice(0, this.maxLength())
    if (next !== raw) {
      target.value = next
    }
    this.value.set(next)
    this.syncCaret()
  }

  protected onFocus(): void {
    this.focused.set(true)
    this.syncCaret()
  }

  protected onBlur(): void {
    this.focused.set(false)
  }

  protected syncCaret(): void {
    const el = this.inputEl().nativeElement
    this.caretIndex.set(el.selectionStart ?? this.value().length)
  }
}
