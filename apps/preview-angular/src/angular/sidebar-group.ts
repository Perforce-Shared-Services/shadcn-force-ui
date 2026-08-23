import { Component } from "@angular/core"

import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-group.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const LIFE_BUOY = svg("M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z")
const SEND = svg("M120-160v-240l320-80-320-80v-240l720 320-720 320Z")

@Component({
  selector: "preview-sidebar-group",
  standalone: true,
  imports: [
    SidebarProvider, Sidebar, SidebarContent,
    SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  ],
  template: `
    <div class="flex h-[300px] w-full overflow-hidden rounded-lg border border-border">
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar>
          <div uiSidebarContent>
            <div uiSidebarGroup>
              <div uiSidebarGroupLabel>Help</div>
              <div uiSidebarGroupContent>
                <ul uiSidebarMenu>
                  <li uiSidebarMenuItem>
                    <button uiSidebarMenuButton>
                      <span [innerHTML]="LIFE_BUOY"></span>
                      Support
                    </button>
                  </li>
                  <li uiSidebarMenuItem>
                    <button uiSidebarMenuButton>
                      <span [innerHTML]="SEND"></span>
                      Feedback
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `,
})
export default class SidebarGroupDemoComponent {
  protected readonly LIFE_BUOY = LIFE_BUOY
  protected readonly SEND = SEND
}
