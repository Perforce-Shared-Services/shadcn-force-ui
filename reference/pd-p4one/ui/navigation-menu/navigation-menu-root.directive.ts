import { booleanAttribute, computed, Directive, input } from '@angular/core';
import { RdxNavigationMenuDirective } from '@radix-ng/primitives/navigation-menu';

import { cn } from '@/app/lib/utils';

/**
 * Root class — verbatim from the `@force-ui/navigation-menu` registry string.
 */
const NAVIGATION_MENU_ROOT_CLASS =
  'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center';

export { NAVIGATION_MENU_ROOT_CLASS };

/**
 * Angular port of @force-ui/navigation-menu's `NavigationMenu` root.
 *
 * `RdxNavigationMenuDirective` (host directive) supplies `role="navigation"`,
 * `aria-label="Main"`, hover/click open-close timing, and the shared context
 * (`RDX_NAVIGATION_MENU_TOKEN`) every descendant part injects.
 *
 * PARITY GAP (documented, not patched): the registry conditionally renders its
 * own `<NavigationMenuViewport>` internally when `viewport` is true and falls
 * back to rendering each `NavigationMenuContent` inline under its trigger when
 * `viewport` is false. `@radix-ng/primitives/navigation-menu`'s content
 * directive only ever registers its `TemplateRef` with the root's
 * `onViewportContentChange` callback — there is no fallback inline-render path
 * — so content only ever appears when a `[uiNavigationMenuViewport]` is
 * present. Treat `viewport=false` as unsupported; always compose a viewport.
 * The `viewport` input and `data-viewport` attribute are still exposed for
 * registry-string parity (Tailwind's `group-data-[viewport=false]/navigation-menu:*`
 * selectors reference it), they just have no working code path behind them here.
 *
 * Usage:
 *   <nav uiNavigationMenu>
 *     <ul uiNavigationMenuList>
 *       <li uiNavigationMenuItem value="products">
 *         <button uiNavigationMenuTrigger>Products</button>
 *         <ng-template uiNavigationMenuContent>
 *           <div uiNavigationMenuContent>...</div>
 *         </ng-template>
 *       </li>
 *     </ul>
 *     <div uiNavigationMenuViewport></div>
 *   </nav>
 */
@Directive({
  selector: '[uiNavigationMenu]',
  standalone: true,
  hostDirectives: [
    {
      directive: RdxNavigationMenuDirective,
      inputs: [
        'orientation',
        'dir',
        'clickIgnoreDuration',
        'delayDuration',
        'skipDelayDuration',
        'loop',
      ],
    },
  ],
  host: {
    'data-slot': 'navigation-menu',
    '[attr.data-viewport]': 'viewport()',
    '[class]': 'classes()',
  },
})
export class NavigationMenuRootDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly viewport = input(true, { transform: booleanAttribute });

  protected readonly classes = computed(() => cn(NAVIGATION_MENU_ROOT_CLASS, this.className()));
}
