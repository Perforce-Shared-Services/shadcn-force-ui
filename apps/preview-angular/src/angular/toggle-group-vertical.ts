import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-group-vertical",
  standalone: true,
  imports: [ToggleGroup, ToggleGroupItem],
  template: ` <div uiToggleGroup orientation="vertical" [value]="['bold', 'italic']" class="gap-1">
    <button uiToggleGroupItem value="bold" aria-label="Toggle bold">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M272-200v-560h221q65 0 114 40.5T656-608q0 38-21 62t-56 37q43 15 68.5 51t25.5 81q0 68-52.5 107.5T495-200H272Zm138-325h83q34 0 55.5-18.5T570-594q0-35-21.5-53.5T493-666h-83v141Zm0 193h88q35 0 58-19.5t23-54.5q0-35-23-54.5T498-479h-88v147Z"
        />
      </svg>
    </button>
    <button uiToggleGroupItem value="italic" aria-label="Toggle italic">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"
        />
      </svg>
    </button>
    <button uiToggleGroupItem value="underline" aria-label="Toggle underline">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M200-160v-80h560v80H200Zm80-120v-360h-80v-80h220q42 0 71 29t29 71v20q0 26-13 48t-36 32q23 10 36 30t13 44v26q0 42-29 71t-71 29H280Zm40-320h100q17 0 28.5-11.5T460-640q0-17-11.5-28.5T420-680H320v80Zm0 240h100q17 0 28.5-11.5T460-280q0-17-11.5-28.5T420-320H320v80Z"
        />
      </svg>
    </button>
  </div>`,
})
export class ToggleGroupVerticalComponent {}

export default ToggleGroupVerticalComponent
