import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/ui/stepper"
import { Component, signal } from "@angular/core"

@Component({
  selector: "preview-stepper-vertical",
  standalone: true,
  imports: [
    Stepper,
    StepperItem,
    StepperTrigger,
    StepperIndicator,
    StepperTitle,
    StepperDescription,
    StepperSeparator,
  ],
  template: `<div
    uiStepper
    orientation="vertical"
    [(value)]="step"
    [linear]="false"
    class="mx-auto w-full max-w-md justify-start gap-10"
  >
    @for (item of steps; track item.step) {
      <div
        uiStepperItem
        [step]="item.step"
        class="relative flex w-full items-start gap-6"
      >
        @if (item.step !== steps.length) {
          <div
            uiStepperSeparator
            class="absolute top-[42px] left-[19px] h-[105%] w-0.5 group-data-[state=completed]/stepper-item:bg-primary"
          ></div>
        }
        <button uiStepperTrigger class="shrink-0">
          <span
            uiStepperIndicator
            class="z-10 border border-input bg-background group-data-[state=active]/stepper-item:ring-2 group-data-[state=active]/stepper-item:ring-ring group-data-[state=active]/stepper-item:ring-offset-2 group-data-[state=active]/stepper-item:ring-offset-background"
          >
            {{ item.step }}
          </span>
        </button>
        <div class="flex flex-col gap-1 text-left">
          <h4
            uiStepperTitle
            class="group-data-[state=active]/stepper-item:text-primary lg:text-base"
          >
            {{ item.title }}
          </h4>
          <p
            uiStepperDescription
            class="group-data-[state=active]/stepper-item:text-primary"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    }
  </div>`,
})
export class StepperVerticalComponent {
  readonly step = signal(2)
  readonly steps = [
    {
      step: 1,
      title: "Your details",
      description:
        "Provide your name and email address. We will use this information to create your account",
    },
    {
      step: 2,
      title: "Company details",
      description:
        "A few details about your company will help us personalize your experience",
    },
    {
      step: 3,
      title: "Invite your team",
      description:
        "Start collaborating with your team by inviting them to join your account",
    },
  ]
}

export default StepperVerticalComponent
