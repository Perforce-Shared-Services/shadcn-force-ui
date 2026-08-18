import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  isDevMode,
  model,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/app/ui/input-group';

import { CommandRootService } from './command-root.service';
import { COMMAND_SEARCH_SVG } from './command.icons';

/**
 * `[uiCommandInput]` — the palette's search field. Applied to a container:
 *
 *   <div uiCommandInput placeholder="Search versions and experiments"></div>
 *
 * Reuse (Figma composes the same parts — verified via Code Connect): the field
 * is our `ui/input-group` in the **filled** style (`InputGroup variant="filled"`
 * → `bg-muted` + `border-border`, matching the Figma `Style=filled` input) with
 * a leading search-icon `InputGroupAddon` and our `InputGroupInput` as the inner
 * control. We do NOT hand-roll the input or paste the registry's `bg-input/30`
 * fill — that rendered darker than the design. The group's focus-within ring
 * fires off `InputGroupInput`'s `data-slot="input-group-control"`.
 *
 * The inner control is a `role="combobox"` that owns the `CommandList` listbox
 * (`aria-controls`), reflects open state (`aria-expanded`), and points
 * `aria-activedescendant` at the highlighted option so screen readers announce
 * the keyboard-highlighted item without moving DOM focus (WCAG 4.1.2) — all of
 * which sit fine on `InputGroupInput` (it's a native `<input>`). The value is
 * two-way (`value` model) and drives the root's fuzzy filter.
 *
 * Parity note: the inner control's `data-slot` is `input-group-control` (from
 * InputGroupInput, which the group's focus-within selector needs), not the
 * registry's `data-slot="command-input"` — a deliberate reuse trade-off.
 */
@Component({
  selector: '[uiCommandInput]',
  standalone: true,
  imports: [InputGroup, InputGroupAddon, InputGroupInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'command-input-wrapper',
    class: 'p-1 pb-0',
  },
  template: `
    <div uiInputGroup variant="filled" class="*:data-[slot=input-group-addon]:pl-2!">
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
        [attr.aria-expanded]="root.isEmpty() ? 'false' : 'true'"
        [attr.aria-controls]="root.listId()"
        [attr.aria-activedescendant]="root.activeDescendantId()"
        [attr.placeholder]="placeholder()"
        [attr.disabled]="disabled() ? '' : null"
        [value]="value()"
        (input)="onInput($event)"
        class="text-sm"
      />
      <div uiInputGroupAddon>
        <span
          class="size-4 shrink-0 opacity-50 [&>svg]:size-4 [&>svg]:fill-current"
          aria-hidden="true"
          [innerHTML]="searchIcon"
        ></span>
      </div>
    </div>
  `,
})
export class CommandInputComponent {
  protected readonly root = inject(CommandRootService);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly placeholder = input<string>('');
  readonly disabled = input(false);
  /**
   * Accessible name for the combobox (WCAG 4.1.2). A placeholder is NOT an
   * accessible name, so this is always emitted as `aria-label`: an explicit
   * `aria-label` wins, else the placeholder text is reused as the name, else a
   * generic "Search". Mirrors `CommandList`'s `aria-label` convention.
   */
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Two-way search text (cmdk `value` / `onValueChange`). */
  readonly value = model<string>('');

  protected readonly accessibleName = computed(
    () => this.ariaLabel() ?? (this.placeholder() || 'Search'),
  );

  /** Sanitizer-trusted inline search SVG (bundled, static — bypass is safe). */
  protected readonly searchIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    COMMAND_SEARCH_SVG,
  );

  constructor() {
    // `[uiCommandInput]` is a CONTAINER component — it renders its own
    // InputGroup + inner combobox `<input>`. Applying it to an `<input>`
    // produces invalid nested inputs (`<input><div><input>>`), which steals
    // focus onto the outer element and breaks keyboard nav / aria-activedescendant.
    // Guard loudly in dev; the selector can't forbid a tag, so warn instead.
    if (isDevMode() && (this.host.nativeElement as HTMLElement).tagName === 'INPUT') {
      console.warn(
        '[uiCommandInput] must be applied to a container element (e.g. <div uiCommandInput>), not <input>. ' +
          'It renders its own inner search input; nesting inside <input> breaks focus and keyboard navigation.',
      );
    }

    // value (typed or externally set) is the single source; mirror it into the
    // root store. The root's own effect re-anchors the highlight on search change.
    effect(() => {
      this.root.search.set(this.value());
    });
  }

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
