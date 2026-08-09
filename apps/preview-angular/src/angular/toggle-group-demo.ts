import { ToggleGroup, ToggleGroupItem } from "@/angular-ui/toggle-group"
import { Component } from "@angular/core"

@Component({
  selector: "preview-toggle-group-demo",
  standalone: true,
  imports: [ToggleGroup, ToggleGroupItem],
  template: ` <div uiToggleGroup type="single" value="center">
    <button uiToggleGroupItem value="left" aria-label="Left align">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z"
        />
      </svg>
    </button>
    <button uiToggleGroupItem value="center" aria-label="Center align">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z"
        />
      </svg>
    </button>
    <button uiToggleGroupItem value="right" aria-label="Right align">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M120-120v-80h720v80H120Zm240-160v-80h480v80H360ZM120-440v-80h720v80H120Zm240-160v-80h480v80H360ZM120-760v-80h720v80H120Z"
        />
      </svg>
    </button>
  </div>`,
})
export class ToggleGroupDemoComponent {}

export default ToggleGroupDemoComponent
