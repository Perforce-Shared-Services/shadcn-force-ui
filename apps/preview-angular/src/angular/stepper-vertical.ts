import { Component, signal } from "@angular/core"

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/angular-ui/stepper"

// Vertical layout — rows stack top to bottom, separators run along the left
// edge. Derived from p4one's `Vertical` story.
@Component({
  selector: "preview-stepper-vertical",
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
    <div
      uiStepper
      [(value)]="step"
      orientation="vertical"
      [linear]="true"
      aria-label="Setup steps"
      class="w-64"
    >
      <div uiStepperItem [step]="1">
        <button uiStepperTrigger>
          <span uiStepperIndicator>1</span>
          <span uiStepperTitle>Details</span>
        </button>
      </div>
      <div uiStepperSeparator></div>
      <div uiStepperItem [step]="2">
        <button uiStepperTrigger>
          <span uiStepperIndicator>2</span>
          <span uiStepperTitle>Workspace</span>
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
export class StepperVerticalComponent {
  readonly step = signal(2)
}

export default StepperVerticalComponent
