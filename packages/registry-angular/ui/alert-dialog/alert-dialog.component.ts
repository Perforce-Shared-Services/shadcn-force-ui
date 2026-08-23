import { ChangeDetectionStrategy, Component, computed, Directive, input } from "@angular/core"
import {
  RdxAlertDialogBackdrop,
  RdxAlertDialogClose,
  RdxAlertDialogDescription,
  RdxAlertDialogPopup,
  RdxAlertDialogPortal,
  RdxAlertDialogRoot,
  RdxAlertDialogTitle,
  RdxAlertDialogTrigger,
} from "@radix-ng/primitives/alert-dialog"

import { cn } from "@/lib/utils"

import {
  alertDialogContentClass,
  alertDialogDescriptionClass,
  alertDialogHeaderClass,
  alertDialogMediaClass,
  alertDialogOverlayClass,
  alertDialogTitleClass,
} from "./alert-dialog.variants"

export type AlertDialogSize = "default" | "sm"

/**
 * Angular port of @force-ui/alert-dialog (radix-force-ui style).
 *
 * An alert dialog is a dialog that demands a deliberate choice: NO close (X)
 * button and no backdrop dismissal — the user must pick a footer action
 * (`role="alertdialog"`). Escape still closes, matching the React radix
 * behaviour.
 *
 * Built on `@radix-ng/primitives` v1.x alert-dialog parts (thin wrappers around
 * its dialog primitives that force alert semantics: always modal, pointer
 * dismissal disabled, popup renders as `role="alertdialog"`). The primitive
 * owns aria-labelledby/describedby via its Title/Description directives.
 *
 * Usage:
 * ```html
 * <div uiAlertDialog>
 *   <button uiButton variant="outline" uiAlertDialogTrigger>Show Dialog</button>
 *   <ng-template uiAlertDialogPortal>
 *     <div uiAlertDialogOverlay></div>
 *     <div uiAlertDialogContent>
 *       <div uiAlertDialogHeader>
 *         <h2 uiAlertDialogTitle>Are you absolutely sure?</h2>
 *         <p uiAlertDialogDescription>This action cannot be undone.</p>
 *       </div>
 *       <div uiAlertDialogFooter>
 *         <button uiButton variant="outline" uiAlertDialogCancel>Cancel</button>
 *         <button uiButton uiAlertDialogAction>Continue</button>
 *       </div>
 *     </div>
 *   </ng-template>
 * </div>
 * ```
 */

/** Groups the alert dialog parts. Place around trigger + portal template. */
@Directive({
  selector: "[uiAlertDialog]",
  standalone: true,
  hostDirectives: [RdxAlertDialogRoot],
  host: { "data-slot": "alert-dialog" },
})
export class AlertDialog {}

/** Opens the alert dialog. Apply to a `<button>` (e.g. a `[uiButton]`). */
@Directive({
  selector: "button[uiAlertDialogTrigger]",
  standalone: true,
  hostDirectives: [RdxAlertDialogTrigger],
  host: { "data-slot": "alert-dialog-trigger" },
})
export class AlertDialogTrigger {}

/**
 * Portals the overlay + content into `document.body` when open. Structural:
 * wrap both in `<ng-template uiAlertDialogPortal>`.
 */
@Directive({
  selector: "ng-template[uiAlertDialogPortal]",
  standalone: true,
  hostDirectives: [RdxAlertDialogPortal],
})
export class AlertDialogPortal {}

/** Scrim behind the panel. Styling-only. */
@Directive({
  selector: "[uiAlertDialogOverlay]",
  standalone: true,
  hostDirectives: [RdxAlertDialogBackdrop],
  host: {
    "data-slot": "alert-dialog-overlay",
    "[class]": "classes()",
  },
})
export class AlertDialogOverlay {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(alertDialogOverlayClass, this.className()))
}

/**
 * The centered panel. `size="sm"` clamps width for compact confirmations
 * (both sizes share the token's max-width caps; see style-force-ui.css).
 */
@Component({
  selector: "[uiAlertDialogContent]",
  standalone: true,
  templateUrl: "./alert-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RdxAlertDialogPopup],
  host: {
    "data-slot": "alert-dialog-content",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class AlertDialogContent {
  readonly size = input<AlertDialogSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(alertDialogContentClass, this.className()))
}

/** Grid header — centers media/title/description, left-aligns from `sm`. */
@Directive({
  selector: "[uiAlertDialogHeader]",
  standalone: true,
  host: {
    "data-slot": "alert-dialog-header",
    "[class]": "classes()",
  },
})
export class AlertDialogHeader {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(alertDialogHeaderClass, this.className()))
}

/** Rounded tile hosting one decorative status icon above/beside the title. */
@Directive({
  selector: "[uiAlertDialogMedia]",
  standalone: true,
  host: {
    "data-slot": "alert-dialog-media",
    "[class]": "classes()",
  },
})
export class AlertDialogMedia {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(alertDialogMediaClass, this.className()))
}

/** Accessible name of the alert (use a real heading element, e.g. `<h2>`). */
@Directive({
  selector: "[uiAlertDialogTitle]",
  standalone: true,
  hostDirectives: [RdxAlertDialogTitle],
  host: {
    "data-slot": "alert-dialog-title",
    "[class]": "classes()",
  },
})
export class AlertDialogTitle {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(alertDialogTitleClass, this.className()))
}

/** Accessible description of the alert. Styles inline anchors too. */
@Directive({
  selector: "[uiAlertDialogDescription]",
  standalone: true,
  hostDirectives: [RdxAlertDialogDescription],
  host: {
    "data-slot": "alert-dialog-description",
    "[class]": "classes()",
  },
})
export class AlertDialogDescription {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn(alertDialogDescriptionClass, this.className()))
}

/** Footer action bar — equal 2-column grid at `size="sm"`, right-aligned stack otherwise. */
@Directive({
  selector: "[uiAlertDialogFooter]",
  standalone: true,
  host: {
    "data-slot": "alert-dialog-footer",
    "[class]": "classes()",
  },
})
export class AlertDialogFooter {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      // Layout behaviour lives in TSX on React too; the token carries colours/borders only.
      "cn-alert-dialog-footer flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end [&_svg]:fill-current",
      this.className(),
    ),
  )
}

/**
 * Confirm button — closes the dialog on click. Apply alongside `[uiButton]`
 * (`variant="destructive"` for destructive confirms).
 */
@Directive({
  selector: "button[uiAlertDialogAction]",
  standalone: true,
  hostDirectives: [RdxAlertDialogClose],
  host: { "data-slot": "alert-dialog-action" },
})
export class AlertDialogAction {}

/**
 * Dismiss button — closes the dialog on click. Apply alongside
 * `[uiButton variant="outline"]`. An alert dialog's only escape routes are its
 * footer buttons and Escape; always ship at least one Cancel.
 */
@Directive({
  selector: "button[uiAlertDialogCancel]",
  standalone: true,
  hostDirectives: [RdxAlertDialogClose],
  host: { "data-slot": "alert-dialog-cancel" },
})
export class AlertDialogCancel {}
