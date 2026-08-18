import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/app/ui/sidebar';

interface NavSubItem {
  title: string;
  isActive?: boolean;
}

interface NavItem {
  title: string;
  items?: NavSubItem[];
}

/**
 * Port of `@force-ui/sidebar-14` — a sidebar docked on the right, with a
 * two-level table of contents (top-level entries + sub-entries). Composed
 * entirely from `ui/sidebar` + `ui/breadcrumb` — no new primitives, no new
 * tokens.
 *
 * `side="right"` on `nav[uiSidebar]` matches the registry's `<AppSidebar
 * side="right" />`. `ui/sidebar`'s desktop rail/container are `fixed`
 * positioned per `data-side`, but the flex "gap" placeholder that reserves
 * horizontal space for it in the layout is a normal-flow sibling — so DOM
 * order still matters for a right-docked sidebar. Mirrors the registry's own
 * JSX order: `<SidebarInset>` (main content) first, `<AppSidebar>` second,
 * both direct children of `[uiSidebarProvider]`.
 *
 * Top-level entries are `asChild` anchors in the registry
 * (`<SidebarMenuButton asChild><a>...`). `ui/sidebar`'s `SidebarMenuButton`
 * selector is fixed to a real `button[uiSidebarMenuButton]` with no anchor
 * variant, so nesting an `<a>` inside it would double up interactive
 * elements — rendered as plain `<button uiSidebarMenuButton><span
 * class="font-medium">` text instead, matching `sidebar-01`'s own
 * convention. Sub-entries keep the registry's anchor since
 * `SidebarMenuSubButton` (`a[uiSidebarMenuSubButton]`) is an anchor
 * selector.
 */
@Component({
  selector: 'app-block-sidebar-14',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
  ],
  template: `
    <div uiSidebarProvider class="h-screen overflow-hidden">
      <a
        href="#sidebar-14-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <main uiSidebarInset id="sidebar-14-main">
        <header class="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
          <nav uiBreadcrumb>
            <ol uiBreadcrumbList>
              <li uiBreadcrumbItem class="hidden md:block">
                <a uiBreadcrumbLink href="javascript:void(0)">Build Your Application</a>
              </li>
              <li uiBreadcrumbSeparator class="hidden md:block"></li>
              <li uiBreadcrumbItem>
                <span uiBreadcrumbPage>Data Fetching</span>
              </li>
            </ol>
          </nav>
          <button uiSidebarTrigger class="-mr-1 ml-auto rotate-180"></button>
        </header>
        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
          </div>
          <div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div>
      </main>

      <nav uiSidebar side="right" aria-label="Table of contents">
        <div uiSidebarContent>
          <div uiSidebarGroup>
            <div uiSidebarGroupLabel [id]="'sidebar-14-group-0-label'">Table of Contents</div>
            <div uiSidebarGroupContent>
              <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-14-group-0-label'">
                <li uiSidebarMenuItem *ngFor="let item of navMain">
                  <button uiSidebarMenuButton>
                    <span class="font-medium">{{ item.title }}</span>
                  </button>
                  <ul uiSidebarMenuSub *ngIf="item.items?.length">
                    <li uiSidebarMenuSubItem *ngFor="let subItem of item.items">
                      <a uiSidebarMenuSubButton [isActive]="!!subItem.isActive" href="javascript:void(0)">{{ subItem.title }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button uiSidebarRail></button>
      </nav>
    </div>
  `,
})
export class Sidebar14Block {
  protected readonly navMain: NavItem[] = [
    {
      title: 'Getting Started',
      items: [{ title: 'Installation' }, { title: 'Project Structure' }],
    },
    {
      title: 'Build Your Application',
      items: [
        { title: 'Routing' },
        { title: 'Data Fetching', isActive: true },
        { title: 'Rendering' },
        { title: 'Caching' },
        { title: 'Styling' },
        { title: 'Optimizing' },
        { title: 'Configuring' },
        { title: 'Testing' },
        { title: 'Authentication' },
        { title: 'Deploying' },
        { title: 'Upgrading' },
        { title: 'Examples' },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Components' },
        { title: 'File Conventions' },
        { title: 'Functions' },
        { title: 'next.config.js Options' },
        { title: 'CLI' },
        { title: 'Edge Runtime' },
      ],
    },
    {
      title: 'Architecture',
      items: [
        { title: 'Accessibility' },
        { title: 'Fast Refresh' },
        { title: 'Next.js Compiler' },
        { title: 'Supported Browsers' },
        { title: 'Turbopack' },
      ],
    },
    {
      title: 'Community',
      items: [{ title: 'Contribution Guide' }],
    },
  ];
}
