import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/angular-ui/button-group"

@Component({
  selector: "preview-button-group-separator",
  standalone: true,
  imports: [Button, ButtonGroup, ButtonGroupSeparator],
  template: `
    <div uiButtonGroup>
      <button uiButton variant="secondary" size="sm">Copy</button>
      <div uiButtonGroupSeparator></div>
      <button uiButton variant="secondary" size="sm">Paste</button>
    </div>
  `,
})
export class ButtonGroupSeparatorComponent {}

export default ButtonGroupSeparatorComponent
