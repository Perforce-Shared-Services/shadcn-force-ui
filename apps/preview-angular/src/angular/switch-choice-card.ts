import { Component } from "@angular/core"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/angular-ui/field"
import { Switch } from "@/angular-ui/switch"

@Component({
  selector: "preview-switch-choice-card",
  standalone: true,
  imports: [Field, FieldContent, FieldTitle, FieldDescription, FieldGroup, FieldLabel, Switch],
  template: ` <div uiFieldGroup class="w-full max-w-sm">
    <label uiFieldLabel for="switch-share">
      <div uiField orientation="horizontal">
        <div uiFieldContent>
          <span uiFieldTitle>Share across devices</span>
          <p uiFieldDescription>
            Focus is shared across devices, and turns off when you leave the
            app.
          </p>
        </div>
        <button uiSwitch id="switch-share"></button>
      </div>
    </label>
    <label uiFieldLabel for="switch-notifications">
      <div uiField orientation="horizontal">
        <div uiFieldContent>
          <span uiFieldTitle>Enable notifications</span>
          <p uiFieldDescription>
            Receive notifications when focus mode is enabled or disabled.
          </p>
        </div>
        <button uiSwitch id="switch-notifications" [checked]="true"></button>
      </div>
    </label>
  </div>`,
})
export class SwitchChoiceCardComponent {}

export default SwitchChoiceCardComponent
