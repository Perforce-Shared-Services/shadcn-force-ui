import { Button } from "@/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/ui/empty"
import { Component } from "@angular/core"

@Component({
  selector: "preview-empty-demo",
  standalone: true,
  imports: [
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    Button,
  ],
  template: ` <div uiEmpty class="border">
    <div uiEmptyHeader>
      <div uiEmptyMedia variant="icon">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </div>
      <h3 uiEmptyTitle>No files yet</h3>
      <p uiEmptyDescription>Upload your first file to get started.</p>
    </div>
    <div uiEmptyContent><button uiButton>Upload file</button></div>
  </div>`,
})
export class EmptyDemoComponent {}

export default EmptyDemoComponent
