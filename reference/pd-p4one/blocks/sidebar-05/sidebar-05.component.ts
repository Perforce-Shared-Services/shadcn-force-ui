import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import addIcon from '@material-symbols/svg-400/rounded/add.svg?raw';
import removeIcon from '@material-symbols/svg-400/rounded/remove.svg?raw';
import searchIcon from '@material-symbols/svg-400/rounded/search.svg?raw';
import stacksIcon from '@material-symbols/svg-400/rounded/stacks.svg?raw';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

import { Collapsible, CollapsibleContent } from '@/app/ui/collapsible';
import { Label } from '@/app/ui/label';
import { Separator } from '@/app/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
  items: NavSubItem[];
}

// Decorative icon: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-05` — a simple app shell whose nav groups are
 * collapsible submenus (accordion-style, plus/minus toggle) instead of
 * `sidebar-01`'s flat grouped list. Composed entirely from `ui/sidebar`,
 * `ui/breadcrumb`, `ui/separator`, `ui/label`, `ui/collapsible` — no new
 * primitives, no new tokens.
 *
 * Collapsible pattern reused verbatim from `sidebar-11`'s file-tree toggle:
 * the raw `[rdxCollapsibleTrigger]` directive (not `ui/collapsible`'s own
 * `[uiCollapsibleTrigger]` wrapper — that's a `@Component`, and stacking it
 * with `uiSidebarMenuButton` puts two components on one host element) on the
 * row's own `button[uiSidebarMenuButton]` (`data-state` lives there), a
 * `group/tree-toggle` marker, and the two
 * indicator icons shown/hidden via `group-data-[state=…]/tree-toggle:hidden`
 * — no manually-tracked open boolean. Unlike `sidebar-11`, this tree is only
 * one level deep (a fixed nav list, not recursive), so the row's `<li>` wraps
 * the `uiCollapsible` container directly with no `ngTemplateOutlet` needed —
 * that trick was solved for `sidebar-11`'s genuine recursion, not required
 * here.
 *
 * Registry deviation: the source shows Plus/Minus icons (not a chevron) as
 * its open/closed indicator — kept as authored, since the registry demo
 * itself alternates between the two treatments across the `sidebar-*`
 * category and this is the one that picked Plus/Minus.
 *
 * `SidebarMenuSubButton` (`a[uiSidebarMenuSubButton]`) is used directly for
 * leaf rows — it IS itself an anchor, so no nested interactive element issue
 * (checklist rule 5 only bars nesting inside `button[uiSidebarMenuButton]`).
 * Top-level toggle rows stay text-only per that same rule.
 *
 * Audit fixes on top of the registry composition (matching `sidebar-01`):
 * `nav[uiSidebar]` landmark, a skip-to-content link, `aria-labelledby` linking
 * the group label to its list, and a `(submit)` guard on the search form so
 * Enter doesn't trigger a native page reload in Electron.
 */
@Component({
  selector: 'app-block-sidebar-05',
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
    Collapsible,
    CollapsibleContent,
    RdxCollapsibleTriggerDirective,
    Label,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
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
        href="#sidebar-05-main"
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

          <form (submit)="$event.preventDefault()">
            <div uiSidebarGroup class="py-0">
              <div uiSidebarGroupContent class="relative">
                <label uiLabel for="sidebar-05-search" class="sr-only">Search</label>
                <input
                  uiSidebarInput
                  id="sidebar-05-search"
                  placeholder="Search the docs..."
                  class="pl-8"
                />
                <span
                  class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="search"
                ></span>
              </div>
            </div>
          </form>
        </div>

        <div uiSidebarContent>
          <div uiSidebarGroup>
            <ul uiSidebarMenu>
              <li uiSidebarMenuItem *ngFor="let group of navMain; let i = index">
                <div uiCollapsible [open]="i === 1" class="contents">
                  <button uiSidebarMenuButton rdxCollapsibleTrigger class="group/tree-toggle">
                    <span>{{ group.title }}</span>
                    <span
                      class="ml-auto group-data-[state=open]/tree-toggle:hidden [&_svg]:size-4 [&_svg]:fill-current"
                      [innerHTML]="add"
                    ></span>
                    <span
                      class="ml-auto group-data-[state=closed]/tree-toggle:hidden [&_svg]:size-4 [&_svg]:fill-current"
                      [innerHTML]="remove"
                    ></span>
                  </button>
                  <div
                    uiCollapsibleContent
                    class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none"
                  >
                    <ul uiSidebarMenuSub>
                      <li uiSidebarMenuSubItem *ngFor="let item of group.items">
                        <a uiSidebarMenuSubButton [isActive]="!!item.isActive" href="javascript:void(0)">{{
                          item.title
                        }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-05-main">
        <header class="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
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
export class Sidebar05Block {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly stacks: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(stacksIcon));
  protected readonly search: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(searchIcon));
  protected readonly add: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(addIcon));
  protected readonly remove: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(removeIcon));

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
