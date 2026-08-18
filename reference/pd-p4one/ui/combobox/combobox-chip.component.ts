import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';
import { Button } from '@/app/ui/button';

import { ComboboxRootService } from './combobox-root.service';
import { COMBOBOX_CLOSE_SVG } from './combobox.icons';

/**
 * `[uiComboboxChip]` — one selected value in the multi-select chips container
 * (base-ui `Combobox.Chip`), with an inline remove button (base-ui
 * `Combobox.ChipRemove`, rendered via the shared `ui/button` ghost icon-xs, as
 * the registry does). `showRemove` (default true) omits it.
 *
 *   <span uiComboboxChip [value]="framework">{{ framework }}</span>
 *
 * The chip visual is registry-verbatim (`bg-muted text-xs font-medium`); it is
 * deliberately NOT `ui/badge` — badge is `bg-secondary`, the wrong token here.
 * Removing fires `root.removeValue(value)`.
 */
@Component({
  selector: '[uiComboboxChip]',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content />
    @if (showRemove()) {
      <button
        uiButton
        variant="ghost"
        size="icon-xs"
        type="button"
        data-slot="combobox-chip-remove"
        class="-ml-1 size-4 opacity-50 hover:opacity-100"
        [attr.aria-label]="removeLabel()"
        (click)="remove($event)"
      >
        <span class="[&>svg]:size-3.5 [&>svg]:fill-current" aria-hidden="true" [innerHTML]="closeIcon"></span>
      </button>
    }
  `,
  host: {
    'data-slot': 'combobox-chip',
    '[class]': 'classes()',
  },
})
export class ComboboxChipComponent {
  private readonly root = inject(ComboboxRootService);

  /** The selected value this chip represents. */
  readonly value = input<unknown>(null);
  readonly showRemove = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly closeIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    COMBOBOX_CLOSE_SVG,
  );

  protected readonly removeLabel = computed(() => {
    const label = this.root.labelFor(this.value());
    return label ? `Remove ${label}` : 'Remove';
  });

  protected readonly classes = computed(() =>
    cn(
      'flex h-[1.3125rem] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0',
      this.className(),
    ),
  );

  protected remove(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.root.removeValue(this.value());
  }
}
