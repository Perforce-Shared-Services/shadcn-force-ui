import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { PAGINATION_ELLIPSIS_SVG } from './pagination.icons';

/**
 * Angular port of @force-ui/pagination (radix-force-ui style) — ellipsis.
 *
 * Attribute selector on a `<span>`. Stands in for a run of collapsed pages.
 * Icon = Material Symbols `more_horiz` via the `pagination.icons.ts`
 * swap-point ([innerHTML] + DomSanitizer).
 *
 * A11y FIX over the registry (same defect class as the breadcrumb ellipsis,
 * WCAG 4.1.2): the registry puts `aria-hidden` on the HOST *and* an `sr-only`
 * "More pages" inside — but `aria-hidden` on the host hides its whole
 * subtree, so the label never reaches assistive tech. Corrected to the proper
 * decorative-icon pattern: `aria-hidden` sits on the icon wrapper only, the
 * host stays `role=presentation` WITHOUT `aria-hidden`, and the `sr-only`
 * "More pages" is announced.
 */
@Component({
  selector: '[uiPaginationEllipsis]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'pagination-ellipsis',
    role: 'presentation',
    '[class]': 'classes()',
  },
  template: `
    <span aria-hidden="true" [innerHTML]="icon"></span>
    <span class="sr-only">More pages</span>
  `,
})
export class PaginationEllipsisComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    PAGINATION_ELLIPSIS_SVG,
  );

  protected readonly classes = computed(() =>
    cn(
      "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4 [&_svg]:fill-current",
      this.className(),
    ),
  );
}
