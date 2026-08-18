import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { cn } from '@/app/lib/utils';
import { Separator } from '@/app/ui/separator';

import { ComboboxRootService } from './combobox-root.service';

/**
 * `[uiComboboxSeparator]` — a hairline between item groups (base-ui
 * `Combobox.Separator`). Reuses the shared `ui/separator` for the line rather
 * than re-declaring `bg-border h-px`; the host is a thin marker carrying
 * `data-slot="combobox-separator"`. It hides while a query is active (a filtered
 * list has no stable group boundaries, so a dangling divider would look broken).
 *
 * The inner separator is left DECORATIVE (`ui/separator` default → `role="none"`):
 * `role="separator"` is NOT a permitted child of `role="listbox"`, so a semantic
 * separator here would be an ARIA violation — the group `role` + label convey
 * structure. `-mx-1` bleeds the line to the panel edges.
 */
@Component({
  selector: '[uiComboboxSeparator]',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<div uiSeparator [class]="innerClass()"></div>',
  host: {
    'data-slot': 'combobox-separator',
    '[hidden]': 'searching()',
  },
})
export class ComboboxSeparatorComponent {
  private readonly root = inject(ComboboxRootService);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly innerClass = computed(() => cn('-mx-1 my-1', this.className()));
  protected readonly searching = computed(() => this.root.inputValue().trim().length > 0);
}
