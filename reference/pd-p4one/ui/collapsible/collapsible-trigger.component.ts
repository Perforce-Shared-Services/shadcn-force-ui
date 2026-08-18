import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/collapsible (radix-force-ui style) — trigger.
 *
 * Hosts `RdxCollapsibleTriggerDirective`, which wires the click toggle and sets
 * `aria-controls`, `aria-expanded`, `data-state`, `data-disabled`, and native
 * `disabled` on the host. Apply to a `<button type="button">` so the native
 * `disabled` attribute takes effect and keyboard activation is free.
 *
 * The registry trigger carries no Tailwind classes; `class` funnels through
 * cn() so callers control layout (e.g. `flex w-full items-center justify-between`).
 *
 * This primitive is intentionally icon-less. A consumer that wants a reusable
 * chevron should follow the swap-point pattern in `ui/accordion/accordion.icons.ts`
 * (a `<name>.icons.ts` exporting the raw inline SVG, injected via `[innerHTML]` +
 * `DomSanitizer`) rather than inlining an `<svg>` string per usage site.
 */
@Component({
  selector: '[uiCollapsibleTrigger]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxCollapsibleTriggerDirective],
  host: {
    'data-slot': 'collapsible-trigger',
    '[class]': 'classes()',
  },
})
export class CollapsibleTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn(this.className()));
}
