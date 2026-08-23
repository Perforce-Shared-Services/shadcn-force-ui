import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

@Component({
  selector: "preview-textarea-invalid",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Textarea],
  template: `
    <div uiField [attr.data-invalid]="true">
      <label uiFieldLabel for="textarea-invalid">Message</label>
      <textarea
        uiTextarea
        id="textarea-invalid"
        placeholder="Type your message here."
        aria-invalid
      ></textarea>
      <p uiFieldDescription>Please enter a valid message.</p>
    </div>
  `,
})
export class TextareaInvalidComponent {}

export default TextareaInvalidComponent
