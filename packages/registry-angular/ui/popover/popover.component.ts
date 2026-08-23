import { ChangeDetectionStrategy, Component, computed, Directive, input } from "@angular/core"
import {
  RdxPopoverPortal,
  RdxPopoverPopup,
  RdxPopoverPositioner,
  RdxPopoverRoot,
  RdxPopoverTitle,
  RdxPopoverDescription,
  RdxPopoverTrigger,
} from "@radix-ng/primitives/popover"

import { cn } from "@/lib/utils"

/**
 * Angular port of @force-ui/popover (force-ui style), built on
 * @radix-ng/primitives/popover v1.x — the same declarative composition as the
 * React registry (root → trigger → portal → positioner → popup), not p4one's
 * v0.50 content-directive API.
 *
 * Part mapping (React → Angular):
 *
 *   <Popover>            → <div uiPopover>
 *   <PopoverTrigger>     → <button uiButton uiPopoverTrigger>
 *   <PopoverContent>     → <ng-template uiPopoverPortal>
 *                            <div uiPopoverPositioner side="bottom">
 *                              <div uiPopoverContent>…</div>
 *                            </div>
 *                          </ng-template>
 *   <PopoverHeader>      → <div uiPopoverHeader>
 *   <PopoverTitle>       → <div uiPopoverTitle>
 *   <PopoverDescription> → <p uiPopoverDescription>
 *
 * radix-ng v1.x owns the a11y wiring: the popup binds role="dialog",
 * aria-labelledby / aria-describedby (from [uiPopoverTitle] /
 * [uiPopoverDescription] ids registered on the root context) and drives
 * data-open / data-closed / data-side attributes that the cn-popover-content
 * token's animation and slide-in classes key off. No manual aria work needed.
 *
 * React splits Portal + Content into one folded element; v1.x keeps three
 * nodes (portal template → thin positioner → styled popup), so the Angular
 * usage nests `uiPopoverContent` inside `uiPopoverPositioner` inside the
 * `<ng-template uiPopoverPortal>` — positioning inputs (side / align /
 * offsets) live on the positioner, visual styling on the content.
 */

/**
 * Angular port of `Popover` (the root). Groups all parts and owns open state.
 * The `openChange` output is re-exposed under `(uiOpenChange)` for consumers
 * that need to react; demos use the uncontrolled form (`defaultOpen`).
 */
@Directive({
  selector: "[uiPopover]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPopoverRoot,
      inputs: ["open: uiOpen", "defaultOpen", "modal"],
      outputs: ["openChange: uiOpenChange"],
    },
  ],
  host: {
    "data-slot": "popover",
  },
})
export class PopoverRootDirective {}

/**
 * Angular port of `PopoverTrigger` — a button that opens the popover. Must be
 * rendered inside the `[uiPopover]` element. Radix stamps aria-haspopup,
 * aria-expanded, aria-controls and disabled automatically. Opens on CLICK
 * (not hover) — popover content is interactive.
 */
@Directive({
  selector: "button[uiPopoverTrigger]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPopoverTrigger,
      inputs: ["handle", "payload", "id", "disabled"],
    },
  ],
  host: {
    "data-slot": "popover-trigger",
    type: "button",
  },
})
export class PopoverTriggerDirective {}

/**
 * Angular port of React's Portal+Content fold (positioning half). Structural
 * directive — teleports the panel to document.body while open. Positioning
 * inputs (side, align, offsets) sit on `[uiPopoverPositioner]` inside it.
 */
@Directive({
  selector: "ng-template[uiPopoverPortal]",
  standalone: true,
  hostDirectives: [{ directive: RdxPopoverPortal }],
  host: {
    "data-slot": "popover-portal",
  },
})
export class PopoverPortalDirective {}

/**
 * Angular port of the positioning half of `PopoverContent` — the thin
 * popper wrapper between the portal and the styled popup. Re-exposes the
 * Radix positioning inputs; CDK collision flipping is automatic.
 *
 * The React defaults are `align="center"`, `sideOffset=4`; pass `side`
 * explicitly when it matters (the React examples do).
 */
@Directive({
  selector: "[uiPopoverPositioner]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxPopoverPositioner,
      inputs: ["side", "sideOffset", "align", "alignOffset", "dir"],
    },
  ],
  host: {
    "data-slot": "popover-positioner",
  },
})
export class PopoverPositionerDirective {}

/**
 * Angular port of the styled half of `PopoverContent`. Renders inside
 * `<div uiPopoverPositioner>`. Radix's popup directive supplies focus trap,
 * dismissal, role="dialog", the aria-labelledby/-describedby wiring and the
 * data-open/data-closed/data-side animation state that the
 * `cn-popover-content` token keys off; this wrapper carries the non-token
 * layout classes from the React source (`z-50 w-72 outline-hidden`) plus the
 * transform-origin arbitrary value — inert under the CDK positioner (which
 * never sets the Radix CSS var), kept for cross-framework parity.
 */
@Component({
  selector: "div[uiPopoverContent]",
  standalone: true,
  templateUrl: "./popover.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxPopoverPopup }],
  host: {
    "data-slot": "popover-content",
    "[class]": "classes()",
  },
})
export class PopoverContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-popover-content cn-popover-content-logical z-50 w-72 origin-(--radix-popover-content-transform-origin) outline-hidden",
      this.className()
    )
  )
}

/** Angular port of `PopoverHeader` — stacks title + description. Styling-only. */
@Directive({
  selector: "[uiPopoverHeader]",
  standalone: true,
  host: {
    "data-slot": "popover-header",
    "[class]": "classes()",
  },
})
export class PopoverHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-popover-header", this.className())
  )
}

/**
 * Angular port of `PopoverTitle`. Registers its generated id with the root
 * context, which the popup binds as `aria-labelledby` (v1.x does this
 * automatically — no manual id plumbing like p4one's v0.50 port needed).
 */
@Directive({
  selector: "[uiPopoverTitle]",
  standalone: true,
  hostDirectives: [{ directive: RdxPopoverTitle, inputs: ["id"] }],
  host: {
    "data-slot": "popover-title",
    "[class]": "classes()",
  },
})
export class PopoverTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-popover-title", this.className())
  )
}

/**
 * Angular port of `PopoverDescription`. Same auto-wiring as the title: its
 * generated id becomes the popup's `aria-describedby`.
 */
@Directive({
  selector: "[uiPopoverDescription]",
  standalone: true,
  hostDirectives: [{ directive: RdxPopoverDescription, inputs: ["id"] }],
  host: {
    "data-slot": "popover-description",
    "[class]": "classes()",
  },
})
export class PopoverDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-popover-description", this.className())
  )
}
