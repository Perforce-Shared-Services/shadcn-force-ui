import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/app/ui/input-group';

import { ComboboxRootService } from './combobox-root.service';
import { COMBOBOX_CHEVRON_SVG, COMBOBOX_CLOSE_SVG } from './combobox.icons';

/**
 * `[uiComboboxInput]` — the combobox's search/trigger field. Applied to a
 * container:
 *
 *   <div uiComboboxInput placeholder="Search framework"></div>
 *
 * Reuse ([[feedback_reuse_existing_components_first]], skill §3.5 — the registry
 * composes exactly these): our `ui/input-group` (default style) + `InputGroupInput`
 * inner control + an inline-end `InputGroupAddon` holding an `InputGroupButton`
 * chevron trigger and (optionally) a clear button. We do NOT hand-roll the field
 * or paste the registry's raw chrome classes.
 *
 * The inner control is `role="combobox"` owning the `ComboboxList` listbox
 * (`aria-controls`), reflecting open state (`aria-expanded`), and pointing
 * `aria-activedescendant` at the highlighted option so screen readers announce the
 * keyboard-highlighted item without moving DOM focus (WCAG 4.1.2). The text value
 * is two-way through the store (`inputValue`) and drives the collator filter.
 * `aria-autocomplete="list"` (base-ui default).
 *
 * The input registers itself as the popup anchor (`root.anchorEl`) unless a
 * `ComboboxChips` container has already claimed it (multi-select). Clicking or
 * focusing the field opens the popup when `openOnInputClick`.
 */
@Component({
  selector: '[uiComboboxInput]',
  standalone: true,
  imports: [InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'combobox-input-wrapper',
    // Strip a stray `aria-label` off the wrapper div: consumers write it on the
    // host (it feeds our `ariaLabel` input, forwarded to the inner combobox
    // input), but a bare `aria-label` on a roleless <div> is prohibited ARIA
    // (axe `aria-prohibited-attr`). The value is already captured in the signal.
    '[attr.aria-label]': 'null',
  },
  template: `
    <div uiInputGroup>
      <input
        uiInputGroupInput
        type="text"
        role="combobox"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        aria-autocomplete="list"
        [attr.aria-label]="accessibleName()"
        [attr.aria-expanded]="root.open() ? 'true' : 'false'"
        [attr.aria-controls]="root.open() ? root.listId() : null"
        [attr.aria-activedescendant]="root.activeDescendantId()"
        [attr.aria-invalid]="ariaInvalid() || null"
        [attr.placeholder]="placeholder()"
        [attr.disabled]="root.disabled() || disabled() ? '' : null"
        [attr.readonly]="root.readOnly() ? '' : null"
        [value]="root.inputValue()"
        (input)="onInput($event)"
        (focus)="onOpenIntent()"
        (click)="onOpenIntent()"
      />
      <div uiInputGroupAddon align="inline-end">
        @if (showClear() && hasValue()) {
          <button
            type="button"
            uiInputGroupButton
            variant="ghost"
            size="icon-xs"
            data-slot="combobox-clear"
            aria-label="Clear selection"
            class="hover:bg-transparent disabled:bg-transparent"
            [disabled]="root.disabled() || disabled()"
            (click)="clear($event)"
          >
            <span class="[&>svg]:size-4 [&>svg]:fill-current" aria-hidden="true" [innerHTML]="closeIcon"></span>
          </button>
        }
        @if (showTrigger()) {
          <button
            type="button"
            uiInputGroupButton
            variant="ghost"
            size="icon-xs"
            data-slot="combobox-trigger"
            [attr.aria-label]="root.open() ? 'Hide suggestions' : 'Show suggestions'"
            tabindex="-1"
            class="hover:bg-transparent disabled:bg-transparent"
            [disabled]="root.disabled() || disabled()"
            (click)="toggle($event)"
          >
            <span
              class="pointer-events-none size-4 text-muted-foreground transition-transform duration-150 motion-reduce:transition-none [&>svg]:size-4 [&>svg]:fill-current"
              [class.rotate-180]="root.open()"
              aria-hidden="true"
              [innerHTML]="chevronIcon"
            ></span>
          </button>
        }
      </div>
    </div>
  `,
})
export class ComboboxInputComponent {
  protected readonly root = inject(ComboboxRootService);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly placeholder = input<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Show the chevron trigger button (base-ui/registry `showTrigger`, default true). */
  readonly showTrigger = input(true, { transform: booleanAttribute });
  /** Show the clear button when there's a value (registry `showClear`, default false). */
  readonly showClear = input(false, { transform: booleanAttribute });
  readonly ariaInvalid = input(false, { transform: booleanAttribute, alias: 'aria-invalid' });
  /** Accessible name (a placeholder is NOT a name — WCAG 4.1.2). */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly accessibleName = computed(
    () => this.ariaLabel() ?? (this.placeholder() || 'Search'),
  );

  protected readonly hasValue = computed(
    () => this.root.selected().length > 0 || this.root.inputValue().length > 0,
  );

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly chevronIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    COMBOBOX_CHEVRON_SVG,
  );
  protected readonly closeIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    COMBOBOX_CLOSE_SVG,
  );

  constructor() {
    // Claim the popup anchor unless a chips container already set it.
    effect(() => {
      if (!this.root.anchorEl()) {
        const group = (this.host.nativeElement as HTMLElement).querySelector(
          '[data-slot="input-group"]',
        ) as HTMLElement | null;
        this.root.anchorEl.set(group ?? (this.host.nativeElement as HTMLElement));
      }
    });
  }

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

  protected toggle(event: Event): void {
    event.preventDefault();
    if (this.root.disabled() || this.root.readOnly()) {
      return;
    }
    this.root.open.set(!this.root.open());
  }

  protected clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.root.clearSelection();
  }
}
