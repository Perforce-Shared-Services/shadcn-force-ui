import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { inputVariants, type InputVariant } from './input.variants';

/**
 * Angular port of @force-ui/input (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <input uiInput />
 *   <input uiInput type="email" placeholder="you@example.com" />
 *   <input uiInput variant="filled" />        <!-- solid fill -->
 *   <input uiInput variant="underline" />     <!-- bottom rule only -->
 *   <input uiInput variant="ghost" />         <!-- borderless, for inline edit -->
 *   <input uiInput aria-invalid="true" />     <!-- error state -->
 *
 * Like the button port, an attribute selector replaces React's `asChild` /
 * Radix `Slot`: the host stays a native <input>, keeping its type, value,
 * form, and a11y semantics for free. The component only decorates it with the
 * Force UI class string plus the data-slot/data-variant attributes that
 * downstream theming and the cross-framework test suites rely on for parity.
 *
 * VARIANT axis is a P4 One extension (the upstream registry ships one style).
 * `outline` (default) is the verbatim registry style; filled/underline/ghost
 * are token-only presets — see input.variants.ts. NOTE `ghost` has no resting
 * boundary: use it only inside a context that already signals "editable" (a
 * hovered/selected table row, an inline-rename target), never as a standalone
 * field — see the GhostInContext story.
 *
 * Accessibility (the form's responsibility — a bare input can't self-fulfil):
 * - Always pair with a programmatic `<label for>` (WCAG 1.3.1 / 4.1.2). A
 *   placeholder is a hint, never a label.
 * - Error state: set native `aria-invalid="true"` for the red border/ring AND
 *   render a visible message linked via `aria-describedby` — the colour alone
 *   is not a sufficient signal (WCAG 1.4.1) and the message must be announced
 *   (WCAG 3.3.1). See the `WithLabel` / `InvalidWithMessage` stories.
 *
 * Size: registry-verbatim `h-8` (32px, the compact size — suits toolbars,
 * search, and dense forms). The Force UI registry intentionally ships no size
 * variant; for a taller standalone field, wrap/compose at the call site.
 */
@Component({
  selector: 'input[uiInput]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class InputComponent {
  readonly variant = input<InputVariant>('outline');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(inputVariants({ variant: this.variant() }), this.className()),
  );
}
