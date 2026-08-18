import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/avatar (radix-force-ui style) — badge.
 *
 * A status dot anchored to the avatar's bottom-right (e.g. online presence). No
 * radix primitive — a plain `<span>` decorator. Reads the root's
 * `group/avatar` scope so its size and inner glyph size track the avatar size.
 * The `ring-2 ring-background` cuts it out from the avatar edge.
 *
 * Usage (must be a child of `<span uiAvatar>` for the size rules to apply):
 *   <span uiAvatar>
 *     …
 *     <span uiAvatarBadge class="bg-green-500" aria-label="Online"></span>
 *   </span>
 *
 * Accessibility: the badge conveys status by colour/shape only — give it an
 * `aria-label` (e.g. "Online") so the state is not colour-alone (WCAG 1.4.1),
 * or pair it with text elsewhere. The host is a plain `<span>`, so a native
 * `aria-label` attribute flows through directly.
 *
 * Icon colour: `[&>svg]:fill-current` is added to the registry string (a
 * documented deviation — see port-shadcn §9). The registry relies on lucide's
 * stroke-based glyphs inheriting `currentColor`; this app projects fill-based
 * Material Symbols `<svg>`, which paint black without it. With it, a projected
 * glyph inherits `text-primary-foreground` (white on the indigo dot).
 */
@Component({
  selector: 'span[uiAvatarBadge]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'avatar-badge',
    '[class]': 'classes()',
  },
})
export class AvatarBadgeComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none [&>svg]:fill-current',
      'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
      'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
      'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
      this.className(),
    ),
  );
}
