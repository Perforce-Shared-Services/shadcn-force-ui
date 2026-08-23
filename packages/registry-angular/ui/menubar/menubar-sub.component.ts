import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, input } from "@angular/core"
import {
  RdxMenuPopup,
  RdxMenuPositioner,
  RdxMenuRoot,
  RdxMenuSubTrigger,
} from "@radix-ng/primitives/menu"


import { cn } from "@/lib/utils"

import { MENUBAR_CHEVRON_RIGHT_SVG } from "./menubar.icons"

/**
 * Angular ports of `MenubarSub`, `MenubarSubTrigger` and
 * `MenubarSubContent`. radix-ng v1.x models a submenu as a nested root: an
 * element carrying the same menu-root primitive wraps the sub-trigger and its
 * own positioner + popup. The outer popup discovers the sub-trigger element
 * for keyboard navigation automatically.
 *
 *   <div uiMenubarSub>
 *     <button uiMenubarSubTrigger>Share</button>
 *     <div uiMenubarSubContent>…items…</div>
 *   </div>
 */

/** Angular port of `MenubarSub` — the nested submenu root. */
@Directive({
  selector: "[uiMenubarSub]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuRoot,
      inputs: ["modal", "dir"],
    },
  ],
  host: {
    "data-slot": "menubar-sub",
  },
})
export class MenubarSubDirective {}

/**
 * Angular port of `MenubarSubTrigger` — opens the nested panel on hover or
 * arrow-right. Renders the projected content plus a trailing chevron
 * (registry IconPlaceholder ChevronRight), flipped in RTL via `cn-rtl-flip`.
 */
@Component({
  selector: "button[uiMenubarSubTrigger]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxMenuSubTrigger,
      inputs: ["disabled", "openOnHover", "delay", "closeDelay"],
    },
  ],
  host: {
    "data-slot": "menubar-sub-trigger",
    "[attr.data-inset]": "inset() ? '' : null",
    "[class]": "classes()",
  },
  template: `
    <ng-content />
    <svg
      aria-hidden="true"
      focusable="false"
      class="cn-rtl-flip ml-auto [&_svg]:size-4 [&_svg]:fill-current"
      [innerHTML]="chevron"
    ></svg>
  `,
})
export class MenubarSubTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly inset = input(false, { transform: booleanAttribute })
  protected readonly chevron = MENUBAR_CHEVRON_RIGHT_SVG

  protected readonly classes = computed(() =>
    cn(
      "cn-menubar-sub-trigger flex w-full cursor-default items-center outline-none select-none transition-colors motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current",
      this.className()
    )
  )
}

/**
 * Angular port of `MenubarSubContent` — the nested floating panel. Same
 * positioner + popup composition as the top-level content, with the
 * `cn-menubar-sub-content` token (smaller shadow, min-width).
 */
@Component({
  selector: "div[uiMenubarSubContent]",
  standalone: true,
  imports: [RdxMenuPopup],
  templateUrl: "./menubar-sub.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxMenuPositioner }],
  host: {
    "data-slot": "menubar-sub-content",
  },
})
export class MenubarSubContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly popupClasses = computed(() =>
    cn("cn-menubar-sub-content cn-menu-target cn-menu-translucent z-50 outline-none", this.className())
  )
}
