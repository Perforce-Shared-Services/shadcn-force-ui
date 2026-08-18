import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxAccordionHeaderDirective, RdxAccordionTriggerDirective } from '@radix-ng/primitives/accordion';

import { cn } from '@/app/lib/utils';
import { ACCORDION_TRIGGER_SVG } from './accordion.icons';

/**
 * Angular port of @force-ui/accordion (radix-force-ui style) — trigger.
 *
 * The React source renders `<AccordionPrimitive.Header className="flex">`
 * wrapping the trigger button. We reproduce that exactly: the host element
 * is the header (carries `rdxAccordionHeader` + `flex`) and the projected
 * label plus the chevron icons live inside the trigger `<button>`.
 *
 * `class` flows to the button (not the header), matching where the React
 * `className` prop lands. A single chevron (inline Material Symbols `<svg>`,
 * imported in `accordion.icons.ts` and injected via `[innerHTML]`) rotates
 * 180deg off the button's `aria-expanded` state via the `group/accordion-trigger`
 * group (radix-ng's collapsible trigger sets `aria-expanded`). This is a
 * post-audit divergence from the registry's two-chevron (down/up) swap — see the
 * `classes` note.
 */
@Component({
  selector: '[uiAccordionTrigger]',
  standalone: true,
  imports: [RdxAccordionTriggerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxAccordionHeaderDirective],
  host: {
    'data-slot': 'accordion-header',
    '[class]': "'flex'",
  },
  template: `
    <button
      rdxAccordionTrigger
      type="button"
      data-slot="accordion-trigger"
      [class]="classes()"
    >
      <span class="group-hover/accordion-trigger:underline"><ng-content /></span>
      <span
        class="pointer-events-none inline-flex shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 motion-reduce:transition-none [&>svg]:size-5 [&>svg]:fill-current"
        data-slot="accordion-trigger-icon"
        aria-hidden="true"
        [innerHTML]="triggerIcon"
      ></span>
    </button>
  `,
})
export class AccordionTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /**
   * Sanitizer-trusted inline SVG chevron — single swap-point. The markup is
   * bundled from `@material-symbols/svg-400` at build time (trusted, static), so
   * bypassing the sanitizer is safe and necessary (Angular's HTML sanitizer
   * strips `<svg>` from `[innerHTML]`).
   */
  protected readonly triggerIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    ACCORDION_TRIGGER_SVG,
  );

  // Base string follows the Force UI registry with documented divergences. The
  // trailing group is a post-audit enhancement (2026-06-07, synced to Figma
  // 22:516): E1 the chevron shifts muted -> foreground when the item is open;
  // motion-reduce guards the chevron rotate. The single rotating chevron (E3)
  // lives in the template, replacing the registry's two-chevron swap. The icon
  // colour rides on `text-muted-foreground` -> `text-foreground` (open); the
  // chevron `<svg>` inherits it via `[&>svg]:fill-current` (the Material Symbols
  // SVGs carry no `fill` attribute). The registry's `hover:underline` is scoped
  // off the button onto a label-only wrapper span
  // (`group-hover/accordion-trigger:underline` in the template) so it never
  // reaches the chevron.
  protected readonly classes = computed(() =>
    cn(
      "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:text-base **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
      'motion-reduce:transition-none group-aria-expanded/accordion-trigger:**:data-[slot=accordion-trigger-icon]:text-foreground',
      this.className(),
    ),
  );
}
