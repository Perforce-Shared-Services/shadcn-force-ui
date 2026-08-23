import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/lib/utils';
import { Button } from '@/angular-ui/button';

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
  templateUrl: "./combobox-chip.component.html",
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
      'cn-combobox-chip has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50',
      this.className(),
    ),
  );

  protected remove(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.root.removeValue(this.value());
  }
}
