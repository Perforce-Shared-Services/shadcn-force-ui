import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { buttonVariants, type ButtonSize } from '@/app/ui/button';

/**
 * Angular port of @force-ui/pagination (radix-force-ui style) — page link.
 *
 * Attribute selector — write it on the element you want (`<a uiPaginationLink
 * href="…">`). The registry composes this as `<Button asChild>` wrapping an
 * `<a>`; Angular's attribute selector replaces that `asChild`/`Slot` branch
 * directly, so this reuses the ALREADY-PORTED `buttonVariants` cva (not a
 * pasted class string) — the same reuse the registry itself expresses via
 * composition. `isActive` selects the `outline` (current page) vs `ghost`
 * (other pages) button variant; size defaults to `icon` (a single page
 * number), matching the registry default.
 *
 * `motion-reduce:transition-none` guards `buttonVariants`' inherited
 * `transition-all` (WCAG 2.3.3) — the same guard `breadcrumb-link` applies to
 * its own class string; `buttonVariants` itself doesn't carry it yet
 * (pre-existing, DS-wide gap, out of scope here).
 */
@Component({
  selector: '[uiPaginationLink]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'pagination-link',
    '[attr.data-active]': 'isActive()',
    '[attr.aria-current]': 'isActive() ? "page" : null',
    '[class]': 'classes()',
  },
})
export class PaginationLinkComponent {
  readonly isActive = input(false, { transform: booleanAttribute });
  readonly size = input<ButtonSize>('icon');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.isActive() ? 'outline' : 'ghost', size: this.size() }),
      'motion-reduce:transition-none',
      this.className(),
    ),
  );
}
