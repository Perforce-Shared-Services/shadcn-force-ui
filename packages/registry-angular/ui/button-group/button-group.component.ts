import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core"

import { cn } from "@/lib/utils"
import { buttonGroupVariants, type ButtonGroupOrientation } from "./button-group.variants"

export type ButtonGroupSeparatorOrientation = "horizontal" | "vertical"

/**
 * Angular port of @force-ui/button-group (radix-force-ui style).
 *
 * All sub-components use attribute selectors so the host element's semantics
 * are caller-controlled.
 *
 * Usage:
 *   <div uiButtonGroup>
 *     <button uiButton variant="outline">Archive</button>
 *     <div uiButtonGroupSeparator></div>
 *     <button uiButton variant="outline">Report</button>
 *   </div>
 *
 *   <div uiButtonGroup orientation="vertical">…</div>
 */
@Component({
  selector: "[uiButtonGroup]",
  standalone: true,
  templateUrl: "./button-group.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "button-group",
    role: "group",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
})
export class ButtonGroupComponent {
  readonly orientation = input<ButtonGroupOrientation>("horizontal")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(buttonGroupVariants({ orientation: this.orientation() }), this.className())
  )
}

/**
 * Text/label segment inside a button group.
 *
 * React's `asChild` has no Angular equivalent — put the attribute selector on
 * whichever element you need instead (see DIVERGENCES.md §button-group-3):
 *   <div uiButtonGroupText>https://</div>
 *   <label uiButtonGroupText for="url">https://</label>
 */
@Component({
  selector: "[uiButtonGroupText]",
  standalone: true,
  templateUrl: "./button-group.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "button-group-text",
    "[class]": "classes()",
  },
})
export class ButtonGroupTextComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // [&_svg]:fill-current added for Material Symbols (see DIVERGENCES.md §button-2).
  protected readonly classes = computed(() =>
    cn(
      "cn-button-group-text flex items-center [&_svg]:pointer-events-none [&_svg]:fill-current",
      this.className()
    )
  )
}

/**
 * Divider between segments of a button group. Defaults to `vertical`
 * (the opposite of ButtonGroup's own default), matching the registry source.
 *
 * Self-contained rather than composing SeparatorComponent: Angular's
 * hostDirectives API cannot target a @Component (see DIVERGENCES.md
 * §button-group-2), so the few separator host bindings are duplicated here.
 */
@Component({
  selector: "[uiButtonGroupSeparator]",
  standalone: true,
  templateUrl: "./button-group.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "button-group-separator",
    role: "none",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
})
export class ButtonGroupSeparatorComponent {
  readonly orientation = input<ButtonGroupSeparatorOrientation>("vertical")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  // Separator base classes + the button-group-separator overrides, pre-merged
  // (the registry source composes <Separator> and lets cn() dedupe them).
  // data-[orientation=…] is used instead of the data-horizontal:/data-vertical:
  // custom variants, matching the Angular separator (see DIVERGENCES.md §separator-1).
  protected readonly classes = computed(() =>
    cn(
      "cn-button-group-separator relative shrink-0 self-stretch bg-border data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
      this.className()
    )
  )
}
