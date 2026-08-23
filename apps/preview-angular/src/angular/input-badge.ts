import { Badge } from "@/angular-ui/badge"
import { Field, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component } from "@angular/core"

@Component({
  selector: "preview-input-badge",
  standalone: true,
  imports: [Badge, Field, FieldLabel, Input],
  template: `
    <div uiField>
      <label
        uiFieldLabel
        for="input-badge"
        class="flex items-center gap-2 leading-normal"
      >
        Webhook URL
        <span uiBadge variant="secondary" class="ml-auto">Beta</span>
      </label>
      <input
        uiInput
        id="input-badge"
        type="url"
        placeholder="https://api.example.com/webhook"
      />
    </div>
  `,
})
export class InputBadgeComponent {}

export default InputBadgeComponent
