import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxCollapsibleContentDirective } from '@radix-ng/primitives/collapsible';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/collapsible (radix-force-ui style) — content.
 *
 * Hosts `RdxCollapsibleContentDirective`, which sets `id` (matching the root's
 * `contentId`), toggles `hidden="until-found"` when collapsed (find-in-page
 * still reaches the text), and measures the panel into the
 * `--radix-collapsible-content-{width,height}` custom properties so callers can
 * drive a height animation.
 *
 * The registry content carries no Tailwind classes. `class` funnels through cn()
 * so callers add spacing/animation. radix-ng emits the radix-ui `data-state`
 * convention, which the Force UI `data-open:` / `data-closed:` custom variants
 * (in tailwind.css) already match — so `data-open:animate-*` fires unchanged
 * with no bridge attribute needed.
 *
 * Height footgun: if a consumer binds their content height to
 * `--radix-collapsible-content-height`, note the self-referential measurement
 * loop documented in `ui/accordion/accordion-content.component.ts` ("PARITY
 * BRIDGE 2") — radix-ng measures the host's own rect into that var, so a host
 * that hugs an inner div bound to the same var can latch a clipped height. The
 * accordion drops the inner `h-(...)`; `overflow-hidden` + the measured var still
 * drive the animation.
 */
@Component({
  selector: '[uiCollapsibleContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxCollapsibleContentDirective],
  host: {
    'data-slot': 'collapsible-content',
    '[class]': 'classes()',
  },
})
export class CollapsibleContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn(this.className()));
}
