import { Toggle } from "@/angular-ui/toggle"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-outline",
  standalone: true,
  imports: [Toggle],
  template: ` <div class="flex flex-wrap items-center gap-2">
    <button uiToggle variant="outline" aria-label="Toggle italic">
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
    </button>
    <button uiToggle variant="outline" aria-label="Toggle bold">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M272-200v-560h221q65 0 114 40.5T656-608q0 38-21 62t-56 37q43 15 68.5 51t25.5 81q0 68-52.5 107.5T495-200H272Zm138-325h83q34 0 55.5-18.5T570-594q0-35-21.5-53.5T493-666h-83v141Zm0 193h88q35 0 58-19.5t23-54.5q0-35-23-54.5T498-479h-88v147Z"
        />
      </svg>
      Bold
    </button>
  </div>`,
})
export class ToggleOutlineComponent {}

export default ToggleOutlineComponent
