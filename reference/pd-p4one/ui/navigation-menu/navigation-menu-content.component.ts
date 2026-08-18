import { ChangeDetectionStrategy, Component, Directive, computed, inject, input } from '@angular/core';
import {
  RdxNavigationMenuContentDirective,
  RdxNavigationMenuItemDirective,
  injectNavigationMenu,
} from '@radix-ng/primitives/navigation-menu';

import { cn } from '@/app/lib/utils';

/**
 * Angular port of @force-ui/navigation-menu's `NavigationMenuContent`.
 *
 * TWO tags, not one — an upstream `@radix-ng/primitives` architecture
 * constraint, not a stylistic choice. `RdxNavigationMenuContentDirective`
 * injects `TemplateRef` in its constructor (it registers the template with
 * the root's viewport, which later calls `viewContainerRef.createEmbeddedView`
 * on it), so it MUST sit on a real `<ng-template>` — and Angular's compiler
 * rejects a `@Component` matched on `<ng-template>` (no host element to render
 * into). The styled panel is therefore a second, nested piece:
 *
 *   <ng-template uiNavigationMenuContent>
 *     <div uiNavigationMenuContent>...</div>
 *   </ng-template>
 *
 * Angular resolves the two by tag: `ng-template[uiNavigationMenuContent]` is
 * the inert behavioral anchor, `div[uiNavigationMenuContent]` is the actual
 * `NavigationMenuContent` — same attribute name at both call sites, one
 * concept to remember. The `<div>`'s embedded view is later moved into
 * `[uiNavigationMenuViewport]`'s DOM subtree, but Angular's `TemplateRef`
 * captures the injector at its DECLARATION point (same mechanism CDK overlay
 * portals rely on), so `inject(RdxNavigationMenuItemDirective)` below still
 * resolves to the enclosing `[uiNavigationMenuItem]` regardless of where the
 * rendered nodes end up in the DOM.
 *
 * PARITY GAP (documented, not patched): radix-ng's viewport wraps the embedded
 * view in its own bare `div.NavigationMenuContentWrapper` (created via
 * `Renderer2`, no class/attr hook we can extend) and puts `data-state` /
 * `data-motion` on THAT wrapper, not on our styled `<div>`. Tailwind can't
 * target an ancestor's data-attribute from a class list, so the registry's
 * `data-[motion=...]:slide-in-from-*` entrance/exit classes have no element to
 * attach to and are dropped rather than shipped as dead weight. In their
 * place we use the SAME bridge as `dropdown-menu`/`menubar`/`select` content
 * (a local `data-open`/`data-closed` derived from the item's own open state)
 * for a working fade+zoom, at the cost of the slide direction cue. The panel's
 * open/close itself is unaffected — that's driven by the viewport's own
 * mount/unmount of the embedded view, independent of this animation gap.
 */
@Directive({
  selector: 'ng-template[uiNavigationMenuContent]',
  standalone: true,
  hostDirectives: [{ directive: RdxNavigationMenuContentDirective, inputs: ['forceMount'] }],
})
export class NavigationMenuContentAnchorDirective {}

/** Content class — Force UI string minus the dead `data-[motion=...]` slide rules (see class doc). */
const NAVIGATION_MENU_CONTENT_CLASS =
  'w-full p-1 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 motion-reduce:animate-none **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none';

export { NAVIGATION_MENU_CONTENT_CLASS };

@Component({
  selector: 'div[uiNavigationMenuContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    'data-slot': 'navigation-menu-content',
    '[class]': 'classes()',
    '[attr.data-open]': "open() ? '' : null",
    '[attr.data-closed]': "open() ? null : ''",
  },
})
export class NavigationMenuContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly item = inject(RdxNavigationMenuItemDirective);
  private readonly context = injectNavigationMenu();
  // Independently derived from, but must stay equivalent to, the trigger's own
  // `open()` (navigation-menu-trigger.component.ts) — both express "is this
  // item's panel open" via different radix-ng-internal paths that happen to
  // agree today. If a future radix-ng version makes them diverge, trigger and
  // content would disagree on open state with no compiler-level signal.
  protected readonly open = computed(() => this.item.value() === this.context.value());

  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_CONTENT_CLASS, this.className()),
  );
}
