import { Component, signal } from "@angular/core"

import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-rsc.tsx — React streams the list via a server
// component; the Angular preview simulates the same async fetch with a signal
// + setTimeout so the skeleton fallback state is visible.
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const FRAME = svg("M120-120v-320h80v240h240v80H120Zm400 0v-80h240v-240h80v320H520ZM120-520v-320h320v80H200v240h-80Zm640 0v-240H520v-80h320v320h-80Z")
const PIE_CHART = svg("M440-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T80-440h360v360Zm80 0v-360h360q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T520-80ZM80-520q0-75 28.5-140.5t77-114q48.5-48.5 114-77T440-880v360H80Zm440 0v-360q75 0 140.5 28.5t114 77q48.5 48.5 77 114T880-520H520Z")
const MAP = svg("m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l192-64 240 84 186-72q20-8 37 4.5t17 32.5v560q0 13-7.5 23T792-184l-192 64Zm-20-98v-468l-200-68v468l200 68Z")
const LIFE_BUOY = svg("M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z")
const SEND = svg("M120-160v-240l320-80-320-80v-240l720 320-720 320Z")

@Component({
  selector: "preview-sidebar-rsc",
  standalone: true,
  imports: [
    SidebarProvider, Sidebar, SidebarContent,
    SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarMenuSkeleton,
  ],
  template: `
    <div class="flex h-[300px] w-full overflow-hidden rounded-lg border border-border">
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar>
          <div uiSidebarContent>
            <div uiSidebarGroup>
              <div uiSidebarGroupLabel>Projects</div>
              <div uiSidebarGroupContent>
                @if (loading()) {
                  <!-- NavProjectsSkeleton -->
                  <ul uiSidebarMenu>
                    @for (i of skeletonRows; track i) {
                      <li uiSidebarMenuItem>
                        <div uiSidebarMenuSkeleton showIcon></div>
                      </li>
                    }
                  </ul>
                } @else {
                  <!-- NavProjects -->
                  <ul uiSidebarMenu>
                    @for (project of projects; track project.name) {
                      <li uiSidebarMenuItem>
                        <a uiSidebarMenuButton [href]="project.url">
                          <span [innerHTML]="project.icon"></span>
                          <span>{{ project.name }}</span>
                        </a>
                      </li>
                    }
                  </ul>
                }
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `,
})
export default class SidebarRscDemoComponent {
  protected readonly projects = [
    { name: "Design Engineering", url: "#", icon: FRAME },
    { name: "Sales & Marketing", url: "#", icon: PIE_CHART },
    { name: "Travel", url: "#", icon: MAP },
    { name: "Support", url: "#", icon: LIFE_BUOY },
    { name: "Feedback", url: "#", icon: SEND },
  ]
  protected readonly skeletonRows = Array.from({ length: 5 }, (_, i) => i)
  protected readonly loading = signal(true)

  constructor() {
    // fetchProjects(): await new Promise((resolve) => setTimeout(resolve, 3000))
    setTimeout(() => this.loading.set(false), 3000)
  }
}
