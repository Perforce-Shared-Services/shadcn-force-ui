import { Marker, MarkerContent, MarkerIcon } from "@/angular-ui/marker"
import { Component } from "@angular/core"
@Component({
  selector: "preview-marker-variants",
  standalone: true,
  imports: [Marker, MarkerContent, MarkerIcon],
  template: `
    <div class="flex w-full flex-col gap-8 py-12 sm:max-w-sm">
      <div uiMarker>
        <span uiMarkerContent>A default marker for inline notes.</span>
      </div>
      <div uiMarker variant="separator">
        <span uiMarkerContent>A separator marker</span>
      </div>
      <div uiMarker variant="border">
        <span uiMarkerContent>A border marker for row boundaries.</span>
      </div>
    </div>
  `
})
export class MarkerVariantsComponent {}{}

export default MarkerVariantsComponent
