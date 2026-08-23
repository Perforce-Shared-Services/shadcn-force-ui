import { Checkbox } from "@/angular-ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-field-group",
  standalone: true,
  imports: [
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
  ],
  template: `
    <div uiFieldGroup class="w-full max-w-xs">
      <fieldset uiFieldSet>
        <label uiFieldLabel>Responses</label>
        <p uiFieldDescription>
          Get notified when ChatGPT responds to requests that take time, like
          research or image generation.
        </p>
        <div uiFieldGroup data-slot="checkbox-group">
          <div uiField orientation="horizontal">
            <button uiCheckbox id="push" [checked]="true" disabled></button>
            <label uiFieldLabel for="push" class="font-normal">
              Push notifications
            </label>
          </div>
        </div>
      </fieldset>
      <div uiFieldSeparator></div>
      <fieldset uiFieldSet>
        <label uiFieldLabel>Tasks</label>
        <p uiFieldDescription>
          Get notified when tasks you've created have updates.
          <a href="#">Manage tasks</a>
        </p>
        <div uiFieldGroup data-slot="checkbox-group">
          <div uiField orientation="horizontal">
            <button uiCheckbox id="push-tasks" [checked]="false"></button>
            <label uiFieldLabel for="push-tasks" class="font-normal">
              Push notifications
            </label>
          </div>
          <div uiField orientation="horizontal">
            <button uiCheckbox id="email-tasks" [checked]="false"></button>
            <label uiFieldLabel for="email-tasks" class="font-normal">
              Email notifications
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  `,
})
export class FieldGroupExampleComponent {}

export default FieldGroupExampleComponent
