import { Component, signal } from "@angular/core"

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/angular-ui/stepper"

// Hero preview — horizontal linear wizard, current step driven by clicks.
// Derived from p4one's `Playground` story (no React base example exists).
@Component({
  selector: "preview-stepper-demo",
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
    <div uiStepper [(value)]="step" [linear]="true" aria-label="Setup steps" class="w-[480px]">
      @for (s of steps; track s.step) {
        <div uiStepperItem [step]="s.step">
          <button uiStepperTrigger>
            <span uiStepperIndicator>{{ s.step }}</span>
            <span class="flex flex-col gap-0.5">
              <span uiStepperTitle>{{ s.title }}</span>
              <span uiStepperDescription>{{ s.description }}</span>
            </span>
          </button>
        </div>
        @if (!s.last) {
          <div uiStepperSeparator></div>
        }
      }
    </div>
  `,
})
export class StepperDemoComponent {
  readonly step = signal(2)
  readonly steps = [
    { step: 1, title: "Details", description: "Name the workspace", last: false },
    { step: 2, title: "Workspace", description: "Choose a local folder", last: false },
    { step: 3, title: "Review", description: "Confirm and create", last: true },
  ]
}

export default StepperDemoComponent
