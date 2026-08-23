import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"

import {
  bubbleReactionsVariants,
  bubbleVariants,
  type BubbleAlign,
  type BubbleReactionsAlign,
  type BubbleReactionsSide,
  type BubbleVariant,
} from "./bubble.variants"

/**
 * Angular port of the Force UI `bubble` primitive (radix base).
 *
 * Attribute selectors — each decorates whatever host element the caller
 * writes, preserving native element semantics (Angular's asChild equivalent).
 * `Bubble`'s `variant` colors every slotted `BubbleContent` via the
 * `*:data-[slot=bubble-content]:...` descendant selector in the cn-bubble-*
 * CSS tokens — set the variant on the outer `Bubble`.
 */
@Component({
  selector: "[uiBubbleGroup]",
  standalone: true,
  templateUrl: "./bubble-group.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "bubble-group",
    "[class]": "classes()",
  },
})
export class BubbleGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() => cn("cn-bubble-group flex min-w-0 flex-col", this.className()))
}

@Component({
  selector: "[uiBubble]",
  standalone: true,
  templateUrl: "./bubble.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "bubble",
    "[attr.data-variant]": "variant()",
    "[attr.data-align]": "align()",
    "[class]": "classes()",
  },
})
export class BubbleComponent {
  readonly variant = input<BubbleVariant>("default")
  readonly align = input<BubbleAlign>("start")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(bubbleVariants({ variant: this.variant() }), this.className()),
  )
}

@Component({
  selector: "[uiBubbleContent]",
  standalone: true,
  templateUrl: "./bubble-content.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "bubble-content",
    "[class]": "classes()",
  },
})
export class BubbleContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      // p4one app-compat additions over cn-bubble-content (kept at component level):
      // overflow/min-w guards + motion-reduce guard for the transition-colors clause.
      "cn-bubble-content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word [button]:text-left [button,a]:transition-colors motion-reduce:transition-none",
      this.className(),
    ),
  )
}

@Component({
  selector: "[uiBubbleReactions]",
  standalone: true,
  templateUrl: "./bubble-reactions.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "bubble-reactions",
    "[attr.data-align]": "align()",
    "[attr.data-side]": "side()",
    "[class]": "classes()",
  },
})
export class BubbleReactionsComponent {
  readonly side = input<BubbleReactionsSide>("bottom")
  readonly align = input<BubbleReactionsAlign>("end")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(bubbleReactionsVariants({ side: this.side(), align: this.align() }), this.className()),
  )
}
