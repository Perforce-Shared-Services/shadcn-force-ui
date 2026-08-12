import { Label } from "@/angular-ui/label"
import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

@Component({
  selector: "preview-textarea-demo",
  standalone: true,
  imports: [Textarea, Label],
  template: `<div class="flex w-full max-w-sm flex-col gap-1.5">
    <label uiLabel for="msg">Message</label
    ><textarea uiTextarea id="msg" placeholder="Write your message…"></textarea>
  </div>`,
})
export class TextareaDemoComponent {}

export default TextareaDemoComponent
