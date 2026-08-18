import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import {
  itemMediaVariants,
  itemVariants,
  type ItemMediaVariant,
  type ItemSize,
  type ItemVariant,
} from "./item.variants"

/**
 * Angular port of @force-ui/item (radix-force-ui style).
 *
 * A list-row primitive: media (icon/image/avatar) + title/description +
 * actions, optionally grouped with ItemGroup / ItemSeparator.
 *
 * All sub-components use attribute selectors so the host element's semantics
 * are caller-controlled — an `<a uiItem href="…">` is Angular's equivalent of
 * React's `asChild` / Vue's `as-child`, no extra prop needed.
 *
 * Usage:
 *   <div uiItem variant="outline">
 *     <div uiItemMedia variant="icon"><svg>…</svg></div>
 *     <div uiItemContent>
 *       <div uiItemTitle>Title</div>
 *       <p uiItemDescription>Description</p>
 *     </div>
 *     <div uiItemActions><button uiButton size="sm">Action</button></div>
 *   </div>
 */
@Component({
  selector: "[uiItem]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
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
  selector: "[uiItemGroup]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "list",
    "data-slot": "item-group",
    "[class]": "classes()",
  },
})
export class ItemGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-item-group group/item-group flex w-full flex-col", this.className())
  )
}

/**
 * ItemSeparator is self-contained rather than composed with SeparatorComponent.
 *
 * React renders `<Separator data-slot="item-separator" …/>`, but Angular
 * refuses to instantiate two components on one host element (NG0300), so
 * `<div uiSeparator uiItemSeparator>` is not a legal translation while
 * SeparatorComponent is a @Component. This class therefore replicates
 * SeparatorComponent's base classes and host attributes for the fixed
 * horizontal, decorative case React hardcodes, producing the same DOM as the
 * React source. Keep the base class string in sync with
 * ui/separator/separator.component.ts. See DIVERGENCES.md §item-1.
 */
@Component({
  selector: "[uiItemSeparator]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-separator",
    role: "none",
    "data-orientation": "horizontal",
    "[class]": "classes()",
  },
})
export class ItemSeparatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
      "cn-item-separator",
      this.className()
    )
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
    "[class]": "classes()",
  },
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
    "[class]": "classes()",
  },
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
    "[class]": "classes()",
  },
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
    "[class]": "classes()",
  },
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
    "[class]": "classes()",
  },
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
    "[class]": "classes()",
  },
})
export class ItemHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-item-header flex basis-full items-center justify-between",
      this.className()
    )
  )
}

@Component({
  selector: "[uiItemFooter]",
  standalone: true,
  templateUrl: "./item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "item-footer",
    "[class]": "classes()",
  },
})
export class ItemFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-item-footer flex basis-full items-center justify-between",
      this.className()
    )
  )
}
