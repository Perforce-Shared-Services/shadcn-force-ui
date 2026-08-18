import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ComboboxRootService } from './combobox-root.service';

/**
 * `[uiComboboxClear]` — a button that clears the selection and input text
 * (base-ui `Combobox.Clear`). Compose it with a styled button; it carries
 * `data-visible` when there is something to clear so callers can hide it via CSS:
 *
 *   <button uiInputGroupButton variant="ghost" size="icon-xs" uiComboboxClear>
 *     <ui-icon …></ui-icon>
 *   </button>
 *
 * For the field-style combobox, `[uiComboboxInput] showClear` renders this inline
 * — this standalone part is for custom compositions.
 */
@Component({
  selector: '[uiComboboxClear]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    'data-slot': 'combobox-clear',
    'aria-label': 'Clear selection',
    '[attr.data-visible]': "visible() ? '' : null",
    '[attr.disabled]': "root.disabled() ? '' : null",
    '(click)': 'clear($event)',
  },
})
export class ComboboxClearComponent {
  protected readonly root = inject(ComboboxRootService);

  protected readonly visible = computed(
    () => this.root.selected().length > 0 || this.root.inputValue().length > 0,
  );

  protected clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.root.disabled() || this.root.readOnly()) {
      return;
    }
    this.root.clearSelection();
  }
}
