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
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-header.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const GALLERY_VERTICAL_END = svg("M223-80q-20 0-33.5-14T176-128v-704q0-19 13.5-33t33.5-14h314l253 253v498q0 20-14 33.5T736-80H223Zm30-505h200v-200L253-585ZM480-267q42 0 71-29t29-71v-173h-40v173q0 25-17.5 42.5T480-302q-25 0-42.5-17.5T420-362v-193q0-11 7-18.5t18-7.5q11 0 18.5 7.5T471-555v173h40V555q0-27-18.5-46.5T445-489q-27 0-46 18.5T380-424v162q0 42 29 71t71 29Z")
const CHEVRON_DOWN = svg("M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z")

@Component({
  selector: "preview-sidebar-header",
  standalone: true,
  imports: [
    DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
    SidebarProvider, Sidebar, SidebarHeader, SidebarContent,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarTrigger, SidebarInset,
  ],
  template: `
    <div class="flex h-[340px] w-full overflow-hidden rounded-lg border border-border">
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar>
          <div uiSidebarHeader>
            <ul uiSidebarMenu>
              <li uiSidebarMenuItem>
                <div uiDropdownMenuRoot>
                  <button
                    uiDropdownMenuTrigger
                    uiSidebarMenuButton
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    Select Workspace
                    <span class="ml-auto [&>svg]:fill-current" [innerHTML]="CHEVRON_DOWN"></span>
                  </button>
                  <div uiDropdownMenuContent class="w-(--radix-popper-anchor-width)">
                    <button uiDropdownMenuItem><span>Acme Inc</span></button>
                    <button uiDropdownMenuItem><span>Acme Corp.</span></button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div uiSidebarContent></div>
        </nav>
        <main uiSidebarInset>
          <header class="flex h-12 items-center justify-between px-4">
            <button uiSidebarTrigger></button>
          </header>
        </main>
      </div>
    </div>
  `,
})
export default class SidebarHeaderDemoComponent {
  protected readonly CHEVRON_DOWN = CHEVRON_DOWN
}
