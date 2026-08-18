import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RdxAvatarFallbackDirective } from '@radix-ng/primitives/avatar';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/avatar (radix-force-ui style) — fallback.
 *
 * Attribute selector on a `<span>`. `RdxAvatarFallbackDirective` (host
 * directive) shows this only while the sibling image is not loaded, and
 * supports a `delayMs` so it doesn't flash for fast connections. Reads the
 * `AVATAR_ROOT_CONTEXT` provided by `uiAvatar`, so it MUST be projected inside
 * a `<span uiAvatar>`.
 *
 * Usage: <span uiAvatarFallback>AL</span>
 *
 * Content is the identity shorthand (initials) or a decorative glyph; the
 * `group-data-[size=sm]/avatar:text-xs` rule shrinks the text in the small
 * avatar via the root's `group/avatar` scope.
 */
@Component({
  selector: 'span[uiAvatarFallback]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxAvatarFallbackDirective,
      inputs: ['delayMs'],
    },
  ],
  host: {
    'data-slot': 'avatar-fallback',
    '[class]': 'classes()',
  },
})
export class AvatarFallbackComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs',
      this.className(),
    ),
  );
}
