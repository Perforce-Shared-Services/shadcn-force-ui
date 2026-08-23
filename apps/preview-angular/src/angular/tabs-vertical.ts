import { Component } from "@angular/core"
import { Tabs, TabsList, TabsTrigger } from "@/angular-ui/tabs"

@Component({
  selector: "preview-tabs-vertical",
  standalone: true,
  imports: [Tabs, TabsList, TabsTrigger],
  template: ` <div uiTabs defaultValue="account" orientation="vertical" class="w-full max-w-sm">
    <div uiTabsList>
      <button uiTabsTrigger value="account">Account</button>
      <button uiTabsTrigger value="password">Password</button>
      <button uiTabsTrigger value="notifications">Notifications</button>
    </div>
  </div>`,
})
export class TabsVerticalComponent {}

export default TabsVerticalComponent
