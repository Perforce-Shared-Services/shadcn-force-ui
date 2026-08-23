import { Toggle } from "@/angular-ui/toggle"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-text",
  standalone: true,
  imports: [Toggle],
  template: ` <button uiToggle aria-label="Toggle italic">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
    >
      <path
        d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"
      />
    </svg>
    Italic
  </button>`,
})
export class ToggleTextComponent {}

export default ToggleTextComponent
