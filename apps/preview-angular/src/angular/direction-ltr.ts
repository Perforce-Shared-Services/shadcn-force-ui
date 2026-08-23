import { Component } from "@angular/core"
import {
  DirectionProvider,
  injectDirection,
} from "@/angular-ui/direction"

@Component({
  selector: "preview-direction-readout-ltr",
  standalone: true,
  template: `<span class="text-sm text-muted-foreground">Resolved direction: <strong class="text-foreground">{{ dir.value }}</strong></span>`,
})
class DirectionReadoutLtrComponent {
  readonly dir = injectDirection()
}

@Component({
  selector: "preview-direction-ltr",
  standalone: true,
  imports: [DirectionProvider, DirectionReadoutLtrComponent],
  template: `
    <div
      uiDirectionProvider
      direction="ltr"
      class="w-96 rounded-lg border p-4"
    >
      <div class="flex items-center gap-2">
        <svg class="size-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m274-450 227 227q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-459q-5-5-7-10t-2-11q0-6 2-11t7-10l278-278q9-9 21-9t21 9q9 9 9 21t-9 21L274-510h496q13 0 21.5 8.5T800-480q0 13-8.5 21.5T770-450H274Z"/></svg>
        <span>Previous version</span>
        <svg class="size-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M686-450H190q-13 0-21.5-8.5T160-480q0-13 8.5-21.5T190-510h496L459-737q-9-9-9-21t9-21q9-9 21-9t21 9l278 278q5 5 7 10t2 11q0 6-2 11t-7 10L501-181q-9 9-21 9t-21-9q-9-9-9-21t9-21l227-227Z"/></svg>
        <span>Next version</span>
      </div>
      <div class="mt-2">
        <preview-direction-readout-ltr />
      </div>
    </div>
  `,
})
export class DirectionLtrComponent {}

export default DirectionLtrComponent
