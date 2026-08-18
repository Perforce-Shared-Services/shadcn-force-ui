import { computed, Directive, input } from '@angular/core';
import { RdxNavigationMenuLinkDirective } from '@radix-ng/primitives/navigation-menu';

import { cn } from '@/app/lib/utils';

/**
 * Link class — verbatim from the `@force-ui/navigation-menu` registry string.
 *
 * No `data-active:` bridge needed (unlike trigger/content, which only get
 * `data-state`): radix-ng's link already emits `[attr.data-active]` as a real
 * boolean attribute from its own `active` input.
 *
 * `motion-reduce:transition-none` appended over the registry string (WCAG
 * 2.3.3); the registry's own `transition-all` is otherwise kept verbatim.
 */
const NAVIGATION_MENU_LINK_CLASS =
  'flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted motion-reduce:transition-none [&_svg:not([class*="size-"])]:size-4';

export { NAVIGATION_MENU_LINK_CLASS };

/**
 * Angular port of @force-ui/navigation-menu's `NavigationMenuLink` — a plain
 * navigational anchor rendered inside `[uiNavigationMenuContent]`, or as a
 * top-level item with no dropdown (composed with `navigationMenuTriggerStyle`
 * from `navigation-menu-trigger.component` in that case).
 *
 * `role="menuitem"` (WCAG/WAI-ARIA fix, confirmed via axe — see the matching
 * note on `[uiNavigationMenuItem]`): required both as a direct child of the
 * `role="menubar"` list (top-level plain link) and inside a
 * `[uiNavigationMenuContent]` panel (`role="menu"`, set by radix-ng via
 * `RdxNavigationMenuContentDirective`'s viewport registration) — neither
 * container role permits a bare, role-less link as an owned element.
 */
@Directive({
  selector: '[uiNavigationMenuLink]',
  standalone: true,
  hostDirectives: [{ directive: RdxNavigationMenuLinkDirective, inputs: ['active', 'onSelect'] }],
  host: {
    'data-slot': 'navigation-menu-link',
    role: 'menuitem',
    '[class]': 'classes()',
  },
})
export class NavigationMenuLinkDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() => cn(NAVIGATION_MENU_LINK_CLASS, this.className()));
}
