import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxNavigationMenuViewportDirective } from '@radix-ng/primitives/navigation-menu';

import { cn } from '@/app/lib/utils';

/**
 * Viewport class — verbatim from the `@force-ui/navigation-menu` registry
 * string, minus the `data-open`/`data-closed` bridge already covered: the
 * registry references `data-[state=open]`/`data-[state=closed]` directly
 * (via `data-open:`/`data-closed:` in the source, which — same as the
 * indicator — map onto `RdxNavigationMenuViewportDirective`'s own emitted
 * `data-state`, needing no local override) and `w-(--radix-navigation-menu-
 * viewport-width)` / the implicit height var, both of which radix-ng's
 * viewport directive writes as inline CSS custom properties on this same host
 * element — so those two arbitrary-value classes resolve unmodified too.
 */
const NAVIGATION_MENU_VIEWPORT_CLASS =
  'origin-top-center relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10 duration-100 md:w-(--radix-navigation-menu-viewport-width) data-open:animate-in data-open:zoom-in-90 data-closed:animate-out data-closed:zoom-out-90 motion-reduce:animate-none';

export { NAVIGATION_MENU_VIEWPORT_CLASS };

/**
 * Internal-only selector for the inner styled panel — never written by a
 * consumer directly (see the exported component's doc below: only the outer
 * `[uiNavigationMenuViewport]` is part of the public API), so it's free to use
 * its own name without colliding with the outer, tag-unqualified attribute
 * selector.
 */
@Component({
  selector: '[uiNavigationMenuViewportPanel]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxNavigationMenuViewportDirective, inputs: ['forceMount'] }],
  host: {
    'data-slot': 'navigation-menu-viewport',
    '[class]': 'classes()',
  },
  template: '',
})
class NavigationMenuViewportPanelComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_VIEWPORT_CLASS, this.className()),
  );
}

/**
 * Angular port of @force-ui/navigation-menu's `NavigationMenuViewport`.
 *
 * Registry shape kept: an outer plain positioning `<div>` (the host of this
 * component — `absolute top-full left-0 isolate z-50 flex justify-center`,
 * no Force UI tokens of its own) wrapping the inner styled viewport `<div>`
 * that hosts `RdxNavigationMenuViewportDirective`. The inner directive is the
 * one every `[uiNavigationMenuContent]` panel is portalled into (skill note
 * in `navigation-menu-content.component.ts`).
 *
 * PARITY GAP: same as the root — `viewport=false` (rendering content inline
 * under its trigger instead) has no radix-ng code path, so this component is
 * effectively required whenever any `[uiNavigationMenuItem]` has a trigger +
 * content pair.
 */
@Component({
  selector: '[uiNavigationMenuViewport]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationMenuViewportPanelComponent],
  host: {
    class: 'absolute top-full left-0 isolate z-50 flex justify-center',
  },
  template: `<div uiNavigationMenuViewportPanel></div>`,
})
export class NavigationMenuViewportComponent {}
