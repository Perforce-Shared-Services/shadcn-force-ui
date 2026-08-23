import { Alert, AlertDescription, AlertTitle } from "@/angular-ui/alert"
import { Component } from "@angular/core"

// apps/v4/examples/base/alert-destructive.tsx — AlertCircleIcon maps to the
// component's built-in "error" glyph (auto-picked by variant="destructive").
@Component({
  selector: "preview-alert-destructive",
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  template: `<div uiAlert variant="destructive" class="max-w-md">
    <div uiAlertTitle>Payment failed</div>
    <div uiAlertDescription>
      Your payment could not be processed. Please check your payment method
      and try again.
    </div>
  </div>`,
})
export class AlertDestructiveComponent {}

export default AlertDestructiveComponent
