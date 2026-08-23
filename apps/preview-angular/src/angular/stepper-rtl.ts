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

// RTL — same wizard as the demo under `direction="rtl"`. Logical CSS keeps
// the layout mirrored; the connector margins are physical (`ml-4`) in the
// current port and are tracked as a divergence.
@Component({
  selector: "preview-stepper-rtl",
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
    <div uiStepper [(value)]="step" [linear]="true" aria-label="خطوات الإعداد" class="w-[480px]" dir="rtl">
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
export class StepperRtlComponent {
  readonly step = signal(2)
  readonly steps = [
    { step: 1, title: "التفاصيل", description: "اسم مساحة العمل", last: false },
    { step: 2, title: "مساحة العمل", description: "اختر مجلداً محلياً", last: false },
    { step: 3, title: "المراجعة", description: "أكِّد وأنشئ", last: true },
  ]
}

export default StepperRtlComponent
