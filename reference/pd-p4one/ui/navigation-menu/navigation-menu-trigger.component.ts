import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxNavigationMenuTriggerDirective } from '@radix-ng/primitives/navigation-menu';

import { cn } from '@/app/lib/utils';
import { NAVIGATION_MENU_TRIGGER_CHEVRON_SVG } from './navigation-menu.icons';

/**
 * Trigger cva base — the standalone `navigationMenuTriggerStyle()` export from
 * the registry, reused verbatim by both `NavigationMenuTrigger` and any plain
 * link styled to match (e.g. a top-level item with no dropdown).
 *
 * PARITY BRIDGE (matches the `accordion`/`dropdown-menu`/`menubar` content
 * ports): the registry drives state off `data-popup-open:` / `data-open:`
 * custom variants, but radix-ng's trigger only emits `data-state="open"|"closed"`
 * — no boolean `data-open` attribute. We re-expose `data-open`/`data-closed`
 * from the trigger's own `open()` signal (below) so these classes fire.
 * `data-popup-open:` is dropped as redundant: in the registry string it always
 * paints the identical `bg-muted/50` treatment as `data-open:` (there is no
 * radix-ng concept of a distinct "popup" vs "menu" open state to tell them
 * apart), so keeping both would just be two copies of the same rule.
 *
 * `motion-reduce:transition-none` appended over the registry string (WCAG
 * 2.3.3), same as every other interactive port — the registry's own
 * `transition-all` is otherwise kept verbatim.
 *
 * `focus-visible:border-ring focus-visible:ring-[3px]` replaces the registry's
 * bare `focus-visible:outline-1` (audit finding, confirmed live): `outline-1`
 * with no explicit `outline-color` falls back to `currentColor`, not the ring
 * token, leaving an inconsistent, easy-to-miss focus signal. Copied verbatim
 * from the sibling `menubar` trigger's own already-audited fix
 * (`menubar-trigger.directive.ts`) for the identical "borderless control,
 * needs a real focus-visible signal" shape — same WCAG 2.4.7 gap, same fix.
 */
const NAVIGATION_MENU_TRIGGER_CLASS =
  'group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted motion-reduce:transition-none';

export { NAVIGATION_MENU_TRIGGER_CLASS as navigationMenuTriggerStyle };

/**
 * Angular port of @force-ui/navigation-menu's `NavigationMenuTrigger`.
 *
 * `RdxNavigationMenuTriggerDirective` (host directive) gives it
 * `role`/`aria-expanded`/`aria-controls`/`aria-haspopup`, hover-intent open
 * delay, keyboard entry into the panel, and roving-tabindex focus alongside
 * sibling triggers (via its own nested `RdxRovingFocusItemDirective`).
 *
 * `open()` is a plain (non-`@Input`) computed on the hostDirective instance,
 * so it's read via a self-injected reference rather than forwarded through
 * `hostDirectives.inputs`.
 *
 * UPSTREAM GOTCHA: `RdxNavigationMenuIndicatorDirective.findAndSetActiveTrigger()`
 * finds the open trigger with a raw `track.querySelectorAll('[rdxNavigationMenuTrigger]')`
 * — a literal DOM attribute lookup, not an Angular API — so it never sees our
 * renamed `[uiNavigationMenuTrigger]` selector. The static `rdxNavigationMenuTrigger`
 * host attribute below is an inert string added purely so that query matches;
 * it plays no other role (Angular directive matching happens against the
 * source template, not host-added attributes, so it can't cause a second
 * directive to attach).
 *
 * `role="menuitem"` (WCAG/WAI-ARIA fix, confirmed via axe — neither the
 * registry string nor `RdxNavigationMenuTriggerDirective` set a role): the
 * list's `role="menubar"` requires `menuitem`-rooted owned elements; see the
 * matching note on `[uiNavigationMenuItem]`.
 *
 * The chevron's size is set on the injected `<svg>` itself via `[&>svg]:size-3`
 * (skill §9 / the `accordion` precedent), never on the wrapping `<span>` — the
 * Material Symbols SVG carries its own `width`/`height` attributes, so sizing
 * only the span leaves the raw ~24px icon to overflow the trigger's row (seen
 * live: the chevron rendered oversized, poking out above/below the button).
 *
 * UPSTREAM GOTCHA: the Storybook a11y addon (axe) flags `aria-controls` on
 * this trigger as "Inconclusive" / `aria-valid-attr-value` — not a Violation.
 * `RdxNavigationMenuTriggerDirective`'s own host binding (`'[attr.aria-controls]':
 * 'contentId'`) points at the panel's id, but that id only exists in the DOM
 * once the panel has been mounted at least once — content is created lazily
 * into the shared `[uiNavigationMenuViewport]` on first open, per the
 * viewport-portal architecture documented on `navigation-menu-content.component.ts`.
 * Before a trigger's first open, `aria-controls` legitimately references
 * nothing yet, which is exactly what axe can't statically confirm. Not
 * patched: the binding lives inside radix-ng's compiled directive metadata,
 * not in this file, so removing/overriding it would mean fighting the host
 * directive's own host bindings rather than fixing something we wrote. Left
 * as-is because the actual disclosure semantics (`aria-expanded`,
 * `aria-haspopup="menu"`, both correctly present) don't depend on it — many
 * accessible disclosure-widget implementations treat `aria-controls` as
 * best-effort for exactly this "lazy target" reason.
 */
@Component({
  selector: 'button[uiNavigationMenuTrigger]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    { directive: RdxNavigationMenuTriggerDirective, inputs: ['disabled', 'openOnHover'] },
  ],
  host: {
    'data-slot': 'navigation-menu-trigger',
    rdxNavigationMenuTrigger: '',
    role: 'menuitem',
    '[class]': 'classes()',
    '[attr.data-open]': "open() ? '' : null",
    '[attr.data-closed]': "open() ? null : ''",
  },
  template: `
    <ng-content />
    <span
      class="relative top-px ml-1 inline-flex shrink-0 transition-transform duration-300 group-data-open/navigation-menu-trigger:rotate-180 motion-reduce:transition-none [&>svg]:size-3 [&>svg]:fill-current"
      data-slot="navigation-menu-trigger-icon"
      aria-hidden="true"
      [innerHTML]="chevronIcon"
    ></span>
  `,
})
export class NavigationMenuTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly hostTrigger = inject(RdxNavigationMenuTriggerDirective, { self: true });
  protected readonly open = computed(() => this.hostTrigger.open());

  protected readonly chevronIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    NAVIGATION_MENU_TRIGGER_CHEVRON_SVG,
  );

  protected readonly classes = computed(() =>
    cn(NAVIGATION_MENU_TRIGGER_CLASS, this.className()),
  );
}
