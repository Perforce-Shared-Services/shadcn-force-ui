import {
  afterNextRender,
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

import { cn } from '@/app/lib/utils';

import { COMBOBOX_GROUP } from './combobox-group.token';
import { ComboboxRootService } from './combobox-root.service';
import { COMBOBOX_CHECK_SVG } from './combobox.icons';

/**
 * `[uiComboboxItem]` — one selectable row (registry `ComboboxItem`), including
 * the trailing check `ItemIndicator` shown when the item is selected.
 *
 *   <div uiComboboxItem [value]="framework">{{ framework }}</div>
 *   <div uiComboboxItem [value]="country" label="Germany">🇩🇪 Germany</div>
 *
 * base-ui item semantics (no radix-ng backing): registers with the root (its
 * filter `label` = explicit `label`, else a string value, else its text content);
 * hidden when it doesn't match the query; highlighted on pointer-move and keyboard
 * nav (`data-highlighted`); click / Enter selects it (`root.selectValue`). In
 * single mode selection closes the popup; in multiple mode it toggles and keeps
 * the popup open. a11y: `role="option"`, `aria-selected` tracks membership,
 * `aria-disabled` on disabled rows (visible but inert, WCAG 4.1.2).
 *
 * Deviations (documented): `[&_svg]:fill-current` (Material Symbols carry no fill
 * — skill §9); `transition-colors motion-reduce:transition-none` (WCAG 2.3.3);
 * `cursor-default` → `cursor-pointer` (the row IS clickable; matches select +
 * command). The highlight uses the registry's `data-highlighted:bg-accent`.
 */
@Component({
  selector: '[uiComboboxItem]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content />
    <span
      data-slot="combobox-item-indicator"
      class="pointer-events-none absolute right-2 flex size-4 items-center justify-center opacity-0 group-data-[selected=true]/combobox-item:opacity-100 [&>svg]:size-4 [&>svg]:fill-current"
      aria-hidden="true"
      [innerHTML]="checkIcon"
    ></span>
  `,
  host: {
    'data-slot': 'combobox-item',
    role: 'option',
    '[id]': 'id',
    '[attr.data-highlighted]': "highlighted() ? 'true' : null",
    '[attr.data-selected]': "selected() ? 'true' : null",
    '[attr.data-disabled]': "disabled() ? 'true' : null",
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': "disabled() ? 'true' : null",
    '[hidden]': '!visible()',
    '[class]': 'classes()',
    '(pointermove)': 'onPointerMove()',
    '(click)': 'activate()',
  },
})
export class ComboboxItemComponent {
  private readonly root = inject(ComboboxRootService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly group = inject(COMBOBOX_GROUP, { optional: true });

  /** The item's value used for selection equality (any shape). */
  readonly value = input<unknown>(null);
  /** Explicit display/filter label; falls back to the string value / text content. */
  readonly label = input<string | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly id = this.root.nextId();

  protected readonly highlighted = computed(() => this.root.isActive(this.id));
  protected readonly selected = computed(() => this.root.isSelected(this.value()));
  protected readonly visible = computed(() => this.root.isVisible(this.id));

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly checkIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    COMBOBOX_CHECK_SVG,
  );

  protected readonly classes = computed(() =>
    cn(
      "group/combobox-item relative flex w-full cursor-pointer items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:fill-current",
      this.className(),
    ),
  );

  private resolveLabel(): string {
    const explicit = this.label();
    if (explicit != null) {
      return explicit;
    }
    const v = this.value();
    if (typeof v === 'string') {
      return v;
    }
    return (this.el.nativeElement as HTMLElement).textContent?.trim() ?? '';
  }

  constructor() {
    this.root.register({
      id: this.id,
      value: this.value(),
      label: this.resolveLabel(),
      disabled: this.disabled(),
      groupId: this.group?.groupId ?? null,
      activate: () => this.activate(),
      scrollIntoView: () =>
        (this.el.nativeElement as HTMLElement).scrollIntoView({ block: 'nearest' }),
    });

    effect(() =>
      this.root.updateItem(this.id, {
        value: this.value(),
        label: this.resolveLabel(),
        disabled: this.disabled(),
      }),
    );

    // derive label from text content once projected, if none was given
    afterNextRender(() => {
      if (this.label() == null && typeof this.value() !== 'string') {
        this.root.updateItem(this.id, { label: this.resolveLabel() });
      }
    });
  }

  protected onPointerMove(): void {
    if (!this.disabled()) {
      this.root.activeId.set(this.id);
    }
  }

  protected activate(): void {
    if (this.disabled()) {
      return;
    }
    this.root.activeId.set(this.id);
    this.root.selectValue(this.value());
  }
}
