import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/lib/utils';

import { ComboboxRootService } from './combobox-root.service';

/**
 * `[uiComboboxValue]` — renders the current single selection's label, or the
 * `placeholder` when nothing is selected (base-ui `Combobox.Value`). Used inside a
 * `ComboboxTrigger` for the button-style combobox (base-ui `ComboboxInPopup`).
 *
 *   <button uiComboboxTrigger><span uiComboboxValue placeholder="Select country"></span></button>
 *
 * Multi-select rendering is done with chips (`ComboboxChips`), not here.
 */
@Component({
  selector: '[uiComboboxValue]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./combobox-value.component.html",
  host: {
    'data-slot': 'combobox-value',
    '[class]': 'classes()',
    '[attr.data-placeholder]': 'isPlaceholder() ? "" : null',
  },
})
export class ComboboxValueComponent {
  private readonly root = inject(ComboboxRootService);

  readonly placeholder = input<string>('');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  private readonly label = computed(() => this.root.labelFor(this.root.selectedSingle()));
  protected readonly isPlaceholder = computed(() => !this.label());
  protected readonly display = computed(() => this.label() ?? this.placeholder());

  protected readonly classes = computed(() =>
    cn('truncate data-[placeholder]:text-muted-foreground', this.className()),
  );
}
