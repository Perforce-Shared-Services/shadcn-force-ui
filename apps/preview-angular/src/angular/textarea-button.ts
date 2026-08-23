import { Button } from "@/angular-ui/button"
import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

@Component({
  selector: "preview-textarea-button",
  standalone: true,
  imports: [Button, Textarea],
  template: `
    <div class="grid w-full gap-2">
      <textarea uiTextarea placeholder="Type your message here."></textarea>
      <button uiButton>Send message</button>
    </div>
  `,
})
export class TextareaButtonComponent {}

export default TextareaButtonComponent
