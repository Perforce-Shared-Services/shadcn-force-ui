import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxTabsContentDirective } from '@radix-ng/primitives/tabs';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/tabs (radix-force-ui style) — content.
 *
 * Hosts `RdxTabsContentDirective`, which associates the panel with its trigger
 * by `value`, sets `role=tabpanel` / `aria-labelledby` / `tabindex=0`, and
 * toggles the `hidden` attribute when its tab isn't selected.
 *
 * A11y addition over the registry string (WCAG 2.4.7, post-audit 2026-06-11):
 * the registry ships `outline-none` on the panel, but radix-ng makes it
 * `tabindex=0` (keyboard-focusable when you Tab past the tablist) — bare
 * `outline-none` would leave a focused panel with no visible indicator. We add
 * the same focus treatment the trigger uses (`border-ring` + `ring-ring/50`,
 * the DS `custom/outline` focus signal) with a transparent resting border so
 * focus adds no layout shift. Figma models only the trigger, not the panel, so
 * this is a code-only affordance with no Figma divergence.
 */
@Component({
  selector: '[uiTabsContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxTabsContentDirective,
      inputs: ['value'],
    },
  ],
  host: {
    'data-slot': 'tabs-content',
    '[class]': 'classes()',
  },
})
export class TabsContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  // Enter animation over the registry string (code-only, motion-reduce guarded —
  // Figma static variants don't model motion, so no Figma divergence): the panel
  // is always in the DOM (radix toggles the `hidden` attribute, not *ngIf), and
  // its `data-state` flips to `active` on selection, so a `data-active:` enter
  // animation plays each time a tab is shown. A subtle fade + 4px rise at the
  // spec fast duration (150ms) — `slide-in-from-bottom-1` is a transform (no
  // layout shift). `motion-reduce:animate-none` honours prefers-reduced-motion
  // (WCAG 2.3.3).
  protected readonly classes = computed(() =>
    cn(
      'flex-1 rounded-md border border-transparent text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-1 data-active:duration-150 motion-reduce:animate-none',
      this.className(),
    ),
  );
}
