import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/avatar (radix-force-ui style) — group.
 *
 * Overlapping cluster of avatars (`-space-x-2`). The `*:data-[slot=avatar]:`
 * rules give every child avatar a `ring-2 ring-background` so the overlap reads
 * as separated discs. Pair with `uiAvatarGroupCount` for the "+N" overflow.
 *
 * Usage:
 *   <div uiAvatarGroup>
 *     <span uiAvatar>…</span>
 *     <span uiAvatar>…</span>
 *     <div uiAvatarGroupCount>+3</div>
 *   </div>
 *
 * The group's size is set by the avatars' own `size` — set the same `size` on
 * each child so they align; the count derives its size from the group's
 * `group-has-data-[size=…]` scope.
 */
@Component({
  selector: 'div[uiAvatarGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'avatar-group',
    '[class]': 'classes()',
  },
})
export class AvatarGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
      this.className(),
    ),
  );
}
