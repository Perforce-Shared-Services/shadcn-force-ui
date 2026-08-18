import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/button-group's `ButtonGroupText` — a static,
 * non-interactive label/badge slot that sits between or alongside grouped
 * buttons (e.g. a page-count readout between prev/next buttons).
 *
 * Attribute selector — host stays whatever element the caller writes
 * (Angular's answer to the registry's `asChild`):
 *   <div uiButtonGroupText>1 of 12</div>
 *
 * DEVIATIONS FROM REGISTRY-VERBATIM (both documented):
 * - `border` → `border border-border`: a bare `border` resolves to
 *   `currentColor` in this app (no global `* { border-color: var(--border) }`
 *   — see the port skill's §8 gotcha).
 * - added `[&_svg]:fill-current`: this app's icon strategy renders icons as
 *   raw inline Material Symbols `<svg>` with no `fill` attribute, so any
 *   component styling a projected `<svg>` child needs this to inherit text
 *   colour instead of painting black (same rule as `ui/button`/`ui/badge`).
 */
@Component({
  selector: '[uiButtonGroupText]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'button-group-text',
    '[class]': 'classes()',
  },
})
export class ButtonGroupTextComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      "flex items-center gap-2 rounded-md border border-border bg-muted px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4",
      this.className(),
    ),
  );
}
