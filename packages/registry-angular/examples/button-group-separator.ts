import { Button } from "@/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/ui/button-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-group-separator",
  standalone: true,
  imports: [Button, ButtonGroup, ButtonGroupSeparator],
  template: `<div uiButtonGroup>
    <button uiButton variant="secondary" size="sm">Copy</button>
    <div uiButtonGroupSeparator></div>
    <button uiButton variant="secondary" size="sm">Paste</button>
  </div>`,
})
export class ButtonGroupSeparatorDemoComponent {}

export default ButtonGroupSeparatorDemoComponent
