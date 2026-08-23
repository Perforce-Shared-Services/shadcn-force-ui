import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from "@angular/core"

import { cn } from "@/lib/utils"
import {
  itemMediaVariants,
  itemVariants,
  type ItemMediaVariant,
  type ItemSize,
  type ItemVariant
} from "./item.variants"

/**
 * Angular port of @force-ui/item (force-ui style).
 *
 * Attribute selectors — each part decorates whatever host element the caller
 * writes, preserving native semantics (Angular's idiomatic equivalent of
 * React's asChild). Host an Item on `<a>` to get a clickable row; the
 * `[a]:hover:bg-muted` / focus-ring classes in cn-item activate there.
 *
 * Usage:
 *   <div uiItemGroup>
 *     <a href="#" uiItem variant="outline" role="listitem">
 *       <div uiItemMedia variant="icon"><svg …/></div>
 *       <div uiItemContent>
 *         <div uiItemTitle>Title</div>
 *         <p uiItemDescription>Description</p>
 *       </div>
 *       <div uiItemActions>…</div>
 *     </a>
 *   </div>
 *
 * ItemGroup carries `role="list"` (registry-verbatim); give each purely
 * informational row `role="listitem"` or an axe aria-required-children
 * violation follows.
 *
 * ItemSeparator reproduces ui/separator's host classes inline — Angular
 * attribute selectors cannot nest one component inside another (same pattern
 * as p4one's SEPARATOR_BASE_CLASS reuse).
 */
@Component({
  selector: "[uiItemGroup]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "list",
    "data-slot": "item-group",
    "[class]": "classes()"
  }
})
export class ItemGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-item-group group/item-group flex w-full flex-col", this.className())
  )
}

@Component({
  selector: "[uiItemSeparator]",
  standalone: true,
  templateUrl: "./item-separator.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-separator",
    "[attr.role]": "decorative() ? 'none' : 'separator'",
    "[attr.aria-orientation]":
      "!decorative() && orientation() === 'vertical' ? 'vertical' : null",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()"
  }
})
export class ItemSeparatorComponent {
  readonly orientation = input<"horizontal" | "vertical">("horizontal")
  readonly decorative = input(true, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      // SeparatorComponent's host classes (see DIVERGENCES.md §separator-1 —
      // data-[orientation] variants directly, cn-separator* tokens unused).
      "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
      "cn-item-separator",
      this.className()
    )
  )
}

@Component({
  selector: "[uiItem]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "classes()"
  }
})
export class ItemComponent {
  readonly variant = input<ItemVariant>("default")
  readonly size = input<ItemSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(itemVariants({ variant: this.variant(), size: this.size() }), this.className())
  )
}

@Component({
  selector: "[uiItemMedia]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-media",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()"
  }
})
export class ItemMediaComponent {
  readonly variant = input<ItemMediaVariant>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(itemMediaVariants({ variant: this.variant() }), this.className())
  )
}

@Component({
  selector: "[uiItemContent]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-content",
    "[class]": "classes()"
  }
})
export class ItemContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-item-content flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none",
      this.className()
    )
  )
}

@Component({
  selector: "[uiItemTitle]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-title",
    "[class]": "classes()"
  }
})
export class ItemTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-item-title line-clamp-1 flex w-fit items-center", this.className())
  )
}

@Component({
  selector: "[uiItemDescription]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-description",
    "[class]": "classes()"
  }
})
export class ItemDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-item-description line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
      this.className()
    )
  )
}

@Component({
  selector: "[uiItemActions]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-actions",
    "[class]": "classes()"
  }
})
export class ItemActionsComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-item-actions flex items-center", this.className())
  )
}

@Component({
  selector: "[uiItemHeader]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-header",
    "[class]": "classes()"
  }
})
export class ItemHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-item-header flex basis-full items-center justify-between", this.className())
  )
}

@Component({
  selector: "[uiItemFooter]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-footer",
    "[class]": "classes()"
  }
})
export class ItemFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-item-footer flex basis-full items-center justify-between", this.className())
  )
}
