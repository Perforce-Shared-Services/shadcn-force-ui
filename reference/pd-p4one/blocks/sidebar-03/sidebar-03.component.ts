import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import stacksIcon from '@material-symbols/svg-400/rounded/stacks.svg?raw';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import { Separator } from '@/app/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
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

interface SubNavItem {
  title: string;
  isActive?: boolean;
}

interface NavItem {
  title: string;
  items?: SubNavItem[];
}

// Decorative icon: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-03` — "a sidebar with submenus". Composed
 * entirely from `ui/sidebar`, `ui/breadcrumb`, `ui/separator` — no new
 * primitives, no new tokens.
 *
 * The registry's header logo row (`SidebarMenuButton asChild` wrapping an
 * `<a href="#">`) is a static, non-navigating demo link in the upstream
 * source (no dropdown, no `useRouter`), so it's rendered as a plain
 * `<button uiSidebarMenuButton>` with icon + text content — matches
 * `sidebar-01`'s audit fix of never nesting an `<a>` inside
 * `button[uiSidebarMenuButton]` (`ui/sidebar`'s `SidebarMenuButton` selector
 * has no anchor variant).
 *
 * Top-level nav rows (`Getting Started`, `Build Your Application`, ...) are
 * likewise `asChild` anchors in the registry; ported as text-only buttons
 * for the same reason. `SidebarMenuSubButton` (`a[uiSidebarMenuSubButton]`)
 * IS itself an anchor, so one-level sub-items use it directly, unwrapped.
 *
 * Audit fixes on top of the registry composition: `nav[uiSidebar]` (landmark,
 * the registry uses a plain `<div>`) and a skip-to-content link (no such
 * element in the Figma frame — a page-level a11y baseline, not a design
 * divergence). No `SidebarGroupLabel` exists in this block's single
 * unlabeled `SidebarGroup` (matches the registry source verbatim), so there
 * is no group label to wire `aria-labelledby` to here.
 */
@Component({
  selector: 'app-block-sidebar-03',
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
    Separator,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
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
        href="#sidebar-03-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar aria-label="Documentation">
        <div uiSidebarHeader class="relative z-10 border-b border-sidebar-border">
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button uiSidebarMenuButton size="lg">
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="stacks"
                ></div>
                <div class="flex flex-col gap-0.5 leading-none">
                  <span class="font-medium">Documentation</span>
                  <span>v1.0.0</span>
                </div>
              </button>
            </li>
          </ul>
        </div>

        <div uiSidebarContent>
          <div uiSidebarGroup>
            <ul uiSidebarMenu>
              <li uiSidebarMenuItem *ngFor="let item of navMain">
                <button uiSidebarMenuButton class="font-medium">
                  <span>{{ item.title }}</span>
                </button>
                <ul uiSidebarMenuSub *ngIf="item.items?.length">
                  <li uiSidebarMenuSubItem *ngFor="let sub of item.items">
                    <a uiSidebarMenuSubButton href="javascript:void(0)" [isActive]="!!sub.isActive">{{
                      sub.title
                    }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-03-main">
        <header class="flex h-16 shrink-0 items-center gap-2 border-b border-border">
          <div class="flex items-center gap-2 px-3">
            <button uiSidebarTrigger></button>
            <div uiSeparator orientation="vertical" class="mr-2 h-4 self-auto!"></div>
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
          </div>
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
    </div>
  `,
})
export class Sidebar03Block {
  private readonly sanitizer = inject(DomSanitizer);

  // [innerHTML] runs through Angular's sanitizer, which strips raw <svg>
  // markup — bypassSecurityTrustHtml is required for owned, static icons.
  protected readonly stacks: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(stacksIcon));

  // Matches the registry's own sample data verbatim.
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
