import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/breadcrumb (radix-force-ui style) — link.
 *
 * Attribute selector — write it on the element you want (`<a uiBreadcrumbLink
 * href="…">` or `<button uiBreadcrumbLink>`). This replaces the React
 * `asChild`/`Slot` branch: the host stays whatever element the caller used, so
 * no slot indirection is needed. Class string copied verbatim from the registry
 * JSON; `motion-reduce:transition-none` added to guard the registry's
 * `transition-colors` (WCAG 2.3.3) — a sanctioned code-only addition.
 *
 * FOCUS RING (post-audit, WCAG 2.4.7): the registry gives the link NO
 * focus-visible ring (relies on the native outline, which the app globals can
 * suppress). The Figma component DOES define a Link/Focus state with
 * `custom/outline` (= `ring-ring/50`, radius `rounded-xs`), so adding the DS
 * focus ring aligns the code UP to Figma — not a divergence. Ring only (no
 * border) on an inline link so focus adds no layout shift.
 */
@Component({
  selector: '[uiBreadcrumbLink]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'breadcrumb-link',
    '[class]': 'classes()',
  },
})
export class BreadcrumbLinkComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'cursor-pointer rounded-xs transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none',
      this.className(),
    ),
  );
}
