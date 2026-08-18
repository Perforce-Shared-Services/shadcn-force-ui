import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import moreHorizIcon from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';
import stacksIcon from '@material-symbols/svg-400/rounded/stacks.svg?raw';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import { Button } from '@/app/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/ui/dropdown-menu';
import { Label } from '@/app/ui/label';
import { Separator } from '@/app/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/app/ui/sidebar';

interface NavSubItem {
  title: string;
}

interface NavItem {
  title: string;
  items: NavSubItem[];
}

// Decorative icon: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-06` — a simple app shell whose nav rows each open
 * a dropdown of sub-links instead of an inline submenu (`sidebar-05`) or a
 * flat grouped list (`sidebar-01`), plus a newsletter opt-in card pinned to
 * the footer. Composed entirely from `ui/sidebar`, `ui/breadcrumb`,
 * `ui/separator`, `ui/card`, `ui/button`, `ui/dropdown-menu` — no new
 * primitives, no new tokens.
 *
 * Dropdown pattern: each nav row's own `button[uiSidebarMenuButton]` doubles
 * as the `[rdxDropdownMenuTrigger]`, same as `sidebar-01`'s version switcher.
 * Unlike that switcher, this is NOT a single-select control — the registry
 * source's `DropdownMenuItem`s are plain links with no `asChild`/radio
 * semantics — so items use plain `rdxDropdownMenuItem` action items, not the
 * `rdxDropdownMenuItemRadioGroup`/`Radio` pattern. `DropdownMenuItem`'s
 * Angular port is `button[rdxDropdownMenuItem]` (no anchor `asChild`
 * equivalent), so each item is a text-only action button — logs to the
 * console rather than inventing fake navigation, per Blocks being reference
 * code.
 *
 * `side="right"`/`align="start"` are the registry's non-mobile values;
 * `useSidebar().isMobile`'s `bottom`/`end` branch is dropped, matching
 * `sidebar-01`'s own dropdown (this is a desktop Electron app, no mobile
 * breakpoint to branch on).
 *
 * Footer opt-in form uses `ui/card` + `ui/button` + `ui/sidebar`'s
 * `SidebarInput`, matching the registry's `SidebarOptInForm` 1:1. No bare
 * `class="border"` is added here — `ui/card`'s own base classes already carry
 * `border-border`, so the `calendar-01` bare-border gotcha doesn't recur.
 *
 * Audit fixes on top of the registry composition (matching `sidebar-01`):
 * `nav[uiSidebar]` landmark, a skip-to-content link, and a `(submit)` guard on
 * the opt-in form so Enter doesn't trigger a native page reload in Electron.
 */
@Component({
  selector: 'app-block-sidebar-06',
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
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Label,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
  ],
  template: `
    <div uiSidebarProvider class="h-screen overflow-hidden">
      <a
        href="#sidebar-06-main"
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
                <button
                  uiSidebarMenuButton
                  [rdxDropdownMenuTrigger]="navMenu"
                  side="right"
                  align="start"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <span>{{ item.title }}</span>
                  <span class="ml-auto [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHoriz"></span>
                </button>
                <ng-template #navMenu>
                  <div rdxDropdownMenuContent class="min-w-56 rounded-lg">
                    <button
                      *ngFor="let subItem of item.items"
                      rdxDropdownMenuItem
                      (onSelect)="navigate(subItem.title)"
                    >
                      {{ subItem.title }}
                    </button>
                  </div>
                </ng-template>
              </li>
            </ul>
          </div>
        </div>

        <div uiSidebarFooter>
          <div class="p-1">
            <div uiCard class="gap-2 py-4 shadow-none">
              <div uiCardHeader class="px-4">
                <h3 uiCardTitle class="text-sm">Subscribe to our newsletter</h3>
                <div uiCardDescription>Opt-in to receive updates and news about the sidebar.</div>
              </div>
              <div uiCardContent class="px-4">
                <form (submit)="$event.preventDefault()">
                  <div class="grid gap-2.5">
                    <label uiLabel for="sidebar-06-email" class="sr-only">Email</label>
                    <input uiSidebarInput id="sidebar-06-email" type="email" placeholder="Email" />
                    <button uiButton class="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-06-main">
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
export class Sidebar06Block {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly stacks: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(stacksIcon));
  protected readonly moreHoriz: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(moreHorizIcon));

  protected readonly navMain: NavItem[] = [
    {
      title: 'Getting Started',
      items: [{ title: 'Installation' }, { title: 'Project Structure' }],
    },
    {
      title: 'Build Your Application',
      items: [
        { title: 'Routing' },
        { title: 'Data Fetching' },
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
  ];

  protected navigate(title: string): void {
    // Reference block: no real router wired up, matches the registry's `href="#"` demo links.
    console.log('Navigate to', title);
  }
}
