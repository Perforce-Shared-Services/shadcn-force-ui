import { Button } from "@/angular-ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/angular-ui/empty"
import { Component } from "@angular/core"

@Component({
  selector: "preview-empty-outline",
  standalone: true,
  imports: [Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, Button],
  template: ` <div uiEmpty class="border border-dashed">
    <div uiEmptyHeader>
      <div uiEmptyMedia variant="icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M251-160q-88 0-149.5-61.5T40-371q0-78 50-137t127-71q20-97 94-158.5T482-799q112 0 189 81.5T748-522v24q72-2 122 46.5T920-329q0 69-50 119t-119 50H251Zm0-60h500q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-91-61-154t-149-63q-88 0-149.5 63T267-522h-19q-62 0-105 43.5T100-371q0 63 44 107t107 44Zm229-260Z" /></svg>
      </div>
      <h3 uiEmptyTitle>Cloud Storage Empty</h3>
      <p uiEmptyDescription>
        Upload files to your cloud storage to access them anywhere.
      </p>
    </div>
    <div uiEmptyContent>
      <button uiButton variant="outline" size="sm">Upload Files</button>
    </div>
  </div>`,
})
export class EmptyOutlineComponent {}

export default EmptyOutlineComponent
