import { Input } from "@/ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-variants",
  standalone: true,
  imports: [Input],
  template: `<div class="flex w-full max-w-sm flex-col gap-3">
    <input uiInput variant="outline" placeholder="Outline" /><input
      uiInput
      variant="filled"
      placeholder="Filled"
    /><input uiInput variant="underline" placeholder="Underline" /><input
      uiInput
      variant="ghost"
      placeholder="Ghost"
    />
  </div>`,
})
export class InputVariantsComponent {}

export default InputVariantsComponent
