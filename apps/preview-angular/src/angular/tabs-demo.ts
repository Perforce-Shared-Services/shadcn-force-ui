import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/angular-ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/angular-ui/tabs"
import { Component } from "@angular/core"

// apps/v4/examples/base/tabs-demo.tsx
@Component({
  selector: "preview-tabs-demo",
  standalone: true,
  imports: [Tabs, TabsList, TabsTrigger, TabsContent, Card, CardHeader, CardTitle, CardDescription, CardContent],
  template: `
    <div uiTabs defaultValue="overview" class="w-full max-w-sm">
      <div uiTabsList class="w-full">
        <button uiTabsTrigger value="overview">Overview</button>
        <button uiTabsTrigger value="analytics">Analytics</button>
        <button uiTabsTrigger value="reports">Reports</button>
        <button uiTabsTrigger value="settings">Settings</button>
      </div>
      <div uiTabsContent value="overview">
        <div uiCard>
          <div uiCardHeader>
            <div uiCardTitle>Overview</div>
            <div uiCardDescription>
              View your key metrics and recent project activity. Track progress
              across all your active projects.
            </div>
          </div>
          <div uiCardContent class="text-sm text-muted-foreground">
            You have 12 active projects and 3 pending tasks.
          </div>
        </div>
      </div>
      <div uiTabsContent value="analytics">
        <div uiCard>
          <div uiCardHeader>
            <div uiCardTitle>Analytics</div>
            <div uiCardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </div>
          </div>
          <div uiCardContent class="text-sm text-muted-foreground">
            Page views are up 25% compared to last month.
          </div>
        </div>
      </div>
      <div uiTabsContent value="reports">
        <div uiCard>
          <div uiCardHeader>
            <div uiCardTitle>Reports</div>
            <div uiCardDescription>
              Generate and download your detailed reports. Export data in
              multiple formats for analysis.
            </div>
          </div>
          <div uiCardContent class="text-sm text-muted-foreground">
            You have 5 reports ready and available to export.
          </div>
        </div>
      </div>
      <div uiTabsContent value="settings">
        <div uiCard>
          <div uiCardHeader>
            <div uiCardTitle>Settings</div>
            <div uiCardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </div>
          </div>
          <div uiCardContent class="text-sm text-muted-foreground">
            Configure notifications, security, and themes.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TabsDemoComponent {}

export default TabsDemoComponent
