import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  isDevMode,
  model,
  signal,
} from "@angular/core"
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser"

import { cn } from "@/lib/utils"

import {
  stepperDescriptionVariants,
  stepperIndicatorVariants,
  stepperItemVariants,
  stepperSeparatorVariants,
  stepperTitleVariants,
  stepperTriggerVariants,
  stepperVariants,
} from "./stepper.variants"
import { STEPPER_COMPLETED_SVG } from "./stepper.icons"

export type StepperOrientation = "horizontal" | "vertical"
export type StepperItemState = "completed" | "active" | "inactive"

/**
 * Angular port of the p4one Force UI stepper (force-ui style).
 *
 * NOT a registry port of a React component — no React/radix-force-ui stepper
 * exists (see AGENT-PORTING-GUIDE Group C). Anatomy and classes come from the
 * p4one build (`/opt/dev/pd-p4one/app/src/app/ui/stepper/`), which derived
 * them from the shadcn-vue stepper and reconciled colours against the Force
 * spec's `wizard` composition.
 *
 * Attribute selectors — usage:
 *   <div uiStepper [(value)]="currentStep" linear aria-label="Setup steps">
 *     <div uiStepperItem [step]="1">
 *       <button uiStepperTrigger>
 *         <span uiStepperIndicator>1</span>
 *         <span class="flex flex-col gap-0.5">
 *           <span uiStepperTitle>Details</span>
 *           <span uiStepperDescription>Name the workspace</span>
 *         </span>
 *       </button>
 *     </div>
 *     <div uiStepperSeparator></div>
 *     <div uiStepperItem [step]="2">…</div>
 *   </div>
 *
 * No radix-ng primitive exists for this role, so step/orientation/linear
 * state is a plain signal tree shared via
 * `inject(StepperComponent, { optional: true })` — the same DI-context
 * pattern ui/toggle-group uses for its group state. For a non-interactive
 * step list, omit `[uiStepperTrigger]` entirely and render
 * `[uiStepperIndicator]` / `[uiStepperTitle]` as plain content inside the
 * item; `aria-current="step"` still lands on the active item.
 */
@Component({
  selector: "[uiStepper]",
  standalone: true,
  templateUrl: "./stepper.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper",
    role: "group",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
})
export class StepperComponent {
  /** Current step (1-indexed). Two-way bindable: `[(value)]="currentStep"`. */
  readonly value = model<number>(1)
  readonly orientation = input<StepperOrientation>("horizontal")
  /** When true, a trigger cannot jump ahead of the next pending step. */
  readonly linear = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  /** Registered by each descendant `[uiStepperItem]`. */
  private readonly items = signal<StepperItemComponent[]>([])

  registerItem(item: StepperItemComponent): void {
    this.items.update((items) => [...items, item])
  }

  unregisterItem(item: StepperItemComponent): void {
    this.items.update((items) => items.filter((i) => i !== item))
  }

  /**
   * Whether a trigger click may jump from the current step to `target`.
   * Always allows moving backward. In `linear` mode, a forward jump is
   * blocked only by an intervening step that is both registered AND not
   * `disabled` — a disabled step ("not applicable") is freely skippable. An
   * unregistered/sparse intermediate step is treated as skippable too.
   */
  canAdvanceTo(target: number): boolean {
    if (!this.linear() || target <= this.value()) return true
    for (let step = this.value() + 1; step < target; step++) {
      const item = this.items().find((i) => i.step() === step)
      if (item && !item.disabled()) return false
    }
    return true
  }

  protected readonly classes = computed(() =>
    cn(stepperVariants(), this.className())
  )

  constructor() {
    // Dev-only a11y nudge: a stepper has no accessible name of its own unless
    // the caller supplies one.
    if (isDevMode()) {
      const el = inject(ElementRef).nativeElement as HTMLElement
      afterNextRender(() => {
        if (!el.hasAttribute("aria-label") && !el.hasAttribute("aria-labelledby")) {
          console.warn(
            '[uiStepper] has no aria-label or aria-labelledby. Give it an accessible name ' +
              '(e.g. aria-label="Setup steps") so screen readers can announce what the group ' +
              "of steps represents."
          )
        }
      })
    }
  }
}

@Component({
  selector: "[uiStepperItem]",
  standalone: true,
  templateUrl: "./stepper.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-item",
    "[attr.data-state]": "state()",
    "[attr.data-orientation]": "root?.orientation()",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.aria-current]": "state() === 'active' ? 'step' : null",
    "[class]": "classes()",
  },
})
export class StepperItemComponent {
  readonly step = input.required<number>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly completed = input<boolean | undefined>(undefined)
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(StepperComponent, { optional: true })

  readonly state = computed<StepperItemState>(() => {
    if (this.completed() === true) return "completed"
    const current = this.root?.value() ?? 1
    if (this.completed() === false) return this.step() === current ? "active" : "inactive"
    if (this.step() < current) return "completed"
    return this.step() === current ? "active" : "inactive"
  })

  constructor() {
    this.root?.registerItem(this)
  }

  ngOnDestroy(): void {
    this.root?.unregisterItem(this)
  }

  protected readonly classes = computed(() =>
    cn(stepperItemVariants(), this.className())
  )
}

@Component({
  selector: "button[uiStepperTrigger]",
  standalone: true,
  templateUrl: "./stepper.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-trigger",
    "[attr.disabled]": "isDisabled() ? '' : null",
    "[attr.data-orientation]": "root?.orientation()",
    "[class]": "classes()",
    "(click)": "onClick()",
  },
})
export class StepperTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(StepperComponent, { optional: true })
  protected readonly item = inject(StepperItemComponent, { optional: true })

  protected readonly isDisabled = computed(() => this.item?.disabled() ?? false)

  protected onClick(): void {
    if (!this.root || !this.item || this.isDisabled()) return
    const targetStep = this.item.step()
    if (!this.root.canAdvanceTo(targetStep)) return
    this.root.value.set(targetStep)
  }

  protected readonly classes = computed(() =>
    cn(stepperTriggerVariants(), this.className())
  )
}

@Component({
  selector: "[uiStepperIndicator]",
  standalone: true,
  templateUrl: "./stepper-indicator.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-indicator",
    "[attr.data-state]": "item?.state()",
    "[class]": "classes()",
  },
})
export class StepperIndicatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly item = inject(StepperItemComponent, { optional: true })

  /**
   * Sanitizer-trusted inline SVG checkmark. The markup is a bundled static
   * string (see stepper.icons.ts), so bypassing the sanitizer is safe and
   * necessary (Angular's HTML sanitizer strips `<svg>` from `[innerHTML]`).
   */
  protected readonly completedIcon: SafeHtml = inject(
    DomSanitizer
  ).bypassSecurityTrustHtml(STEPPER_COMPLETED_SVG)

  protected readonly classes = computed(() =>
    cn(stepperIndicatorVariants(), this.className())
  )
}

@Component({
  selector: "[uiStepperTitle]",
  standalone: true,
  templateUrl: "./stepper.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-title",
    "[class]": "classes()",
  },
})
export class StepperTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(stepperTitleVariants(), this.className())
  )
}

@Component({
  selector: "[uiStepperDescription]",
  standalone: true,
  templateUrl: "./stepper.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-description",
    "[class]": "classes()",
  },
})
export class StepperDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(stepperDescriptionVariants(), this.className())
  )
}

@Component({
  selector: "[uiStepperSeparator]",
  standalone: true,
  templateUrl: "./stepper.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-separator",
    "aria-hidden": "true",
    "[attr.data-orientation]": "root?.orientation()",
    "[class]": "classes()",
  },
})
export class StepperSeparatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly root = inject(StepperComponent, { optional: true })

  protected readonly classes = computed(() =>
    cn(stepperSeparatorVariants(), this.className())
  )
}
