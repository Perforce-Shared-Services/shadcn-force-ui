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
  selector: "preview-stepper-horizontal",
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
    [(value)]="step"
    [linear]="false"
    class="flex w-full max-w-xl items-start gap-2"
  >
    @for (item of steps; track item.step) {
      <div
        uiStepperItem
        [step]="item.step"
        class="relative flex w-full flex-col items-center justify-center"
      >
        @if (item.step !== steps.length) {
          <div
            uiStepperSeparator
            class="absolute top-4 right-[calc(-50%+24px)] left-[calc(50%+24px)] h-0.5 group-data-[state=completed]/stepper-item:bg-primary"
          ></div>
        }
        <button uiStepperTrigger>
          <span
            uiStepperIndicator
            class="z-10 border border-input bg-background group-data-[state=active]/stepper-item:ring-2 group-data-[state=active]/stepper-item:ring-ring group-data-[state=active]/stepper-item:ring-offset-2 group-data-[state=active]/stepper-item:ring-offset-background"
          >
            @if (step() > item.step) {
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="size-5"
              >
                <path
                  d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                />
              </svg>
            } @else {
              {{ item.step }}
            }
          </span>
        </button>
        <div class="mt-4 flex flex-col items-center text-center">
          <h4
            uiStepperTitle
            class="group-data-[state=active]/stepper-item:text-primary lg:text-base"
          >
            {{ item.title }}
          </h4>
          <p
            uiStepperDescription
            class="sr-only group-data-[state=active]/stepper-item:text-primary md:not-sr-only"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    }
  </div>`,
})
export class StepperHorizontalComponent {
  readonly step = signal(1)
  readonly steps = [
    {
      step: 1,
      title: "Your details",
      description: "Provide your name and email",
    },
    {
      step: 2,
      title: "Company details",
      description: "A few details about your company",
    },
    {
      step: 3,
      title: "Invite your team",
      description: "Start collaborating with your team",
    },
  ]
}

export default StepperHorizontalComponent
