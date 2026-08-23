import { Alert, AlertDescription, AlertTitle } from "@/angular-ui/alert"
import { Component } from "@angular/core"

// apps/v4/examples/base/alert-basic.tsx — CheckCircle2Icon maps to the
// component's built-in "success" glyph (Material Symbols check_circle).
@Component({
  selector: "preview-alert-basic",
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  template: `<div uiAlert icon="success" class="max-w-md">
    <div uiAlertTitle>Account updated successfully</div>
    <div uiAlertDescription>
      Your profile information has been saved. Changes will be reflected
      immediately.
    </div>
  </div>`,
})
export class AlertBasicComponent {}

export default AlertBasicComponent
