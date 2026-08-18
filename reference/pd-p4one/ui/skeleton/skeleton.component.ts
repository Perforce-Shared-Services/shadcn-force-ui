import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/skeleton (radix-force-ui style).
 *
 * Attribute selector — usage:
 *   <div uiSkeleton class="h-4 w-48"></div>
 *   <div uiSkeleton class="h-12 w-12 rounded-full"></div>  ← avatar
 *   <div uiSkeleton class="h-32 w-full rounded-lg"></div>  ← block / card
 *
 * The component ships `rounded-md` as the default radius. Pass a radius
 * override via `class` to match the shape being replaced:
 *   - text / heading lines → `rounded-sm` (spec `--force-radius-sm`, 4px)
 *   - circles / avatars    → `rounded-full`
 *   - block inside a card  → `rounded-lg` (spec `--force-radius-card`)
 *
 * Accessibility:
 * - Individual skeletons are hidden from assistive technology (`aria-hidden`).
 *   They are purely visual; screen readers gain nothing from hearing each one.
 * - The SEMANTIC "content is loading" state belongs on the CONTAINER via
 *   `aria-busy="true"` (removed when real content arrives).
 * - Announce loading/loaded state via a visually-hidden `aria-live="polite"`
 *   region elsewhere — NOT on the skeleton itself.
 */
@Component({
  selector: '[uiSkeleton]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'skeleton',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
})
export class SkeletonComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('animate-pulse rounded-md bg-muted motion-reduce:animate-none', this.className()),
  );
}
