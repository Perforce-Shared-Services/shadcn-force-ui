import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
  isDevMode,
  type OnInit,
  computed,
} from '@angular/core';
import { RdxRovingFocusGroupDirective } from '@radix-ng/primitives/roving-focus';
import { RdxToggleGroupDirective } from '@radix-ng/primitives/toggle-group';

import { cn } from '@/app/lib/utils';

import { type ToggleSize, type ToggleVariant } from '../toggle/toggle.variants';

export type ToggleGroupOrientation = 'horizontal' | 'vertical';

/**
 * Angular port of @force-ui/toggle-group (radix-force-ui style) — the group root.
 *
 * Attribute selector — Angular's answer to React's `ToggleGroup.Root`. The
 * radix-ng `RdxToggleGroupDirective` host directive supplies the selection state
 * (`type="single" | "multiple"`, `value`, roving-focus arrow-key navigation, and
 * a `ControlValueAccessor` for forms).
 *
 * The variant/size/spacing set here flows down to each `[uiToggleGroupItem]`:
 * items inject this root and read the group's values (mirrors the React
 * `ToggleGroupContext`). Both the shared toggle look (reused from `ui/toggle`'s
 * `toggleVariants`) and the connected-segment layout (`spacing="0"`) come from
 * these inputs.
 *
 * Usage:
 *   <div uiToggleGroup type="single" [(value)]="align" aria-label="Text align">
 *     <button uiToggleGroupItem value="left"  aria-label="Align left">…</button>
 *     <button uiToggleGroupItem value="center" aria-label="Align center">…</button>
 *     <button uiToggleGroupItem value="right" aria-label="Align right">…</button>
 *   </div>
 *
 * A connected segmented control (no gaps, shared borders):
 *   <div uiToggleGroup type="single" variant="outline" spacing="0" …>
 *
 * Inputs/outputs forwarded from the radix host directive:
 * - `value` — `string | string[]`, two-way (`[(value)]`); the selected value(s).
 * - `type` — `'single' | 'multiple'`.
 * - `disabled`.
 * - `valueChange` / `onValueChange` — emitted on selection.
 *
 * `orientation` drives both the visual layout (`data-vertical:flex-col`) and the
 * keyboard arrow direction: `RdxToggleGroupDirective` applies radix-ng's
 * roving-focus group transitively but does not re-expose its `orientation`
 * through this second host-directive layer, so the value is pushed in via the
 * directive's public `setOrientation()` — ↑/↓ navigate a vertical group, ←/→ a
 * horizontal one.
 *
 * Accessibility: give the group an accessible name (`aria-label` /
 * `aria-labelledby`) — a dev-mode warning fires if neither is present. Arrow
 * keys move focus between items (roving focus); Tab enters/leaves the group as
 * one stop.
 */
@Component({
  selector: '[uiToggleGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxToggleGroupDirective,
      inputs: ['value', 'type', 'disabled'],
      outputs: ['valueChange', 'onValueChange'],
    },
  ],
  host: {
    'data-slot': 'toggle-group',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-spacing]': 'spacing()',
    '[attr.data-orientation]': 'orientation()',
    '[style.--gap]': 'spacing()',
    '[class]': 'classes()',
  },
  template: '<ng-content />',
})
export class ToggleGroupComponent implements OnInit {
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('default');
  readonly spacing = input<number>(2);
  readonly orientation = input<ToggleGroupOrientation>('horizontal');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly rovingFocus = inject(RdxRovingFocusGroupDirective, { optional: true });
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Keep the roving-focus arrow-key axis in sync with the visual orientation.
    // (RdxToggleGroupDirective brings the roving-focus group in but doesn't
    // forward its `orientation` input through our host-directive layer.)
    effect(() => this.rovingFocus?.setOrientation(this.orientation()));
  }

  ngOnInit(): void {
    if (isDevMode()) {
      const el = this.elementRef.nativeElement;
      if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
        console.warn(
          '[uiToggleGroup] Group has no accessible name. Add aria-label or aria-labelledby ' +
            'so screen readers can announce what the toggle group controls.',
        );
      }
    }
  }

  protected readonly classes = computed(() =>
    cn(
      'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch',
      this.className(),
    ),
  );
}
