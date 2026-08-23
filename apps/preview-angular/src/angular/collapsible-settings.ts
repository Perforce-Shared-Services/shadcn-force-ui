import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/angular-ui/collapsible"
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Component, signal } from "@angular/core"

@Component({
  selector: "preview-collapsible-settings",
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardDescription, CardContent, Collapsible, CollapsibleTrigger, CollapsibleContent, Field, FieldGroup, FieldLabel, Input],
  template: ` <div uiCard class="mx-auto w-full max-w-xs">
    <div uiCardHeader>
      <div uiCardTitle>Radius</div>
      <div uiCardDescription>Set the corner radius of the element.</div>
    </div>
    <div uiCardContent>
      <div uiCollapsible [(open)]="open" class="flex items-start gap-2">
        <div uiFieldGroup class="grid w-full grid-cols-2 gap-2">
          <div uiField>
            <label uiFieldLabel for="radius-x" class="sr-only">
              Radius X
            </label>
            <input uiInput id="radius-x" placeholder="0" value="0" />
          </div>
          <div uiField>
            <label uiFieldLabel for="radius-y" class="sr-only">
              Radius Y
            </label>
            <input uiInput id="radius-y" placeholder="0" value="0" />
          </div>
          <div
            uiCollapsibleContent
            class="col-span-full grid grid-cols-subgrid gap-2"
          >
            <div uiField>
              <label uiFieldLabel for="radius-z" class="sr-only">
                Radius Z
              </label>
              <input uiInput id="radius-z" placeholder="0" value="0" />
            </div>
            <div uiField>
              <label uiFieldLabel for="radius-w" class="sr-only">
                Radius W
              </label>
              <input uiInput id="radius-w" placeholder="0" value="0" />
            </div>
          </div>
        </div>
        <button
          uiCollapsibleTrigger
          class="inline-flex size-9 shrink-0 items-center justify-center gap-2 rounded-md border border-input bg-background text-sm font-medium whitespace-nowrap transition-all hover:bg-accent hover:text-accent-foreground [&_svg]:fill-current [&_svg]:size-4"
          aria-label="Toggle radius fields"
        >
          @if (open()) {
            <!-- minimize -->
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
            </svg>
          } @else {
            <!-- maximize -->
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          }
        </button>
      </div>
    </div>
  </div>`,
})
export class CollapsibleSettingsComponent {
  readonly open = signal(true)
}

export default CollapsibleSettingsComponent
