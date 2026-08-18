import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { buttonVariants } from '@/app/ui/button';

import { PAGINATION_PREVIOUS_SVG } from './pagination.icons';

/**
 * Angular port of @force-ui/pagination (radix-force-ui style) — "Previous"
 * control.
 *
 * Attribute selector on an `<a>`. The registry renders this as a
 * `PaginationLink` (`data-slot="pagination-link"`, never `data-active` /
 * `aria-current` since `isActive` is never passed to Previous/Next) with a
 * fixed `size="default"` + `ghost` variant, an extra `pl-1.5!` nudge, and its
 * own icon + text content — reproduced directly here (rather than composing
 * `[uiPaginationLink]`, since Angular cannot stack two `@Component`s on one
 * host) via the shared `buttonVariants` cva, the same reuse the registry
 * expresses via `<PaginationLink><Button>`.
 *
 * `motion-reduce:transition-none` guards `buttonVariants`' inherited
 * `transition-all` (WCAG 2.3.3) — see `pagination-link.component.ts` for the
 * rationale. `cn-rtl-flip` on the icon is a real Force UI utility name (not
 * yet defined in this app's `tailwind.css`) copied verbatim per the port
 * skill's rule for undefined-but-genuine `cn-*` classes — not a dead
 * reference to strip.
 */
@Component({
  selector: '[uiPaginationPrevious]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'pagination-link',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'classes()',
  },
  template: `
    <span data-icon="inline-start" aria-hidden="true" class="cn-rtl-flip" [innerHTML]="icon"></span>
    <span class="hidden sm:block">{{ text() }}</span>
  `,
})
export class PaginationPreviousComponent {
  readonly text = input('Previous');
  readonly ariaLabel = input<string>('Go to previous page', { alias: 'aria-label' });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    PAGINATION_PREVIOUS_SVG,
  );

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'default' }),
      'pl-1.5!',
      'motion-reduce:transition-none',
      this.className(),
    ),
  );
}
