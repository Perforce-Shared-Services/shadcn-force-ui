import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { buttonVariants } from '@/app/ui/button';

import { PAGINATION_NEXT_SVG } from './pagination.icons';

/**
 * Angular port of @force-ui/pagination (radix-force-ui style) — "Next"
 * control. Mirror of `PaginationPreviousComponent` — see its doc-comment for
 * the `data-slot`/composition rationale. `pr-1.5!` nudge (vs `pl-1.5!`) since
 * the icon trails the text.
 */
@Component({
  selector: '[uiPaginationNext]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'pagination-link',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'classes()',
  },
  template: `
    <span class="hidden sm:block">{{ text() }}</span>
    <span data-icon="inline-end" aria-hidden="true" class="cn-rtl-flip" [innerHTML]="icon"></span>
  `,
})
export class PaginationNextComponent {
  readonly text = input('Next');
  readonly ariaLabel = input<string>('Go to next page', { alias: 'aria-label' });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    PAGINATION_NEXT_SVG,
  );

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'default' }),
      'pr-1.5!',
      'motion-reduce:transition-none',
      this.className(),
    ),
  );
}
