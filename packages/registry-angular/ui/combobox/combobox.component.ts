import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
  untracked,
} from '@angular/core';

import { cn } from '@/lib/utils';

import type { ComboboxContains } from './combobox.filter';
import {
  ComboboxRootService,
  type ComboboxAutoHighlight,
  type ComboboxSelectionMode,
} from './combobox-root.service';

/**
 * Angular port of `@force-ui/combobox` (radix-force-ui style), which wraps the
 * `@base-ui/react` Combobox primitive. There is no Angular/radix-ng combobox
 * primitive, so the store (selection, input text, open state, collator filter,
 * highlight) is reimplemented in `ComboboxRootService` (provided here) — the
 * combobox sibling of the `command` port. See `combobox.filter.ts` for the
 * collator "contains" matcher and the index barrel for the parity map.
 *
 * Attribute selector so the host stays a plain element:
 *   <div uiCombobox [(value)]="framework">
 *     <div uiComboboxInput placeholder="Search framework"></div>
 *     <ng-template uiComboboxContent>
 *       <div uiComboboxEmpty>No frameworks found.</div>
 *       <div uiComboboxList>
 *         <div uiComboboxItem [value]="f" *ngFor="let f of frameworks">{{ f }}</div>
 *       </div>
 *     </ng-template>
 *   </div>
 *
 * Keyboard model (base-ui parity, WCAG 2.1.1): the root owns keydown so bindings
 * work from the input. ArrowDown/Up move the highlight over selectable visible
 * items (wrap when `loopFocus`); Home/End jump; Enter selects the highlighted
 * item; Escape closes. The highlighted item carries `data-highlighted` and is
 * referenced by the input's `aria-activedescendant`.
 */
@Component({
  selector: '[uiCombobox]',
  standalone: true,
  templateUrl: "./combobox.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ComboboxRootService],
  host: {
    'data-slot': 'combobox',
    '[class]': 'classes()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ComboboxComponent {
  protected readonly root = inject(ComboboxRootService);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** base-ui `selectionMode` — 'none' | 'single' | 'multiple'. Default 'single'. */
  readonly selectionMode = input<ComboboxSelectionMode>('single');
  /** Convenience for `selectionMode="multiple"` (registry wrapper `multiple`). */
  readonly multiple = input(false, { transform: booleanAttribute });

  /** Two-way selection. Single: a value | null. Multiple: an array of values. */
  readonly value = model<unknown>(null);
  /** Two-way popup open state. */
  readonly open = model<boolean>(false);

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readOnly = input(false, { transform: booleanAttribute });
  readonly loopFocus = input(true, { transform: booleanAttribute });
  readonly openOnInputClick = input(true, { transform: booleanAttribute });
  readonly autoHighlight = input<ComboboxAutoHighlight>(false);
  /** Max items rendered after filtering; -1 = unlimited (base-ui `limit`). */
  readonly limit = input(-1);
  /** When false the caller pre-filters and every item stays visible. */
  readonly shouldFilter = input(true, { transform: booleanAttribute });
  /** Override the collator matcher, or pass null to disable internal filtering. */
  readonly filter = input<ComboboxContains | null | undefined>(undefined);
  /** Value equality for object items (base-ui `isItemEqualToValue`). */
  readonly isItemEqualToValue = input<((a: unknown, b: unknown) => boolean) | undefined>(
    undefined,
  );

  protected readonly announcement = this.root.resultsAnnouncement;

  protected readonly classes = () => cn('relative', this.className());

  constructor() {
    // ── mirror config inputs into the store ──────────────────────────────────
    effect(() =>
      this.root.selectionMode.set(this.multiple() ? 'multiple' : this.selectionMode()),
    );
    effect(() => this.root.disabled.set(this.disabled()));
    effect(() => this.root.readOnly.set(this.readOnly()));
    effect(() => this.root.loopFocus.set(this.loopFocus()));
    effect(() => this.root.openOnInputClick.set(this.openOnInputClick()));
    effect(() => this.root.autoHighlight.set(this.autoHighlight()));
    effect(() => this.root.limit.set(this.limit()));
    effect(() => this.root.shouldFilter.set(this.shouldFilter()));
    effect(() => {
      const fn = this.filter();
      if (fn !== undefined) {
        this.root.setFilter(fn);
      }
    });
    effect(() => {
      const eq = this.isItemEqualToValue();
      if (eq) {
        this.root.setIsEqual(eq);
      }
    });

    // ── two-way `value` ⇄ store.selected ─────────────────────────────────────
    // value → store: normalise to the store's internal array.
    effect(() => {
      const v = this.value();
      const arr = Array.isArray(v) ? v : v == null ? [] : [v];
      untracked(() => {
        if (!this.sameSelection(arr, this.root.selected())) {
          this.root.selected.set(arr);
        }
      });
    });
    // store → value: emit single value | array to match the mode.
    effect(() => {
      const sel = this.root.selected();
      const out: unknown = this.root.multiple() ? sel : (sel[0] ?? null);
      untracked(() => {
        const cur = this.value();
        const curArr = Array.isArray(cur) ? cur : cur == null ? [] : [cur];
        if (!this.sameSelection(sel, curArr)) {
          this.value.set(out);
        }
      });
    });

    // ── two-way `open` ⇄ store.open ──────────────────────────────────────────
    effect(() => {
      const o = this.open();
      untracked(() => {
        if (this.root.open() !== o) {
          this.root.open.set(o);
        }
      });
    });
    effect(() => {
      const o = this.root.open();
      untracked(() => {
        if (this.open() !== o) {
          this.open.set(o);
        }
      });
    });
  }

  private sameSelection(a: readonly unknown[], b: readonly unknown[]): boolean {
    return a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.root.open()) {
          this.root.open.set(true);
        } else {
          this.root.move(1);
          this.root.scrollActiveIntoView();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.root.open()) {
          this.root.open.set(true);
        } else {
          this.root.move(-1);
          this.root.scrollActiveIntoView();
        }
        break;
      case 'Home':
        if (this.root.open()) {
          event.preventDefault();
          this.root.first();
          this.root.scrollActiveIntoView();
        }
        break;
      case 'End':
        if (this.root.open()) {
          event.preventDefault();
          this.root.last();
          this.root.scrollActiveIntoView();
        }
        break;
      case 'Enter':
        if (this.root.open() && this.root.selectActive()) {
          event.preventDefault();
        }
        break;
      case 'Escape':
        if (this.root.open()) {
          event.preventDefault();
          this.root.open.set(false);
          // cancel any in-progress filter (revert single to its label, else clear)
          this.root.resetQueryToSelection();
        }
        break;
      default:
        break;
    }
  }
}
