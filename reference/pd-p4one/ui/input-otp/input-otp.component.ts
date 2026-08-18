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
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Per-character regex sources, mirroring the upstream `input-otp` npm
 * package's exported constants (plain strings, not `RegExp` objects — pass
 * one to `pattern`).
 */
export const REGEXP_ONLY_DIGITS = '^\\d+$';
export const REGEXP_ONLY_CHARS = '^[a-zA-Z]+$';
export const REGEXP_ONLY_DIGITS_AND_CHARS = '^[a-zA-Z0-9]+$';

/**
 * Angular port of @force-ui/input-otp (radix-force-ui style) — the OTP root.
 *
 * NOT a byte-parity port at the DOM level: the registry wraps the React
 * `input-otp` package (a headless widget with no Angular build and no
 * radix-ng equivalent). That package's defining trick — sizing an invisible
 * native `<input>` so its native caret lands pixel-perfect under the visible
 * slot boxes via measured letter-spacing — is a large, package-specific
 * engineering surface with no accessibility payoff (the caret is invisible
 * either way). This port keeps the same public shape (Root/Group/Slot/
 * Separator, `data-slot`/`data-active` attributes, byte-identical Tailwind
 * class strings on the visible parts) and the same headless contract — one
 * real `<input>` drives focus/keyboard/paste/mobile IME/screen readers, and
 * the slots are purely decorative `<div>`s reacting to shared state — but
 * stretches the real input over the FULL slot row (`absolute inset-0`)
 * instead of pixel-aligning a caret. Documented, deliberate deviation. See
 * `input-otp-slot.component.ts` for how a slot reads its character/active
 * state. The input also carries `z-20` — each slot is itself `position:
 * relative` (for its own focus ring), and a relatively-positioned box with
 * later tree order paints OVER an absolutely-positioned earlier sibling at
 * the same (auto) z-index, so without an explicit higher z-index the slots
 * would silently swallow every click/tap before it reaches the input.
 *
 * Per the upstream package's own prop routing, `data-slot="input-otp"` and
 * `id`/`name`/`required`/`pattern`/`disabled` all land on the real `<input>`,
 * NOT the container `<div>` — the container only ever carries the
 * `containerClassName` classes.
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
 * - `value` — two-way (`[(value)]`); the entered code, always no longer than
 *   `maxLength`.
 * - `maxLength` — number of characters/slots. Default 6 (the common OTP
 *   length); pass a lower value for shorter PIN codes.
 * - `pattern` — a regex source string restricting which characters are
 *   accepted, e.g. `REGEXP_ONLY_DIGITS` (exported here, matching the
 *   upstream package's constants). Leave unset to accept any character.
 * - `disabled`, `required`, `name`, `id` — forwarded to the real `<input>`,
 *   matching the upstream package's prop routing — pair a `<label for>` with
 *   `id` the same way you would for `ui/input`.
 * - `aria-label`, `aria-invalid`, `aria-describedby` — also forwarded to the
 *   real `<input>` (not the container), same routing as the props above. Use
 *   `aria-label` for a terse composition with no visible `<label>`; prefer a
 *   real `<label for>` + `id` when there's room for one. Error state: set
 *   `aria-invalid` here (post-audit fix — this used to be settable only on
 *   the decorative `InputOTPSlot`s, which never reaches the actual
 *   focusable control) AND `aria-describedby` pointing at a visible
 *   `FieldError` — colour alone is not a sufficient signal (WCAG 1.4.1), and
 *   an error only the sighted slot ring shows is invisible to a screen
 *   reader (WCAG 3.3.1 / 4.1.2). Still also set `aria-invalid` on the
 *   affected `InputOTPSlot`s for their own `has-aria-invalid:` ring styling
 *   — the two are independent (one drives AT, the other drives CSS).
 *
 * Accessibility: the real `<input>` carries `autocomplete="one-time-code"`
 * (lets the OS/browser autofill an SMS code), and every keyboard/paste/mobile
 * IME interaction it supports natively keeps working unmodified. Screen
 * readers read the input's value and label; the visual slots are pure
 * decoration, never a substitute a11y tree.
 */
@Component({
  selector: '[uiInputOtp]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // `relative` is a documented addition (not in the registry's
    // `containerClassName`) — it anchors the absolutely positioned hidden
    // `<input>` below, see the class deviation note above.
    '[class]': 'containerClasses()',
    // `id` is a universal HTML attribute — if a caller writes it as a plain
    // static attribute on the host (`<div uiInputOtp id="x">`, the natural
    // style for a fixed id), Angular both (a) applies it as this
    // component's `id` input AND (b) still physically renders it on the
    // host element, since static attribute text isn't "consumed away" by a
    // matching @Input. Left alone, that duplicates the id onto both the
    // wrapper div and the real `<input>` below, which breaks `label[for]`
    // (it resolves to the first, non-form-control match) and produces
    // invalid duplicate-id HTML. Force it off the host unconditionally —
    // the id belongs on the real `<input>` only (see `[attr.id]="id()"`
    // below), matching the upstream package's own prop routing. Same
    // static-attribute leak applies to `name`/`pattern`/`required` and the
    // `aria-*` inputs below (post-audit) — nulled off the host for the same
    // reason, not just `id`.
    '[attr.id]': 'null',
    '[attr.name]': 'null',
    '[attr.pattern]': 'null',
    '[attr.required]': 'null',
    '[attr.aria-label]': 'null',
    '[attr.aria-invalid]': 'null',
    '[attr.aria-describedby]': 'null',
  },
  template: `
    <input
      #inputEl
      data-slot="input-otp"
      type="text"
      autocomplete="one-time-code"
      spellcheck="false"
      [attr.id]="id()"
      [attr.name]="name()"
      [attr.pattern]="pattern()"
      [attr.maxlength]="maxLength()"
      [attr.inputmode]="inputMode()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-invalid]="ariaInvalid() ? 'true' : null"
      [attr.aria-describedby]="describedBy()"
      [required]="required()"
      [disabled]="disabled()"
      [value]="value()"
      class="absolute inset-0 z-20 h-full w-full cursor-text border-0 bg-transparent p-0 text-transparent caret-transparent outline-none disabled:cursor-not-allowed"
      (input)="onInput($event)"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (click)="syncCaret()"
      (keyup)="syncCaret()"
    />
    <ng-content />
  `,
})
export class InputOtpComponent {
  readonly value = model<string>('');
  readonly maxLength = input<number>(6);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly pattern = input<string | undefined>(undefined);
  readonly name = input<string | undefined>(undefined);
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly ariaInvalid = input(false, { alias: 'aria-invalid', transform: booleanAttribute });
  readonly describedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Caret position inside the hidden input. Read by `InputOtpSlotComponent` to pick the active slot. */
  readonly caretIndex = signal(0);
  /** Whether the hidden input has focus. Read by `InputOtpSlotComponent` for the active ring + fake caret. */
  readonly focused = signal(false);

  private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  protected readonly inputMode = computed(() =>
    this.pattern() === REGEXP_ONLY_DIGITS ? 'numeric' : 'text',
  );

  protected readonly containerClasses = computed(() =>
    cn('cn-input-otp relative flex items-center has-disabled:opacity-50', this.className()),
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const raw = target.value;
    const pattern = this.pattern();
    const re = pattern ? new RegExp(pattern) : null;
    const filtered = re ? Array.from(raw).filter((ch) => re.test(ch)).join('') : raw;
    const next = filtered.slice(0, this.maxLength());
    if (next !== raw) {
      target.value = next;
    }
    this.value.set(next);
    this.syncCaret();
  }

  protected onFocus(): void {
    this.focused.set(true);
    this.syncCaret();
  }

  protected onBlur(): void {
    this.focused.set(false);
  }

  protected syncCaret(): void {
    const el = this.inputEl().nativeElement;
    this.caretIndex.set(el.selectionStart ?? this.value().length);
  }
}
