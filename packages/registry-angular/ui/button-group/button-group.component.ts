import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"

import { cn } from "@/lib/utils"

import {
  buttonGroupVariants,
  type ButtonGroupOrientation,
} from "./button-group.variants"

/**
 * Angular port of @force-ui/button-group (radix-force-ui style) — root.
 *
 * NOT a composition of buttonVariants: the root is its own layout cva
 * (border/radius trimming between adjacent children), not a reuse of
 * `buttonVariants`. `ui/button`'s own size axis already carries the
 * `in-data-[slot=button-group]:rounded-lg` counterpart class, so a plain
 * `<button uiButton>` child needs no extra wiring to sit correctly inside
 * this group — it just has to be a `[data-slot=button-group]` descendant,
 * which this root supplies.
 *
 * Attribute selector on a native `<div>`:
 *   <div uiButtonGroup>
 *     <button uiButton variant="outline">Copy</button>
 *     <button uiButton variant="outline">Share</button>
 *   </div>
 *   <div uiButtonGroup orientation="vertical">…</div>
 *
 * DEVIATION FROM REGISTRY-VERBATIM (documented): the React source reads
 * `data-orientation={orientation}` off the RAW (possibly-`undefined`) prop,
 * so an unset `orientation` renders the `horizontal` classes but omits the
 * attribute entirely. This port always resolves `orientation()` to its
 * default and emits `data-orientation` from that same resolved value, so the
 * attribute and the applied classes never disagree.
 *
 * Accessibility: a button group of related actions should be a `role="group"`
 * region; give it an `aria-label` naming the group of actions.
 */
@Component({
  selector: "[uiButtonGroup]",
  standalone: true,
  templateUrl: "./button-group.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "group",
    "data-slot": "button-group",
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
 * Angular port of @force-ui/button-group's `ButtonGroupText` — a static,
 * non-interactive label/badge slot that sits between or alongside grouped
 * buttons (e.g. a page-count readout between prev/next buttons).
 *
 * Attribute selector — the host stays whatever element the caller writes:
 *   <div uiButtonGroupText>1 of 12</div>
 */
@Component({
  selector: "[uiButtonGroupText]",
  standalone: true,
  templateUrl: "./button-group-text.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "button-group-text",
    "[class]": "classes()",
  },
})
export class ButtonGroupTextComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("cn-button-group-text flex items-center [&_svg]:pointer-events-none [&_svg]:fill-current", this.className())
  )
}

/**
 * Angular port of @force-ui/button-group's `ButtonGroupSeparator`.
 *
 * The registry source wraps `<Separator>` and overrides its default
 * orientation to `vertical` plus a few classes. Angular attribute selectors
 * can't nest one @Component inside another that way, so this reproduces
 * `ui/separator`'s host logic directly with its default flipped to
 * `vertical` (reuse-the-primitive pattern from p4one's port).
 *
 *   <div uiButtonGroupSeparator></div>                       vertical (default)
 *   <div uiButtonGroupSeparator orientation="horizontal"></div>
 *
 * WAI-ARIA's separator role defaults aria-orientation to "horizontal" — that
 * default is independent of this component's visual default (vertical), so
 * only the non-default (vertical) value is ever emitted.
 */
@Component({
  selector: "[uiButtonGroupSeparator]",
  standalone: true,
  templateUrl: "./button-group-separator.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "button-group-separator",
    "[attr.role]": "decorative() ? 'none' : 'separator'",
    "[attr.aria-orientation]":
      "!decorative() && orientation() === 'vertical' ? 'vertical' : null",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
})
export class ButtonGroupSeparatorComponent {
  readonly orientation = input<ButtonGroupOrientation>("vertical")
  readonly decorative = input(true, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      // Separator base + the cn-button-group-separator token (bg-input) in
      // place of separator's bg-border, plus the group's edge-to-edge sizing
      // overrides from the registry source.
      "relative shrink-0 self-stretch data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:w-px data-[orientation=vertical]:h-auto cn-button-group-separator",
      this.className()
    )
  )
}
