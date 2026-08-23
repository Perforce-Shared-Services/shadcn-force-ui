import { Component } from "@angular/core"
import { Tabs, TabsList, TabsTrigger } from "@/angular-ui/tabs"

@Component({
  selector: "preview-tabs-disabled",
  standalone: true,
  imports: [Tabs, TabsList, TabsTrigger],
  template: ` <div uiTabs defaultValue="home">
    <div uiTabsList>
      <button uiTabsTrigger value="home">Home</button>
      <button uiTabsTrigger value="settings" [disabled]="true">
        Disabled
      </button>
    </div>
  </div>`,
})
export class TabsDisabledComponent {}

export default TabsDisabledComponent
