import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/angular-ui/field"
import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

@Component({
  selector: "preview-field-textarea",
  standalone: true,
  imports: [
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    Textarea,
  ],
  template: `
    <fieldset uiFieldSet class="w-full max-w-xs">
      <div uiFieldGroup>
        <div uiField>
          <label uiFieldLabel for="feedback">Feedback</label>
          <textarea
            uiTextarea
            id="feedback"
            placeholder="Your feedback helps us improve..."
            rows="4"
          ></textarea>
          <p uiFieldDescription>
            Share your thoughts about our service.
          </p>
        </div>
      </div>
    </fieldset>
  `,
})
export class FieldTextareaComponent {}

export default FieldTextareaComponent
