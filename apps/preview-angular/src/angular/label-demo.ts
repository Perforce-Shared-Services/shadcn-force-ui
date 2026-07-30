import { Component } from "@angular/core"
import { LabelComponent } from "@/angular-ui/label"

@Component({
  selector: "preview-label-demo",
  standalone: true,
  imports: [LabelComponent],
  template: `
    <div class="flex items-center space-x-2">
      <input id="terms" type="checkbox" class="size-4 rounded border" />
      <label uiLabel for="terms">Accept terms and conditions</label>
    </div>
  `,
})
export default class LabelDemoComponent {}
