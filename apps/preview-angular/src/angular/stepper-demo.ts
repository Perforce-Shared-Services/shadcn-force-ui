import { Button } from "@/angular-ui/button"
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/angular-ui/stepper"
import { Component, signal } from "@angular/core"

@Component({
  selector: "preview-stepper-demo",
  standalone: true,
  imports: [
    Button,
    Stepper,
    StepperItem,
    StepperTrigger,
    StepperIndicator,
    StepperTitle,
    StepperDescription,
    StepperSeparator,
  ],
  template: `<div class="flex w-full max-w-xl flex-col gap-8">
    <div uiStepper [(value)]="step" class="flex w-full items-start gap-2">
      @for (item of steps; track item.step) {
        <div
          uiStepperItem
          [step]="item.step"
          class="relative flex w-full flex-col items-center justify-center"
        >
          <button uiStepperTrigger>
            <span uiStepperIndicator class="bg-muted">{{ item.step }}</span>
          </button>
          @if (item.step !== steps.length) {
            <div
              uiStepperSeparator
              class="absolute top-4 right-[calc(-50%+24px)] left-[calc(50%+24px)] h-0.5 group-data-[state=completed]/stepper-item:bg-primary"
            ></div>
          }
          <div class="mt-2 flex flex-col items-center text-center">
            <h4 uiStepperTitle>{{ item.title }}</h4>
            <p uiStepperDescription>{{ item.description }}</p>
          </div>
        </div>
      }
    </div>
    <div class="flex items-center justify-between">
      <button
        uiButton
        variant="outline"
        size="sm"
        [disabled]="step() === 1"
        (click)="step.set(step() - 1)"
      >
        Back
      </button>
      <button
        uiButton
        size="sm"
        [disabled]="step() === steps.length"
        (click)="step.set(step() + 1)"
      >
        Next
      </button>
    </div>
  </div>`,
})
export class StepperDemoComponent {
  readonly step = signal(2)
  readonly steps = [
    { step: 1, title: "Address", description: "Add your address" },
    { step: 2, title: "Shipping", description: "Set your preferred" },
    { step: 3, title: "Payment", description: "Add any payment" },
    { step: 4, title: "Checkout", description: "Confirm your order" },
  ]
}

export default StepperDemoComponent
