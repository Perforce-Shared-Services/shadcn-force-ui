import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxAccordionItemDirective } from '@radix-ng/primitives/accordion';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/accordion (radix-force-ui style) — item.
 *
 * Hosts `RdxAccordionItemDirective`, which is itself a collapsible root, so
 * the trigger and content rendered inside it resolve their open/closed state
 * from this element. `value` is required and must be unique within the
 * accordion.
 */
@Component({
  selector: '[uiAccordionItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxAccordionItemDirective,
      inputs: ['value', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'accordion-item',
    '[class]': 'classes()',
  },
})
export class AccordionItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  // `border-border` is explicit here: the registry relies on shadcn's global
  // `* { border-color: var(--border) }` base rule, which this app does not set —
  // Tailwind v4 defaults the border color to `currentColor`, which would render
  // the divider near-black instead of the Force UI `base/border` grey. The repo
  // convention (see button outline) is to name `border-border` explicitly.
  protected readonly classes = computed(() =>
    cn('border-border not-last:border-b', this.className()),
  );
}
