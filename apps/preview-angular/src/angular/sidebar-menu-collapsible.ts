import { Component } from "@angular/core"

import {
  CollapsibleContent,
  Collapsible,
  CollapsibleTrigger,
} from "@/angular-ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-menu-collapsible.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const CHEVRON_RIGHT = svg("m384-240 168-240-168-240h96l168 240-168 240h-96Z")

interface Item {
  title: string
  url: string
  items?: { title: string; url: string }[]
}

@Component({
  selector: "preview-sidebar-menu-collapsible",
  standalone: true,
  imports: [
    Collapsible, CollapsibleTrigger, CollapsibleContent,
    SidebarProvider, Sidebar, SidebarContent,
    SidebarGroup, SidebarGroupContent,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,
  ],
  template: `
    <div class="flex h-[300px] w-full overflow-hidden rounded-lg border border-border">
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar>
          <div uiSidebarContent>
            <div uiSidebarGroup>
              <div uiSidebarGroupContent>
                <ul uiSidebarMenu>
                  @for (item of items; track item.title; let i = $index) {
                    <li uiSidebarMenuItem>
                      <div uiCollapsible class="group/collapsible contents" [open]="i === 0">
                        <button uiCollapsibleTrigger uiSidebarMenuButton>
                          <span>{{ item.title }}</span>
                          <span class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 [&>svg]:fill-current" [innerHTML]="CHEVRON_RIGHT"></span>
                        </button>
                        <div uiCollapsibleContent class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none">
                          <ul uiSidebarMenuSub>
                            @for (subItem of item.items ?? []; track subItem.title) {
                              <li uiSidebarMenuSubItem>
                                <a uiSidebarMenuSubButton [href]="subItem.url">
                                  <span>{{ subItem.title }}</span>
                                </a>
                              </li>
                            }
                          </ul>
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
export default class SidebarMenuCollapsibleDemoComponent {
  protected readonly CHEVRON_RIGHT = CHEVRON_RIGHT
  protected readonly items: Item[] = [
    {
      title: "Getting Started",
      url: "#",
      items: [
        { title: "Installation", url: "#" },
        { title: "Project Structure", url: "#" },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        { title: "Data Fetching", url: "#" },
        { title: "Rendering", url: "#" },
        { title: "Caching", url: "#" },
        { title: "Styling", url: "#" },
        { title: "Optimizing", url: "#" },
        { title: "Configuring", url: "#" },
        { title: "Testing", url: "#" },
        { title: "Authentication", url: "#" },
        { title: "Deploying", url: "#" },
        { title: "Upgrading", url: "#" },
        { title: "Examples", url: "#" },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        { title: "Components", url: "#" },
        { title: "File Conventions", url: "#" },
        { title: "Functions", url: "#" },
        { title: "next.config.js Options", url: "#" },
        { title: "CLI", url: "#" },
        { title: "Edge Runtime", url: "#" },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        { title: "Accessibility", url: "#" },
        { title: "Fast Refresh", url: "#" },
        { title: "Next.js Compiler", url: "#" },
        { title: "Supported Browsers", url: "#" },
        { title: "Turbopack", url: "#" },
      ],
    },
  ]
}
