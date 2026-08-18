import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import { ComboboxRootService } from './combobox-root.service';

/**
 * `[uiComboboxChips]` — the multi-select chips container (base-ui
 * `Combobox.Chips`). Holds the selected-value chips plus a `ComboboxChipsInput`,
 * and — crucially — is the popup ANCHOR (base-ui `useComboboxAnchor`): it
 * publishes its own element to `root.anchorEl` so the popup tracks the chips box
 * as it grows with each chip, instead of the input.
 *
 *   <div uiComboboxChips>
 *     @for (v of selected(); track v) {
 *       <span uiComboboxChip [value]="v">{{ v }}</span>
 *     }
 *     <input uiComboboxChipsInput placeholder="Add framework" />
 *   </div>
 *
 * a11y: `role="toolbar"` while it holds chips (a group of controls), else no role.
 * Class string is registry-verbatim (explicit `border-input`; focus-within ring)
 * plus `motion-reduce:transition-none` (WCAG 2.3.3).
 */
@Component({
  selector: '[uiComboboxChips]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    'data-slot': 'combobox-chips',
    '[attr.role]': "hasChips() ? 'toolbar' : null",
    '[class]': 'classes()',
  },
})
export class ComboboxChipsComponent {
  private readonly root = inject(ComboboxRootService);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly hasChips = computed(() => this.root.selected().length > 0);

  protected readonly classes = computed(() =>
    cn(
      // Border tier aligned with `ui/input-group` (outline): light resting
      // `border-border` → `border-input` on hover → `border-ring` on focus-within,
      // so a chips field matches a single-select field. (Registry shipped a darker
      // resting `border-input`; we diverge for DS consistency, same as InputGroup.)
      'flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-border bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors motion-reduce:transition-none hover:border-input focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
      this.className(),
    ),
  );

  constructor() {
    // The chips container is the popup anchor (overrides the input's default).
    this.root.anchorEl.set(this.host.nativeElement as HTMLElement);
  }
}
