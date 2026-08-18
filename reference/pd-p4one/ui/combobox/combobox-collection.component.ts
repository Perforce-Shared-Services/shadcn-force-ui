import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * `[uiComboboxCollection]` — a transparent wrapper for a group's items (base-ui
 * `Combobox.Collection`). In React, Collection is a render-prop that maps a
 * group's `items` array; in Angular the caller iterates with `@for`, so this is a
 * `display:contents` passthrough that only exists for registry API parity and to
 * keep the DOM shape (`data-slot="combobox-collection"`) consistent.
 *
 *   <div uiComboboxCollection>
 *     @for (item of group.items; track item) {
 *       <div uiComboboxItem [value]="item">{{ item.label }}</div>
 *     }
 *   </div>
 */
@Component({
  selector: '[uiComboboxCollection]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    'data-slot': 'combobox-collection',
    class: 'contents',
  },
})
export class ComboboxCollectionComponent {}
