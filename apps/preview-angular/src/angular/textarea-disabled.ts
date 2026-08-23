import { Field, FieldLabel } from "@/angular-ui/field"
import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

@Component({
  selector: "preview-textarea-disabled",
  standalone: true,
  imports: [Field, FieldLabel, Textarea],
  template: `
    <div uiField attr.data-disabled="true">
      <label uiFieldLabel for="textarea-disabled">Message</label>
      <textarea
        uiTextarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      ></textarea>
    </div>
  `,
})
export class TextareaDisabledComponent {}

export default TextareaDisabledComponent
