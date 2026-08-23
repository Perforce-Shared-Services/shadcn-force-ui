import { Textarea } from "@/angular-ui/textarea"
import { Component } from "@angular/core"

@Component({
  selector: "preview-textarea-variants",
  standalone: true,
  imports: [Textarea],
  template: `
    <div class="flex w-full flex-col gap-4">
      <textarea uiTextarea variant="outline" placeholder="Outline"></textarea>
      <textarea uiTextarea variant="filled" placeholder="Filled"></textarea>
      <textarea
        uiTextarea
        variant="underline"
        placeholder="Underline"
      ></textarea>
      <textarea uiTextarea variant="ghost" placeholder="Ghost"></textarea>
    </div>
  `,
})
export class TextareaVariantsComponent {}

export default TextareaVariantsComponent
