import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/lib/utils';

import { COMBOBOX_GROUP } from './combobox-group.token';

let labelIdCounter = 0;

/**
 * `[uiComboboxLabel]` — a group heading (base-ui `Combobox.GroupLabel`; the Force
 * UI registry exports it as `ComboboxLabel`). Registers its id with the enclosing
 * `ComboboxGroup` so the group's `aria-labelledby` points here (WCAG 1.3.1).
 *
 *   <div uiComboboxGroup>
 *     <div uiComboboxLabel>Europe</div>
 *     …
 *   </div>
 */
@Component({
  selector: '[uiComboboxLabel]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./combobox-label.component.html",
  host: {
    'data-slot': 'combobox-label',
    '[id]': 'id',
    '[class]': 'classes()',
  },
})
export class ComboboxLabelComponent {
  private readonly group = inject(COMBOBOX_GROUP, { optional: true });

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly id = `combobox-label-${labelIdCounter++}`;

  protected readonly classes = computed(() =>
    cn('cn-combobox-label font-medium', this.className()),
  );

  constructor() {
    this.group?.labelId.set(this.id);
  }
}
