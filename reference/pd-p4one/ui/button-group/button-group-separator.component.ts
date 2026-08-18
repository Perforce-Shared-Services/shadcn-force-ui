import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { SEPARATOR_BASE_CLASS, type SeparatorOrientation } from '../separator/separator.component';

/**
 * Angular port of @force-ui/button-group's `ButtonGroupSeparator` — the
 * registry source wraps `<Separator>` (children composition) and overrides
 * its default orientation to `vertical` plus a few classes. Angular attribute
 * selectors can't nest one `@Component` inside another that way, so this
 * reproduces `ui/separator`'s host logic directly against the SHARED
 * `SEPARATOR_BASE_CLASS` constant (reuse-the-primitive, not
 * copy-the-classes — same pattern as `toggle-group-item` reusing
 * `toggleVariants`), with its own default flipped to `vertical`.
 *
 * Attribute selector on a native `<div>`:
 *   <div uiButtonGroupSeparator></div>                       vertical (default)
 *   <div uiButtonGroupSeparator orientation="horizontal"></div>
 *
 * DEVIATION FROM REGISTRY-VERBATIM (maintainer call, 2026-07-02): the upstream
 * source swaps `SEPARATOR_BASE_CLASS`'s `bg-border` for `bg-input` — a much
 * stronger fill (measured contrast: `--input` ~4.8:1 on white vs `--border`
 * ~1.2:1). No Figma example of this divider existed to verify it against, and
 * it visibly clashed with the light `border-border` edge of the surrounding
 * buttons in a split-button composition — kept `bg-border` (inherited
 * unmodified from `SEPARATOR_BASE_CLASS`) instead, matching a bare
 * `ui/separator`'s own emphasis level.
 */
@Component({
  selector: '[uiButtonGroupSeparator]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'button-group-separator',
    '[attr.role]': "decorative() ? 'none' : 'separator'",
    // WAI-ARIA's separator role defaults aria-orientation to "horizontal" —
    // that default is independent of this component's own visual default
    // (vertical), so only the non-default (vertical) value is ever emitted.
    '[attr.aria-orientation]':
      "!decorative() && orientation() === 'vertical' ? 'vertical' : null",
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
})
export class ButtonGroupSeparatorComponent {
  readonly orientation = input<SeparatorOrientation>('vertical');
  readonly decorative = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      SEPARATOR_BASE_CLASS,
      'relative m-0! self-stretch data-[orientation=vertical]:h-auto',
      this.className(),
    ),
  );
}
