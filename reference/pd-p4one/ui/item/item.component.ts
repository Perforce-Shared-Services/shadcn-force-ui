import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { cn } from '@/app/lib/utils';
import { SEPARATOR_BASE_CLASS, type SeparatorOrientation } from '../separator/separator.component';

import {
  itemMediaVariants,
  itemVariants,
  type ItemMediaVariant,
  type ItemSize,
  type ItemVariant,
} from './item.variants';

/**
 * Angular port of @force-ui/item (radix-force-ui style).
 *
 * A generic list-row primitive — a bordered row combining a leading
 * media/icon slot, a title + description content block, and a trailing
 * actions slot. Attribute selectors — each sub-component decorates whatever
 * host element the caller writes with the registry class string plus the
 * `data-slot` attribute that Force UI's selector-based theming and the
 * cross-framework test suites rely on for parity with the React/Vue/Svelte
 * siblings.
 *
 * Usage:
 *   <div uiItemGroup>
 *     <div uiItem role="listitem" variant="outline">
 *       <div uiItemMedia variant="icon"><svg ...></svg></div>
 *       <div uiItemContent>
 *         <div uiItemTitle>main.blend</div>
 *         <p uiItemDescription>Modified 2 hours ago</p>
 *       </div>
 *       <div uiItemActions><button uiButton size="sm">Open</button></div>
 *     </div>
 *     <div uiItemSeparator></div>
 *     <div uiItem role="listitem" variant="outline">…</div>
 *   </div>
 *
 * `ItemGroup`'s `role="list"` (registry-verbatim) creates an ARIA
 * required-owned-elements relationship: every direct row needs
 * `role="listitem"` or an axe `aria-required-children` violation follows —
 * `Item` does not default this role itself (see Accessibility below), so
 * always include it when composing rows inside a group.
 *
 * `ItemHeader` / `ItemFooter` are for rows that need a second wrapped line
 * (e.g. a title row plus a full-width footer of secondary actions) — they are
 * optional; most rows only need `ItemMedia` + `ItemContent` + `ItemActions`.
 *
 * `ItemSeparator` reproduces `ui/separator`'s host logic directly against the
 * shared `SEPARATOR_BASE_CLASS` constant (Angular attribute selectors can't
 * nest one `@Component` inside another the way the registry's
 * `<Separator>`-wrapping composition does — same pattern as
 * `ui/button-group`'s `ButtonGroupSeparator`).
 *
 * Accessibility:
 * - `ItemGroup` carries `role="list"` (matches the registry) so assistive
 *   tech announces the row count; give each `Item` `role="listitem"` when it
 *   is purely informational, or leave the role off when `Item` hosts a link/
 *   button (the interactive element already has its own semantics).
 * - Decorative media carries `aria-hidden="true"` on its svg. Media that
 *   conveys meaning needs an `aria-label` / `role="img"` instead (WCAG 1.1.1).
 * - Make the title a real heading element when the row is a standalone card
 *   (e.g. `<h3 uiItemTitle>`); inside a list row plain text is usually
 *   correct. The attribute selector keeps the host tag, so the semantic
 *   level is the caller's choice.
 * - The row's `focus-visible` ring is dormant on a plain `<div uiItem>` (no
 *   default `tabindex`/interactive role) — it only activates when the caller
 *   hosts `[uiItem]` on a focusable element (`<a>`, `<button>`) or adds an
 *   explicit `tabindex`.
 * - `ItemTitle`/`ItemDescription` truncate visually (`line-clamp-1`/`-2`)
 *   with no built-in overflow disclosure. Pair with `ui/tooltip` when the
 *   content (a long filename, a long experiment name) is likely to clip.
 */
@Component({
  selector: '[uiItemGroup]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'list',
    'data-slot': 'item-group',
    '[class]': 'classes()',
  },
})
export class ItemGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiItemSeparator]',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item-separator',
    '[attr.role]': "decorative() ? 'none' : 'separator'",
    '[attr.aria-orientation]':
      "!decorative() && orientation() === 'vertical' ? 'vertical' : null",
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
})
export class ItemSeparatorComponent {
  readonly orientation = input<SeparatorOrientation>('horizontal');
  readonly decorative = input(true, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(SEPARATOR_BASE_CLASS, 'my-2', this.className()),
  );
}

@Component({
  selector: '[uiItem]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': 'classes()',
  },
})
export class ItemComponent {
  readonly variant = input<ItemVariant>('default');
  readonly size = input<ItemSize>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(itemVariants({ variant: this.variant(), size: this.size() }), this.className()),
  );
}

@Component({
  selector: '[uiItemMedia]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item-media',
    '[attr.data-variant]': 'variant()',
    '[class]': 'classes()',
  },
})
export class ItemMediaComponent {
  readonly variant = input<ItemMediaVariant>('default');
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(itemMediaVariants({ variant: this.variant() }), this.className()),
  );
}

@Component({
  selector: '[uiItemContent]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item-content',
    '[class]': 'classes()',
  },
})
export class ItemContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiItemTitle]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item-title',
    '[class]': 'classes()',
  },
})
export class ItemTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      // `text-foreground` is an app-compat addition to the registry string
      // (same rationale as card/empty titles): this app ships a global
      // heading typography (@vex) that recolors a bare heading element, so a
      // semantic heading host (recommended for a11y) would otherwise lose the
      // title color. Pinning to foreground keeps it correct on any host tag
      // and equals the registry's inherited color anyway.
      'line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium text-foreground underline-offset-4',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiItemDescription]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item-description',
    '[class]': 'classes()',
  },
})
export class ItemDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn(
      'line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
      this.className(),
    ),
  );
}

@Component({
  selector: '[uiItemActions]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item-actions',
    '[class]': 'classes()',
  },
})
export class ItemActionsComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() => cn('flex items-center gap-2', this.className()));
}

@Component({
  selector: '[uiItemHeader]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item-header',
    '[class]': 'classes()',
  },
})
export class ItemHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('flex basis-full items-center justify-between gap-2', this.className()),
  );
}

@Component({
  selector: '[uiItemFooter]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'item-footer',
    '[class]': 'classes()',
  },
})
export class ItemFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  protected readonly classes = computed(() =>
    cn('flex basis-full items-center justify-between gap-2', this.className()),
  );
}
