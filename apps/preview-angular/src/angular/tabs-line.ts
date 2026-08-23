import { Component } from "@angular/core"
import { Tabs, TabsList, TabsTrigger } from "@/angular-ui/tabs"

@Component({
  selector: "preview-tabs-line",
  standalone: true,
  imports: [Tabs, TabsList, TabsTrigger],
  template: ` <div uiTabs defaultValue="overview">
    <div uiTabsList variant="line">
      <button uiTabsTrigger value="overview">Overview</button>
      <button uiTabsTrigger value="analytics">Analytics</button>
      <button uiTabsTrigger value="reports">Reports</button>
    </div>
  </div>`,
})
export class TabsLineComponent {}

export default TabsLineComponent
