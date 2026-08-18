import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type OnInit,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import {
  injectCheckboxRootContext,
  RdxCheckboxButtonDirective,
  RdxCheckboxIndicatorDirective,
  RdxCheckboxRootDirective,
} from '@radix-ng/primitives/checkbox';
import { RdxControlValueAccessor } from '@radix-ng/primitives/core';

import { cn } from '@/app/lib/utils';

import { CHECKBOX_CHECK_SVG, CHECKBOX_INDETERMINATE_SVG } from './checkbox.icons';

/**
 * Base class string — taken verbatim from the @force-ui/checkbox registry item
 * (radix-force-ui style), with two documented additions:
 *
 * 1. The `data-[state=indeterminate]:*` group. The registry source ships
 *    check-only; the Force spec mandates an indeterminate state (dash glyph,
 *    `aria-checked="mixed"`) for "select all" headers in data tables. radix-ng
 *    exposes it for free via the `'indeterminate'` checked value, so we fill the
 *    control identically to `data-checked:*` when indeterminate. The `data-checked`
 *    custom variant (tailwind.css) matches only `data-state="checked"`, hence the
 *    explicit `data-[state=indeterminate]:` arbitrary variant here.
 *
 * 2. The explicit `bg-background` (light surface fill). The registry leaves the
 *    light unchecked control transparent (only `dark:bg-input/30`); the Figma
 *    component binds the control fill to `custom/background dark:input\30`
 *    (white surface in light) and the Force spec mandates an explicit
 *    `bg.surface` so the box never inherits a host card tint or browser
 *    dark-mode chrome (spec P8). `data-checked:bg-primary` /
 *    `data-[state=indeterminate]:bg-primary` (attribute-selector specificity)
 *    override it when filled.
 *
 * 3. Hover affordance (`enabled:` + `data-state`-gated). The registry ships no
 *    hover state and the Figma set (46:112) has no Hover variant, but the Force
 *    spec §8 calls for one, so it's added in code: unchecked hover tints the box
 *    `bg-accent` (= spec `bg.interactive-hover`), checked/indeterminate hover
 *    darkens to `bg-primary-hover`. Gated on `enabled:` so a disabled control
 *    doesn't react, and on `data-[state=...]` so the three states don't fight
 *    (mutually exclusive, no source-order dependency). `border.strong` on hover
 *    (the spec's border darkening) is intentionally NOT done — no matching token
 *    exists and adding one is a DS-wide decision, not a per-component change.
 *    `enabled:cursor-pointer` marks the box as interactive. The state colour
 *    change rides the registry's `transition-colors` (Tailwind default 150ms =
 *    the spec's `--force-duration-fast`) for a subtle fade, guarded by
 *    `motion-reduce:transition-none` (WCAG 2.3.3). The focus ring and the check
 *    glyph intentionally do NOT animate — focus must be instant for keyboard
 *    users, and the indicator keeps `transition-none` to avoid a glyph flash.
 *
 * The colour tokens (`border-input`, `bg-primary`, `text-primary-foreground`,
 * the focus/aria-invalid rings) were verified against the Figma component's
 * bound variables in sync-figma-component (`base/input` #717180, `base/primary`
 * #5405ff, `base/primary-foreground` #fff, `base/destructive` #d11323) — all
 * already present and correct in tailwind.css.
 */
const CHECKBOX_BASE_CLASS =
  'peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors motion-reduce:transition-none outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 enabled:cursor-pointer enabled:data-[state=unchecked]:hover:bg-accent enabled:data-checked:hover:bg-primary-hover enabled:data-[state=indeterminate]:hover:bg-primary-hover aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary bg-background dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground dark:data-[state=indeterminate]:bg-primary';

/**
 * Angular port of @force-ui/checkbox (radix-force-ui style).
 *
 * Attribute selector on a native `<button>` — Angular's idiomatic answer to
 * React's Radix `Checkbox.Root`. The host MUST be a `<button>`: the radix-ng
 * `RdxCheckboxButtonDirective` (applied as a host directive) turns it into an
 * accessible checkbox (`role="checkbox"`, `aria-checked`, `data-state`, Space to
 * toggle, Enter suppressed per WAI-ARIA), and `RdxCheckboxRootDirective` provides
 * the form-bound state context that the indicator and button read.
 *
 * Usage:
 *   <button uiCheckbox [(checked)]="agreed"></button>
 *   <button uiCheckbox checked="indeterminate" aria-label="Select all rows"></button>
 *   <button uiCheckbox disabled [checked]="true"></button>
 *
 * Inputs/outputs are forwarded from the radix host directives:
 * - `checked` — `boolean | 'indeterminate'`, two-way (`[(checked)]`).
 * - `disabled`, `readonly`, `required`, `value`, `name`, `form`.
 * - `checkedChange` / `onCheckedChange` — emitted on toggle.
 *
 * Accessibility:
 * - A checkbox with no adjacent label text (e.g. a "select all" header) MUST
 *   carry an `aria-label` on the host, or it is unnamed to screen readers
 *   (WCAG 4.1.2). The indeterminate state is announced as `aria-checked="mixed"`
 *   automatically by the radix button directive.
 * - The indicator glyph (checkmark / dash) provides shape-based differentiation
 *   in addition to the fill colour, so the state never relies on colour alone.
 */
@Component({
  selector: 'button[uiCheckbox]',
  standalone: true,
  imports: [RdxCheckboxIndicatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxCheckboxRootDirective,
      inputs: [
        'checked',
        'value',
        'disabled',
        'readonly',
        'required',
        'name',
        'form',
      ],
      outputs: ['checkedChange', 'onCheckedChange'],
    },
    RdxCheckboxButtonDirective,
  ],
  host: {
    'data-slot': 'checkbox',
    '[class]': 'classes()',
  },
  template: `
    <span
      rdxCheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current transition-none [&>svg]:size-3.5 [&>svg]:fill-current"
      aria-hidden="true"
      [innerHTML]="indicatorIcon()"
    ></span>
  `,
})
export class CheckboxComponent implements OnInit {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Provided by the `RdxCheckboxRootDirective` host directive on this element. */
  private readonly rootContext = injectCheckboxRootContext();
  private readonly cva = inject(RdxControlValueAccessor);

  /**
   * Guarantee `aria-checked` is always present (WCAG 4.1.2 — `role="checkbox"`
   * requires it). radix-ng binds `aria-checked` to the control-value-accessor's
   * value, which stays nullish until a `checked` binding writes it — so a bare
   * `<button uiCheckbox>` (no `[checked]`/`[(checked)]`) renders with NO
   * `aria-checked` at all (axe `aria-required-attr`, critical). Seed the CVA to
   * the resting unchecked state when the consumer hasn't supplied one; a real
   * binding leaves a non-null value before `ngOnInit`, so it's never clobbered.
   */
  ngOnInit(): void {
    if (this.rootContext.checked() == null) {
      this.cva.writeValue(false);
    }
  }

  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Sanitizer-trusted inline SVGs — single swap-point (`checkbox.icons.ts`). The
   * markup is bundled from `@material-symbols/svg-400` at build time (trusted,
   * static), so bypassing the sanitizer is safe and necessary (Angular's HTML
   * sanitizer strips `<svg>` from `[innerHTML]`).
   */
  private readonly checkIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    CHECKBOX_CHECK_SVG,
  );
  private readonly dashIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    CHECKBOX_INDETERMINATE_SVG,
  );

  /** Dash when indeterminate, checkmark otherwise (indicator hidden when unchecked). */
  protected readonly indicatorIcon = computed<SafeHtml>(() =>
    this.rootContext.state() === 'indeterminate' ? this.dashIcon : this.checkIcon,
  );

  protected readonly classes = computed(() =>
    cn(CHECKBOX_BASE_CLASS, this.className()),
  );
}
