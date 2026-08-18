import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  InjectionToken,
  input,
  model,
  numberAttribute,
  signal,
  type Signal,
} from "@angular/core"

import { cn } from "@/lib/utils"

export type StepperOrientation = "horizontal" | "vertical"
export type StepperItemState = "active" | "completed" | "inactive"

/**
 * Injection tokens for the two stateful parts. The presentational parts
 * (indicator, title, description, separator) inject nothing — they style
 * themselves off the `group/stepper` + `group/stepper-item` host classes.
 */
export const STEPPER_ROOT = new InjectionToken<StepperComponent>("[uiStepper]")
export const STEPPER_ITEM = new InjectionToken<StepperItemComponent>(
  "[uiStepperItem]"
)

/**
 * Angular port of @force-ui/stepper (radix-force-ui style).
 *
 * There is no React/base stepper and no `cn-stepper*` CSS token, so the class
 * strings are inline Tailwind ported from the Vue registry (`registry-vue/ui/stepper`).
 * See DIVERGENCES.md § stepper.
 *
 * Unlike Vue (reka-ui) there is no headless primitive to lean on, so the root
 * owns the current step and hands it to descendants through DI. Items register
 * themselves with the root, which is what makes `next()` / `prev()` /
 * `isLastStep()` work without the caller passing a step count.
 *
 * Usage:
 *   <div uiStepper [(value)]="step" class="flex w-full items-start gap-2">
 *     <div uiStepperItem [step]="1" class="relative flex w-full flex-col items-center">
 *       <button uiStepperTrigger>
 *         <span uiStepperIndicator>1</span>
 *       </button>
 *       <div uiStepperSeparator class="..."></div>
 *       <h4 uiStepperTitle>Address</h4>
 *       <p uiStepperDescription>Add your address</p>
 *     </div>
 *     …
 *   </div>
 */
@Component({
  selector: "[uiStepper]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: STEPPER_ROOT, useExisting: forwardRef(() => StepperComponent) },
  ],
  host: {
    "data-slot": "stepper",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
})
export class StepperComponent {
  /** Current step, two-way bindable: `[(value)]="step"`. */
  readonly value = model<number>(1)
  readonly orientation = input<StepperOrientation>("horizontal")
  /** Linear steppers refuse forward jumps — only `next()` advances. */
  readonly linear = input(true, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly registered = signal<ReadonlyArray<Signal<number>>>([])

  /** Step numbers of every registered `[uiStepperItem]`, ascending. */
  readonly steps = computed(() =>
    this.registered()
      .map((step) => step())
      .sort((a, b) => a - b)
  )
  readonly totalSteps = computed(() => this.steps().length)
  readonly isFirstStep = computed(() => {
    const first = this.steps()[0]
    return first === undefined || this.value() <= first
  })
  readonly isLastStep = computed(() => {
    const steps = this.steps()
    const last = steps[steps.length - 1]
    return last === undefined || this.value() >= last
  })

  protected readonly classes = computed(() =>
    cn(
      "group/stepper flex gap-2 data-[orientation=vertical]:flex-col",
      this.className()
    )
  )

  /** Called by `[uiStepperItem]`; returns the de-registration callback. */
  registerItem(step: Signal<number>): () => void {
    this.registered.update((steps) => [...steps, step])
    return () =>
      this.registered.update((steps) => steps.filter((s) => s !== step))
  }

  /** A linear stepper only allows navigating back to an already-reached step. */
  isStepReachable(step: number): boolean {
    return !this.linear() || step <= this.value()
  }

  goToStep(step: number): void {
    if (!this.isStepReachable(step)) {
      return
    }
    this.value.set(step)
  }

  next(): void {
    const next = this.steps().find((step) => step > this.value())
    if (next !== undefined) {
      this.value.set(next)
    }
  }

  prev(): void {
    const previous = this.steps().filter((step) => step < this.value())
    const target = previous[previous.length - 1]
    if (target !== undefined) {
      this.value.set(target)
    }
  }
}

@Component({
  selector: "[uiStepperItem]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_ITEM,
      useExisting: forwardRef(() => StepperItemComponent),
    },
  ],
  host: {
    "data-slot": "stepper-item",
    "[attr.data-state]": "state()",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
})
export class StepperItemComponent {
  readonly step = input.required<number, unknown>({
    transform: numberAttribute,
  })
  readonly disabled = input(false, { transform: booleanAttribute })
  /** Forces the `completed` state regardless of the current step. */
  readonly completed = input(false, { transform: booleanAttribute })
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly root = inject(STEPPER_ROOT, { optional: true })

  readonly state = computed<StepperItemState>(() => {
    if (this.completed()) {
      return "completed"
    }
    const current = this.root?.value() ?? this.step()
    if (current > this.step()) {
      return "completed"
    }
    return current === this.step() ? "active" : "inactive"
  })

  protected readonly orientation = computed<StepperOrientation>(
    () => this.root?.orientation() ?? "horizontal"
  )

  // Both `group` and `group/stepper-item`: the named group is what this
  // component's own parts key off, the bare one keeps class strings copied
  // from the other registries (which use unnamed `group-data-*`) working.
  protected readonly classes = computed(() =>
    cn(
      "group group/stepper-item flex items-center gap-2 data-[disabled]:pointer-events-none",
      this.className()
    )
  )

  constructor() {
    const deregister = this.root?.registerItem(this.step)
    if (deregister) {
      inject(DestroyRef).onDestroy(deregister)
    }
  }
}

@Component({
  selector: "[uiStepperTrigger]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-trigger",
    "[attr.type]": "isButton ? 'button' : null",
    "[attr.role]": "isButton ? null : 'button'",
    "[attr.data-state]": "state()",
    "[attr.aria-current]": "state() === 'active' ? 'step' : null",
    "[attr.disabled]": "isButton && disabled() ? '' : null",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
    "[attr.tabindex]": "isButton ? null : disabled() ? '-1' : '0'",
    "[class]": "classes()",
    "(click)": "onClick($event)",
    "(keydown.enter)": "onActivate($event)",
    "(keydown.space)": "onActivate($event)",
  },
})
export class StepperTriggerComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  private readonly root = inject(STEPPER_ROOT, { optional: true })
  private readonly item = inject(STEPPER_ITEM, { optional: true })

  // Non-button hosts get role/tabindex/aria-disabled instead of the native
  // attributes, the same dual-mechanism pattern button.component.ts uses for
  // anchors (WCAG 2.1.1 / 4.1.2).
  protected readonly isButton =
    (inject(ElementRef).nativeElement as HTMLElement).tagName === "BUTTON"

  protected readonly state = computed<StepperItemState>(
    () => this.item?.state() ?? "inactive"
  )

  protected readonly disabled = computed(() => {
    if (this.item?.disabled()) {
      return true
    }
    const step = this.item?.step()
    if (step === undefined || !this.root) {
      return false
    }
    return !this.root.isStepReachable(step)
  })

  protected readonly classes = computed(() =>
    cn(
      "flex flex-col items-center gap-1 rounded-md p-1 text-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none aria-disabled:pointer-events-none",
      this.className()
    )
  )

  protected onClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault()
      event.stopImmediatePropagation()
      return
    }
    const step = this.item?.step()
    if (step !== undefined) {
      this.root?.goToStep(step)
    }
  }

  protected onActivate(event: Event): void {
    // Native buttons already synthesise a click from Enter/Space.
    if (this.isButton) {
      return
    }
    event.preventDefault()
    this.onClick(event)
  }
}

@Component({
  selector: "[uiStepperIndicator]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-indicator",
    "[class]": "classes()",
  },
})
export class StepperIndicatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/50 group-data-[disabled]/stepper-item:text-muted-foreground group-data-[disabled]/stepper-item:opacity-50 group-data-[state=active]/stepper-item:bg-primary group-data-[state=active]/stepper-item:text-primary-foreground group-data-[state=completed]/stepper-item:bg-accent group-data-[state=completed]/stepper-item:text-accent-foreground [&_svg]:fill-current",
      this.className()
    )
  )
}

@Component({
  selector: "[uiStepperTitle]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-title",
    "[class]": "classes()",
  },
})
export class StepperTitleComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("text-sm font-semibold whitespace-nowrap", this.className())
  )
}

@Component({
  selector: "[uiStepperDescription]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-description",
    "[class]": "classes()",
  },
})
export class StepperDescriptionComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn("text-xs text-muted-foreground", this.className())
  )
}

@Component({
  selector: "[uiStepperSeparator]",
  standalone: true,
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "stepper-separator",
    "aria-hidden": "true",
    "[class]": "classes()",
  },
})
export class StepperSeparatorComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  protected readonly classes = computed(() =>
    cn(
      "shrink-0 rounded-full bg-muted group-data-[disabled]/stepper-item:opacity-50 group-data-[state=completed]/stepper-item:bg-accent",
      this.className()
    )
  )
}
