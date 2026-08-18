import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RdxAvatarRootDirective } from '@radix-ng/primitives/avatar';

import { cn } from '@/app/lib/utils';

/** Size axis — drives the `data-size` attribute the class string keys off. */
export type AvatarSize = 'default' | 'sm' | 'lg';

/**
 * Base class string — verbatim from the @force-ui/avatar registry item
 * (radix-force-ui style). No cva: the registry source ships a single className
 * with the size handled by `data-[size=…]:` variants off the `data-size`
 * attribute, so the size axis is an attribute binding, not a class switch.
 *
 * The `after:` pseudo-element is the subtle inner ring (`after:border
 * after:border-border` — explicit colour, so §8's bare-border caveat does not
 * apply) with `mix-blend-darken` / `dark:mix-blend-lighten` so it reads on any
 * underlying image without a hard line.
 */
const AVATAR_BASE_CLASS =
  'group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten';

/**
 * Angular port of @force-ui/avatar (radix-force-ui style) — root.
 *
 * Attribute selector on a `<span>` — Angular's idiomatic answer to React's
 * `Avatar.Root`. The host MUST be a `<span>`: `RdxAvatarRootDirective` (applied
 * as a host directive) provides the `AVATAR_ROOT_CONTEXT` that the projected
 * `<img uiAvatarImage>` and `<span uiAvatarFallback>` read to coordinate the
 * image-load → fallback hand-off.
 *
 * Usage:
 *   <span uiAvatar>
 *     <img uiAvatarImage src="…" alt="Ada Lovelace" />
 *     <span uiAvatarFallback>AL</span>
 *   </span>
 *
 * `size` is `default` | `sm` | `lg`, surfaced as `data-size` for the registry's
 * `data-[size=…]:` rules and inherited by `uiAvatarBadge` via the `group/avatar`
 * scope.
 *
 * Accessibility: the image carries the accessible name (`alt`); the fallback is
 * decorative shorthand. When no image is present, give a text fallback that
 * conveys identity (initials), and label any status `uiAvatarBadge` glyph.
 */
@Component({
  selector: 'span[uiAvatar]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxAvatarRootDirective],
  host: {
    'data-slot': 'avatar',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
})
export class AvatarComponent {
  readonly size = input<AvatarSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(AVATAR_BASE_CLASS, this.className()),
  );
}
