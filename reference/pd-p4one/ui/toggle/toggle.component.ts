import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxToggleDirective } from '@radix-ng/primitives/toggle';

import { cn } from '@/app/lib/utils';

import { toggleVariants, type ToggleSize, type ToggleVariant } from './toggle.variants';

/**
 * Angular port of @force-ui/toggle (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <button uiToggle>Pin</button>
 *   <button uiToggle variant="outline" size="sm">Show untracked</button>
 *   <button uiToggle [(pressed)]="isBold">
 *     <svg aria-hidden="true">…</svg> Bold
 *   </button>
 *
 * Icon auto-swap (outline → filled on active):
 *   <button uiToggle [iconSvg]="starOutline" [iconSvgFilled]="starFill" aria-label="Pin file" />
 *
 * When `iconSvg` is provided, the component renders it before projected content and
 * automatically swaps to `iconSvgFilled` (if supplied) when `aria-pressed="true"`.
 * Use raw inline SVG strings from `@material-symbols/svg-400/rounded/` (outline = `<name>.svg`,
 * filled = `<name>-fill.svg`) — bundled at build time so the sanitizer bypass is safe.
 *
 * State management is delegated to RdxToggleDirective (radix-ng). The directive
 * sets `data-state="on"/"off"` and `aria-pressed` on the host, which the cva
 * class strings style directly.
 *
 * Accessibility:
 * - The host must be a `<button>` so radix-ng can manage `aria-pressed`.
 * - Icon-only toggles must carry an `aria-label` on the host.
 */
@Component({
  selector: '[uiToggle]',
  standalone: true,
  template: `
    @if (iconSvg()) {
      <span class="inline-flex shrink-0" aria-hidden="true" [innerHTML]="iconHtml()"></span>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxToggleDirective,
      inputs: ['pressed', 'defaultPressed', 'disabled'],
      outputs: ['onPressedChange'],
    },
  ],
  host: {
    'data-slot': 'toggle',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
    // Prevents accidental form submission when placed inside <form> elements.
    'type': 'button',
  },
})
export class ToggleComponent {
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Outline SVG string (from `@material-symbols/svg-400/rounded/<name>.svg?raw`). */
  readonly iconSvg = input<string | undefined>(undefined);
  /** Filled SVG string shown when pressed. Falls back to `iconSvg` if omitted. */
  readonly iconSvgFilled = input<string | undefined>(undefined);

  private readonly rdx = inject(RdxToggleDirective);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly iconHtml = computed((): SafeHtml | null => {
    const pressed = this.rdx.pressed();
    const svg = (pressed && this.iconSvgFilled()) ? this.iconSvgFilled()! : this.iconSvg();
    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : null;
  });

  protected readonly classes = computed(() =>
    cn(toggleVariants({ variant: this.variant(), size: this.size() }), this.className()),
  );
}
