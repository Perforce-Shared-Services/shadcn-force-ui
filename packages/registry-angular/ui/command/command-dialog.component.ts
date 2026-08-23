import { NgTemplateOutlet } from "@angular/common"
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  model,
  TemplateRef,
} from "@angular/core"

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "@/angular-ui/dialog"

/**
 * Angular port of `CommandDialog` — the palette shown in a modal overlay
 * (⌘K style). Wraps the declarative `[uiDialogRoot]` dialog with an sr-only
 * title/description and a content panel styled by `cn-command-dialog`.
 *
 * The palette must be provided as a **projected `<ng-template>`**: the dialog
 * portal stamps its body outside this component's view, and `<ng-content>`
 * does not project across that boundary. The template is picked up via
 * `contentChild` and rendered inside the dialog chrome. Because the palette
 * needs the root context, wrap it in `<div uiCommand>` inside your template:
 *
 *   <button uiButton (click)="open.set(true)">Open</button>
 *   <ui-command-dialog [(uiOpen)]="open" title="Command palette">
 *     <ng-template>
 *       <div uiCommand>
 *         <div uiCommandInput placeholder="Type a command or search…"></div>
 *         <div uiCommandList>…</div>
 *       </div>
 *     </ng-template>
 *   </ui-command-dialog>
 */
@Component({
  selector: "ui-command-dialog",
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div uiDialogRoot [uiOpen]="open()" (uiOpenChange)="open.set($event)">
      <ng-template uiDialogPortal>
        <div uiDialogOverlay></div>
        <div
          uiDialogContent
          class="cn-command-dialog top-1/3 translate-y-0 overflow-hidden p-0"
          [showCloseButton]="showCloseButton()"
        >
          <div uiDialogHeader class="sr-only">
            <h2 uiDialogTitle>{{ title() }}</h2>
            <p uiDialogDescription>{{ description() }}</p>
          </div>
          @if (palette(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          }
        </div>
      </ng-template>
    </div>
  `,
})
export class CommandDialogComponent {
  /** Two-way open state (React `open` / `onOpenChange`). */
  readonly open = model<boolean>(false)
  readonly title = input<string>("Command Palette")
  readonly description = input<string>("Search for a command to run...")
  readonly showCloseButton = input(false, { transform: booleanAttribute })

  /** The palette, provided by the caller as a projected `<ng-template>`. */
  private readonly palette = contentChild(TemplateRef)
}
