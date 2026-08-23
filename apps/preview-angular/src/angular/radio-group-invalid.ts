import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/angular-ui/field"
import { RadioGroup, RadioGroupItem } from "@/angular-ui/radio-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-radio-group-invalid",
  standalone: true,
  imports: [FieldSet, FieldLegend, FieldDescription, RadioGroup, Field, FieldLabel, RadioGroupItem],
  template: ` <fieldset uiFieldSet class="w-full max-w-xs">
    <legend uiFieldLegend variant="label">Notification Preferences</legend>
    <p uiFieldDescription>
      Choose how you want to receive notifications.
    </p>
    <div uiRadioGroup defaultValue="email">
      <div uiField orientation="horizontal" data-invalid>
        <button
          uiRadioGroupItem
          id="invalid-email"
          value="email"
          aria-invalid="true"
        ></button>
        <label uiFieldLabel for="invalid-email" class="font-normal">
          Email only
        </label>
      </div>
      <div uiField orientation="horizontal" data-invalid>
        <button
          uiRadioGroupItem
          id="invalid-sms"
          value="sms"
          aria-invalid="true"
        ></button>
        <label uiFieldLabel for="invalid-sms" class="font-normal">
          SMS only
        </label>
      </div>
      <div uiField orientation="horizontal" data-invalid>
        <button
          uiRadioGroupItem
          id="invalid-both"
          value="both"
          aria-invalid="true"
        ></button>
        <label uiFieldLabel for="invalid-both" class="font-normal">
          Both Email & SMS
        </label>
      </div>
    </div>
  </fieldset>`,
})
export class RadioGroupInvalidComponent {}

export default RadioGroupInvalidComponent
