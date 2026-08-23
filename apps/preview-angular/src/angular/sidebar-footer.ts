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
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-footer.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const CHEVRON_UP = svg("m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z")

@Component({
  selector: "preview-sidebar-footer",
  standalone: true,
  imports: [
    DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
    SidebarProvider, Sidebar, SidebarHeader, SidebarContent,
    SidebarFooter, SidebarMenu, SidebarMenuItem,
    SidebarMenuButton, SidebarTrigger, SidebarInset,
  ],
  template: `
    <div class="flex h-[340px] w-full overflow-hidden rounded-lg border border-border">
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar>
          <div uiSidebarHeader></div>
          <div uiSidebarContent></div>
          <div uiSidebarFooter>
            <ul uiSidebarMenu>
              <li uiSidebarMenuItem>
                <div uiDropdownMenuRoot>
                  <button
                    uiDropdownMenuTrigger
                    uiSidebarMenuButton
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    Username
                    <span class="ml-auto [&>svg]:fill-current" [innerHTML]="CHEVRON_UP"></span>
                  </button>
                  <div uiDropdownMenuContent class="w-(--radix-popper-anchor-width)">
                    <button uiDropdownMenuItem><span>Account</span></button>
                    <button uiDropdownMenuItem><span>Billing</span></button>
                    <button uiDropdownMenuItem><span>Sign out</span></button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
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
export default class SidebarFooterDemoComponent {
  protected readonly CHEVRON_UP = CHEVRON_UP
}
