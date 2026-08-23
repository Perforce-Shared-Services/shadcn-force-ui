import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/angular-ui/alert"
import { Button } from "@/angular-ui/button"
import { Component } from "@angular/core"

// apps/v4/examples/base/alert-action.tsx
@Component({
  selector: "preview-alert-action",
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription, AlertAction, Button],
  template: `<div uiAlert class="max-w-md">
    <div uiAlertTitle>Dark mode is now available</div>
    <div uiAlertDescription>
      Enable it under your profile settings to get started.
    </div>
    <div uiAlertAction>
      <button uiButton size="xs" variant="default">Enable</button>
    </div>
  </div>`,
})
export class AlertActionComponent {}

export default AlertActionComponent
