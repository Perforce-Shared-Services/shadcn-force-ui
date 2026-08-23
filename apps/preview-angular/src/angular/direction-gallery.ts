import { Component } from "@angular/core"
import {
  DirectionProvider,
  injectDirection,
} from "@/angular-ui/direction"

@Component({
  selector: "preview-direction-gallery-readout",
  standalone: true,
  template: `<span class="text-sm text-muted-foreground">Resolved direction: <strong class="text-foreground">{{ dir.value }}</strong></span>`,
})
class DirectionGalleryReadoutComponent {
  readonly dir = injectDirection()
}

@Component({
  selector: "preview-direction-gallery",
  standalone: true,
  imports: [DirectionProvider, DirectionGalleryReadoutComponent],
  template: `
    <div class="flex flex-wrap items-start gap-4">
      <div
        uiDirectionProvider
        direction="ltr"
        class="w-72 rounded-lg border p-4"
      >
        <div class="flex items-center gap-2">
          <svg class="size-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m274-450 227 227q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-459q-5-5-7-10t-2-11q0-6 2-11t7-10l278-278q9-9 21-9t21 9q9 9 9 21t-9 21L274-510h496q13 0 21.5 8.5T800-480q0 13-8.5 21.5T770-450H274Z"/></svg>
          <span>Previous version</span>
        </div>
        <div class="mt-2"><preview-direction-gallery-readout /></div>
      </div>
      <div
        uiDirectionProvider
        direction="rtl"
        class="w-72 rounded-lg border p-4"
      >
        <div class="flex items-center gap-2">
          <svg class="size-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m274-450 227 227q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-459q-5-5-7-10t-2-11q0-6 2-11t7-10l278-278q9-9 21-9t21 9q9 9 9 21t-9 21L274-510h496q13 0 21.5 8.5T800-480q0 13-8.5 21.5T770-450H274Z"/></svg>
          <span>Previous version</span>
        </div>
        <div class="mt-2"><preview-direction-gallery-readout /></div>
      </div>
    </div>
  `,
})
export class DirectionGalleryComponent {}

export default DirectionGalleryComponent
