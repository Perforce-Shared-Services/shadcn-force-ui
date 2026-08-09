import { Alert, AlertDescription, AlertTitle } from "@/angular-ui/alert"
import { Component } from "@angular/core"

@Component({
  selector: "preview-alert-demo",
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  template: `<div uiAlert>
    <div uiAlertTitle>Default alert</div>
    <div uiAlertDescription>Something you should know.</div>
  </div>`,
})
export class AlertDemoComponent {}

export default AlertDemoComponent
