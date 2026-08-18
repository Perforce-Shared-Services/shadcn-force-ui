import { Button } from "@/ui/button"
import { ButtonGroup } from "@/ui/button-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-button-group-nested",
  standalone: true,
  imports: [Button, ButtonGroup],
  template: `<div uiButtonGroup>
    <div uiButtonGroup>
      <button uiButton variant="outline" size="sm">1</button>
      <button uiButton variant="outline" size="sm">2</button>
      <button uiButton variant="outline" size="sm">3</button>
      <button uiButton variant="outline" size="sm">4</button>
      <button uiButton variant="outline" size="sm">5</button>
    </div>
    <div uiButtonGroup>
      <button uiButton variant="outline" size="icon-sm" aria-label="Previous">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>
      <button uiButton variant="outline" size="icon-sm" aria-label="Next">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </button>
    </div>
  </div>`,
})
export class ButtonGroupNestedComponent {}

export default ButtonGroupNestedComponent
