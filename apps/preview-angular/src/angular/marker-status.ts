import { Marker, MarkerContent, MarkerIcon } from "@/angular-ui/marker"
import { Component } from "@angular/core"
import { Spinner } from "@/angular-ui/spinner"
@Component({
  selector: "preview-marker-status",
  standalone: true,
  imports: [Marker, MarkerContent, MarkerIcon, Spinner],
  template: `
    <div class="flex w-full flex-col gap-8 py-12 sm:max-w-sm">
      <div uiMarker role="status">
        <span uiMarkerIcon><span uiSpinner /></span>
        <span uiMarkerContent>Compacting conversation</span>
      </div>
      <div uiMarker variant="separator" role="status">
        <span uiMarkerIcon><span uiSpinner /></span>
        <span uiMarkerContent>Running tests</span>
      </div>
    </div>
  `
})
export class MarkerStatusComponent {}{}

export default MarkerStatusComponent
