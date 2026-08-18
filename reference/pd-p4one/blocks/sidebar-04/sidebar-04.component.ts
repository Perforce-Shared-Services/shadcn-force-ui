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
 * Port of `@force-ui/sidebar-04` — "a floating sidebar with submenus".
 * Structurally identical to `sidebar-03` (same header logo row, same
 * submenu composition, same demo nav data) plus `variant="floating"` on
 * `Sidebar` and no `SidebarRail` (the registry's floating variant omits the
 * rail — a floating sidebar has no edge to drag-resize from). Composed
 * entirely from `ui/sidebar`, `ui/breadcrumb`, `ui/separator` — no new
 * primitives, no new tokens.
 *
 * Same anchor-nesting fixes as `sidebar-03`: the header logo row and
 * top-level nav rows are `asChild` anchors in the registry, ported as
 * text-only `button[uiSidebarMenuButton]` content (no anchor variant on
 * that selector); `SidebarMenuSubButton` (`a[uiSidebarMenuSubButton]`) IS
 * itself an anchor, used directly for one-level sub-items.
 *
 * Documented, accepted gap: the registry's `page.tsx` sets
 * `style={{"--sidebar-width": "19rem"}}` on `SidebarProvider` to widen the
 * floating sidebar. `ui/sidebar`'s `SidebarProviderComponent` binds
 * `--sidebar-width` to a fixed internal constant (no `@Input` to override
 * it) — overriding it from a block would mean re-declaring the same host
 * style binding on the outer element, which Angular does not guarantee
 * wins over the component's own host binding. Left at the primitive's
 * default width rather than hacking around it here; revisit if/when
 * `ui/sidebar` grows a `width` input.
 *
 * Audit fixes on top of the registry composition: `nav[uiSidebar]` (landmark,
 * the registry uses a plain `<div>`) and a skip-to-content link (no such
 * element in the Figma frame — a page-level a11y baseline, not a design
 * divergence). No `SidebarGroupLabel` exists in this block's single
 * unlabeled `SidebarGroup` (matches the registry source verbatim), so there
 * is no group label to wire `aria-labelledby` to here.
 */
@Component({
  selector: 'app-block-sidebar-04',
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
    SidebarTrigger,
  ],
  template: `
    <div uiSidebarProvider class="h-screen overflow-hidden">
      <a
        href="#sidebar-04-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar aria-label="Documentation" [variant]="'floating'">
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
            <ul uiSidebarMenu class="gap-2">
              <li uiSidebarMenuItem *ngFor="let item of navMain">
                <button uiSidebarMenuButton class="font-medium">
                  <span>{{ item.title }}</span>
                </button>
                <ul uiSidebarMenuSub *ngIf="item.items?.length" class="ml-0 border-l-0 px-1.5">
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
      </nav>

      <main uiSidebarInset id="sidebar-04-main">
        <header class="flex h-16 shrink-0 items-center gap-2 px-4">
          <button uiSidebarTrigger class="-ml-1"></button>
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
        </header>
        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
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
export class Sidebar04Block {
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
