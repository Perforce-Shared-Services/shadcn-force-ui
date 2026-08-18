import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { BREADCRUMB_SEPARATOR_SVG } from './breadcrumb.icons';

/**
 * Angular port of @force-ui/breadcrumb (radix-force-ui style) — separator.
 *
 * Attribute selector on an `<li>`. Decorative (`role=presentation` +
 * `aria-hidden`). Mirrors the registry `children ?? <default chevron>`: anything
 * projected wins; otherwise the default Material Symbols `chevron_right` renders
 * (single swap-point in `breadcrumb.icons.ts`, injected via `[innerHTML]` +
 * DomSanitizer — the bypass is required because Angular's sanitizer strips
 * `<svg>` from a bound innerHTML, and safe because the markup is bundled+static).
 *
 * DEVIATION FROM REGISTRY-VERBATIM (documented): the registry sizes the icon
 * with `[&>svg]:size-3.5` (direct-child svg). Because the injected default icon
 * lives in a wrapper span (and projected content lands in a `display:contents`
 * wrapper), the host uses the descendant form `[&_svg]:size-3.5` so both the
 * default and a projected svg size uniformly. `[&_svg]:fill-current` is the
 * icon-strategy colour rule (Material Symbols svgs carry no fill attr).
 */
@Component({
  selector: '[uiBreadcrumbSeparator]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'breadcrumb-separator',
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
  template: `
    <span #content class="contents"><ng-content /></span>
    @if (showDefault()) {
      <span class="inline-flex translate-y-[2px]" [innerHTML]="defaultIcon"></span>
    }
  `,
})
export class BreadcrumbSeparatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly contentRef = viewChild.required<ElementRef<HTMLElement>>('content');
  protected readonly showDefault = signal(true);

  protected readonly defaultIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    BREADCRUMB_SEPARATOR_SVG,
  );

  protected readonly classes = computed(() =>
    cn('[&_svg]:size-3.5 [&_svg]:fill-current', this.className()),
  );

  constructor() {
    // Show the default chevron unless the caller projected a custom separator.
    // afterNextRender reads the projected DOM after the first paint (no NG0100),
    // browser-only so it never runs during SSR/prerender.
    afterNextRender(() => {
      const el = this.contentRef().nativeElement;
      const hasProjected = Array.from(el.childNodes).some(
        (n) => n.nodeType === Node.ELEMENT_NODE || (n.textContent?.trim() ?? '') !== '',
      );
      if (hasProjected) {
        this.showDefault.set(false);
      }
    });
  }
}
