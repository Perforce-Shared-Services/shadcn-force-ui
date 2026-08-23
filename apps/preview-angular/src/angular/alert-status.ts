import { Alert, AlertDescription, AlertTitle } from "@/angular-ui/alert"
import { Component } from "@angular/core"

// apps/v4/examples/base/alert-status.tsx
@Component({
  selector: "preview-alert-status",
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  template: `<div class="flex w-full max-w-md flex-col gap-4">
    <div uiAlert variant="success">
      <div uiAlertTitle>Payment received</div>
      <div uiAlertDescription>Your invoice has been paid in full.</div>
    </div>
    <div uiAlert variant="info">
      <div uiAlertTitle>Scheduled maintenance</div>
      <div uiAlertDescription>
        The service will be unavailable on Sunday from 02:00–04:00 UTC.
      </div>
    </div>
    <div uiAlert variant="warning">
      <div uiAlertTitle>Your subscription expires soon</div>
      <div uiAlertDescription>
        Renew within 3 days to avoid any interruption to your service.
      </div>
    </div>
  </div>`,
})
export class AlertStatusComponent {}

export default AlertStatusComponent
