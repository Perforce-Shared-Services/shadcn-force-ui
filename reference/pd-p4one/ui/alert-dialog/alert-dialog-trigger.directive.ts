import { computed, DestroyRef, Directive, inject, Input, input, signal, TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  provideRdxDialog,
  type RdxDialogConfig,
  type RdxDialogRef,
  RdxDialogService,
} from '@radix-ng/primitives/dialog';

/**
 * Angular port of @force-ui/alert-dialog's `AlertDialogTrigger`.
 *
 * An alert dialog is a dialog that demands a deliberate choice — it has NO close
 * (X) button and CANNOT be dismissed by clicking the backdrop or pressing Escape;
 * the only way out is one of its footer actions. The Force spec mandates exactly
 * this for "no escape route" prompts (it uses `role="alertdialog"` so screen
 * readers announce the content immediately).
 *
 * Like the dialog port, this rides on radix-ng's CDK-Dialog-based
 * `RdxDialogService` (the same proven stack the `dialog` component uses — focus
 * trap, focus return, backdrop, data-state animation, body-scroll lock all come
 * from CDK). The alert semantics are turned on by FORCING `isAlert: true` and
 * `canCloseWithBackdrop: false` into the config on every open: `isAlert` makes
 * the CDK container `role="alertdialog"` and suppresses the backdrop-click /
 * Escape dismissal that a plain dialog wires up. Consumers can pass extra config
 * (`ariaLabel`, `panelClasses`, …) but cannot override the two alert flags — that
 * is the whole point of choosing an alert dialog over a dialog.
 *
 * The dedicated `@radix-ng/primitives/alert-dialog` primitive is intentionally
 * NOT used: it is a barebones overlay with no `data-state` (so the registry's
 * `data-open:`/`data-closed:` enter/exit animations would never fire), no
 * description part, and no config surface. Building on `RdxDialogService` keeps
 * alert-dialog architecturally identical to the shipped `dialog` and inherits its
 * accessible-name fix for free.
 *
 * Host bindings mirror the radix dialog trigger: `type="button"`,
 * `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`, `data-state`.
 * Applied to any `[uiButton]`. Re-exported as `AlertDialogTrigger`.
 *
 * Usage:
 *   <button uiButton variant="destructive" [rdxAlertDialogTrigger]="confirm">
 *     Delete version
 *   </button>
 *   <ng-template #confirm>
 *     <div rdxAlertDialogContent>
 *       <div rdxAlertDialogHeader>
 *         <h2 rdxAlertDialogTitle>Delete this version?</h2>
 *         <p rdxAlertDialogDescription>This action cannot be undone.</p>
 *       </div>
 *       <div rdxAlertDialogFooter>
 *         <button uiButton variant="outline" rdxAlertDialogCancel>Cancel</button>
 *         <button uiButton variant="destructive" rdxAlertDialogAction>Delete version</button>
 *       </div>
 *     </div>
 *   </ng-template>
 */
let nextId = 0;

/** Config a consumer may pass — the two alert flags are forced and so omitted. */
type AlertDialogTriggerConfig = Omit<
  Partial<RdxDialogConfig<unknown>>,
  'content' | 'isAlert' | 'canCloseWithBackdrop'
>;

@Directive({
  selector: '[rdxAlertDialogTrigger]',
  standalone: true,
  providers: [provideRdxDialog()],
  host: {
    type: 'button',
    'data-slot': 'alert-dialog-trigger',
    '[attr.id]': 'id()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-controls]': 'dialogId()',
    '[attr.data-state]': 'state()',
    '(click)': 'onClick()',
  },
})
export class AlertDialogTriggerDirective {
  private readonly dialogService = inject(RdxDialogService);
  private readonly destroyRef = inject(DestroyRef);

  /** The alert-dialog body template (`[rdxAlertDialogContent]` panel). Required. */
  @Input({ required: true, alias: 'rdxAlertDialogTrigger' }) dialog!: TemplateRef<unknown>;
  /** Optional extra CDK/Rdx config. `isAlert` + `canCloseWithBackdrop` are forced. */
  @Input({ alias: 'rdxAlertDialogConfig' }) dialogConfig?: AlertDialogTriggerConfig;

  readonly id = input(`rdx-alert-dialog-trigger-${nextId++}`);
  /** CDK dialog ref as a signal so `dialogId` can derive the real container ID. */
  private readonly dialogRef = signal<RdxDialogRef<unknown> | null>(null);
  /** Points to the CDK dialog container when open; absent (null) when closed. */
  protected readonly dialogId = computed(() => this.dialogRef()?.cdkRef.id ?? null);
  protected readonly isOpen = computed(() => this.dialogRef() !== null);
  protected readonly state = computed(() => (this.isOpen() ? 'open' : 'closed'));

  protected onClick(): void {
    const ref = this.dialogService.open({
      ...this.dialogConfig,
      isAlert: true,
      canCloseWithBackdrop: false,
      content: this.dialog,
    } as RdxDialogConfig<unknown>);
    this.dialogRef.set(ref);
    // closed$ completes when the dialog closes, but guard against the directive
    // being destroyed (e.g. an *ngIf nav) while a dialog is still open.
    ref.closed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.dialogRef.set(null);
    });
  }
}
