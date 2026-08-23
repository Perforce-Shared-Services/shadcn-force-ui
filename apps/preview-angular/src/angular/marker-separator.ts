import { Marker, MarkerContent, MarkerIcon } from "@/angular-ui/marker"
import { Component } from "@angular/core"
@Component({
  selector: "preview-marker-separator",
  standalone: true,
  imports: [Marker, MarkerContent, MarkerIcon],
  template: `
    <div class="flex w-full flex-col gap-8 py-12 sm:max-w-sm">
      <div uiMarker variant="separator">
        <span uiMarkerContent>Today</span>
      </div>
      <div uiMarker variant="separator">
        <span uiMarkerContent>Worked for 42s</span>
      </div>
      <div uiMarker variant="separator">
        <span uiMarkerContent>Conversation compacted</span>
      </div>
    </div>
  `
})
export class MarkerSeparatorComponent {}{}

export default MarkerSeparatorComponent
