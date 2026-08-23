import { Component } from "@angular/core"

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/angular-ui/stepper"

// Non-interactive rendering — no `[uiStepperTrigger]`; plain
// indicator/title content inside each item. `aria-current="step"` still
// lands on the active item. Derived from p4one's `NonInteractive` story.
@Component({
  selector: "preview-stepper-non-interactive",
  standalone: true,
  imports: [Stepper, StepperItem, StepperIndicator, StepperTitle, StepperSeparator],
  template: `
    <div uiStepper [value]="2" orientation="vertical" aria-label="Setup steps" class="w-64">
      <div uiStepperItem [step]="1" class="p-1">
        <span uiStepperIndicator>1</span>
        <span uiStepperTitle>Details</span>
      </div>
      <div uiStepperSeparator></div>
      <div uiStepperItem [step]="2" class="p-1">
        <span uiStepperIndicator>2</span>
        <span uiStepperTitle>Workspace</span>
      </div>
      <div uiStepperSeparator></div>
      <div uiStepperItem [step]="3" class="p-1">
        <span uiStepperIndicator>3</span>
        <span uiStepperTitle>Review</span>
      </div>
    </div>
  `,
})
export class StepperNonInteractiveComponent {}

export default StepperNonInteractiveComponent
