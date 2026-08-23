import { Component } from "@angular/core"

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/angular-ui/stepper"

// Sub-labels under each title via `[uiStepperDescription]`. Derived from
// p4one's `WithDescriptions` story.
@Component({
  selector: "preview-stepper-with-descriptions",
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
  template: `
    <div uiStepper [value]="2" orientation="vertical" aria-label="Workspace setup steps" class="w-72">
      <div uiStepperItem [step]="1">
        <button uiStepperTrigger>
          <span uiStepperIndicator>1</span>
          <span class="flex flex-col gap-0.5">
            <span uiStepperTitle>Workspace details</span>
            <span uiStepperDescription>Name the workspace</span>
          </span>
        </button>
      </div>
      <div uiStepperSeparator></div>
      <div uiStepperItem [step]="2">
        <button uiStepperTrigger>
          <span uiStepperIndicator>2</span>
          <span class="flex flex-col gap-0.5">
            <span uiStepperTitle>Workspace mapping</span>
            <span uiStepperDescription>Choose a local folder</span>
          </span>
        </button>
      </div>
      <div uiStepperSeparator></div>
      <div uiStepperItem [step]="3">
        <button uiStepperTrigger>
          <span uiStepperIndicator>3</span>
          <span class="flex flex-col gap-0.5">
            <span uiStepperTitle>Review</span>
            <span uiStepperDescription>Confirm and create</span>
          </span>
        </button>
      </div>
    </div>
  `,
})
export class StepperWithDescriptionsComponent {}

export default StepperWithDescriptionsComponent
