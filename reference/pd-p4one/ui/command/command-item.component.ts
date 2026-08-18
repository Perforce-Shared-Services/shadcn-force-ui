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
  output,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { cn } from '@/app/lib/utils';

import { CommandRootService } from './command-root.service';
import { COMMAND_GROUP } from './command-group.token';
import { COMMAND_CHECK_SVG } from './command.icons';

/**
 * `[uiCommandItem]` — one selectable row (registry `CommandItem`). Renders
 * projected content + a trailing check indicator that shows only when the item
 * is `checked` and has no shortcut (registry behaviour).
 *
 * Deviations from the registry class string (all deliberate, documented):
 *  - `[&_svg]:fill-current` — Material Symbols SVGs carry no `fill` (skill §9).
 *  - `transition-colors motion-reduce:transition-none` — subtle highlight fade,
 *    reduced-motion guarded (WCAG 2.3.3).
 *  - `cursor-default` → `cursor-pointer` — the row IS clickable; matches
 *    `ui/select`'s item and reads as interactive (the registry's `cursor-default`
 *    made the palette feel static).
 *  - highlight `data-selected:bg-muted text-foreground` → `bg-accent
 *    text-accent-foreground` — aligns the highlight token with `ui/select` +
 *    `ui/dropdown-menu` (DS consistency) and matches the Figma hover text
 *    (`base/accent-foreground`). `--accent` == `--muted` in light; marginally
 *    lighter in dark.
 *
 *   <div uiCommandItem (select)="open(v)">Open latest version</div>
 *   <div uiCommandItem [checked]="v === current" value="Character rig">…</div>
 *
 * cmdk item semantics reproduced here (no radix-ng backing): the item registers
 * with the root (fuzzy value = explicit `value` or its text, plus `keywords`);
 * it is hidden when it scores 0 for the current search; it becomes the
 * highlight on pointer-move and on keyboard navigation; Enter or click fires
 * `select`. a11y: `role="option"`, `aria-selected` tracks the highlight,
 * `aria-disabled` on disabled rows (which stay visible but inert, WCAG 4.1.2).
 */
@Component({
  selector: '[uiCommandItem]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content />
    <span
      data-slot="command-item-check"
      class="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100 [&>svg]:size-4 [&>svg]:fill-current"
      aria-hidden="true"
      [innerHTML]="checkIcon"
    ></span>
  `,
  host: {
    'data-slot': 'command-item',
    role: 'option',
    '[id]': 'id',
    '[attr.data-selected]': "active() ? 'true' : null",
    '[attr.data-disabled]': "disabled() ? 'true' : null",
    '[attr.data-checked]': "checked() ? 'true' : null",
    '[attr.aria-selected]': 'active()',
    '[attr.aria-disabled]': "disabled() ? 'true' : null",
    '[hidden]': '!visible()',
    '[class]': 'classes()',
    '(pointermove)': 'onPointerMove()',
    '(click)': 'activate()',
  },
})
export class CommandItemComponent {
  private readonly root = inject(CommandRootService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly group = inject(COMMAND_GROUP, { optional: true });

  /** Explicit fuzzy value; falls back to the item's text content. */
  readonly value = input<string | undefined>(undefined);
  /** Extra terms folded into the fuzzy match (cmdk `keywords`). */
  readonly keywords = input<string[]>([]);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Shows the trailing check (a chosen value, combobox-style). */
  readonly checked = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Fired on Enter / click when the item is enabled (cmdk `onSelect`). */
  readonly select = output<void>();

  protected readonly id = this.root.nextId();

  protected readonly active = computed(() => this.root.isActive(this.id));
  protected readonly visible = computed(() => this.root.isVisible(this.id));

  /** Sanitizer-trusted inline check SVG (bundled, static — bypass is safe). */
  protected readonly checkIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    COMMAND_CHECK_SVG,
  );

  protected readonly classes = computed(() =>
    cn(
      "group/command-item relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none transition-colors motion-reduce:transition-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-accent data-selected:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:fill-current data-selected:*:[svg]:text-accent-foreground",
      this.className(),
    ),
  );

  constructor() {
    this.root.register({
      id: this.id,
      value: this.value() ?? '',
      keywords: this.keywords(),
      disabled: this.disabled(),
      groupId: this.group?.groupId ?? null,
      activate: () => this.activate(),
      scrollIntoView: () =>
        (this.el.nativeElement as HTMLElement).scrollIntoView({ block: 'nearest' }),
    });

    // keep the registry entry in sync with input changes
    effect(() =>
      this.root.updateItem(this.id, {
        value: this.value() ?? this.textValue(),
        keywords: this.keywords(),
        disabled: this.disabled(),
      }),
    );

    // once projected content exists, derive the fuzzy value from text if the
    // caller gave none (cmdk defaults `value` to the item's text content)
    afterNextRender(() => {
      if (!this.value()) {
        this.root.updateItem(this.id, { value: this.textValue() });
      }
    });
  }

  private textValue(): string {
    return (this.el.nativeElement as HTMLElement).textContent?.trim() ?? '';
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
    this.select.emit();
  }
}
