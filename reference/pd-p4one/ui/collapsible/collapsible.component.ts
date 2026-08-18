import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxCollapsibleRootDirective } from '@radix-ng/primitives/collapsible';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/collapsible (radix-force-ui style) — root.
 *
 * Attribute selector — usage:
 *   <div uiCollapsible [(open)]="open" contentId="panel-1">
 *     <button uiCollapsibleTrigger type="button">Toggle</button>
 *     <div uiCollapsibleContent>Panel body</div>
 *   </div>
 *
 * The registry source (`collapsible.tsx`) is purely structural: three thin
 * wrappers over the radix `Collapsible` primitive with only `data-slot`
 * attributes and NO Tailwind classes. Accordion is built on top of this same
 * primitive. Behaviour (open/close, keyboard, aria, height measurement) comes
 * from `@radix-ng/primitives` collapsible — the cross-framework analogue of the
 * radix-ui primitive the React source uses.
 *
 * `contentId` is forwarded to the primitive (defaults to `''`); pass a stable id
 * so the trigger's `aria-controls` links to the content's `id` (WCAG 4.1.2).
 */
@Component({
  selector: '[uiCollapsible]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxCollapsibleRootDirective,
      inputs: ['open', 'disabled', 'contentId'],
      outputs: ['openChange', 'onOpenChange'],
    },
  ],
  host: {
    'data-slot': 'collapsible',
    '[class]': 'classes()',
  },
})
export class CollapsibleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  // Registry root carries no base class; `class` still funnels through cn() so
  // callers can style the container (e.g. `flex w-full flex-col gap-2`).
  protected readonly classes = computed(() => cn(this.className()));
}
