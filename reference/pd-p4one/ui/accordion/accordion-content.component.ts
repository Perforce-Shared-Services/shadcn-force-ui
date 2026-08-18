import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import {
  injectAccordionItemContext,
  RdxAccordionContentDirective,
} from '@radix-ng/primitives/accordion';

/**
 * Angular port of @force-ui/accordion (radix-force-ui style) — content.
 *
 * Hosts `RdxAccordionContentDirective`, which (via the underlying collapsible
 * content) measures the panel and exposes its height as the
 * `--radix-accordion-content-height` custom property the inner `h-(...)` class
 * consumes, and toggles the `hidden` attribute when collapsed.
 *
 * PARITY BRIDGE 1: the Force UI class strings drive the open/close animation off
 * `data-open` / `data-closed` attributes, but radix-ng emits the radix-ui
 * convention `data-state="open|closed"`. We re-expose the boolean-style
 * `data-open` / `data-closed` attributes from the item's open state so the
 * `data-open:animate-accordion-down` / `data-closed:animate-accordion-up`
 * classes fire unchanged.
 *
 * PARITY BRIDGE 2: the registry inner div carries `h-(--radix-accordion-content-height)`.
 * Under radix-ui that var is measured independently of the rendered height, so it's
 * safe. radix-ng's collapsible instead measures the host's own getBoundingClientRect
 * and writes it back into that var — and the host hugs this inner div, so binding the
 * inner height to the same var forms a feedback loop. A transient small measurement
 * (e.g. taken while a sibling item is mid-collapse) latches and the panel never grows
 * back, clipping the content. We drop the self-referential height; the host's
 * `overflow-hidden` + the measured var still drive the accordion-down/up animation,
 * and the panel renders at its natural height when open.
 */
@Component({
  selector: '[uiAccordionContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxAccordionContentDirective],
  host: {
    'data-slot': 'accordion-content',
    class:
      'overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up motion-reduce:animate-none',
    '[attr.data-open]': "open() ? '' : null",
    '[attr.data-closed]': "open() ? null : ''",
  },
  template: `
    <div
      class="pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4"
    >
      <ng-content />
    </div>
  `,
})
export class AccordionContentComponent {
  private readonly itemContext = injectAccordionItemContext();

  protected readonly open = computed(() => this.itemContext?.open() ?? false);
}
