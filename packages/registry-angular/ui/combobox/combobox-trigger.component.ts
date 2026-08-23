import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
} from '@angular/core';

import { ComboboxRootService } from './combobox-root.service';

/**
 * `[uiComboboxTrigger]` — a button that toggles the popup, for the button-style
 * combobox where the search input lives INSIDE the popup (base-ui
 * `ComboboxInPopup`). Compose it with `[uiButton]` for styling and a
 * `[uiComboboxValue]` for the label:
 *
 *   <button uiButton variant="outline" uiComboboxTrigger>
 *     <span uiComboboxValue placeholder="Select country"></span>
 *   </button>
 *
 * It registers itself as the popup anchor and is a DISCLOSURE button that reveals
 * the listbox: it carries `aria-haspopup="listbox"` + `aria-expanded` +
 * `aria-controls` (a valid "button that opens a listbox popup" — the same shape
 * shadcn's Popover+Command combobox trigger uses). It is deliberately NOT
 * `role="combobox"`: in this pattern the `role="combobox"` element (owning
 * `aria-activedescendant`) is the `[uiComboboxInput]` rendered INSIDE the popup,
 * not this button. For the common field-style combobox, use `[uiComboboxInput]`
 * on its own instead (it renders its own chevron trigger).
 */
@Component({
  selector: '[uiComboboxTrigger]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./combobox-trigger.component.html",
  host: {
    'data-slot': 'combobox-trigger',
    'aria-haspopup': 'listbox',
    '[attr.aria-expanded]': "root.open() ? 'true' : 'false'",
    '[attr.aria-controls]': 'root.open() ? root.listId() : null',
    '[attr.data-popup-open]': "root.open() ? '' : null",
    '[attr.disabled]': "root.disabled() ? '' : null",
    '(click)': 'toggle($event)',
  },
})
export class ComboboxTriggerComponent {
  protected readonly root = inject(ComboboxRootService);
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      if (!this.root.anchorEl()) {
        this.root.anchorEl.set(this.host.nativeElement as HTMLElement);
      }
    });
  }

  protected toggle(event: Event): void {
    event.preventDefault();
    if (this.root.disabled() || this.root.readOnly()) {
      return;
    }
    this.root.open.set(!this.root.open());
  }
}
