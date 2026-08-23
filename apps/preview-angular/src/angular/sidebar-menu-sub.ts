import { Component } from "@angular/core"

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

// apps/v4/examples/base/sidebar-menu-sub.tsx
interface Item {
  title: string
  url: string
  items: { title: string; url: string }[]
}

@Component({
  selector: "preview-sidebar-menu-sub",
  standalone: true,
  imports: [
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
                  @for (item of items; track item.title) {
                    <li uiSidebarMenuItem>
                      <a uiSidebarMenuButton [href]="item.url"><span>{{ item.title }}</span></a>
                      <ul uiSidebarMenuSub>
                        @for (subItem of item.items; track subItem.title) {
                          <li uiSidebarMenuSubItem>
                            <a uiSidebarMenuSubButton [href]="subItem.url">
                              <span>{{ subItem.title }}</span>
                            </a>
                          </li>
                        }
                      </ul>
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
export default class SidebarMenuSubDemoComponent {
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
      title: "Build Your Application",
      url: "#",
      items: [
        { title: "Routing", url: "#" },
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
