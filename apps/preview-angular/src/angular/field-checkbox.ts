import { Checkbox } from "@/angular-ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-field-checkbox",
  standalone: true,
  imports: [
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
  ],
  template: `
    <div uiFieldGroup class="w-full max-w-xs">
      <fieldset uiFieldSet>
        <legend uiFieldLegend variant="label">
          Show these items on the desktop
        </legend>
        <p uiFieldDescription>
          Select the items you want to show on the desktop.
        </p>
        <div uiFieldGroup data-slot="checkbox-group" class="gap-3">
          <div uiField orientation="horizontal">
            <button uiCheckbox id="finder-pref-9k2-hard-disks-ljj" [checked]="false"></button>
            <label uiFieldLabel for="finder-pref-9k2-hard-disks-ljj" class="font-normal">
              Hard disks
            </label>
          </div>
          <div uiField orientation="horizontal">
            <button uiCheckbox id="finder-pref-9k2-external-disks-1yg" [checked]="false"></button>
            <label uiFieldLabel for="finder-pref-9k2-external-disks-1yg" class="font-normal">
              External disks
            </label>
          </div>
          <div uiField orientation="horizontal">
            <button uiCheckbox id="finder-pref-9k2-cds-dvds-fzt" [checked]="false"></button>
            <label uiFieldLabel for="finder-pref-9k2-cds-dvds-fzt" class="font-normal">
              CDs, DVDs, and iPods
            </label>
          </div>
          <div uiField orientation="horizontal">
            <button uiCheckbox id="finder-pref-9k2-connected-servers-6l2" [checked]="false"></button>
            <label uiFieldLabel for="finder-pref-9k2-connected-servers-6l2" class="font-normal">
              Connected servers
            </label>
          </div>
        </div>
      </fieldset>
      <div uiFieldSeparator></div>
      <div uiField orientation="horizontal">
        <button uiCheckbox id="finder-pref-9k2-sync-folders-nep" [checked]="true"></button>
        <div uiFieldContent>
          <label uiFieldLabel for="finder-pref-9k2-sync-folders-nep">
            Sync Desktop &amp; Documents folders
          </label>
          <p uiFieldDescription>
            Your Desktop &amp; Documents folders are being synced with iCloud Drive.
            You can access them from other devices.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class FieldCheckboxComponent {}

export default FieldCheckboxComponent
