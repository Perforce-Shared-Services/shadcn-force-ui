import { Marker, MarkerContent, MarkerIcon } from "@/angular-ui/marker"
import { Component } from "@angular/core"
@Component({
  selector: "preview-marker-shimmer",
  standalone: true,
  imports: [Marker, MarkerContent, MarkerIcon],
  template: `
    <div class="flex w-full flex-col gap-8 py-12 sm:max-w-sm">
      <div uiMarker role="status">
        <span uiMarkerContent class="shimmer">Thinking...</span>
      </div>
      <div uiMarker variant="separator" role="status">
        <span uiMarkerContent class="shimmer">Reading 4 files</span>
      </div>
    </div>
  `
})
export class MarkerShimmerComponent {}{}

export default MarkerShimmerComponent
