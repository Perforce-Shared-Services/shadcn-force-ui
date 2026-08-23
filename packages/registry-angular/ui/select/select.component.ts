import { ChangeDetectionStrategy, Component, computed, contentChild, Directive, inject, input } from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"
import {
  RdxSelectGroup,
  RdxSelectGroupLabel,
  RdxSelectItem,
  RdxSelectItemIndicator,
  RdxSelectItemText,
  RdxSelectList,
  RdxSelectPortal,
  RdxSelectPopup,
  RdxSelectPositioner,
  RdxSelectRoot,
  RdxSelectScrollDownButton,
  RdxSelectScrollUpButton,
  RdxSelectSeparator,
  RdxSelectTrigger,
  RdxSelectValue,
} from "@radix-ng/primitives/select"

import { cn } from "@/lib/utils"

import {
  SELECT_ITEM_INDICATOR_SVG,
  SELECT_SCROLL_DOWN_SVG,
  SELECT_SCROLL_UP_SVG,
  SELECT_TRIGGER_ICON_SVG,
} from "./select.icons"
import { SELECT_CONTENT_BASE, SELECT_ITEM_BASE, SELECT_TRIGGER_BASE } from "./select.variants"

/**
 * Angular port of @force-ui/select (radix-force-ui style), built on
 * @radix-ng/primitives/select v1.x — the same declarative composition as the
 * React registry (root → trigger → value → portal → positioner → popup),
 * not p4one's v0.50 API (where the root was a component that could not be
 * re-selector'd; v1.x ships it as a plain `[rdxSelectRoot]` directive).
 *
 * Part mapping (React → Angular):
 *
 *   <Select>               → <div uiSelect defaultValue="apple">
 *   <SelectTrigger size>   → <button uiSelectTrigger size="sm">
 *   <SelectValue>          → <span uiSelectValue placeholder="…">
 *   <SelectContent>        → <ng-template uiSelectPortal>
 *                              <div uiSelectPositioner>
 *                                <div uiSelectContent>…
 *   <SelectGroup>          → <div uiSelectGroup>
 *   <SelectLabel>          → <div uiSelectLabel>
 *   <SelectItem>           → <div uiSelectItem value="apple">
 *   <SelectSeparator>      → <div uiSelectSeparator>
 *
 * Usage:
 *   <div uiSelect defaultValue="apple">
 *     <button uiSelectTrigger class="w-full max-w-48">
 *       <span uiSelectValue placeholder="Select a fruit"></span>
 *     </button>
 *     <ng-template uiSelectPortal>
 *       <div uiSelectPositioner>
 *         <div uiSelectContent>
 *           <div uiSelectGroup>
 *             <div uiSelectLabel>Fruits</div>
 *             <div uiSelectItem value="apple">Apple</div>
 *           </div>
 *         </div>
 *       </div>
 *     </ng-template>
 *   </div>
 *
 * radix-ng owns the a11y wiring: combobox/listbox/option roles,
 * active-descendant arrow navigation, typeahead, Escape dismissal and the
 * data-open/data-closed/data-side attributes the tokens animate off.
 * Selection is uncontrolled by default (`defaultValue`); bind `[uiValue]` +
 * `(uiValueChange)` for the controlled form.
 */

/** Angular port of `Select` (the root). Owns open/value state for all parts. */
@Directive({
  selector: "[uiSelect]",
  standalone: true,
  hostDirectives: [
    {
      directive: RdxSelectRoot,
      inputs: ["defaultValue", "value: uiValue", "disabled", "required", "multiple", "dir"],
      outputs: ["valueChange: uiValueChange"],
    },
  ],
  host: {
    "data-slot": "select",
  },
})
export class SelectRootDirective {}

/**
 * Angular port of `SelectTrigger`. Attribute selector on a native `<button>` —
 * keeps native semantics (Angular's idiomatic equivalent of React's `asChild`).
 * MUST contain a `<span uiSelectValue>`. The chevron rotates while the panel is
 * open (off radix-ng's `data-state`, motion-reduce-guarded in the token).
 */
@Component({
  selector: "button[uiSelectTrigger]",
  standalone: true,
  imports: [RdxSelectTrigger],
  templateUrl: "./select-trigger.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxSelectTrigger }],
  host: {
    "data-slot": "select-trigger",
    "[attr.data-size]": 'size()',
    "[class]": "classes()",
  },
})
export class SelectTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  readonly size = input<"default" | "sm">("default")

  /**
   * Sanitizer-trusted inline SVG chevron — bundled static string, not user
   * input (Angular strips `<svg>` from a raw `[innerHTML]` string otherwise).
   */
  protected readonly triggerIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    SELECT_TRIGGER_ICON_SVG,
  )

  protected readonly classes = computed(() =>
    cn(SELECT_TRIGGER_BASE, this.className()),
  )
}

/**
 * Angular port of `SelectValue` — renders the selected label or the
 * `placeholder` when nothing is selected (radix-ng resolves the label from the
 * matching item's text content).
 */
@Directive({
  selector: "span[uiSelectValue]",
  standalone: true,
  hostDirectives: [{ directive: RdxSelectValue, inputs: ["placeholder"] }],
  host: {
    "data-slot": "select-value",
    class: "flex flex-1 items-center gap-1.5 line-clamp-1 text-left",
  },
})
export class SelectValueDirective {}

/**
 * Angular port of `SelectPortal` — renders the dropdown at the document root.
 */
@Directive({
  selector: "ng-template[uiSelectPortal]",
  standalone: true,
  hostDirectives: [{ directive: RdxSelectPortal }],
})
export class SelectPortalDirective {}

/**
 * Thin positioning wrapper (collision flipping, trigger-width vars). Placement
 * inputs are owned by radix-ng v1.x — documented parity shift vs React's
 * per-use `position` / `align` props.
 */
@Directive({
  selector: "[uiSelectPositioner]",
  standalone: true,
  hostDirectives: [{ directive: RdxSelectPositioner }],
  host: {
    "data-slot": "select-positioner",
  },
})
export class SelectPositionerDirective {}

/**
 * Angular port of `SelectContent` — the floating panel. Carries the popup
 * primitive (roles, highlight navigation, data-open/closed animation hooks)
 * plus the scroll buttons flanking the scrolling item list.
 */
@Component({
  selector: "div[uiSelectContent]",
  standalone: true,
  imports: [RdxSelectPopup, RdxSelectList, RdxSelectScrollUpButton, RdxSelectScrollDownButton],
  templateUrl: "./select.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: RdxSelectPopup }],
  host: {
    "data-slot": "select-content",
    "[class]": "classes()",
  },
})
export class SelectContentComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly scrollUpIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    SELECT_SCROLL_UP_SVG,
  )
  protected readonly scrollDownIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    SELECT_SCROLL_DOWN_SVG,
  )

  protected readonly classes = computed(() =>
    cn(
      SELECT_CONTENT_BASE,
      "cn-select-content",
      // Dark-mode inversion marker for the design-system provider.
      "cn-menu-target",
      // Frosted-glass popup treatment (matches React base select.tsx).
      "cn-menu-translucent",
      // RTL-aware slide-in directions.
      "cn-select-content-logical",
      this.className(),
    ),
  )
}

/** Angular port of `SelectGroup` — groups label + items, pads them. */
@Directive({
  selector: "[uiSelectGroup]",
  standalone: true,
  hostDirectives: [{ directive: RdxSelectGroup }],
  host: {
    "data-slot": "select-group",
    class: "cn-select-group",
    // WCAG 4.1.2: the group needs an accessible name from its label.
    "[attr.aria-labelledby]": "labelId()",
  },
})
export class SelectGroupDirective {
  private readonly label = contentChild(SelectLabelDirective)

  protected readonly labelId = computed(() => this.label()?.labelId ?? null)
}

let nextSelectLabelId = 0

/** Angular port of `SelectLabel` — group heading. */
@Directive({
  selector: "[uiSelectLabel]",
  standalone: true,
  hostDirectives: [{ directive: RdxSelectGroupLabel }],
  host: {
    "data-slot": "select-label",
    class: "cn-select-label",
  },
})
export class SelectLabelDirective {
  /** Stable id consumed by the sibling `SelectGroupDirective` aria binding. */
  readonly labelId = `ui-select-label-${++nextSelectLabelId}`
}

/**
 * Angular port of `SelectItem`. The check indicator renders before the item
 * text (React DOM order) so the token's `*:[span]:last:*` layout rules target
 * the text slot.
 */
@Component({
  selector: "div[uiSelectItem]",
  standalone: true,
  imports: [RdxSelectItemIndicator, RdxSelectItemText],
  templateUrl: "./select-item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RdxSelectItem,
      inputs: ["value", "textValue", "disabled"],
    },
  ],
  host: {
    "data-slot": "select-item",
    "[class]": "classes()",
  },
})
export class SelectItemComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly indicatorIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    SELECT_ITEM_INDICATOR_SVG,
  )

  protected readonly classes = computed(() =>
    cn(SELECT_ITEM_BASE, "cn-select-item", this.className()),
  )
}

/** Angular port of `SelectSeparator`. */
@Directive({
  selector: "[uiSelectSeparator]",
  standalone: true,
  hostDirectives: [{ directive: RdxSelectSeparator }],
  host: {
    "data-slot": "select-separator",
    class: "cn-select-separator pointer-events-none",
    "aria-hidden": "true",
  },
})
export class SelectSeparatorDirective {}
