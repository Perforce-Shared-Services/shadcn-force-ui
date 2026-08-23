import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/angular-ui/field"
import { RadioGroup, RadioGroupItem } from "@/angular-ui/radio-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-field-choice-card",
  standalone: true,
  imports: [
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
    RadioGroup,
    RadioGroupItem,
  ],
  template: `
    <div uiFieldGroup class="w-full max-w-xs">
      <fieldset uiFieldSet>
        <legend uiFieldLegend variant="label">Compute Environment</legend>
        <p uiFieldDescription>
          Select the compute environment for your cluster.
        </p>
        <div uiRadioGroup defaultValue="kubernetes">
          <label uiFieldLabel for="kubernetes-r2h">
            <div uiField orientation="horizontal">
              <div uiFieldContent>
                <div uiFieldTitle>Kubernetes</div>
                <p uiFieldDescription>
                  Run GPU workloads on a K8s cluster.
                </p>
              </div>
              <button uiRadioGroupItem value="kubernetes" id="kubernetes-r2h"></button>
            </div>
          </label>
          <label uiFieldLabel for="vm-z4k">
            <div uiField orientation="horizontal">
              <div uiFieldContent>
                <div uiFieldTitle>Virtual Machine</div>
                <p uiFieldDescription>
                  Access a cluster to run GPU workloads.
                </p>
              </div>
              <button uiRadioGroupItem value="vm" id="vm-z4k"></button>
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  `,
})
export class FieldChoiceCardComponent {}

export default FieldChoiceCardComponent
