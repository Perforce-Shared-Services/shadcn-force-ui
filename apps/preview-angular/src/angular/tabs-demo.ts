import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/angular-ui/tabs"
import { Component } from "@angular/core"

@Component({
  selector: "preview-tabs-demo",
  standalone: true,
  imports: [Tabs, TabsList, TabsTrigger, TabsContent],
  template: ` <div uiTabs defaultValue="account" class="w-full max-w-sm">
    <div uiTabsList class="w-full">
      <button uiTabsTrigger value="account">Account</button>
      <button uiTabsTrigger value="password">Password</button>
    </div>
    <div uiTabsContent value="account" class="mt-2 p-3 text-sm">
      Make changes to your account here.
    </div>
    <div uiTabsContent value="password" class="mt-2 p-3 text-sm">
      Change your password here.
    </div>
  </div>`,
})
export class TabsDemoComponent {}

export default TabsDemoComponent
