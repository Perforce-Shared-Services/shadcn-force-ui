import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RdxNavigationMenuIndicatorDirective } from '@radix-ng/primitives/navigation-menu';

import { cn } from '@/app/lib/utils';

/**
 * Indicator class — verbatim from the `@force-ui/navigation-menu` registry
 * string. Unlike trigger/content, no `data-open`/`data-closed` bridge is
 * needed: the registry references `data-[state=visible]` / `data-[state=hidden]`
 * literally, and `RdxNavigationMenuIndicatorDirective` already emits exactly
 * that `data-state` value pair itself (its own host bindings), so the classes
 * fire unmodified.
 */
const NAVIGATION_MENU_INDICATOR_CLASS =
  'top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in motion-reduce:animate-none';

export { NAVIGATION_MENU_INDICATOR_CLASS };

/**
 * Angular port of @force-ui/navigation-menu's `NavigationMenuIndicator` — the
 * small rotated-square caret that tracks the currently open trigger. Place as
 * a direct sibling of the `[uiNavigationMenuItem]`s, inside
 * `[uiNavigationMenuList]`.
 *
 * UPSTREAM BUG (confirmed live in Storybook, documented not patched):
 * `RdxNavigationMenuIndicatorDirective.updatePosition()` reads the active
 * trigger's raw `offsetLeft`/`offsetWidth` and assumes that's relative to the
 * list track. It isn't, once anything between the trigger and the track sets
 * `position: relative` — `offsetLeft` is relative to the nearest positioned
 * ancestor (`offsetParent`), and `[uiNavigationMenuItem]`'s own class is
 * `relative` (registry-verbatim, needed for consumers to absolutely-position
 * content inside an item). Every trigger's `offsetParent` ends up being its
 * own `<li>`, so `offsetLeft` reads `0` for all of them and the indicator
 * never slides — confirmed via `trigger.offsetParent` in a live page (each
 * resolves to its own item, not the shared track). Not worth patching:
 * fixing it means overriding `updatePosition()` in a way that would break as
 * soon as radix-ng revises its internals. Consumers who need a working
 * indicator can override the item class to `static`/`contents` (only a loss
 * if that item also needs to anchor an absolutely-positioned child).
 *
 * KNOWN WCAG GAP (audit finding, not fixed — routes back through Figma before
 * any visual change, since it compounds with the non-sliding bug above): the
 * caret is `bg-border` on `bg-popover`, which measures ~1.2:1 contrast in
 * light mode and ~1.5:1 in dark — both fail the 3:1 minimum for a graphical
 * UI component (WCAG 1.4.11), and `shadow-md` is used where the design
 * system's border-vs-shadow rule calls for a border on an inline, non-floating
 * marker like this one. Left unfixed for now because (a) a color/border swap
 * here is a visual change that should go through `sync-figma-component`
 * rather than being invented in code, and (b) with the position bug above
 * still open, the indicator is already non-functional in practice — a
 * contrast fix alone wouldn't restore its usefulness as an open-state signal.
 * The trigger's own `data-open:bg-muted/50` fill remains the actual open-state
 * cue in the meantime.
 */
@Component({
  selector: '[uiNavigationMenuIndicator]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxNavigationMenuIndicatorDirective, inputs: ['forceMount'] }],
  host: {
    'data-slot': 'navigation-menu-indicator',
    '[class]': 'classes()',
  },
  template: `<div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"></div>`,
})
export class NavigationMenuIndicatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_INDICATOR_CLASS, this.className()),
  );
}
