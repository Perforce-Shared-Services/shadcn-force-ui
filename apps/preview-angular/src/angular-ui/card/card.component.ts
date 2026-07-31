import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

export type CardSize = "default" | "sm"

/**
 * Angular port of @force-ui/card (radix-force-ui style).
 *
 * All sub-components use attribute selectors so the host element's semantics
 * are caller-controlled. Use a real heading element for CardTitle:
 *   <h3 uiCardTitle>Settings</h3>
 *
 * Usage:
 *   <div uiCard>
 *     <div uiCardHeader>
 *       <h3 uiCardTitle>Title</h3>
 *       <p uiCardDescription>Description</p>
 *       <div uiCardAction><button uiButton size="sm">Edit</button></div>
 *     </div>
 *     <div uiCardContent>…</div>
 *     <div uiCardFooter>…</div>
 *   </div>
 */
@Component({
  selector: "[uiCard]",
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "card",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class CardComponent {
  readonly size = input<CardSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-card group/card flex flex-col", this.className())
  )
}

@Component({
  selector: "[uiCardHeader]",
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "card-header",
    "[class]": "classes()",
  },
})
export class CardHeaderComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "cn-card-header group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
      this.className()
    )
  )
}

@Component({
  selector: "[uiCardTitle]",
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "card-title",
    "[class]": "classes()",
  },
})
export class CardTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-card-title cn-font-heading", this.className())
  )
}

@Component({
  selector: "[uiCardDescription]",
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "card-description",
    "[class]": "classes()",
  },
})
export class CardDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-card-description", this.className())
  )
}

@Component({
  selector: "[uiCardAction]",
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "card-action",
    "[class]": "classes()",
  },
})
export class CardActionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", this.className())
  )
}

@Component({
  selector: "[uiCardContent]",
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "card-content",
    "[class]": "classes()",
  },
})
export class CardContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-card-content", this.className())
  )
}

@Component({
  selector: "[uiCardFooter]",
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "card-footer",
    "[class]": "classes()",
  },
})
export class CardFooterComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // border-border added explicitly: Tailwind v4 removed the global border-color
  // reset so bare border-t resolves to currentColor. See DIVERGENCES.md §card-3.
  protected readonly classes = computed(() =>
    cn("cn-card-footer flex items-center border-border", this.className())
  )
}
