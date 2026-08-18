import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/avatar (radix-force-ui style) — group count.
 *
 * The "+N" overflow chip that closes an `uiAvatarGroup`. A plain `<div>`
 * decorator that mirrors the avatar's muted disc and derives its size from the
 * group's `group-has-data-[size=…]/avatar-group` scope, so it matches whatever
 * size the sibling avatars use.
 *
 * Usage (last child of `<div uiAvatarGroup>`): <div uiAvatarGroupCount>+3</div>
 *
 * Content is a short count (e.g. "+3") or a small `<svg>` glyph. When it stands
 * in for hidden collaborators, ensure the surrounding context still names them
 * (e.g. a tooltip or list) so the count is not the only affordance — and give a
 * descriptive `aria-label` (e.g. "3 more people") since "+3" alone lacks
 * context for a screen reader. The host is a plain `<div>`, so a native
 * `aria-label` flows through directly.
 *
 * `[&>svg]:fill-current` is added to the registry string (port-shadcn §9): a
 * projected fill-based Material Symbols `<svg>` then inherits the muted text
 * colour instead of painting black.
 *
 * Inner-ring parity (documented deviation): the registry count chip ships only
 * the `ring-2 ring-background` separation ring, no disc-defining edge — so on a
 * solid surface it reads as a flat muted disc next to the grouped avatars,
 * which DO carry the Avatar-root `after:border-border` edge (same `bg-muted`
 * fill as a fallback avatar). The same `after:` inner border + mix-blend is
 * mirrored here so the "+N" chip's edge matches the sibling discs exactly. The
 * count chip is a code-only construct (not modelled in the Figma Avatar Group),
 * so there is nothing to diverge from.
 */
@Component({
  selector: 'div[uiAvatarGroupCount]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'avatar-group-count',
    '[class]': 'classes()',
  },
})
export class AvatarGroupCountComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 [&>svg]:fill-current group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
      this.className(),
    ),
  );
}
