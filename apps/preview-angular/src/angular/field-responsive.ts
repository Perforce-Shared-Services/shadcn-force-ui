import { Button } from "@/angular-ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-field-responsive",
  standalone: true,
  imports: [
    Button,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    Input,
  ],
  template: `
    <div class="w-full max-w-lg">
      <form>
        <fieldset uiFieldSet>
          <legend uiFieldLegend>Profile</legend>
          <p uiFieldDescription>Fill in your profile information.</p>
          <div uiFieldGroup>
            <div uiField orientation="responsive">
              <div uiFieldContent>
                <label uiFieldLabel for="name">Name</label>
                <p uiFieldDescription>
                  Provide your full name for identification
                </p>
              </div>
              <input uiInput id="name" placeholder="Evil Rabbit" required />
            </div>
            <div uiField orientation="responsive">
              <button uiButton type="submit">Submit</button>
              <button uiButton type="button" variant="outline">Cancel</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  `,
})
export class FieldResponsiveComponent {}

export default FieldResponsiveComponent
