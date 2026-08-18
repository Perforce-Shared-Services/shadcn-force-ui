import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  isDevMode,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { buttonGroupVariants, type ButtonGroupOrientation } from './button-group.variants';

/**
 * Angular port of @force-ui/button-group (radix-force-ui style) — root.
 *
 * NOT a "just reuse button" component (verified via `shadcn view button-group`
 * before porting — see the combobox/pagination lesson): the root is its own
 * layout `cva` (border/radius trimming between adjacent children by
 * `:first-child`/`:last-child`/`:not()`), not a composition of `buttonVariants`.
 * `ui/button`'s own size axis already carries the
 * `in-data-[slot=button-group]:rounded-lg` counterpart class, so a plain
 * `<button uiButton>` child needs no extra wiring to sit correctly inside this
 * group — it just has to be a `[data-slot=button-group]` descendant, which
 * this root supplies.
 *
 * Attribute selector on a native `<div>`:
 *   <div uiButtonGroup>
 *     <button uiButton variant="outline">Copy</button>
 *     <button uiButton variant="outline">Share</button>
 *   </div>
 *   <div uiButtonGroup orientation="vertical">…</div>
 *
 * DEVIATION FROM REGISTRY-VERBATIM (documented): the React source reads
 * `data-orientation={orientation}` off the RAW (possibly-`undefined`) prop,
 * so an unset `orientation` renders the `horizontal` cva classes (via cva's
 * own `defaultVariants`) but OMITS the `data-orientation` attribute entirely —
 * classes and DOM state can diverge. This port always resolves `orientation()`
 * to its default and emits `data-orientation` from that same resolved value
 * (matching how `ui/separator` and `ui/toggle-group` already do it), so the
 * attribute and the applied classes never disagree.
 *
 * Accessibility (Force spec `button.md` #83): a button group of related
 * actions should be a `role="group"` region; give it an `aria-label` naming
 * the group of actions (e.g. `aria-label="Version actions"`) since the
 * buttons' own labels don't announce that they're grouped.
 */
@Component({
  selector: '[uiButtonGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'button-group',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
})
export class ButtonGroupComponent {
  readonly orientation = input<ButtonGroupOrientation>('horizontal');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(buttonGroupVariants({ orientation: this.orientation() }), this.className()),
  );

  constructor() {
    // Dev-only nudge (mirrors alert-dialog-content's missing-action warning):
    // role="group" is meaningless to AT without an accessible name, and
    // nothing here enforces the aria-label every story passes. Checked after
    // first paint so a caller binding [attr.aria-label] dynamically isn't
    // false-flagged before its first change-detection pass.
    if (isDevMode()) {
      const el = inject(ElementRef).nativeElement as HTMLElement;
      afterNextRender(() => {
        if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
          console.warn(
            '[uiButtonGroup] has no aria-label or aria-labelledby. A button group needs an ' +
              'accessible name so screen readers announce it as a related set of actions ' +
              '(WCAG 4.1.2) — e.g. aria-label="Version actions".',
          );
        }
      });
    }
  }
}
