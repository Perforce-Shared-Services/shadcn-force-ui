import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxAccordionRootDirective } from '@radix-ng/primitives/accordion';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/accordion (radix-force-ui style) — root.
 *
 * Attribute selector — usage:
 *   <div uiAccordion type="single" collapsible>
 *     <div uiAccordionItem value="item-1">
 *       <h3 uiAccordionTrigger>Is it accessible?</h3>
 *       <div uiAccordionContent>Yes. It adheres to WAI-ARIA.</div>
 *     </div>
 *   </div>
 *
 * Behaviour (open/close, single/multiple, keyboard nav, aria) comes from
 * `@radix-ng/primitives` — the cross-framework analogue of radix-ui that the
 * React source builds on. The class strings are copied verbatim from the
 * published registry JSON; parity with the registry is the contract.
 */
@Component({
  selector: '[uiAccordion]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxAccordionRootDirective,
      inputs: ['type', 'value', 'defaultValue', 'collapsible', 'disabled', 'orientation', 'dir', 'id'],
      outputs: ['valueChange', 'onValueChange'],
    },
  ],
  host: {
    'data-slot': 'accordion',
    '[class]': 'classes()',
  },
})
export class AccordionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn('flex w-full flex-col', this.className()));
}
