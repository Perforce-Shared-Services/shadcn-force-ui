import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
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
import { Button } from "@/angular-ui/button"

import { SHEET_CLOSE_SVG } from "./sheet.icons"
import { sheetVariants } from "./sheet.variants"

/** The edge a sheet slides in from — the registry `side` prop, verbatim. */
export type SheetSide = "top" | "right" | "bottom" | "left"

/**
 * Angular port of the registry `Sheet` root — groups all sheet parts.
 * Wraps radix-ng v1.x's declarative `RdxDialogRoot` (open model, focus scope,
 * scroll lock, dismissal). Usage: `<div uiSheet>…</div>` around the trigger and
 * the portal template.
 */
@Directive({
  selector: "[uiSheet]",
  standalone: true,
  hostDirectives: [RdxDialogRoot],
  host: { "data-slot": "sheet" },
})
export class SheetDirective {}

/**
 * Angular port of `SheetTrigger` — a button that opens the sheet. Applies
 * radix-ng's `RdxDialogTrigger` (aria-haspopup="dialog", aria-expanded,
 * aria-controls, data-state). Must be used on a `<button>` (native semantics,
 * the Angular equivalent of React's asChild).
 *
 * The edge the sheet slides from is a property of the CONTENT, not the trigger —
 * set `side` on `[uiSheetContent]`.
 */
@Directive({
  selector: "button[uiSheetTrigger]",
  standalone: true,
  hostDirectives: [RdxDialogTrigger],
  host: { "data-slot": "sheet-trigger" },
})
export class SheetTriggerDirective {}

/**
 * Angular port of `SheetPortal` — portals the sheet body to `document.body`.
 * Applied to an `<ng-template>`; everything inside renders only while open.
 * The React part exists for parity; radix-ng requires this explicit template.
 */
@Directive({
  selector: "ng-template[uiSheetPortal]",
  standalone: true,
  hostDirectives: [{ directive: RdxDialogPortal, inputs: ["container", "container"] }],
})
export class SheetPortalDirective {}

/**
 * Angular port of `SheetOverlay` — the dimmed scrim behind the panel
 * (`cn-sheet-overlay` token + full-screen fixed positioning; radix-ng supplies
 * the open/closed transition state via `RdxDialogBackdrop`). Place once inside
 * the portal template, before `[uiSheetContent]`.
 */
@Directive({
  selector: "[uiSheetOverlay]",
  standalone: true,
  hostDirectives: [RdxDialogBackdrop],
  host: {
    "data-slot": "sheet-overlay",
    "[class]":
      '"cn-sheet-overlay fixed inset-0 z-50 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"',
  },
})
export class SheetOverlayDirective {}

/**
 * Angular port of `SheetContent` — the edge-pinned drawer panel.
 *
 * `RdxDialogPopup` (host directive) supplies role="dialog", aria-labelledby /
 * aria-describedby wiring from `[uiSheetTitle]` / `[uiSheetDescription]`, focus
 * trapping, Escape / outside-click dismissal, and the `data-open`/`data-closed`
 * states that drive the slide/fade animation. `side` is bound to `data-side`,
 * which selects the positioning + slide direction inside the `cn-sheet-content`
 * token. The close (✕) button is a ghost icon `[uiButton]` carrying
 * `[uiSheetClose]`, shown unless `showCloseButton` is false.
 *
 * Unlike p4one's CDK-dialog port, no `fixed`/`border-border` additions are
 * needed here: those compensated for CDK's centered pane and a missing global
 * border-color rule; radix-ng renders the popup as authored and the preview app
 * declares `* { border-color: var(--border) }`.
 */
@Component({
  selector: "[uiSheetContent]",
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./sheet.component.html",
  hostDirectives: [RdxDialogPopup],
  host: {
    "data-slot": "sheet-content",
    "[attr.data-side]": "side()",
    "[class]": "classes()",
  },
})
export class SheetContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  /** The edge the sheet slides in from (drives positioning + animation). */
  readonly side = input<SheetSide>("right")
  /**
   * Show the corner ✕ close button (default true). When set false, give the
   * footer an explicit neutral dismiss action — Escape / backdrop click alone
   * are not discoverable ways out of a drawer.
   */
  readonly showCloseButton = input(true, { transform: booleanAttribute })
  /** Sanitizer-trusted inline close SVG (bundled, static — bypass is safe + required). */
  protected readonly closeIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(SHEET_CLOSE_SVG)
  protected readonly classes = computed(() => cn(sheetVariants(), this.className()))
}

/**
 * Angular port of `SheetHeader` — stacks the title + description at the top of
 * the panel. Styling-only div.
 */
@Directive({
  selector: "[uiSheetHeader]",
  standalone: true,
  host: { "data-slot": "sheet-header", "[class]": "classes()" },
})
export class SheetHeaderDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sheet-header flex flex-col", this.className()))
}

/**
 * Angular port of `SheetFooter` — action bar pinned to the bottom of the panel
 * (`mt-auto` pushes it down within the flex column). Styling-only div.
 */
@Directive({
  selector: "[uiSheetFooter]",
  standalone: true,
  host: { "data-slot": "sheet-footer", "[class]": "classes()" },
})
export class SheetFooterDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sheet-footer mt-auto flex flex-col", this.className()))
}

/**
 * Angular port of `SheetTitle`. Wraps radix-ng's `RdxDialogTitle`, which
 * self-assigns an id and registers it with the dialog root so the popup's
 * `aria-labelledby` names the sheet automatically. Use a heading element
 * (`<h2 uiSheetTitle>`).
 */
@Directive({
  selector: "[uiSheetTitle]",
  standalone: true,
  hostDirectives: [RdxDialogTitle],
  host: { "data-slot": "sheet-title", "[class]": "classes()" },
})
export class SheetTitleDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sheet-title cn-font-heading", this.className()))
}

/**
 * Angular port of `SheetDescription`. Wraps radix-ng's `RdxDialogDescription`
 * (id auto-wired into the popup's aria-describedby).
 */
@Directive({
  selector: "[uiSheetDescription]",
  standalone: true,
  hostDirectives: [RdxDialogDescription],
  host: { "data-slot": "sheet-description", "[class]": "classes()" },
})
export class SheetDescriptionDirective {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() => cn("cn-sheet-description", this.className()))
}

/**
 * Angular port of `SheetClose` — a button that closes the sheet without result.
 * Apply to a `<button>` (typically a `[uiButton]`) anywhere inside the content.
 */
@Directive({
  selector: "button[uiSheetClose]",
  standalone: true,
  hostDirectives: [RdxDialogClose],
  host: { "data-slot": "sheet-close" },
})
export class SheetCloseDirective {}
