import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { ComboboxRootService } from './combobox-root.service';

/**
 * `input[uiComboboxChipsInput]` — the text field that lives INSIDE the chips
 * toolbar (base-ui `Combobox.Chips.Input`). Unlike `ComboboxInput`, it is NOT
 * wrapped in `ui/input-group` — it sits inside the chips container's own chrome,
 * so it's a bare transparent `<input>` (registry `min-w-16 flex-1 outline-none`).
 *
 *   <input uiComboboxChipsInput placeholder="Add framework" />
 *
 * `role="combobox"` owning the listbox (`aria-controls` / `aria-expanded` /
 * `aria-activedescendant`, WCAG 4.1.2). Backspace on an EMPTY field removes the
 * last chip (base-ui multi-select behaviour). Typing drives the collator filter.
 */
@Component({
  selector: 'input[uiComboboxChipsInput]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  host: {
    'data-slot': 'combobox-chip-input',
    type: 'text',
    role: 'combobox',
    autocomplete: 'off',
    autocorrect: 'off',
    autocapitalize: 'off',
    spellcheck: 'false',
    'aria-autocomplete': 'list',
    '[attr.aria-label]': 'accessibleName()',
    '[attr.aria-expanded]': "root.open() ? 'true' : 'false'",
    '[attr.aria-controls]': 'root.open() ? root.listId() : null',
    '[attr.aria-activedescendant]': 'root.activeDescendantId()',
    '[attr.aria-invalid]': 'ariaInvalid() || null',
    '[attr.placeholder]': 'placeholder()',
    '[attr.disabled]': 'root.disabled() || disabled() ? "" : null',
    '[attr.readonly]': 'root.readOnly() ? "" : null',
    '[value]': 'root.inputValue()',
    '[class]': 'classes()',
    '(input)': 'onInput($event)',
    '(focus)': 'onOpenIntent()',
    '(click)': 'onOpenIntent()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ComboboxChipsInputComponent {
  protected readonly root = inject(ComboboxRootService);

  readonly placeholder = input<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaInvalid = input(false, { transform: booleanAttribute, alias: 'aria-invalid' });
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly accessibleName = computed(
    () => this.ariaLabel() ?? (this.placeholder() || 'Search'),
  );

  protected readonly classes = computed(() =>
    cn('min-w-16 flex-1 bg-transparent outline-none placeholder:text-muted-foreground', this.className()),
  );

  protected onInput(event: Event): void {
    this.root.inputValue.set((event.target as HTMLInputElement).value);
    if (!this.root.open() && !this.root.disabled() && !this.root.readOnly()) {
      this.root.open.set(true);
    }
  }

  protected onOpenIntent(): void {
    if (this.root.openOnInputClick() && !this.root.disabled() && !this.root.readOnly()) {
      this.root.open.set(true);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Backspace on an empty field removes the last chip (base-ui).
    if (event.key === 'Backspace' && this.root.inputValue().length === 0) {
      if (this.root.selected().length > 0) {
        event.preventDefault();
        this.root.removeLast();
      }
    }
  }
}
