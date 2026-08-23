import { Component } from "@angular/core"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-menu-action.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const FRAME = svg("M120-120v-320h80v240h240v80H120Zm400 0v-80h240v-240h80v320H520ZM120-520v-320h320v80H200v240h-80Zm640 0v-240H520v-80h320v320h-80Z")
const PIE_CHART = svg("M440-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T80-440h360v360Zm80 0v-360h360q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T520-80ZM80-520q0-75 28.5-140.5t77-114q48.5-48.5 114-77T440-880v360H80Zm440 0v-360q75 0 140.5 28.5t114 77q48.5 48.5 77 114T880-520H520Z")
const MAP = svg("m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l192-64 240 84 186-72q20-8 37 4.5t17 32.5v560q0 13-7.5 23T792-184l-192 64Zm-20-98v-468l-200-68v468l200 68Z")
const SUPPORT = svg("M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5Zm35-48.5 63-150q-38-13-67.5-41.5T310-421l-150 60q31 71 82 123t117 78Zm-50-378q16-41 45-70t67-42l-60-150q-75 31-127 83.5T160-598l149 60Zm256 143q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm36 235q69-28 120-79.5T800-359l-150-62q-15 42-44.5 70.5T538-310l63 150Zm49-379 150-62q-28-68-79.5-119.5T601-800l-61 150q38 13 66 41.5t44 69.5Z")
const SEND = svg("M814-452 162-178q-15 6-28.5-2.5T120-205v-550q0-16 13.5-24.5T162-782l652 274q18 8 18 28t-18 28ZM180-253l544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z")
const MORE_HORIZONTAL = svg("M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z")

@Component({
  selector: "preview-sidebar-menu-action",
  standalone: true,
  imports: [
    DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
    SidebarProvider, Sidebar, SidebarContent,
    SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarMenuAction,
  ],
  template: `
    <div class="flex h-[300px] w-full overflow-hidden rounded-lg border border-border">
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar>
          <div uiSidebarContent>
            <div uiSidebarGroup>
              <div uiSidebarGroupLabel>Projects</div>
              <div uiSidebarGroupContent>
                <ul uiSidebarMenu>
                  @for (project of projects; track project.name) {
                    <li uiSidebarMenuItem>
                      <a
                        uiSidebarMenuButton
                        [href]="project.url"
                        class="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                      >
                        <span [innerHTML]="project.icon"></span>
                        <span>{{ project.name }}</span>
                      </a>
                      <div uiDropdownMenuRoot>
                        <button uiDropdownMenuTrigger uiSidebarMenuAction>
                          <span [innerHTML]="MORE_HORIZONTAL"></span>
                          <span class="sr-only">More</span>
                        </button>
                        <div uiDropdownMenuContent>
                          <button uiDropdownMenuItem><span>Edit Project</span></button>
                          <button uiDropdownMenuItem><span>Delete Project</span></button>
                        </div>
                      </div>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `,
})
export default class SidebarMenuActionDemoComponent {
  protected readonly projects = [
    { name: "Design Engineering", url: "#", icon: FRAME },
    { name: "Sales & Marketing", url: "#", icon: PIE_CHART },
    { name: "Travel", url: "#", icon: MAP },
    { name: "Support", url: "#", icon: SUPPORT },
    { name: "Feedback", url: "#", icon: SEND },
  ]
  protected readonly MORE_HORIZONTAL = MORE_HORIZONTAL
}
