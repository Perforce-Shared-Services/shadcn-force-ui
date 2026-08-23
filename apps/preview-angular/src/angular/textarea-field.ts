import { Field, FieldDescription, FieldLabel } from "@/angular-ui/field"
import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

@Component({
  selector: "preview-textarea-field",
  standalone: true,
  imports: [Field, FieldDescription, FieldLabel, Textarea],
  template: `
    <div uiField>
      <label uiFieldLabel for="textarea-message">Message</label>
      <p uiFieldDescription>Enter your message below.</p>
      <textarea
        uiTextarea
        id="textarea-message"
        placeholder="Type your message here."
      ></textarea>
    </div>
  `,
})
export class TextareaFieldComponent {}

export default TextareaFieldComponent
