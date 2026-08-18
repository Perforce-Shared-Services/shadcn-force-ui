import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

import stacksIcon from '@material-symbols/svg-400/rounded/stacks.svg?raw';
import unfoldMoreIcon from '@material-symbols/svg-400/rounded/unfold_more.svg?raw';
import searchIcon from '@material-symbols/svg-400/rounded/search.svg?raw';
import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/ui/breadcrumb';
import { Collapsible, CollapsibleContent } from '@/app/ui/collapsible';
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
 * Port of `@force-ui/sidebar-02` — a sidebar with collapsible nav sections.
 * Composed entirely from `ui/sidebar`, `ui/collapsible`, `ui/breadcrumb`,
 * `ui/separator`, `ui/label`, `ui/dropdown-menu` — no new primitives, no new
 * tokens. Header (version-switcher dropdown + search field) is identical to
 * `sidebar-01`'s own composition; only the content area differs (each nav
 * group folds via `ui/collapsible`).
 *
 * `SidebarGroupLabel asChild` wrapping `CollapsibleTrigger` (the registry's
 * pattern for making the whole label row clickable) has no direct Angular
 * equivalent by stacking `ui/sidebar`'s `SidebarGroupLabel` component with
 * `ui/collapsible`'s `CollapsibleTrigger` component on one host — both are
 * real `@Component`s, and Angular allows only one component per host
 * element. Resolved by attaching `ui/sidebar`'s `SidebarGroupLabel`
 * (Component, for the row's styling) together with the *raw*
 * `RdxCollapsibleTriggerDirective` from `@radix-ng/primitives/collapsible`
 * (a plain Directive, no template) instead of `ui/collapsible`'s
 * `CollapsibleTrigger` wrapper — same "Component + Directive" stacking
 * `sidebar-01` already uses for `rdxDropdownMenuTrigger` on
 * `SidebarMenuButton`. The raw directive still resolves the collapsible's
 * root context (open state, `contentId`) via DI since it renders inside the
 * same `[uiCollapsible]` root, so click/keyboard toggle and
 * `aria-controls`/`aria-expanded` all wire up exactly as the wrapper would.
 *
 * Each group's `[open]="true"` binds a literal (not a signal field) —
 * intentional: this only seeds the model's initial "default open" value.
 * Angular re-writes a template-bound `model()` input only when the bound
 * *expression* changes between change-detection cycles; since the literal
 * never changes, the binding never re-fires after first render, leaving the
 * user free to toggle the section via the trigger afterward. Same pattern as
 * `ui/collapsible`'s own "Open on load" story.
 */
@Component({
  selector: 'app-block-sidebar-02',
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
        href="#sidebar-02-main"
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
                <label uiLabel for="sidebar-02-search" class="sr-only">Search</label>
                <input
                  uiSidebarInput
                  id="sidebar-02-search"
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
          <div
            uiCollapsible
            *ngFor="let group of navMain; let i = index"
            [open]="true"
            [contentId]="'sidebar-02-group-' + i + '-content'"
            class="group/collapsible"
          >
            <div uiSidebarGroup>
              <button
                uiSidebarGroupLabel
                rdxCollapsibleTrigger
                type="button"
                [id]="'sidebar-02-group-' + i + '-label'"
                class="w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <span>{{ group.title }}</span>
                <span
                  class="ml-auto transition-transform motion-reduce:transition-none group-data-[state=open]/collapsible:rotate-90 [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="chevronRight"
                ></span>
              </button>
              <div
                uiCollapsibleContent
                class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none"
              >
                <div uiSidebarGroupContent>
                  <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-02-group-' + i + '-label'">
                    <li uiSidebarMenuItem *ngFor="let item of group.items">
                      <button uiSidebarMenuButton [isActive]="!!item.isActive">
                        <span>{{ item.title }}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-02-main">
        <header class="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
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
          <div class="aspect-video h-12 w-full rounded-lg bg-muted/50" *ngFor="let placeholder of placeholders"></div>
        </div>
      </main>
    </div>
  `,
})
export class Sidebar02Block {
  private readonly sanitizer = inject(DomSanitizer);

  // [innerHTML] runs through Angular's sanitizer, which strips raw <svg>
  // markup — bypassSecurityTrustHtml is required for owned, static icons
  // (same pattern as SidebarTriggerComponent). Interpolating via template
  // literal `${}` (the stories.ts convention) isn't available here since
  // these render conditionally inside *ngFor/*ngIf, not a fixed position.
  protected readonly stacks: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(stacksIcon));
  protected readonly unfoldMore: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(unfoldMoreIcon));
  protected readonly search: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(searchIcon));
  protected readonly chevronRight: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(chevronRightIcon));

  protected readonly versions = ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'];
  protected readonly selectedVersion = signal(this.versions[0]);

  // Registry's dashboard page.tsx renders 24 identical placeholder rows.
  protected readonly placeholders = Array.from({ length: 24 });

  protected readonly navMain: NavGroup[] = [
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
