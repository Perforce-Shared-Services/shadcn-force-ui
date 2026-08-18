import { computed, Directive, input } from '@angular/core';
import { RdxNavigationMenuListDirective } from '@radix-ng/primitives/navigation-menu';

import { cn } from '@/app/lib/utils';

/** List class — verbatim from the `@force-ui/navigation-menu` registry string. */
const NAVIGATION_MENU_LIST_CLASS = 'group flex flex-1 list-none items-center justify-center gap-0';

export { NAVIGATION_MENU_LIST_CLASS };

/**
 * Angular port of @force-ui/navigation-menu's `NavigationMenuList`.
 *
 * `RdxNavigationMenuListDirective` (host directive) gives it `role="menubar"`
 * and roving left/right arrow-key focus between `[uiNavigationMenuItem]`
 * children, and — for the root menu — wraps itself in a positioning `div` used
 * to anchor `[uiNavigationMenuIndicator]`.
 */
@Directive({
  selector: '[uiNavigationMenuList]',
  standalone: true,
  hostDirectives: [RdxNavigationMenuListDirective],
  host: {
    'data-slot': 'navigation-menu-list',
    '[class]': 'classes()',
  },
})
export class NavigationMenuListDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(NAVIGATION_MENU_LIST_CLASS, this.className()));
}
