import { Alert, AlertDescription, AlertTitle } from "@/ui/alert"
import { Component } from "@angular/core"

@Component({
  selector: "preview-alert-variants",
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  template: ` <div class="flex w-full flex-col gap-3">
    <div uiAlert variant="info">
      <div uiAlertTitle>Info</div>
      <div uiAlertDescription>Some additional context.</div>
    </div>
    <div uiAlert variant="success">
      <div uiAlertTitle>Success</div>
      <div uiAlertDescription>Your action was completed.</div>
    </div>
    <div uiAlert variant="warning">
      <div uiAlertTitle>Warning</div>
      <div uiAlertDescription>Proceed with caution.</div>
    </div>
    <div uiAlert variant="destructive">
      <div uiAlertTitle>Error</div>
      <div uiAlertDescription>Something went wrong.</div>
    </div>
  </div>`,
})
export class AlertVariantsComponent {}

export default AlertVariantsComponent
