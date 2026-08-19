import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"

// Raw SVG from @material-symbols/svg-400 (rounded/remove) — single swap point
// for the separator glyph, mirroring the registry's IconPlaceholder
// lucide="MinusIcon" / materialSymbols="remove". Bypassing the sanitizer is
// safe: this is a bundled static string, not user input.
const MINUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-440v-80h560v80H200Z"/></svg>`

/**
 * Per-character regex sources, mirroring the upstream `input-otp` npm package's
 * exported constants (plain strings, not `RegExp` objects — pass one to
 * `pattern`).
 */
export const REGEXP_ONLY_DIGITS = "^\\d+$"
export const REGEXP_ONLY_CHARS = "^[a-zA-Z]+$"
export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$"

/**
 * Angular port of @force-ui/input-otp (radix-force-ui style) — the OTP root.
 *
 * Hand-rolled: @radix-ng/primitives v1.1.2 ships NO input-otp module (the
 * porting guide's Group A table is wrong on this point), and the React/Vue/
 * Svelte registries each wrap a framework-specific third-party widget
 * (`input-otp`, `vue-input-otp`, `bits-ui`) with no Angular equivalent. See
 * DIVERGENCES.md §input-otp for the full writeup.
 *
 * Same headless contract as the registry source: ONE real, invisible <input>
 * owns focus/keyboard/paste/mobile IME/screen-reader semantics, and the
 * InputOTPSlot boxes are pure decoration reacting to shared signal state. The
 * real input is stretched over the whole slot row (absolute inset-0) instead of
 * pixel-aligning a native caret under each slot via measured letter-spacing —
 * that trick is package-specific and has no a11y payoff (the caret is
 * transparent either way). It also carries z-20: each slot is itself
 * `position: relative` (for its focus ring), and a relatively positioned box
 * with later tree order paints over an absolutely positioned earlier sibling at
 * the same auto z-index, so without the explicit stacking the slots would
 * swallow clicks before they reach the input.
 *
 * Per the registry's own prop routing, `data-slot="input-otp"` and
 * `id`/`name`/`required`/`pattern`/`disabled` land on the real <input>, NOT on
 * the container element — the container only ever carries the container classes.
 *
 * Usage:
 *   <div uiInputOtp [maxLength]="6" [(value)]="code">
 *     <div uiInputOtpGroup>
 *       <div uiInputOtpSlot [index]="0"></div>
 *       <div uiInputOtpSlot [index]="1"></div>
 *       <div uiInputOtpSlot [index]="2"></div>
 *     </div>
 *     <div uiInputOtpSeparator></div>
 *     <div uiInputOtpGroup>
 *       <div uiInputOtpSlot [index]="3"></div>
 *       <div uiInputOtpSlot [index]="4"></div>
 *       <div uiInputOtpSlot [index]="5"></div>
 *     </div>
 *   </div>
 *
 * Accessibility: always give the control an accessible name — either
 * `aria-label` or a real <label for> paired with `id`. Set `aria-invalid` on the
 * root (it reaches the actual focusable control) AND on the affected slots (for
 * their own aria-invalid: ring styling); the two are independent, one drives
 * assistive tech, the other drives CSS. Pair an error state with a visible,
 * `aria-describedby`-linked message — colour alone is not a sufficient signal
 * (WCAG 1.4.1 / 3.3.1).
 */
@Component({
  selector: "[uiInputOtp]",
  standalone: true,
  templateUrl: "./input-otp.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "classes()",
    // `id`/`name`/`pattern`/`required`/`aria-*` written as plain static
    // attributes on the host (the natural style for fixed values) are applied
    // as inputs AND still rendered on the host element by Angular, which would
    // duplicate them onto the container. They belong on the real <input> only
    // (see the template) — null them off the host unconditionally. A duplicated
    // `id` in particular breaks label[for] (it resolves to the first, non-form
    // control match) and is invalid HTML.
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.pattern]": "null",
    "[attr.required]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-invalid]": "null",
    "[attr.aria-describedby]": "null",
  },
})
export class InputOTPComponent {
  readonly value = model<string>("")
  readonly maxLength = input<number>(6)
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly required = input(false, { transform: booleanAttribute })
  readonly pattern = input<string | undefined>(undefined)
  readonly name = input<string | undefined>(undefined)
  readonly id = input<string | undefined>(undefined)
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  })
  readonly ariaInvalid = input(false, {
    alias: "aria-invalid",
    transform: booleanAttribute,
  })
  readonly describedBy = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  /** Emits the completed code once `value` reaches `maxLength` characters. */
  readonly complete = output<string>()

  /** Caret position inside the hidden input. Read by InputOTPSlotComponent to pick the active slot. */
  readonly caretIndex = signal(0)
  /** Whether the hidden input has focus. Read by InputOTPSlotComponent for the active ring + fake caret. */
  readonly focused = signal(false)

  private readonly inputEl =
    viewChild.required<ElementRef<HTMLInputElement>>("inputEl")

  protected readonly inputMode = computed(() =>
    this.pattern() === REGEXP_ONLY_DIGITS ? "numeric" : "text"
  )

  // `relative` is an addition over the registry's containerClassName — it
  // anchors the absolutely positioned hidden <input> (see the class note above).
  protected readonly classes = computed(() =>
    cn(
      "cn-input-otp relative flex items-center has-disabled:opacity-50",
      this.className()
    )
  )

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    const raw = target.value
    const pattern = this.pattern()
    const re = pattern ? new RegExp(pattern) : null
    const filtered = re
      ? Array.from(raw)
          .filter((char) => re.test(char))
          .join("")
      : raw
    const next = filtered.slice(0, this.maxLength())
    if (next !== raw) {
      target.value = next
    }
    const changed = next !== this.value()
    this.value.set(next)
    this.syncCaret()
    if (changed && next.length === this.maxLength()) {
      this.complete.emit(next)
    }
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

/**
 * Angular port of @force-ui/input-otp's InputOTPGroup — a visual cluster of
 * slots (e.g. three digits before a separator).
 *
 * Usage: nest [uiInputOtpSlot] children inside; must sit inside [uiInputOtp].
 */
@Component({
  selector: "[uiInputOtpGroup]",
  standalone: true,
  templateUrl: "./input-otp-group.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input-otp-group",
    "[class]": "classes()",
  },
})
export class InputOTPGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-input-otp-group flex items-center", this.className())
  )
}

/**
 * Angular port of @force-ui/input-otp's InputOTPSlot — one character cell.
 *
 * Reads its character and active/caret/disabled state from the ancestor
 * [uiInputOtp] via `inject(InputOTPComponent, { optional: true })` — the
 * Angular equivalent of React's OTPInputContext / Vue's provide+inject. Like
 * every other framework port, `disabled` is forwarded from the root separately
 * (the upstream slot context carries no disabled field) so the
 * data-[disabled=true] fill in .cn-input-otp-slot has a hook.
 *
 * Usage: <div uiInputOtpSlot [index]="0"></div> inside a [uiInputOtpGroup].
 * Pass a plain `aria-invalid` attribute to flag the error state — both this
 * slot's own aria-invalid: classes and the parent group's has-aria-invalid:
 * classes pick it up.
 */
@Component({
  selector: "[uiInputOtpSlot]",
  standalone: true,
  templateUrl: "./input-otp-slot.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input-otp-slot",
    "[attr.data-active]": "isActive()",
    "[attr.data-disabled]": "isDisabled()",
    "[class]": "classes()",
  },
})
export class InputOTPSlotComponent {
  readonly index = input.required<number>()
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly root = inject(InputOTPComponent, { optional: true })

  protected readonly char = computed(() => this.root?.value()[this.index()])

  private readonly activeIndex = computed(() => {
    const maxLength = this.root?.maxLength() ?? 0
    return Math.min(
      Math.max(this.root?.caretIndex() ?? -1, 0),
      Math.max(maxLength - 1, 0)
    )
  })

  protected readonly isActive = computed(
    () => !!this.root?.focused() && this.activeIndex() === this.index()
  )

  protected readonly isDisabled = computed(() => !!this.root?.disabled())

  protected readonly hasFakeCaret = computed(
    () => this.isActive() && this.char() === undefined
  )

  protected readonly classes = computed(() =>
    cn(
      "cn-input-otp-slot relative flex items-center justify-center data-[active=true]:z-10",
      this.className()
    )
  )
}

/**
 * Angular port of @force-ui/input-otp's InputOTPSeparator — a decorative
 * divider between slot groups (e.g. `123 - 456`).
 *
 * aria-orientation="vertical" matches the registry: a non-focusable
 * role="separator" defaults to horizontal per WAI-ARIA ("divides content
 * stacked vertically"), but this one divides groups sitting side by side.
 *
 * [&_svg]:fill-current is an addition over the registry class string — Material
 * Symbols SVGs carry no fill attribute (unlike lucide-react's MinusIcon), so
 * without it the glyph paints black instead of inheriting currentColor. See
 * DIVERGENCES.md §button-2.
 *
 * Usage: <div uiInputOtpSeparator></div> between two [uiInputOtpGroup]s.
 */
@Component({
  selector: "[uiInputOtpSeparator]",
  standalone: true,
  templateUrl: "./input-otp-separator.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "input-otp-separator",
    role: "separator",
    "aria-orientation": "vertical",
    class: "cn-input-otp-separator flex items-center [&_svg]:fill-current",
  },
})
export class InputOTPSeparatorComponent {
  protected readonly icon: SafeHtml =
    inject(DomSanitizer).bypassSecurityTrustHtml(MINUS_SVG)
}
