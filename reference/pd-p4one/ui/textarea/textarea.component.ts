import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { textareaVariants, type TextareaVariant } from './textarea.variants';

/**
 * Angular port of @force-ui/textarea (radix-force-ui style).
 *
 * Attribute selector on a native `<textarea>` (same pattern as `input`):
 *   <textarea uiTextarea placeholder="Describe this version"></textarea>
 *   <textarea uiTextarea aria-invalid="true"></textarea>
 *
 * `field-sizing-content` auto-grows the box to its content; `min-h-16` is the
 * floor. The host keeps all native textarea semantics.
 *
 * VARIANT axis (mirrors input/input-group): outline (default) / filled /
 * underline / ghost — see textarea.variants.ts.
 *
 * Carries the same maintainer decisions as `input` (kept consistent across the
 * field family, all token-only):
 * - BORDER TIER (Option B): light resting `border-border` -> `hover:border-input`
 *   -> focus `border-ring`. Diverges from the registry's resting `border-input`.
 * - `text-foreground` on the base so the typed value is readable regardless of
 *   the ambient inherited colour.
 * - READ-ONLY (`[&[readonly]]`): muted surface, value stays full-contrast +
 *   focusable + copyable (not disabled-like). See input's NN/g rationale.
 *
 * Accessibility: pair with a `<label for>`; in the error state set native
 * `aria-invalid` AND link a visible message via `aria-describedby` (colour is
 * not a sufficient signal — WCAG 1.4.1).
 */
@Component({
  selector: 'textarea[uiTextarea]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'textarea',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class TextareaComponent {
  readonly variant = input<TextareaVariant>('outline');
  /**
   * Show the drag-to-resize handle. `true` (default) = vertical resize only
   * (`resize-y` — horizontal resize is an anti-pattern, deliberately not
   * offered, refining the registry's implicit `resize: both`); `false` =
   * `resize-none` (rely on `field-sizing-content` auto-grow).
   */
  readonly resizable = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      textareaVariants({ variant: this.variant() }),
      this.resizable() ? 'resize-y' : 'resize-none',
      this.className(),
    ),
  );
}
