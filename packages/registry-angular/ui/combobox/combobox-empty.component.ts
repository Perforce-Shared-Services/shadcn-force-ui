import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/lib/utils';

import { ComboboxRootService } from './combobox-root.service';

/**
 * `[uiComboboxEmpty]` — the "no matches" message, shown only when the filtered
 * list is empty (base-ui `Combobox.Empty` / `data-empty`).
 *
 *   <div uiComboboxEmpty>No frameworks found.</div>
 *
 * `role="status"` (WCAG 4.1.3) so a screen reader announces the caller's own
 * empty text when the results collapse — the root's result-count live region
 * stays silent at zero to avoid announcing two strings for one state (mirrors the
 * command port). Write the copy per the Force writing guide (what + why/next).
 */
@Component({
  selector: '[uiComboboxEmpty]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./combobox-empty.component.html",
  host: {
    'data-slot': 'combobox-empty',
    role: 'status',
    '[hidden]': '!empty()',
    '[class]': 'classes()',
  },
})
export class ComboboxEmptyComponent {
  private readonly root = inject(ComboboxRootService);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  protected readonly empty = this.root.isEmpty;

  protected readonly classes = computed(() =>
    cn('cn-combobox-empty', this.className()),
  );
}
