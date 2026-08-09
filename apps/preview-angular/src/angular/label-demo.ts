import { Label } from "@/angular-ui/label"
import { Component } from "@angular/core"

@Component({
  selector: "preview-label-demo",
  standalone: true,
  imports: [Label],
  template: `<div class="flex items-center space-x-2">
    <input id="terms" type="checkbox" class="size-4 rounded border" /><label
      uiLabel
      for="terms"
      >Accept terms and conditions</label
    >
  </div>`,
})
export class LabelDemoComponent {}

export default LabelDemoComponent
