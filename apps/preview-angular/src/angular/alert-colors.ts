import { Alert, AlertDescription, AlertTitle } from "@/angular-ui/alert"
import { Component } from "@angular/core"

// apps/v4/examples/base/alert-colors.tsx — AlertTriangleIcon maps to the
// component's built-in "warning" glyph; colour override via utility classes.
@Component({
  selector: "preview-alert-colors",
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  template: `<div uiAlert
    icon="warning"
    class="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50"
  >
    <div uiAlertTitle>Your subscription will expire in 3 days.</div>
    <div uiAlertDescription>
      Renew now to avoid service interruption or upgrade to a paid plan to
      continue using the service.
    </div>
  </div>`,
})
export class AlertColorsComponent {}

export default AlertColorsComponent
