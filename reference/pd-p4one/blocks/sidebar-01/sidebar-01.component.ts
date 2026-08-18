import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import stacksIcon from '@material-symbols/svg-400/rounded/stacks.svg?raw';
import unfoldMoreIcon from '@material-symbols/svg-400/rounded/unfold_more.svg?raw';
import searchIcon from '@material-symbols/svg-400/rounded/search.svg?raw';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import { Label } from '@/app/ui/label';
import { Separator } from '@/app/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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

interface NavItem {
  title: string;
  isActive?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

// Decorative icon: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-01` — a simple app shell with a version-switcher
 * dropdown, a search field, and navigation grouped by section. Composed
 * entirely from `ui/sidebar`, `ui/breadcrumb`, `ui/separator`, `ui/label`,
 * `ui/dropdown-menu` — no new primitives, no new tokens.
 *
 * The registry's `SidebarMenuButton` doubles as the dropdown trigger
 * (`rdxDropdownMenuTrigger` is attribute-only, so it attaches directly — no
 * separate `[uiButton]` needed, matching `asChild` in the React source).
 *
 * Nav items render as plain `<button uiSidebarMenuButton>` text, not the
 * registry's `asChild` anchor — `ui/sidebar`'s `SidebarMenuButton` selector
 * is fixed to `button[uiSidebarMenuButton]` (no anchor variant like
 * `SidebarMenuSubButton` has), so nesting an `<a>` inside it would double up
 * interactive elements. Matches `ui/sidebar`'s own Playground story.
 *
 * Audit fixes on top of the registry composition: `nav[uiSidebar]` (landmark,
 * the registry uses a plain `<div>`), a skip-to-content link (no such element
 * in the Figma frame — a page-level a11y baseline, not a design divergence),
 * `aria-labelledby` linking each nav group's label to its list, the version
 * switcher using `rdxDropdownMenuItemRadioGroup`/`Radio` (real `aria-checked`
 * instead of a manually-toggled checkmark icon), and a `(submit)` guard on the
 * search form so Enter doesn't trigger a native page reload in Electron.
 */
@Component({
  selector: 'app-block-sidebar-01',
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
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    Label,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
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
        href="#sidebar-01-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar aria-label="Documentation">
        <div uiSidebarHeader class="relative z-10 border-b border-sidebar-border">
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button
                uiSidebarMenuButton
                size="lg"
                [rdxDropdownMenuTrigger]="versionMenu"
                align="start"
              >
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="stacks"
                ></div>
                <div class="flex flex-col gap-0.5 leading-none">
                  <span class="font-medium">Documentation</span>
                  <span class="text-muted-foreground">v{{ selectedVersion() }}</span>
                </div>
                <span class="ml-auto [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="unfoldMore"></span>
              </button>
              <ng-template #versionMenu>
                <div rdxDropdownMenuContent class="w-(--radix-dropdown-menu-trigger-width)">
                  <div
                    rdxDropdownMenuItemRadioGroup
                    [value]="selectedVersion()"
                    (valueChange)="selectedVersion.set($event)"
                  >
                    <button *ngFor="let version of versions" rdxDropdownMenuItemRadio [value]="version">
                      v{{ version }}
                    </button>
                  </div>
                </div>
              </ng-template>
            </li>
          </ul>

          <form (submit)="$event.preventDefault()">
            <div uiSidebarGroup class="py-0">
              <div uiSidebarGroupContent class="relative">
                <label uiLabel for="sidebar-01-search" class="sr-only">Search</label>
                <input
                  uiSidebarInput
                  id="sidebar-01-search"
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
          <div uiSidebarGroup *ngFor="let group of navMain; let i = index">
            <div uiSidebarGroupLabel [id]="'sidebar-01-group-' + i + '-label'">{{ group.title }}</div>
            <div uiSidebarGroupContent>
              <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-01-group-' + i + '-label'">
                <li uiSidebarMenuItem *ngFor="let item of group.items">
                  <button uiSidebarMenuButton [isActive]="!!item.isActive">
                    <span>{{ item.title }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-01-main">
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
export class Sidebar01Block {
  private readonly sanitizer = inject(DomSanitizer);

  // [innerHTML] runs through Angular's sanitizer, which strips raw <svg>
  // markup — bypassSecurityTrustHtml is required for owned, static icons
  // (same pattern as SidebarTriggerComponent). Interpolating via template
  // literal `${}` (the stories.ts convention) isn't available here since
  // these render conditionally inside *ngFor/*ngIf, not a fixed position.
  protected readonly stacks: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(stacksIcon));
  protected readonly unfoldMore: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(unfoldMoreIcon));
  protected readonly search: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(searchIcon));

  protected readonly versions = ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'];
  protected readonly selectedVersion = signal(this.versions[0]);

  protected readonly navMain: NavGroup[] = [
    {
      title: 'Getting Started',
      items: [{ title: 'Installation' }, { title: 'Project Structure' }],
    },
    {
      title: 'Building Your Application',
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
  ];
}
