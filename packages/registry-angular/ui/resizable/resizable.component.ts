import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  numberAttribute,
  OnDestroy,
  OnInit,
  signal,
} from "@angular/core"

import { cn } from "@/lib/utils"

import {
  resizableHandleIconVariants,
  resizableHandleVariants,
  resizablePanelGroupVariants,
} from "./resizable.variants"

export type ResizableDirection = "horizontal" | "vertical"

const KEYBOARD_STEP = 10

/** Fallback DOM id so an adjacent `[uiResizableHandle]` can bind `aria-controls`. */
let resizablePanelIdCounter = 0

/**
 * Angular port of @force-ui/resizable.
 *
 * Usage:
 *   <div uiResizablePanelGroup direction="horizontal">
 *     <div uiResizablePanel [defaultSize]="50">…</div>
 *     <div uiResizableHandle withHandle></div>
 *     <div uiResizablePanel [defaultSize]="50">…</div>
 *   </div>
 *
 * No `@radix-ng/primitives` or Angular CDK primitive exists for a resizable
 * splitter (checked both) — the registry wraps `react-resizable-panels`,
 * which has no Angular port. Drag/keyboard resize is hand-rolled here
 * (documented parity gap): the group wires each handle to the two panels it
 * sits between; all pointer/keyboard logic lives on the handle.
 */
@Component({
  selector: "[uiResizablePanelGroup]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "resizable-panel-group",
    "[attr.data-panel-group-direction]": "direction()",
    "[class]": "classes()",
  },
})
export class ResizablePanelGroupComponent {
  readonly direction = input<ResizableDirection>("horizontal")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  readonly elementRef = inject(ElementRef<HTMLElement>)

  private readonly panels = contentChildren(forwardRef(() => ResizablePanelComponent), {
    descendants: false,
  })
  private readonly handles = contentChildren(forwardRef(() => ResizableHandleComponent), {
    descendants: false,
  })

  protected readonly classes = computed(() =>
    cn(resizablePanelGroupVariants(), this.className())
  )

  constructor() {
    effect(() => {
      this.wireHandles(this.panels(), this.handles())
    })
  }

  private wireHandles(
    panels: readonly ResizablePanelComponent[],
    handles: readonly ResizableHandleComponent[]
  ): void {
    // Panels and handles are literal siblings — order them by DOM position,
    // same as the JSX ordering in the React registry source.
    const ordered: Array<ResizablePanelComponent | ResizableHandleComponent> = [
      ...panels,
      ...handles,
    ].sort((a, b) =>
      a.elementRef.nativeElement.compareDocumentPosition(b.elementRef.nativeElement) &
      Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1
    )

    for (let i = 0; i < ordered.length; i++) {
      const item = ordered[i]
      if (!(item instanceof ResizableHandleComponent)) continue

      const prev = ordered[i - 1]
      const next = ordered[i + 1]
      if (prev instanceof ResizablePanelComponent && next instanceof ResizablePanelComponent) {
        item.attach(this, prev, next)
      } else {
        item.attach(null, null, null)
      }
    }
  }
}

/**
 * Size is tracked as a percentage of the group's main-axis size, applied via
 * `flex-basis`. `defaultSize`/`minSize`/`maxSize` are read once — like the
 * upstream library, the panel is uncontrolled after mount; drag/keyboard
 * resize on an adjacent `[uiResizableHandle]` calls `setSize()` directly.
 */
@Component({
  selector: "[uiResizablePanel]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "resizable-panel",
    "[style.flexBasis.%]": "currentSize()",
    "[style.flexGrow]": "0",
    "[style.flexShrink]": "0",
    "[style.overflow]": "'hidden'",
    "[class]": "classes()",
  },
})
export class ResizablePanelComponent implements OnInit {
  readonly defaultSize = input(50, { transform: numberAttribute })
  readonly minSize = input(10, { transform: numberAttribute })
  readonly maxSize = input(100, { transform: numberAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  readonly elementRef = inject(ElementRef<HTMLElement>)

  private readonly size = signal<number | null>(null)

  // Re-clamps on every read (not just at `setSize()` time) so a runtime
  // `minSize`/`maxSize` change re-applies to an already-committed size.
  protected readonly currentSize = computed(() => this.clamp(this.size() ?? this.defaultSize()))
  protected readonly classes = computed(() => cn(this.className()))

  ngOnInit(): void {
    const el = this.elementRef.nativeElement
    if (!el.id) {
      el.id = `resizable-panel-${resizablePanelIdCounter++}`
    }
  }

  getSize(): number {
    return this.currentSize()
  }

  setSize(next: number): void {
    this.size.set(this.clamp(next))
  }

  private clamp(value: number): number {
    return Math.min(this.maxSize(), Math.max(this.minSize(), value))
  }
}

/**
 * Owns all drag (pointer) and keyboard resize behaviour — the group only
 * wires this instance to its adjacent `[uiResizablePanel]`s via `attach()`.
 *
 * `aria-orientation` follows the WAI-ARIA separator convention: it describes
 * the separator's OWN visual axis, which is opposite to the group's
 * `direction` — a `direction="vertical"` group (stacked panels) is divided by
 * a horizontal line, which is what the `aria-[orientation=horizontal]:`
 * styling variants target.
 *
 * Keyboard: arrow key toward the next panel grows it by 10%; Home/End jump to
 * min/max, matching `react-resizable-panels`. Escape cancels an in-progress
 * drag and reverts both panels (WCAG 2.1.2).
 */
@Component({
  selector: "[uiResizableHandle]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./resizable.component.html",
  host: {
    "data-slot": "resizable-handle",
    role: "separator",
    "[attr.tabindex]": "unattached() ? '-1' : '0'",
    "[attr.aria-disabled]": "unattached() ? 'true' : null",
    "[attr.aria-label]": "ariaLabel()",
    "[attr.aria-controls]": "ariaControls()",
    "[attr.aria-orientation]": "ariaOrientation()",
    "[attr.aria-valuenow]": "ariaValueNow()",
    "[attr.aria-valuemin]": "ariaValueMin()",
    "[attr.aria-valuemax]": "ariaValueMax()",
    "[attr.data-resize-handle-active]": "active() ? 'pointer' : null",
    "[class]": "classes()",
    "(pointerdown)": "onPointerDown($event)",
    "(keydown)": "onKeyDown($event)",
  },
})
export class ResizableHandleComponent implements OnDestroy {
  readonly withHandle = input(false, { transform: booleanAttribute })
  /** Accessible name. Default is generic — pass a specific one where the adjacent panels have names. */
  readonly ariaLabel = input("Resize panels")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  readonly elementRef = inject(ElementRef<HTMLElement>)

  private readonly group = signal<ResizablePanelGroupComponent | null>(null)
  private readonly prevPanel = signal<ResizablePanelComponent | null>(null)
  private readonly nextPanel = signal<ResizablePanelComponent | null>(null)

  protected readonly active = signal(false)
  protected readonly unattached = computed(() => !this.prevPanel() || !this.nextPanel())

  protected readonly iconClass = resizableHandleIconVariants()
  protected readonly groupDirection = computed(() => this.group()?.direction() ?? "horizontal")
  protected readonly ariaOrientation = computed(() =>
    this.groupDirection() === "horizontal" ? "vertical" : "horizontal"
  )
  protected readonly ariaValueNow = computed(() => this.prevPanel()?.getSize() ?? null)
  protected readonly ariaValueMin = computed(() => this.prevPanel()?.minSize() ?? null)
  protected readonly ariaValueMax = computed(() => this.prevPanel()?.maxSize() ?? null)
  protected readonly ariaControls = computed(() => {
    const ids = [this.prevPanel(), this.nextPanel()]
      .map((panel) => panel?.elementRef.nativeElement.id)
      .filter((id): id is string => !!id)
    return ids.length > 0 ? ids.join(" ") : null
  })
  protected readonly classes = computed(() =>
    cn(resizableHandleVariants(), this.className())
  )

  private dragPointerId: number | null = null
  private dragStartPos = 0
  private dragStartPrevSize = 0
  private dragStartNextSize = 0
  private dragAxisSize = 0

  /** Called by the group once panels/handles are queried, on every change. */
  attach(
    group: ResizablePanelGroupComponent | null,
    prevPanel: ResizablePanelComponent | null,
    nextPanel: ResizablePanelComponent | null
  ): void {
    this.group.set(group)
    this.prevPanel.set(prevPanel)
    this.nextPanel.set(nextPanel)
  }

  protected onPointerDown(event: PointerEvent): void {
    const prevPanel = this.prevPanel()
    const nextPanel = this.nextPanel()
    const group = this.group()
    if (!prevPanel || !nextPanel || !group) return

    event.preventDefault()
    this.active.set(true)
    this.dragPointerId = event.pointerId
    // Focus the handle so a mouse drag gets the same aria-valuenow
    // announcement + visible focus ring the keyboard path gets for free.
    this.elementRef.nativeElement.focus()
    // Guarantees pointerup/pointercancel delivery even if the pointer leaves
    // the window mid-drag. Best-effort: an invalid/inactive pointerId throws.
    try {
      this.elementRef.nativeElement.setPointerCapture(event.pointerId)
    } catch {
      // Ignored — window listeners below still end the drag.
    }

    const horizontal = this.groupDirection() === "horizontal"
    this.dragStartPos = horizontal ? event.clientX : event.clientY
    this.dragStartPrevSize = prevPanel.getSize()
    this.dragStartNextSize = nextPanel.getSize()
    const rect = group.elementRef.nativeElement.getBoundingClientRect()
    this.dragAxisSize = horizontal ? rect.width : rect.height

    document.body.style.cursor = horizontal ? "col-resize" : "row-resize"
    document.body.style.userSelect = "none"
    window.addEventListener("pointermove", this.onPointerMove)
    window.addEventListener("pointerup", this.onPointerUp)
    window.addEventListener("pointercancel", this.onPointerUp)
    window.addEventListener("blur", this.onPointerUp)
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.dragAxisSize) return
    const horizontal = this.groupDirection() === "horizontal"
    const pos = horizontal ? event.clientX : event.clientY
    const deltaPercent = ((pos - this.dragStartPos) / this.dragAxisSize) * 100
    this.applyDelta(deltaPercent, this.dragStartPrevSize, this.dragStartNextSize)
  }

  private onPointerUp = (): void => {
    if (
      this.dragPointerId !== null &&
      this.elementRef.nativeElement.hasPointerCapture(this.dragPointerId)
    ) {
      this.elementRef.nativeElement.releasePointerCapture(this.dragPointerId)
    }
    this.dragPointerId = null
    this.active.set(false)
    this.dragAxisSize = 0
    document.body.style.cursor = ""
    document.body.style.userSelect = ""
    window.removeEventListener("pointermove", this.onPointerMove)
    window.removeEventListener("pointerup", this.onPointerUp)
    window.removeEventListener("pointercancel", this.onPointerUp)
    window.removeEventListener("blur", this.onPointerUp)
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.active()) {
      event.preventDefault()
      this.prevPanel()?.setSize(this.dragStartPrevSize)
      this.nextPanel()?.setSize(this.dragStartNextSize)
      this.onPointerUp()
      return
    }

    const prevPanel = this.prevPanel()
    const nextPanel = this.nextPanel()
    if (!prevPanel || !nextPanel) return

    const horizontal = this.groupDirection() === "horizontal"
    const increaseKey = horizontal ? "ArrowRight" : "ArrowDown"
    const decreaseKey = horizontal ? "ArrowLeft" : "ArrowUp"

    let delta: number
    if (event.key === increaseKey) delta = KEYBOARD_STEP
    else if (event.key === decreaseKey) delta = -KEYBOARD_STEP
    else if (event.key === "Home") delta = -100
    else if (event.key === "End") delta = 100
    else return

    event.preventDefault()
    this.applyDelta(delta, prevPanel.getSize(), nextPanel.getSize())
  }

  private applyDelta(deltaPercent: number, baseStartPrev: number, baseStartNext: number): void {
    const prevPanel = this.prevPanel()
    const nextPanel = this.nextPanel()
    if (!prevPanel || !nextPanel) return

    const combined = baseStartPrev + baseStartNext
    let nextPrevSize = Math.min(
      prevPanel.maxSize(),
      Math.max(prevPanel.minSize(), baseStartPrev + deltaPercent)
    )
    let nextNextSize = Math.min(
      nextPanel.maxSize(),
      Math.max(nextPanel.minSize(), combined - nextPrevSize)
    )
    nextPrevSize = combined - nextNextSize

    prevPanel.setSize(nextPrevSize)
    nextPanel.setSize(nextNextSize)
  }

  ngOnDestroy(): void {
    this.onPointerUp()
  }
}
