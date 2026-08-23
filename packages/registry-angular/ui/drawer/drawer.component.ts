import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  input,
} from "@angular/core"
import {
  RdxDialogBackdrop,
  RdxDialogClose,
  RdxDialogDescription,
  RdxDialogPortal,
  RdxDialogPopup,
  RdxDialogRoot,
  RdxDialogTitle,
  RdxDialogTrigger,
} from "@radix-ng/primitives/dialog"

import { cn } from "@/lib/utils"

/**
 * The edge a drawer slides in from — the registry (vaul) `direction` prop.
 * Default matches vaul's own default.
 */
export type DrawerDirection = "top" | "right" | "bottom" | "left"

/**
 * Angular port of @force-ui/drawer (force-ui style).
 *
 * Upstream wraps `vaul` (a React-only swipe/snap-point gesture library). This
 * port builds on the SAME @radix-ng/primitives/dialog (v1.x) machinery — a
 * drawer is a dialog with rounded corners, a directional grab-handle bar and
 * an edge-panel defaulting to `bottom` (vaul's own default) rather than
 * `right`. The `cn-drawer*` CSS tokens key off vaul's styling hook
 * `data-vaul-drawer-direction`, so this port binds that exact attribute name
 * (`[attr.data-vaul-drawer-direction]`) instead of inventing its own — keeping
 * one spelling per concept across frameworks.
 *
 * Parity gaps (no vaul equivalent — intentionally omitted): swipe-to-dismiss
 * drag physics, snap points, `swipeDirection`, `showSwipeHandle` toggling (the
 * grab-handle bar always renders for `direction="bottom"`, matching upstream's
 * bottom-sheet affordance), `DrawerOverlay`'s backdrop-blur scrim is provided
 * by `[uiDrawerOverlay]`.
 *
 * Usage:
 *   <div uiDrawerRoot>
 *     <button uiButton variant="outline" uiDrawerTrigger>Open</button>
 *     <ng-template uiDrawerPortal>
 *       <div uiDrawerOverlay></div>
 *       <div uiDrawerContent direction="bottom">
 *         <div uiDrawerHeader>
 *           <h2 uiDrawerTitle>Title</h2>
 *           <p uiDrawerDescription>Description</p>
 *         </div>
 *         <div class="flex-1 p-4">Content</div>
 *         <div uiDrawerFooter>
 *           <button uiButton uiDrawerClose>Close</button>
 *         </div>
 *       </div>
 *     </ng-template>
 *   </div>
 */

/**
 * Angular port of `Drawer` (root). Hosts radix-ng's `RdxDialogRoot` — owns the
 * `open` state (controllable via `[(open)]`) and the modal/non-modal variant
 * (`modal="trap-focus"` keeps focus trapped while leaving scroll + pointer
 * interaction unrestricted).
 */
@Directive({
  selector: "[uiDrawerRoot]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDialogRoot,
      inputs: ["open", "defaultOpen", "modal", "disablePointerDismissal"],
      outputs: ["openChange", "onOpenChange", "onOpenChangeComplete"],
    },
  ],
  host: { "data-slot": "drawer" },
})
export class DrawerRootDirective {}

/**
 * Angular port of `DrawerTrigger`. Hosts radix-ng's `RdxDialogTrigger`
 * (aria-haspopup/aria-expanded/disabled wiring included).
 */
@Directive({
  selector: "[uiDrawerTrigger]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDialogTrigger,
      inputs: ["disabled", "id"],
    },
  ],
  host: { "data-slot": "drawer-trigger" },
})
export class DrawerTriggerDirective {}

/**
 * Angular port of `DrawerPortal`. Applied on an `<ng-template>` whose content
 * renders in the overlay container while the drawer is open.
 */
@Directive({
  selector: "ng-template[uiDrawerPortal]",
  standalone: true,
  hostDirectives: [RdxDialogPortal],
})
export class DrawerPortalDirective {}

/**
 * Angular port of `DrawerOverlay`. Hosts radix-ng's `RdxDialogBackdrop`; the
 * `cn-drawer-overlay` token carries the fade animations and the translucent
 * blurred scrim.
 */
@Directive({
  selector: "[uiDrawerOverlay]",
  standalone: true,
  hostDirectives: [RdxDialogBackdrop],
  host: {
    "data-slot": "drawer-overlay",
    "[class]": "classes()",
  },
})
export class DrawerOverlayDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    // fixed inset-0 z-50 are structural (outside the token upstream too)
    cn("cn-drawer-overlay fixed inset-0 z-50", this.className())
  )
}

/**
 * Angular port of `DrawerContent` — the edge-pinned panel. Hosts radix-ng's
 * `RdxDialogPopup`, which supplies `role="dialog"`, the accessible-name wiring
 * (`aria-labelledby` / `aria-describedby` from the projected
 * `[uiDrawerTitle]` / `[uiDrawerDescription]`) and the open/close transition
 * attributes.
 *
 * The panel binds `direction` (default `bottom`) to
 * `data-vaul-drawer-direction`, which selects the `cn-drawer-content` token's
 * positioning, rounding and border edges.
 *
 * Slide/fade motion is restored as CSS transitions keyed off the popup's
 * `data-starting-style` / `data-ending-style` attributes (vaul does this in JS
 * drag-physics; there is no token for it) — including
 * `motion-reduce:transition-none` (WCAG 2.3.3).
 *
 * The grab-handle bar only shows for `direction="bottom"`
 * (`group-data-[vaul-drawer-direction=bottom]/drawer-content:block`, same as
 * upstream). It is `aria-hidden` — decorative, not a control (no drag gesture
 * backs it in this port).
 */
@Component({
  selector: "[uiDrawerContent]",
  standalone: true,
  templateUrl: "./drawer.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxDialogPopup,
      outputs: ["escapeKeyDown", "pointerDownOutside", "interactOutside"],
    },
  ],
  host: {
    "data-slot": "drawer-content",
    "[attr.data-vaul-drawer-direction]": "direction()",
    "[class]": "classes()",
  },
})
export class DrawerContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  /** The edge the drawer slides in from (drives positioning + rounding). */
  readonly direction = input<DrawerDirection>("bottom")
  protected readonly classes = computed(() => {
    const d = this.direction()
    return cn(
      // group name + fixed positioning are structural (outside the token
      // upstream); border-border pins the border color under Tailwind v4's
      // currentColor default; bg-clip-padding keeps the popover background
      // inside the rounded corners where a directional border meets them.
      "cn-drawer-content group/drawer-content fixed z-50 border-border bg-clip-padding",
      // Motion restored as CSS (no vaul drag-physics): slide from the chosen
      // edge + fade on enter AND leave, disabled under reduced motion.
      "transition duration-200 ease-in-out data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none",
      d === "bottom"
        ? "data-starting-style:translate-y-10 data-ending-style:translate-y-10"
        : d === "top"
          ? "data-starting-style:-translate-y-10 data-ending-style:-translate-y-10"
          : d === "left"
            ? "data-starting-style:-translate-x-10 data-ending-style:-translate-x-10"
            : "data-starting-style:translate-x-10 data-ending-style:translate-x-10",
      this.className()
    )
  })
}

/**
 * Angular port of `DrawerHeader` — stacks title + description at the top of
 * the panel; centered when the panel slides from the top or bottom edge.
 */
@Directive({
  selector: "[uiDrawerHeader]",
  standalone: true,
  host: {
    "data-slot": "drawer-header",
    "[class]": "classes()",
  },
})
export class DrawerHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      "cn-drawer-header flex flex-col group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
      this.className()
    )
  )
}

/**
 * Angular port of `DrawerFooter` — action bar pinned to the bottom of the
 * panel (`mt-auto` within the flex column).
 */
@Directive({
  selector: "[uiDrawerFooter]",
  standalone: true,
  host: {
    "data-slot": "drawer-footer",
    "[class]": "classes()",
  },
})
export class DrawerFooterDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-drawer-footer mt-auto flex flex-col", this.className())
  )
}

/**
 * Angular port of `DrawerTitle`. Hosts radix-ng's `RdxDialogTitle`, which
 * self-assigns the id referenced by the content's `aria-labelledby`.
 */
@Directive({
  selector: "[uiDrawerTitle]",
  standalone: true,
  hostDirectives: [RdxDialogTitle],
  host: {
    "data-slot": "drawer-title",
    "[class]": "classes()",
  },
})
export class DrawerTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-drawer-title cn-font-heading", this.className())
  )
}

/**
 * Angular port of `DrawerDescription`. Hosts radix-ng's
 * `RdxDialogDescription`, which self-assigns the id referenced by the
 * content's `aria-describedby`.
 */
@Directive({
  selector: "[uiDrawerDescription]",
  standalone: true,
  hostDirectives: [RdxDialogDescription],
  host: {
    "data-slot": "drawer-description",
    "[class]": "classes()",
  },
})
export class DrawerDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("cn-drawer-description", this.className())
  )
}

/**
 * Angular port of `DrawerClose`. Applied on a `<button>`; clicking closes the
 * owning drawer.
 */
@Directive({
  selector: "button[uiDrawerClose]",
  standalone: true,
  hostDirectives: [RdxDialogClose],
  host: {
    "data-slot": "drawer-close",
  },
})
export class DrawerCloseDirective {}
