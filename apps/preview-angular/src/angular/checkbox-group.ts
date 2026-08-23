import { Checkbox } from "@/angular-ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-checkbox-group",
  standalone: true,
  imports: [Checkbox, FieldSet, FieldLegend, FieldDescription, FieldGroup, Field, FieldLabel],
  template: ` <fieldset uiFieldSet>
    <legend uiFieldLegend variant="label">
      Show these items on the desktop:
    </legend>
    <p uiFieldDescription>
      Select the items you want to show on the desktop.
    </p>
    <div uiFieldGroup class="gap-3">
      <div uiField orientation="horizontal">
        <button uiCheckbox id="finder-pref-hard-disks" [checked]="true"></button>
        <label uiFieldLabel for="finder-pref-hard-disks" class="font-normal">
          Hard disks
        </label>
      </div>
      <div uiField orientation="horizontal">
        <button
          uiCheckbox
          id="finder-pref-external-disks"
          [checked]="true"
        ></button>
        <label uiFieldLabel for="finder-pref-external-disks" class="font-normal">
          External disks
        </label>
      </div>
      <div uiField orientation="horizontal">
        <button uiCheckbox id="finder-pref-cds-dvds"></button>
        <label uiFieldLabel for="finder-pref-cds-dvds" class="font-normal">
          CDs, DVDs, and iPods
        </label>
      </div>
      <div uiField orientation="horizontal">
        <button uiCheckbox id="finder-pref-connected-servers"></button>
        <label
          uiFieldLabel
          for="finder-pref-connected-servers"
          class="font-normal"
        >
          Connected servers
        </label>
      </div>
    </div>
  </fieldset>`,
})
export class CheckboxGroupComponent {}

export default CheckboxGroupComponent
