import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { ComboboxRootService } from './combobox-root.service';

let listIdCounter = 0;

/**
 * `[uiComboboxList]` — the scroll container for items, groups and the empty
 * state. It is the `role="listbox"` that `ComboboxInput` (`role="combobox"`)
 * controls via `aria-controls`; a stable generated id is published to the root so
 * the input can reference it. `aria-multiselectable` reflects multi-select mode.
 *
 * One deviation from the registry: `no-scrollbar` → the `scrollbar-overlay`
 * `@utility` (thin token-styled overlay scrollbar), matching the dropdown-menu +
 * select + command panels — a hidden scrollbar hurts discoverability. Give it an
 * `aria-label` describing the choices (falls back to "Suggestions").
 */
@Component({
  selector: '[uiComboboxList]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    'data-slot': 'combobox-list',
    role: 'listbox',
    '[id]': 'id',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-multiselectable]': "multiple() ? 'true' : null",
    '[attr.data-empty]': "empty() ? '' : null",
    '[class]': 'classes()',
  },
})
export class ComboboxListComponent {
  private readonly root = inject(ComboboxRootService);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });
  readonly ariaLabel = input<string>('Suggestions', { alias: 'aria-label' });

  protected readonly id = `combobox-list-${listIdCounter++}`;
  protected readonly empty = this.root.isEmpty;
  protected readonly multiple = this.root.multiple;

  protected readonly classes = computed(() =>
    cn(
      'scrollbar-overlay max-h-[calc(24rem-2.25rem)] scroll-py-1 overflow-x-hidden overflow-y-auto overscroll-contain p-1 outline-none data-empty:p-0',
      this.className(),
    ),
  );

  constructor() {
    this.root.listId.set(this.id);
  }
}
