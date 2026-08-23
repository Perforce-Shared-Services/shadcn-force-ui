import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"

// RTL mirror of the hero demo, wrapped in dir="rtl". The DropdownMenu popup
// content is omitted (menu not ported yet — see button-group-demo.ts).
@Component({
  selector: "preview-button-group-rtl",
  standalone: true,
  imports: [Button, ButtonGroup],
  template: `
    <div dir="rtl">
      <div uiButtonGroup>
        <div uiButtonGroup class="hidden sm:flex">
          <button uiButton variant="outline" size="icon" aria-label="Go Back">
            <svg aria-hidden="true" class="rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M560-280 360-480l200-200v400Z"/>
            </svg>
          </button>
        </div>
        <div uiButtonGroup>
          <button uiButton variant="outline">Archive</button>
          <button uiButton variant="outline">Report</button>
        </div>
        <div uiButtonGroup>
          <button uiButton variant="outline">Snooze</button>
          <!-- TODO(port): swap for uiDropdownMenu once Wave 2 lands -->
          <button uiButton variant="outline" size="icon" aria-label="More Options">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ButtonGroupRtlComponent {}

export default ButtonGroupRtlComponent
