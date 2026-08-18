import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';

import { cn } from '@/app/lib/utils';

import { COMBOBOX_GROUP } from './combobox-group.token';
import { ComboboxRootService } from './combobox-root.service';

let groupIdCounter = 0;

/**
 * `[uiComboboxGroup]` — a labelled cluster of items (base-ui `Combobox.Group`).
 *
 *   <div uiComboboxGroup>
 *     <div uiComboboxLabel>Europe</div>
 *     <div uiComboboxItem [value]="…">…</div>
 *   </div>
 *
 * It provides `COMBOBOX_GROUP` so nested items report their `groupId` to the root;
 * when the filter leaves the group with no visible items the whole group is hidden
 * (base-ui behaviour). a11y: `role="group"` named by its child `ComboboxLabel` via
 * `aria-labelledby` (WCAG 1.3.1) — a bare group is nameless to SRs.
 */
@Component({
  selector: '[uiComboboxGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: COMBOBOX_GROUP,
      useFactory: () => ({
        groupId: `combobox-group-${groupIdCounter++}`,
        labelId: signal<string | null>(null),
      }),
    },
  ],
  template: '<ng-content />',
  host: {
    'data-slot': 'combobox-group',
    role: 'group',
    '[attr.aria-labelledby]': 'ctx.labelId()',
    '[hidden]': '!visible()',
    '[class]': 'classes()',
  },
})
export class ComboboxGroupComponent {
  private readonly root = inject(ComboboxRootService);
  protected readonly ctx = inject(COMBOBOX_GROUP);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly visible = computed(() => this.root.isGroupVisible(this.ctx.groupId));

  protected readonly classes = computed(() => cn(this.className()));
}
