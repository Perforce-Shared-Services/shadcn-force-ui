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
} from '@angular/core';

import { cn } from '@/app/lib/utils';

import type { StepperItemComponent } from './stepper-item.component';

export type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Angular build of a Force UI-style stepper — root.
 *
 * NOT a registry port: `@force-ui/stepper` only ships a Vue build (on
 * `reka-ui`, Vue's radix-equivalent) — there is no React/`radix-force-ui`
 * source, so the app's usual byte-parity workflow doesn't apply here (see
 * `port-shadcn-component` skill for the parity contract this deviates from).
 * The base anatomy (Root/Item/Trigger/Indicator/Title/Description/Separator)
 * and Tailwind classes below are carried over from the real shadcn-vue
 * `stepper` source (generic shadcn tokens: `bg-primary`, `bg-muted`,
 * `text-muted-foreground` — already wired in this app's `tailwind.css`), with
 * completed-state colour reconciled against the Force design spec's `wizard`
 * composition (`patterns/compositions/wizard.md`) — see `stepper-indicator`.
 *
 * Attribute selector — usage:
 *   <div uiStepper [(value)]="currentStep" linear>
 *     <div uiStepperItem [step]="1">
 *       <button uiStepperTrigger>
 *         <span uiStepperIndicator>1</span>
 *         <div><span uiStepperTitle>Details</span></div>
 *       </button>
 *     </div>
 *     <div uiStepperSeparator></div>
 *     <div uiStepperItem [step]="2">…</div>
 *   </div>
 *
 * No radix-ng primitive exists for this role, so step/orientation/linear state
 * is a plain signal tree shared via `inject(StepperComponent, { optional: true })`
 * — the same DI-context pattern `ui/toggle-group` uses for its group state.
 *
 * `orientation` drives layout here (`data-vertical:flex-col`) — a documented
 * addition over the upstream Vue source, whose root class (`flex gap-2`)
 * never reacts to its own `orientation` prop. Matches how `ui/toggle-group`
 * and `ui/separator` already resolve orientation into both the class string
 * and the `data-orientation` attribute so they can't disagree.
 */
@Component({
  selector: '[uiStepper]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'stepper',
    role: 'group',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
})
export class StepperComponent {
  /** Current step (1-indexed). Two-way bindable: `[(value)]="currentStep"`. */
  readonly value = model<number>(1);
  readonly orientation = input<StepperOrientation>('horizontal');
  /** When true, a trigger cannot jump ahead of the next pending step. */
  readonly linear = input(false, { transform: booleanAttribute });
  readonly className = input<string | undefined>(undefined, { alias: 'class' });

  /** Registered by each descendant `[uiStepperItem]` (see its constructor/`ngOnDestroy`). */
  private readonly items = signal<StepperItemComponent[]>([]);

  registerItem(item: StepperItemComponent): void {
    this.items.update((items) => [...items, item]);
  }

  unregisterItem(item: StepperItemComponent): void {
    this.items.update((items) => items.filter((i) => i !== item));
  }

  /**
   * Whether a trigger click may jump from the current step to `target`.
   * Always allows moving backward. In `linear` mode, a forward jump is
   * blocked only by an intervening step that is both registered AND not
   * `disabled` — a disabled step (e.g. "not applicable") is freely skippable,
   * matching the `DisabledStep` story's documented behaviour. An
   * unregistered/sparse intermediate step is treated as skippable too.
   */
  canAdvanceTo(target: number): boolean {
    if (!this.linear() || target <= this.value()) return true;
    for (let step = this.value() + 1; step < target; step++) {
      const item = this.items().find((i) => i.step() === step);
      if (item && !item.disabled()) return false;
    }
    return true;
  }

  protected readonly classes = computed(() =>
    cn('flex gap-2 data-vertical:flex-col', this.className()),
  );

  constructor() {
    // Dev-only nudge (mirrors ui/button-group and ui/toggle-group): a stepper
    // is a "group" of steps with no accessible name of its own unless the
    // caller supplies one.
    if (isDevMode()) {
      const el = inject(ElementRef).nativeElement as HTMLElement;
      afterNextRender(() => {
        if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
          console.warn(
            '[uiStepper] has no aria-label or aria-labelledby. Give it an accessible name ' +
              '(e.g. aria-label="Setup steps") so screen readers can announce what the group ' +
              'of steps represents.',
          );
        }
      });
    }
  }
}
