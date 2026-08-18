import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RdxAvatarImageDirective } from '@radix-ng/primitives/avatar';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/avatar (radix-force-ui style) — image.
 *
 * Attribute selector on an `<img>`. `RdxAvatarImageDirective` (host directive)
 * preloads `src`, drives `role="img"` + `[attr.src]`, and hides the element
 * until the load succeeds — so a broken/slow image reveals the fallback rather
 * than a broken-image glyph. `src`, `referrerPolicy`, and the
 * `onLoadingStatusChange` output are forwarded from the radix directive.
 *
 * Usage: <img uiAvatarImage src="…" alt="Ada Lovelace" />
 *
 * Accessibility: always pass a meaningful `alt` (the accessible name of the
 * avatar). The directive sets `role="img"`; `alt` remains the consumer's job.
 */
@Component({
  selector: 'img[uiAvatarImage]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxAvatarImageDirective,
      inputs: ['src', 'referrerPolicy'],
      outputs: ['onLoadingStatusChange'],
    },
  ],
  host: {
    'data-slot': 'avatar-image',
    '[class]': 'classes()',
  },
})
export class AvatarImageComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('aspect-square size-full rounded-full object-cover', this.className()),
  );
}
