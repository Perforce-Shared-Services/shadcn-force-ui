import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  inject,
  input,
  model,
  TemplateRef,
  untracked,
  viewChild,
} from '@angular/core';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/ui/dialog';
import { RdxDialogRef, RdxDialogService } from '@radix-ng/primitives/dialog';

/**
 * Angular port of @force-ui/command's `CommandDialog` — the palette shown in a
 * modal overlay (⌘K style). The React version wraps the declarative
 * `<Dialog>`; this app's dialog is **CDK-Dialog / service based** (see
 * `dialog/index.ts`), so `CommandDialog` is a controlled element that opens the
 * palette through `RdxDialogService` when `open` flips true and closes it when
 * `open` flips false (or the dialog is dismissed via Escape / backdrop, which
 * flows back through `closed$`).
 *
 * The palette must be provided as a **projected `<ng-template>`**, NOT as bare
 * children: CDK stamps the dialog body outside this component's view, and
 * `<ng-content>` does not project across that portal boundary (it renders
 * empty). The template — declared in the caller's view — is picked up via
 * `contentChild` and rendered with `ngTemplateOutlet` inside the dialog chrome,
 * so the palette's own content projects normally.
 *
 *   <button uiButton (click)="open = true">Open command palette</button>
 *   <ui-command-dialog [(open)]="open" title="Command palette"
 *                      description="Search versions, experiments and actions">
 *     <ng-template>
 *       <div uiCommand>
 *         <div uiCommandInput placeholder="Type a command or search…"></div>
 *         <div uiCommandList>…</div>
 *       </div>
 *     </ng-template>
 *   </ui-command-dialog>
 *
 * Parity notes / divergences from the registry string:
 *  - `showCloseButton` defaults to false (registry) and is forwarded to
 *    `DialogContent`.
 *  - The sr-only `DialogTitle` / `DialogDescription` name the dialog (WCAG
 *    1.3.1 / 4.1.2) via `DialogContent`'s content-query aria wiring.
 *  - `top-1/3 translate-y-0` from the registry is **inert** here — CDK centers
 *    the pane and the panel must not self-position (same treatment as
 *    `DialogContent`'s dropped `fixed` classes). Override placement via a CDK
 *    config if a top-third anchor is required.
 *
 * Requires `provideRdxDialogConfig()` in the application providers (as any
 * CDK-dialog usage in this app does); the service instance is provided here.
 */
@Component({
  selector: 'ui-command-dialog',
  standalone: true,
  imports: [NgTemplateOutlet, DialogContent, DialogHeader, DialogTitle, DialogDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The dialog *trigger* directive self-provides RdxDialogService; CommandDialog
  // has no trigger and opens imperatively, so it provides the service itself.
  providers: [RdxDialogService],
  host: { 'data-slot': 'command-dialog' },
  template: `
    <ng-template #body>
      <div
        rdxDialogContent
        [showCloseButton]="showCloseButton()"
        class="overflow-hidden rounded-xl! p-0"
      >
        <div rdxDialogHeader class="sr-only">
          <h2 rdxDialogTitle>{{ title() }}</h2>
          <p rdxDialogDescription>{{ description() }}</p>
        </div>
        @if (palette()) {
          <ng-container [ngTemplateOutlet]="palette()!" />
        }
      </div>
    </ng-template>
  `,
})
export class CommandDialogComponent {
  private readonly dialog = inject(RdxDialogService);

  readonly open = model<boolean>(false);
  readonly title = input<string>('Command palette');
  readonly description = input<string>('Search and choose an action');
  readonly showCloseButton = input(false, { transform: booleanAttribute });

  /** The palette, provided by the caller as a projected `<ng-template>`. */
  private readonly palette = contentChild(TemplateRef);
  private readonly body = viewChild.required('body', { read: TemplateRef<void> });
  private ref: RdxDialogRef<void> | null = null;

  constructor() {
    effect(() => {
      const shouldOpen = this.open();
      const template = this.body();
      // `RdxDialogService.open` sets up its own internal `effect()`, which is
      // illegal inside a reactive context (NG0602). Read the signals tracked
      // (above) but run the open/close outside the effect's consumer.
      untracked(() => {
        if (shouldOpen && !this.ref) {
          this.ref = this.dialog.open<void>({ content: template });
          // Escape / backdrop dismissal closes the CDK dialog — mirror to `open`.
          this.ref.closed$.subscribe(() => {
            this.ref = null;
            this.open.set(false);
          });
        } else if (!shouldOpen && this.ref) {
          this.ref.close();
        }
      });
    });
  }
}
