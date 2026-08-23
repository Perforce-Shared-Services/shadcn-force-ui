import { Component } from "@angular/core"

import { Toaster, toast } from "@/angular-ui/sonner"
import {
  Sidebar,
  SidebarContent,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-group-action.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const FRAME = svg("M120-120v-320h80v240h240v80H120Zm400 0v-80h240v-240h80v320H520ZM120-520v-320h320v80H200v240h-80Zm640 0v-240H520v-80h320v320h-80Z")
const PIE_CHART = svg("M440-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T80-440h360v360Zm80 0v-360h360q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T520-80ZM80-520q0-75 28.5-140.5t77-114q48.5-48.5 114-77T440-880v360H80Zm440 0v-360q75 0 140.5 28.5t114 77q48.5 48.5 77 114T880-520H520Z")
const MAP = svg("m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l192-64 240 84 186-72q20-8 37 4.5t17 32.5v560q0 13-7.5 23T792-184l-192 64Zm-20-98v-468l-200-68v468l200 68Z")
const PLUS = svg("M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z")

@Component({
  selector: "preview-sidebar-group-action",
  standalone: true,
  imports: [
    Toaster,
    SidebarProvider, Sidebar, SidebarContent,
    SidebarGroup, SidebarGroupAction, SidebarGroupContent,
    SidebarGroupLabel, SidebarMenu, SidebarMenuItem,
    SidebarMenuButton,
  ],
  template: `
    <div class="flex h-[300px] w-full overflow-hidden rounded-lg border border-border">
      <ui-sonner-toaster position="bottom-left" class="ml-[160px]"></ui-sonner-toaster>
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar>
          <div uiSidebarContent>
            <div uiSidebarGroup>
              <div uiSidebarGroupLabel>Projects</div>
              <button
                uiSidebarGroupAction
                title="Add Project"
                (click)="addGroup()"
              >
                <span [innerHTML]="PLUS"></span>
                <span class="sr-only">Add Project</span>
              </button>
              <div uiSidebarGroupContent>
                <ul uiSidebarMenu>
                  @for (project of projects; track project.name) {
                    <li uiSidebarMenuItem>
                      <a uiSidebarMenuButton href="#">
                        <span [innerHTML]="project.icon"></span>
                        <span>{{ project.name }}</span>
                      </a>
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
export default class SidebarGroupActionDemoComponent {
  protected readonly projects = [
    { name: "Design Engineering", icon: FRAME },
    { name: "Sales & Marketing", icon: PIE_CHART },
    { name: "Travel", icon: MAP },
  ]
  protected readonly PLUS = PLUS

  protected addGroup(): void {
    toast("You clicked the group action!")
  }
}
