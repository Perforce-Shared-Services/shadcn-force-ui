import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  isDevMode,
} from '@angular/core';
import { RdxAspectRatioDirective } from '@radix-ng/primitives/aspect-ratio';

import { cn } from '@/app/lib/utils';

/** Elements the radix directive is meant to fill — a fill target should be one of these. */
const FILLABLE_TAGS = new Set(['IMG', 'VIDEO', 'CANVAS', 'PICTURE']);

/**
 * Angular port of @force-ui/aspect-ratio (radix-force-ui style).
 *
 * A leaf container primitive — no cva, no variants. The registry source is a
 * bare pass-through (`<AspectRatioPrimitive.Root data-slot="aspect-ratio"
 * {...props} />`); all sizing logic lives in the radix primitive itself.
 *
 * `RdxAspectRatioDirective` (host directive) sets `position: relative`,
 * `width: 100%`, and a computed `padding-bottom` on this host to reserve the
 * ratio's box, then absolutely positions the first projected child
 * (`ngAfterViewInit`, via `Renderer2`) to fill it. This collapses radix-ui
 * React's two-div structure (outer ratio box + inner absolute wrapper) into a
 * single host + one directly-styled child — a documented, intentional
 * simplification; the rendered box model is identical.
 *
 * Usage:
 *   <div uiAspectRatio [ratio]="16 / 9">
 *     <img class="size-full object-cover" src="…" alt="…" />
 *   </div>
 *
 * The filling `<img>` carries its own accessible name: use a descriptive `alt`
 * when the image conveys information (e.g. a version thumbnail used to tell
 * versions apart), or `alt=""` when it's purely decorative.
 *
 * `ratio` defaults to `1` (a square) when omitted, matching both the radix
 * primitive and the Force UI registry default.
 */
@Component({
  selector: 'div[uiAspectRatio]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxAspectRatioDirective,
      inputs: ['ratio'],
    },
  ],
  host: {
    'data-slot': 'aspect-ratio',
    '[class]': 'classes()',
  },
})
export class AspectRatioComponent implements AfterViewInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn(this.className()));

  ngAfterViewInit(): void {
    if (!isDevMode()) {
      return;
    }
    const content = this.elementRef.nativeElement.firstElementChild;
    if (content && !FILLABLE_TAGS.has(content.tagName)) {
      console.warn(
        `[uiAspectRatio] expected its first child to be one of ${[...FILLABLE_TAGS].join(', ')} ` +
          `(the element the directive absolutely-positions to fill the ratio box), got <${content.tagName.toLowerCase()}>. ` +
          'Wrap only the fill element (e.g. an <img>) as the direct child, or the wrong node gets positioned and may hide its content (including any accessible name).',
      );
    }
  }
}
