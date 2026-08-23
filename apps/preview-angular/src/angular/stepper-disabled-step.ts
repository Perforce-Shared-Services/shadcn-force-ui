import { Component, signal } from "@angular/core"

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/angular-ui/stepper"

// A disabled step is freely skippable by `linear` navigation and dims via
// `data-disabled`. Derived from p4one's `DisabledStep` story.
@Component({
  selector: "preview-stepper-disabled-step",
  standalone: true,
  imports: [
    Stepper,
    StepperItem,
    StepperTrigger,
    StepperIndicator,
    StepperTitle,
    StepperSeparator,
  ],
  template: `
    <div uiStepper [(value)]="step" [linear]="true" aria-label="Setup steps" class="w-[480px]">
      <div uiStepperItem [step]="1">
        <button uiStepperTrigger>
          <span uiStepperIndicator>1</span>
          <span uiStepperTitle>Details</span>
        </button>
      </div>
      <div uiStepperSeparator></div>
      <div uiStepperItem [step]="2" disabled>
        <button uiStepperTrigger>
          <span uiStepperIndicator>2</span>
          <span uiStepperTitle>Not applicable</span>
        </button>
      </div>
      <div uiStepperSeparator></div>
      <div uiStepperItem [step]="3">
        <button uiStepperTrigger>
          <span uiStepperIndicator>3</span>
          <span uiStepperTitle>Review</span>
        </button>
      </div>
    </div>
  `,
})
export class StepperDisabledStepComponent {
  readonly step = signal(1)
}

export default StepperDisabledStepComponent
