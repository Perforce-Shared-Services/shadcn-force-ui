import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { BREADCRUMB_ELLIPSIS_SVG } from './breadcrumb.icons';

/**
 * Angular port of @force-ui/breadcrumb (radix-force-ui style) — ellipsis.
 *
 * Attribute selector on a `<span>`. Stands in for collapsed crumbs. Icon =
 * Material Symbols `more_horiz` via the `breadcrumb.icons.ts` swap-point
 * ([innerHTML] + DomSanitizer).
 *
 * A11y FIX over the registry (post-audit, WCAG 4.1.2): the registry puts
 * `aria-hidden="true"` on the HOST *and* an `sr-only` "More" inside — but
 * aria-hidden on the host hides its whole subtree, so the label never reaches
 * assistive tech (the collapsed range is announced as nothing). Corrected to the
 * proper decorative-icon pattern: `aria-hidden` sits on the icon wrapper (the
 * decorative glyph), the host stays `role=presentation` WITHOUT aria-hidden, and
 * the `sr-only` "More" is announced — signalling that crumbs were omitted. No
 * visual change, no Figma impact. (Interactivity, when needed, comes from
 * composing this inside the dropdown-menu trigger — the ellipsis stays a
 * presentational stand-in here, matching the registry.)
 *
 * DEVIATION (documented): registry sizes via `[&>svg]:size-4` (direct child);
 * the injected icon sits in a wrapper span, so sizing moves to that wrapper as
 * `[&_svg]:size-4`. `[&_svg]:fill-current` is the icon-strategy colour rule.
 */
@Component({
  selector: '[uiBreadcrumbEllipsis]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'breadcrumb-ellipsis',
    role: 'presentation',
    '[class]': 'classes()',
  },
  template: `
    <span class="inline-flex [&_svg]:size-4 [&_svg]:fill-current" aria-hidden="true" [innerHTML]="icon"></span>
    <span class="sr-only">More</span>
  `,
})
export class BreadcrumbEllipsisComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly icon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    BREADCRUMB_ELLIPSIS_SVG,
  );

  protected readonly classes = computed(() =>
    cn('flex size-5 items-center justify-center', this.className()),
  );
}
