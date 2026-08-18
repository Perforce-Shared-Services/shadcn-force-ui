import { computed, Directive, input } from '@angular/core';
import { RdxNavigationMenuItemDirective } from '@radix-ng/primitives/navigation-menu';

import { cn } from '@/app/lib/utils';

/** Item class — verbatim from the `@force-ui/navigation-menu` registry string. */
const NAVIGATION_MENU_ITEM_CLASS = 'relative';

export { NAVIGATION_MENU_ITEM_CLASS };

/**
 * Angular port of @force-ui/navigation-menu's `NavigationMenuItem`.
 *
 * `value` identifies which item is open (`RdxNavigationMenuDirective`'s
 * context tracks the open item by value, not by index) — required whenever
 * the item hosts a `[uiNavigationMenuTrigger]` + content pair; a plain link
 * item (no trigger) can omit it.
 *
 * The static `rdxNavigationMenuItem` host attribute is the same inert-lookup
 * workaround as the trigger's (see its doc comment):
 * `RdxNavigationMenuIndicatorDirective` walks up via
 * `trigger.closest('[rdxNavigationMenuItem]')`, a raw DOM query for the
 * un-renamed selector.
 *
 * `role="none"` (WCAG/WAI-ARIA fix, confirmed via axe — neither the registry
 * string nor `RdxNavigationMenuItemDirective` set a role): the list's
 * `role="menubar"` requires its owned elements to carry `menuitem`, but the
 * item is typically an `<li>`, whose implicit `listitem` role isn't in that
 * allowed set. The WAI-ARIA Menu/Menubar pattern's own recommended fix is
 * `role="none"` on the wrapping `<li>` so it's excluded from the accessibility
 * tree and the `menuitem` role on the trigger/link inside satisfies menubar's
 * required-children check directly.
 */
@Directive({
  selector: '[uiNavigationMenuItem]',
  standalone: true,
  hostDirectives: [{ directive: RdxNavigationMenuItemDirective, inputs: ['value'] }],
  host: {
    'data-slot': 'navigation-menu-item',
    rdxNavigationMenuItem: '',
    role: 'none',
    '[class]': 'classes()',
  },
})
export class NavigationMenuItemDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(NAVIGATION_MENU_ITEM_CLASS, this.className()));
}
