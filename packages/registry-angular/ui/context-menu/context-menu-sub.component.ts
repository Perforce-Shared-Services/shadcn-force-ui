import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, input } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
import {
  RdxMenuPopup,
  RdxMenuPositioner,
  RdxMenuRoot,
  RdxMenuSubTrigger,
} from "@radix-ng/primitives/menu"

import { cn } from "@/lib/utils"

import { CONTEXT_MENU_CHEVRON_RIGHT_SVG } from "./context-menu.icons"

/**
 * Angular ports of `ContextMenuSub`, `ContextMenuSubTrigger` and
 * `ContextMenuSubContent`.
 *
 * radix-ng v1.x models a submenu as a nested root: an element carrying the
 * same menu-root primitive wraps the sub-trigger and its own positioner +
 * popup. The outer popup discovers the sub-trigger element for keyboard
 * navigation automatically.
 *
 *   <div uiContextMenuSub>
 *     <button uiContextMenuSubTrigger>More Tools</button>
 *     <div uiContextMenuSubContent>…items…</div>
 *   </div>
 */

/** Angular port of `ContextMenuSub` — the nested submenu root. */
@Directive({
  selector: "[uiContextMenuSub]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxMenuRoot,
      inputs: ["modal", "dir"],
    },
  ],
  host: {
    "data-slot": "context-menu-sub",
  },
})
export class ContextMenuSubDirective {}

/**
 * Angular port of `ContextMenuSubTrigger` — opens the nested panel on hover
 * or arrow-right. Renders the projected content plus a trailing chevron
 * (registry IconPlaceholder ChevronRight), flipped in RTL via `cn-rtl-flip`.
 * Focus/open state colours come from the `cn-context-menu-sub-trigger` token;
 * the structural base stays at component level.
 */
@Component({
  selector: "button[uiContextMenuSubTrigger]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxMenuSubTrigger,
      inputs: ["disabled", "openOnHover", "delay", "closeDelay"],
    },
  ],
  host: {
    "data-slot": "context-menu-sub-trigger",
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
export class ContextMenuSubTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly inset = input(false, { transform: booleanAttribute })
  /** Sanitizer-trusted inline chevron SVG (bundled, static — bypass is safe + required). */
  protected readonly chevron: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CONTEXT_MENU_CHEVRON_RIGHT_SVG
  )

  protected readonly classes = computed(() =>
    cn(
      "cn-context-menu-sub-trigger flex w-full cursor-default items-center transition-colors motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current",
      this.className()
    )
  )
}

/**
 * Angular port of `ContextMenuSubContent` — the nested floating panel.
 * Same positioner + popup composition as the top-level content, with the
 * `cn-context-menu-sub-content` token (smaller shadow, min-width).
 */
@Component({
  selector: "div[uiContextMenuSubContent]",
  standalone: true,
  imports: [RdxMenuPopup],
  templateUrl: "./context-menu-sub.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxMenuPositioner }],
  host: {
    "data-slot": "context-menu-sub-content",
  },
})
export class ContextMenuSubContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly popupClasses = computed(() =>
    cn("cn-context-menu-sub-content z-50 outline-none", this.className())
  )
}
