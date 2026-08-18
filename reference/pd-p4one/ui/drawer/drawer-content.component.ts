import { AfterContentInit, ChangeDetectionStrategy, Component, computed, contentChild, Directive, forwardRef, input, isDevMode } from '@angular/core';
import { RdxDialogContentDirective, RdxDialogDescriptionDirective, RdxDialogTitleDirective } from '@radix-ng/primitives/dialog';

import { cn } from '@/app/lib/utils';

/** The edge a drawer slides in from — the registry (vaul) `direction` prop. Default matches vaul's own default. */
export type DrawerDirection = 'top' | 'right' | 'bottom' | 'left';

/**
 * Panel class — from the @force-ui/drawer registry's `DrawerContent` (built on
 * `vaul`), verbatim per `data-[direction=…]` positioning, with these deliberate,
 * documented divergences (mirrors the same rationale `sheet` already
 * documents for its own port off the same CDK-Dialog primitive):
 *
 * - **Renamed vaul's `data-vaul-drawer-direction` → `data-direction`.** That
 *   attribute is vaul's own internal styling hook, not a Force UI-branded
 *   `data-slot` attribute — since vaul itself isn't present (see
 *   `drawer-trigger.directive.ts` for why), there's nothing to preserve
 *   byte-for-byte; `data-direction` is the direct equivalent, named
 *   consistently with sheet's `data-side`.
 * - **No `DrawerOverlay` element** (upstream: `bg-black/10
 *   supports-backdrop-filter:backdrop-blur-xs`) — same call as the sheet port:
 *   the backdrop is the CDK scrim (`cdk-overlay-dark-backdrop`), CDK owns it.
 * - **Added `data-open:`/`data-closed:` fade + directional slide
 *   (`tw-animate-css` utilities) plus `transition duration-200
 *   ease-in-out`.** Upstream's slide/fade is vaul's own JS drag-physics, not a
 *   CSS class — since this port has no vaul, the open/close motion is
 *   restored as CSS keyed off `RdxDialogContentDirective`'s `data-state`,
 *   exactly the mechanism `sheet` already uses for the same reason.
 * - **Added `border-border`**: bare directional `border-t/r/b/l` (width only)
 *   resolves to `currentColor` under this app's Tailwind v4 setup (no global
 *   `* { border-color: var(--border) }` — see the sheet port's identical note).
 * - **Added `bg-clip-padding`**: unlike `sheet`, the drawer panel has real
 *   rounded corners (`rounded-*-xl`) AND a border — without clipping to the
 *   padding box the background can bleed past the radius at the border edge.
 * - **Added `motion-reduce:transition-none motion-reduce:animate-none`**
 *   (WCAG 2.3.3) — a11y, not polish.
 */
const DRAWER_CONTENT_CLASS =
  'group/drawer-content fixed z-50 flex h-auto flex-col border-border bg-popover bg-clip-padding text-sm text-popover-foreground transition duration-200 ease-in-out motion-reduce:transition-none motion-reduce:animate-none data-[direction=bottom]:inset-x-0 data-[direction=bottom]:bottom-0 data-[direction=bottom]:mt-24 data-[direction=bottom]:max-h-[80vh] data-[direction=bottom]:rounded-t-xl data-[direction=bottom]:border-t data-[direction=left]:inset-y-0 data-[direction=left]:left-0 data-[direction=left]:w-3/4 data-[direction=left]:rounded-r-xl data-[direction=left]:border-r data-[direction=right]:inset-y-0 data-[direction=right]:right-0 data-[direction=right]:w-3/4 data-[direction=right]:rounded-l-xl data-[direction=right]:border-l data-[direction=top]:inset-x-0 data-[direction=top]:top-0 data-[direction=top]:mb-24 data-[direction=top]:max-h-[80vh] data-[direction=top]:rounded-b-xl data-[direction=top]:border-b data-[direction=left]:sm:max-w-sm data-[direction=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[direction=bottom]:data-open:slide-in-from-bottom-10 data-[direction=left]:data-open:slide-in-from-left-10 data-[direction=right]:data-open:slide-in-from-right-10 data-[direction=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[direction=bottom]:data-closed:slide-out-to-bottom-10 data-[direction=left]:data-closed:slide-out-to-left-10 data-[direction=right]:data-closed:slide-out-to-right-10 data-[direction=top]:data-closed:slide-out-to-top-10';

export { DRAWER_CONTENT_CLASS };

/**
 * Angular port of @force-ui/drawer's `DrawerContent` — the edge-pinned panel.
 * Lives inside the `<ng-template>` the trigger portals through CDK Dialog.
 *
 * `RdxDialogContentDirective` (host directive) supplies `role="dialog"` and the
 * `data-state` (open/closed) that drives the slide/fade animation, and exposes
 * `close()` / `dismiss()`. `direction` (default `bottom`, matching vaul's own
 * default) is bound to `data-direction`, which selects the positioning + slide
 * direction + which edges get rounded.
 *
 * The grab-handle bar (`mx-auto mt-4 ... rounded-full bg-muted`) is
 * registry-verbatim — it only shows for `direction="bottom"`
 * (`group-data-[direction=bottom]/drawer-content:block`), same as upstream's
 * bottom-sheet affordance. It's `aria-hidden` — decorative, not a control (no
 * drag gesture backs it in this port).
 *
 * Accessible name/description: same pattern as the sheet port —
 * `RdxDialogContentDirective` hard-codes `aria-labelledby="true"` /
 * `aria-describedby="true"`, overridden here by content-querying
 * `[rdxDrawerTitle]` / `[rdxDrawerDescription]` and binding to their generated
 * ids (WCAG 1.3.1 / 4.1.2). Unlike `sheet`, upstream's `DrawerContent` has no
 * baked-in close (X) button — a drawer's dismiss affordance is
 * Escape/backdrop-click or an explicit action the consumer places in
 * `[rdxDrawerFooter]` (mirrors upstream exactly: no `showCloseButton` input
 * here).
 */
@Component({
  selector: '[rdxDrawerContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxDialogContentDirective],
  host: {
    'data-slot': 'drawer-content',
    '[attr.data-direction]': 'direction()',
    '[attr.aria-labelledby]': 'titleEl()?.labelId ?? null',
    '[attr.aria-describedby]': 'descriptionEl()?.descriptionId ?? null',
    '[class]': 'classes()',
  },
  template: `
    <div
      class="mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full bg-muted group-data-[direction=bottom]/drawer-content:block"
      aria-hidden="true"
    ></div>
    <ng-content />
  `,
})
export class DrawerContentComponent implements AfterContentInit {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** The edge the drawer slides in from (drives positioning + rounding + animation). */
  readonly direction = input<DrawerDirection>('bottom');
  protected readonly titleEl = contentChild(forwardRef(() => DrawerTitleDirective));
  protected readonly descriptionEl = contentChild(forwardRef(() => DrawerDescriptionDirective));
  protected readonly classes = computed(() => cn(DRAWER_CONTENT_CLASS, this.className()));

  /**
   * A11y guardrail (WCAG 4.1.2): a `role="dialog"` needs an accessible name.
   * Without a projected `[rdxDrawerTitle]` — and if the trigger also passes no
   * `ariaLabel` — the drawer ends up unnamed. Warn in dev mode (stripped from
   * production builds); same guardrail the sheet port carries.
   */
  ngAfterContentInit(): void {
    if (isDevMode() && !this.titleEl()) {
      console.warn(
        '[rdxDrawerContent] has no [rdxDrawerTitle] — the drawer may lack an accessible name. Add a title, or pass ariaLabel on the trigger\'s [rdxDrawerConfig].',
      );
    }
  }
}

/**
 * Angular port of `DrawerHeader` — stacks the title + description at the top
 * of the panel. Registry-verbatim: centered when the panel slides from the
 * top or bottom edge (`group-data-[direction=bottom|top]/drawer-content:
 * text-center`), left-aligned on `md:` and up regardless of direction.
 */
@Directive({
  selector: '[rdxDrawerHeader]',
  standalone: true,
  host: {
    'data-slot': 'drawer-header',
    '[class]': 'classes()',
  },
})
export class DrawerHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn(
      'flex flex-col gap-0.5 p-4 group-data-[direction=bottom]/drawer-content:text-center group-data-[direction=top]/drawer-content:text-center md:gap-0.5 md:text-left',
      this.className(),
    ),
  );
}

/**
 * Angular port of `DrawerFooter` — the action bar pinned to the bottom of the
 * panel (`mt-auto` pushes it down within the flex column). Registry-verbatim,
 * identical to the sheet port's footer.
 */
@Directive({
  selector: '[rdxDrawerFooter]',
  standalone: true,
  host: {
    'data-slot': 'drawer-footer',
    '[class]': 'classes()',
  },
})
export class DrawerFooterDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly classes = computed(() =>
    cn('mt-auto flex flex-col gap-2 p-4', this.className()),
  );
}

/**
 * Angular port of `DrawerTitle`. Wraps radix-ng's `RdxDialogTitleDirective`
 * (host directive) — same composition the sheet port uses, registry-verbatim
 * classes.
 *
 * Self-assigns a stable `id` so `[rdxDrawerContent]` can bind
 * `aria-labelledby` to it. A consumer-supplied `id` wins.
 */
let drawerTitleSeq = 0;
@Directive({
  selector: '[rdxDrawerTitle]',
  standalone: true,
  hostDirectives: [RdxDialogTitleDirective],
  host: {
    'data-slot': 'drawer-title',
    '[attr.id]': 'labelId',
    '[class]': 'classes()',
  },
})
export class DrawerTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content's `aria-labelledby`. */
  readonly labelId = `rdx-drawer-title-${drawerTitleSeq++}`;
  protected readonly classes = computed(() =>
    cn('cn-font-heading text-base font-medium text-foreground', this.className()),
  );
}

/**
 * Angular port of `DrawerDescription`. Wraps radix-ng's
 * `RdxDialogDescriptionDirective`. Registry-verbatim `text-sm
 * text-muted-foreground`.
 *
 * Self-assigns a stable `id` so `[rdxDrawerContent]` can bind
 * `aria-describedby` to it. A consumer-supplied `id` wins.
 */
let drawerDescriptionSeq = 0;
@Directive({
  selector: '[rdxDrawerDescription]',
  standalone: true,
  hostDirectives: [RdxDialogDescriptionDirective],
  host: {
    'data-slot': 'drawer-description',
    '[attr.id]': 'descriptionId',
    '[class]': 'classes()',
  },
})
export class DrawerDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  /** Stable id referenced by the content's `aria-describedby`. */
  readonly descriptionId = `rdx-drawer-description-${drawerDescriptionSeq++}`;
  protected readonly classes = computed(() =>
    cn('text-sm text-muted-foreground', this.className()),
  );
}
