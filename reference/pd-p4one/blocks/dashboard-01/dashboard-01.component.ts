import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';
import { Button } from '@/app/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import {
  injectIsMobile,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/app/ui/sidebar';
import { Switch } from '@/app/ui/switch';

import { Dashboard01ChartAreaComponent } from './dashboard-01-chart-area.component';
import { Dashboard01DataTableComponent } from './dashboard-01-data-table.component';
import { Dashboard01SectionCardsComponent } from './dashboard-01-section-cards.component';
import { Dashboard01SiteHeaderComponent } from './dashboard-01-site-header.component';
import { DASHBOARD01_ICONS, decorativeIcon } from './dashboard-01.icons';

interface NavItem {
  title: string;
  icon: SafeHtml;
  isActive?: boolean;
}

interface DemoUser {
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

/**
 * `@force-ui/dashboard-01` — a full analytics-dashboard page (Figma node
 * `17455:139010`, file `jr1JErMIXt6T2BakbG2iBI`): an inset sidebar
 * (`variant="inset"`, this app's canonical shell — see `sidebar-08`), a site
 * header with a breadcrumb, a 4-card KPI row, a "Total Visitors" area chart
 * with a 3-way range toggle, and a data table with drag-to-reorder rows,
 * a row-detail drawer, column visibility, and pagination.
 *
 * Composed entirely from already-ported `ui/*` primitives — `ui/sidebar`,
 * `ui/card`, `ui/badge`, `ui/toggle-group`, `ui/chart` (`ui-chart-area`),
 * `ui/tabs`, `ui/table`, `ui/dropdown-menu`, `ui/drawer`, `ui/select`,
 * `ui/checkbox`, `ui/input`, `ui/label`, `ui/button`, `ui/avatar`,
 * `ui/switch` — plus `@angular/cdk/drag-drop` for row reordering (upstream's
 * `@dnd-kit/*` + `@tanstack/react-table` have no Angular/radix-ng
 * equivalent; see `dashboard-01-data-table.component.ts`'s doc comment for
 * the full reasoning). No new primitives, no new npm dependencies.
 *
 * The sidebar nav (registry splits into `app-sidebar.tsx` + `nav-main.tsx` +
 * `nav-documents.tsx` + `nav-user.tsx`) is INLINED directly in this
 * component's own template, exactly like `sidebar-08` and every other
 * `sidebar-*` Block in this repo — deliberately NOT split into its own
 * sub-component. `SidebarInset`'s `variant="inset"` rounded-corner/shadow/
 * inset-margin treatment is driven entirely by Tailwind `peer`/
 * `peer-data-*` sibling selectors: `<nav uiSidebar>` carries the `peer`
 * class, and `<main uiSidebarInset>` only picks up its
 * `md:peer-data-[variant=inset]:*` classes when it is a genuine DOM SIBLING
 * of that element. An earlier version of this Block wrapped the sidebar nav
 * in its own element-selector sub-component — Angular renders a component's
 * own tag as a real host element in light DOM, so the actual `<nav>` ended
 * up one level too deep (nested inside the wrapper tag instead of a direct
 * child of the shared flex container), silently breaking the peer chain:
 * the panel rendered edge-to-edge with the sidebar, no rounding, no shadow,
 * no inset margin — a real, visible regression caught by comparing
 * screenshots against `sidebar-08`, not by reading the code. A follow-up fix
 * tried an ATTRIBUTE-selector sub-component with
 * `hostDirectives: [{ directive: Sidebar, inputs: ['variant'] }]` to keep
 * the split while restoring sibling adjacency — that hit a separate, real
 * Angular runtime bug (`Cannot read properties of null (reading
 * 'declaredInputs')` inside `resolveHostDirectives`/`trackHostDirectiveDef`
 * at bootstrap) applying `Sidebar` — itself a `@Component`, not a plain
 * `@Directive` — as a SECOND-LEVEL host directive. Inlining, matching every
 * other sidebar Block's own established (and proven, bug-free) convention,
 * sidesteps both failure modes entirely.
 *
 * The remaining sections (site header, KPI cards, chart, data table) stay
 * split into their own sibling files — none of them has any CSS
 * peer-selector dependency on DOM sibling position, so the split is safe.
 *
 * The dark-mode switch, the org switcher's single "Perforce" entry, and the
 * site header's "Select a theme" control are demo stubs (no real theme
 * wiring, no real multi-org backend) — Blocks are reference compositions,
 * not live product features.
 */
@Component({
  selector: 'app-block-dashboard-01',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    Switch,
    Dashboard01ChartAreaComponent,
    Dashboard01DataTableComponent,
    Dashboard01SectionCardsComponent,
    Dashboard01SiteHeaderComponent,
  ],
  template: `
    <div uiSidebarProvider class="h-screen overflow-hidden">
      <a
        href="#dashboard-01-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar variant="inset" aria-label="Perforce">
        <div uiSidebarHeader class="relative z-10 border-b border-sidebar-border">
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button
                uiSidebarMenuButton
                size="lg"
                [rdxDropdownMenuTrigger]="orgMenu"
                side="bottom"
                align="start"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="corporateFareIcon"
                ></div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">Perforce</span>
                  <span class="truncate text-xs text-muted-foreground">Enterprise</span>
                </div>
                <span class="ml-auto [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="unfoldMoreIcon"></span>
              </button>
              <ng-template #orgMenu>
                <div rdxDropdownMenuContent class="w-56">
                  <div rdxDropdownMenuLabel>Organizations</div>
                  <button rdxDropdownMenuItem>
                    <span class="text-primary [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="checkCircleIcon"></span>
                    <span>Perforce</span>
                  </button>
                </div>
              </ng-template>
            </li>
          </ul>
          <div class="flex items-center gap-2 px-2 pt-1 pb-2">
            <button
              uiSidebarMenuButton
              class="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary-hover hover:text-primary-foreground"
            >
              <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="addIcon"></span>
              <span>Quick Create</span>
            </button>
            <button uiButton variant="outline" size="icon" class="size-8 shrink-0" aria-label="New message">
              <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="mailIcon"></span>
            </button>
          </div>
        </div>

        <div uiSidebarContent>
          <div uiSidebarGroup>
            <div uiSidebarGroupContent>
              <ul uiSidebarMenu>
                <li uiSidebarMenuItem *ngFor="let item of navMain">
                  <button uiSidebarMenuButton [isActive]="!!item.isActive">
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="item.icon"></span>
                    <span>{{ item.title }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div uiSidebarGroup class="group-data-[collapsible=icon]:hidden">
            <div uiSidebarGroupLabel [id]="'dashboard-01-documents-label'">Documents</div>
            <ul uiSidebarMenu [attr.aria-labelledby]="'dashboard-01-documents-label'">
              <li uiSidebarMenuItem *ngFor="let item of navDocuments">
                <button uiSidebarMenuButton>
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="item.icon"></span>
                  <span>{{ item.title }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div uiSidebarFooter>
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button
                uiSidebarMenuButton
                size="lg"
                [rdxDropdownMenuTrigger]="userMenu"
                [side]="isMobile() ? 'bottom' : 'right'"
                align="end"
                [sideOffset]="4"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <span uiAvatar class="size-8 rounded-lg">
                  <img uiAvatarImage [src]="user.avatar" [alt]="user.name" />
                  <span uiAvatarFallback class="rounded-lg">{{ user.initials }}</span>
                </span>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{{ user.name }}</span>
                  <span class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
                </div>
                <span class="ml-auto [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="unfoldMoreIcon"></span>
              </button>
              <ng-template #userMenu>
                <div rdxDropdownMenuContent class="w-56">
                  <div rdxDropdownMenuLabel class="p-0 font-normal">
                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <span uiAvatar class="size-8 rounded-lg">
                        <img uiAvatarImage [src]="user.avatar" [alt]="user.name" />
                        <span uiAvatarFallback class="rounded-lg">{{ user.initials }}</span>
                      </span>
                      <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-medium">{{ user.name }}</span>
                        <span class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
                      </div>
                    </div>
                  </div>
                  <div rdxDropdownMenuSeparator></div>
                  <div class="flex items-center justify-between gap-3 px-1.5 py-1">
                    <span class="flex items-center gap-1.5 text-sm">
                      <span class="text-muted-foreground [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="darkModeIcon"></span>
                      Dark mode
                    </span>
                    <button
                      uiSwitch
                      size="sm"
                      [checked]="darkMode()"
                      (checkedChange)="darkMode.set($event)"
                      aria-label="Toggle dark mode"
                    ></button>
                  </div>
                  <div rdxDropdownMenuSeparator></div>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="settingsIcon"></span>
                    <span>Settings</span>
                  </button>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="helpIcon"></span>
                    <span>Get help</span>
                  </button>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="searchIcon"></span>
                    <span>Search</span>
                  </button>
                  <div rdxDropdownMenuSeparator></div>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="logoutIcon"></span>
                    <span>Log out</span>
                  </button>
                </div>
              </ng-template>
            </li>
          </ul>
        </div>
      </nav>

      <main uiSidebarInset id="dashboard-01-main">
        <app-block-dashboard-01-site-header></app-block-dashboard-01-site-header>
        <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div class="flex flex-1 flex-col gap-2">
            <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <app-block-dashboard-01-section-cards></app-block-dashboard-01-section-cards>
              <div class="px-4 lg:px-6">
                <app-block-dashboard-01-chart-area></app-block-dashboard-01-chart-area>
              </div>
              <app-block-dashboard-01-data-table></app-block-dashboard-01-data-table>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class Dashboard01Block {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly isMobile = injectIsMobile();

  /** Demo-only — not wired to the app's real theme system (same convention as the site header's "Select a theme" stub). */
  protected readonly darkMode = signal(false);

  private icon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(decorativeIcon(svg));
  }

  protected readonly corporateFareIcon = this.icon(DASHBOARD01_ICONS.corporateFare);
  protected readonly unfoldMoreIcon = this.icon(DASHBOARD01_ICONS.unfoldMore);
  protected readonly checkCircleIcon = this.icon(DASHBOARD01_ICONS.checkCircle);
  protected readonly addIcon = this.icon(DASHBOARD01_ICONS.add);
  protected readonly mailIcon = this.icon(DASHBOARD01_ICONS.mail);
  protected readonly darkModeIcon = this.icon(DASHBOARD01_ICONS.darkMode);
  protected readonly settingsIcon = this.icon(DASHBOARD01_ICONS.settings);
  protected readonly helpIcon = this.icon(DASHBOARD01_ICONS.help);
  protected readonly searchIcon = this.icon(DASHBOARD01_ICONS.search);
  protected readonly logoutIcon = this.icon(DASHBOARD01_ICONS.logout);

  protected readonly navMain: NavItem[] = [
    { title: 'Playground', icon: this.icon(DASHBOARD01_ICONS.dashboard), isActive: true },
    { title: 'Analytics', icon: this.icon(DASHBOARD01_ICONS.monitoring) },
    { title: 'Projects', icon: this.icon(DASHBOARD01_ICONS.folder) },
    { title: 'Team', icon: this.icon(DASHBOARD01_ICONS.group) },
  ];

  protected readonly navDocuments: NavItem[] = [
    { title: 'Data Library', icon: this.icon(DASHBOARD01_ICONS.database) },
    { title: 'Reports', icon: this.icon(DASHBOARD01_ICONS.receiptLong) },
    { title: 'Word Assistant', icon: this.icon(DASHBOARD01_ICONS.description) },
    { title: 'More', icon: this.icon(DASHBOARD01_ICONS.moreHoriz) },
  ];

  protected readonly user: DemoUser = {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png',
    initials: 'CN',
  };
}
