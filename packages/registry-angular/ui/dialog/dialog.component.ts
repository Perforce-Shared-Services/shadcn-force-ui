import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, input } from "@angular/core"
import {
  RdxDialogBackdrop,
  RdxDialogClose,
  RdxDialogDescription,
  RdxDialogPopup,
  RdxDialogPortal,
  RdxDialogRoot,
  RdxDialogTitle,
  RdxDialogTrigger,
} from "@radix-ng/primitives/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/angular-ui/button"
import { DIALOG_CLOSE_SVG } from "./dialog.icons"

/**
 * Angular port of @force-ui/dialog (radix-force-ui style), built on
 * @radix-ng/primitives/dialog v1.x — the same declarative composition as the
 * React registry (root → trigger → portal → overlay + popup), not p4one's
 * v0.50 service/CDK API.
 *
 * Part mapping (React → Angular):
 *
 *   <Dialog>                → <div uiDialogRoot>
 *   <DialogTrigger>         → <button uiButton uiDialogTrigger>
 *   <DialogPortal>          → <ng-template uiDialogPortal>
 *   <DialogOverlay />       → <div uiDialogOverlay></div>
 *   <DialogContent>         → <div uiDialogContent>
 *   <DialogHeader>          → <div uiDialogHeader>
 *   <DialogFooter>          → <div uiDialogFooter>
 *   <DialogTitle>           → <h2 uiDialogTitle>
 *   <DialogDescription>     → <p uiDialogDescription>
 *   <DialogClose>           → <button uiDialogClose type="button">
 *
 * Usage:
 *   <div uiDialogRoot>
 *     <button uiButton variant="outline" uiDialogTrigger>Open</button>
 *     <ng-template uiDialogPortal>
 *       <div uiDialogOverlay></div>
 *       <div uiDialogContent class="sm:max-w-sm">
 *         <div uiDialogHeader>
 *           <h2 uiDialogTitle>Edit profile</h2>
 *           <p uiDialogDescription>Make changes…</p>
 *         </div>
 *         <div uiDialogFooter>…</div>
 *       </div>
 *     </ng-template>
 *   </div>
 *
 * radix-ng v1.x owns the a11y wiring: the popup binds role, aria-modal,
 * aria-labelledby / aria-describedby (from [uiDialogTitle] /
 * [uiDialogDescription] ids) and drives data-open / data-closed attributes
 * that the cn-dialog-* animation tokens key off. No manual aria work needed
 * (this was p4one's v0.50 workaround; see DIVERGENCES.md).
 */

/**
 * Angular port of `Dialog` (the root). Groups all parts and owns open state.
 * The `open` model input/output is re-exposed under `[uiOpen]` /
 * `(uiOpenChange)` for controlled usage; demos use the uncontrolled form.
 */
@Directive({
  selector: "[uiDialogRoot]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDialogRoot,
      inputs: ["open: uiOpen", "defaultOpen", "modal"],
      outputs: ["openChange: uiOpenChange"],
    },
  ],
  host: {
    "data-slot": "dialog",
  },
})
export class DialogRootDirective {}

/**
 * Angular port of `DialogTrigger` — a button that opens the dialog. Must be
 * rendered inside the `[uiDialogRoot]` element. Radix stamps aria-haspopup,
 * aria-expanded, aria-controls and disabled automatically.
 */
@Directive({
  selector: "button[uiDialogTrigger]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxDialogTrigger,
      inputs: ["handle", "payload", "id", "disabled"],
    },
  ],
  host: {
    "data-slot": "dialog-trigger",
    type: "button",
  },
})
export class DialogTriggerDirective {}

/**
 * Angular port of `DialogPortal`. Structural directive — dialog has two root
 * nodes (backdrop + popup), so the explicit `<ng-template uiDialogPortal>`
 * form is required. Teleports content to document.body while open and keeps
 * it mounted until exit animations finish.
 */
@Directive({
  selector: "ng-template[uiDialogPortal]",
  standalone: true,
  hostDirectives: [{ directive: RdxDialogPortal, inputs: ["container"] }],
  host: {
    "data-slot": "dialog-portal",
  },
})
export class DialogPortalDirective {}

/**
 * Angular port of `DialogOverlay` — the dimmed backdrop beneath the popup.
 * Positioning classes (`fixed inset-0 isolate z-50`) come from the React
 * source; the visual treatment is the `cn-dialog-overlay` token.
 */
@Directive({
  selector: "[uiDialogOverlay]",
  standalone: true,
  hostDirectives: [{ directive: RdxDialogBackdrop, inputs: ["forceRender"] }],
  host: {
    "data-slot": "dialog-overlay",
    "[class]": "classes()",
  },
})
export class DialogOverlayDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-dialog-overlay fixed inset-0 isolate z-50", this.className())
  )
}

/**
 * Angular port of `DialogClose` — a button that closes the dialog. Put it on
 * any native button (typically styled with `[uiButton]`). Also applied by the
 * content's built-in close button.
 */
@Directive({
  selector: "button[uiDialogClose]",
  standalone: true,
  hostDirectives: [RdxDialogClose],
  host: {
    "data-slot": "dialog-close",
  },
})
export class DialogCloseDirective {}

/**
 * Angular port of `DialogContent` — the centered panel. Renders inside
 * `<ng-template uiDialogPortal>` next to `[uiDialogOverlay]`. Radix's popup
 * directive supplies focus trap, dismissal and the data-open/data-closed
 * animation state; positioning classes mirror the React source
 * (`cn-dialog-content` carries the visual tokens).
 *
 * Renders the ghost icon close button top-right unless `showCloseButton` is
 * false (parity with React's prop). The glyph is an inline Material Symbols
 * SVG coloured by fill-current, with sr-only text naming it beyond aria-label.
 */
@Component({
  selector: "div[uiDialogContent]",
  standalone: true,
  imports: [Button, DialogCloseDirective],
  templateUrl: "./dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxDialogPopup }],
  host: {
    "data-slot": "dialog-content",
    "[class]": "classes()",
  },
})
export class DialogContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly showCloseButton = input(true, { transform: booleanAttribute })

  /** Sanitizer-trusted inline close SVG (bundled, static — bypass is safe). */
  protected readonly closeIcon = DIALOG_CLOSE_SVG

  protected readonly classes = computed(() =>
    cn(
      "cn-dialog-content fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none",
      this.className()
    )
  )
}

/** Angular port of `DialogHeader` — stacks title + description. Styling-only. */
@Directive({
  selector: "[uiDialogHeader]",
  standalone: true,
  host: {
    "data-slot": "dialog-header",
    "[class]": "classes()",
  },
})
export class DialogHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-dialog-header flex flex-col", this.className())
  )
}

/**
 * Angular port of `DialogFooter` — action bar at the bottom. Stacks reversed
 * on mobile (primary action last in DOM, bottom visually) and right-aligns on
 * sm+, matching the registry. React's optional built-in footer Close button
 * (showCloseButton) has no Angular equivalent — place `<button uiDialogClose>`
 * explicitly, as every example does.
 */
@Directive({
  selector: "[uiDialogFooter]",
  standalone: true,
  host: {
    "data-slot": "dialog-footer",
    "[class]": "classes()",
  },
})
export class DialogFooterDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      this.className()
    )
  )
}

/** Angular port of `DialogTitle`. Use a heading element so the dialog is named. */
@Directive({
  selector: "[uiDialogTitle]",
  standalone: true,
  hostDirectives: [RdxDialogTitle],
  host: {
    "data-slot": "dialog-title",
    "[class]": "classes()",
  },
})
export class DialogTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-dialog-title cn-font-heading", this.className())
  )
}

/** Angular port of `DialogDescription`. Anchors inside get underline styling. */
@Directive({
  selector: "[uiDialogDescription]",
  standalone: true,
  hostDirectives: [RdxDialogDescription],
  host: {
    "data-slot": "dialog-description",
    "[class]": "classes()",
  },
})
export class DialogDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-dialog-description", this.className())
  )
}
