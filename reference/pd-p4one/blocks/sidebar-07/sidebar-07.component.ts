import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import addIcon from '@material-symbols/svg-400/rounded/add.svg?raw';
import arrowRightIcon from '@material-symbols/svg-400/rounded/arrow_right.svg?raw';
import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import creditCardIcon from '@material-symbols/svg-400/rounded/credit_card.svg?raw';
import cropSquareIcon from '@material-symbols/svg-400/rounded/crop_square.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';
import folderIcon from '@material-symbols/svg-400/rounded/folder.svg?raw';
import graphicEqIcon from '@material-symbols/svg-400/rounded/graphic_eq.svg?raw';
import logoutIcon from '@material-symbols/svg-400/rounded/logout.svg?raw';
import menuBookIcon from '@material-symbols/svg-400/rounded/menu_book.svg?raw';
import moreHorizIcon from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';
import notificationsIcon from '@material-symbols/svg-400/rounded/notifications.svg?raw';
import pieChartIcon from '@material-symbols/svg-400/rounded/pie_chart.svg?raw';
import mapIcon from '@material-symbols/svg-400/rounded/map.svg?raw';
import settingsIcon from '@material-symbols/svg-400/rounded/settings.svg?raw';
import smartToyIcon from '@material-symbols/svg-400/rounded/smart_toy.svg?raw';
import stacksIcon from '@material-symbols/svg-400/rounded/stacks.svg?raw';
import starShineIcon from '@material-symbols/svg-400/rounded/star_shine.svg?raw';
import terminalIcon from '@material-symbols/svg-400/rounded/terminal.svg?raw';
import unfoldMoreIcon from '@material-symbols/svg-400/rounded/unfold_more.svg?raw';
import verifiedIcon from '@material-symbols/svg-400/rounded/verified.svg?raw';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';
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
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import { Separator } from '@/app/ui/separator';
import {
  injectIsMobile,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
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
}

interface NavMainItem {
  title: string;
  icon: SafeHtml;
  isActive?: boolean;
  items: NavSubItem[];
}

interface Project {
  name: string;
  icon: SafeHtml;
}

interface Team {
  name: string;
  plan: string;
  icon: SafeHtml;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

// Decorative icon: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-07` — "a sidebar that collapses to icons".
 * Composed entirely from `ui/sidebar`, `ui/breadcrumb`, `ui/separator`,
 * `ui/collapsible`, `ui/dropdown-menu`, `ui/avatar` — no new primitives, no
 * new tokens. Inlines the registry's `team-switcher.tsx`, `nav-main.tsx`,
 * `nav-projects.tsx`, and `nav-user.tsx` into this one file (each is small).
 *
 * `collapsible="icon"` on `<nav uiSidebar>` per `ui/sidebar`'s own
 * `IconCollapsible` story — the differentiator for this block versus
 * `sidebar-01`. Labels simply hide when the rail collapses to icon-only
 * width (matching that story); the primitive's own `WithTooltip` story shows
 * an opt-in hover-label pattern via `rdxTooltipRoot`, but that's presented as
 * an enhancement, not a checklist requirement, and isn't added here to keep
 * this composition at the same complexity level as the reference blocks.
 *
 * Team switcher: the registry's `TeamSwitcher` tracks a single `activeTeam`
 * with no visual "selected" affordance in its dropdown besides which team is
 * shown in the trigger — a real single-select, so this uses
 * `rdxDropdownMenuItemRadioGroup`/`Radio` (real `aria-checked`), matching
 * `sidebar-01`'s already-solved version-switcher pattern, rather than a
 * manually-toggled click handler. Dropped the registry's `⌘{index+1}`
 * shortcut hint (decorative-only in the upstream demo, no real key binding)
 * — it would sit inside the radio item's `pr-8` gutter already reserved for
 * the check indicator and just adds visual clutter for a non-functional hint.
 *
 * Nav-main: each item's whole button is the collapsible trigger (matching
 * the registry's `CollapsibleTrigger asChild` wrapping the button itself).
 * Applies the raw `rdxCollapsibleTrigger` (`RdxCollapsibleTriggerDirective`)
 * directly rather than `ui/collapsible`'s `CollapsibleTrigger` component —
 * two Angular `@Component`s can never share one host element, and both
 * `SidebarMenuButton` and `CollapsibleTrigger` are components, so stacking
 * `uiSidebarMenuButton uiCollapsibleTrigger` on the same `<button>` is
 * invalid. The underlying radix-ng primitive is a plain `@Directive`, so it
 * co-applies fine — same fix as `sidebar-11`'s tree-toggle trigger. The
 * chevron rotation still reads the trigger's own `data-state` via a
 * `group/collapsible` marker. Sub-items render as real
 * `<a uiSidebarMenuSubButton>` (that primitive IS an anchor, unlike
 * `SidebarMenuButton`).
 *
 * Nav-projects/nav-user: top-level rows are plain `<button uiSidebarMenuButton>`
 * (text via `<span>`), not the registry's `asChild` anchor — same rationale
 * as `sidebar-01`: `SidebarMenuButton`'s selector is button-only, so nesting
 * an `<a>` inside would double up interactive elements. The project row's
 * "Share Project" icon is `arrow_right`, matching this block's own registry
 * source verbatim (sidebar-16's equivalent uses `share` instead — the two
 * blocks' demo data genuinely differ here).
 *
 * Audit fixes on top of the registry composition: `nav[uiSidebar]` (landmark,
 * the registry uses a plain `<div>`), a skip-to-content link, unique
 * `[id]`s on each `SidebarGroupLabel` with `aria-labelledby` on its sibling
 * list, and the avatar-dropdown pattern shared with `sidebar-16`.
 */
@Component({
  selector: 'app-block-sidebar-07',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Avatar,
    AvatarFallback,
    AvatarImage,
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
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
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
        href="#sidebar-07-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar aria-label="Application" collapsible="icon">
        <div uiSidebarHeader class="relative z-10 border-b border-sidebar-border">
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button
                uiSidebarMenuButton
                size="lg"
                [rdxDropdownMenuTrigger]="teamMenu"
                align="start"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="activeTeam().icon"
                ></div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{{ activeTeam().name }}</span>
                  <span class="truncate text-xs text-muted-foreground">{{ activeTeam().plan }}</span>
                </div>
                <span class="ml-auto [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="unfoldMore"></span>
              </button>
              <ng-template #teamMenu>
                <div rdxDropdownMenuContent class="w-64 rounded-lg" align="start" [sideOffset]="4">
                  <div rdxDropdownMenuLabel class="text-xs text-muted-foreground">Teams</div>
                  <div
                    rdxDropdownMenuItemRadioGroup
                    [value]="activeTeamName()"
                    (valueChange)="activeTeamName.set($event)"
                  >
                    <button *ngFor="let team of teams" rdxDropdownMenuItemRadio [value]="team.name" class="gap-2 p-2">
                      <span
                        class="flex size-6 items-center justify-center rounded-md border border-border [&_svg]:size-4 [&_svg]:fill-current"
                        [innerHTML]="team.icon"
                      ></span>
                      <span>{{ team.name }}</span>
                    </button>
                  </div>
                  <div rdxDropdownMenuSeparator></div>
                  <button rdxDropdownMenuItem class="gap-2 p-2">
                    <span
                      class="flex size-6 items-center justify-center rounded-md border border-dashed border-border [&_svg]:size-4 [&_svg]:fill-current"
                      [innerHTML]="add"
                    ></span>
                    <span class="font-medium text-muted-foreground">Add team</span>
                  </button>
                </div>
              </ng-template>
            </li>
          </ul>
        </div>

        <div uiSidebarContent>
          <div uiSidebarGroup>
            <div uiSidebarGroupLabel [id]="'sidebar-07-platform-label'">Platform</div>
            <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-07-platform-label'">
              <li uiSidebarMenuItem *ngFor="let item of navMain">
                <div uiCollapsible [open]="!!item.isActive" class="contents">
                  <button uiSidebarMenuButton rdxCollapsibleTrigger class="group/collapsible">
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="item.icon"></span>
                    <span>{{ item.title }}</span>
                    <span
                      class="ml-auto transition-transform motion-reduce:transition-none group-data-[state=open]/collapsible:rotate-90 [&_svg]:size-4 [&_svg]:fill-current"
                      [innerHTML]="chevronRight"
                    ></span>
                  </button>
                  <div
                    uiCollapsibleContent
                    class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none"
                  >
                    <ul uiSidebarMenuSub>
                      <li uiSidebarMenuSubItem *ngFor="let sub of item.items">
                        <a uiSidebarMenuSubButton href="javascript:void(0)">
                          <span>{{ sub.title }}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div uiSidebarGroup class="group-data-[collapsible=icon]:hidden">
            <div uiSidebarGroupLabel [id]="'sidebar-07-projects-label'">Projects</div>
            <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-07-projects-label'">
              <li uiSidebarMenuItem *ngFor="let project of projects">
                <button uiSidebarMenuButton>
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="project.icon"></span>
                  <span>{{ project.name }}</span>
                </button>
                <button
                  uiSidebarMenuAction
                  [showOnHover]="true"
                  class="aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
                  [rdxDropdownMenuTrigger]="projectMenu"
                  [side]="isMobile() ? 'bottom' : 'right'"
                  [align]="isMobile() ? 'end' : 'start'"
                >
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHoriz"></span>
                  <span class="sr-only">More</span>
                </button>
                <ng-template #projectMenu>
                  <div
                    rdxDropdownMenuContent
                    class="w-fit"
                    [side]="isMobile() ? 'bottom' : 'right'"
                    [align]="isMobile() ? 'end' : 'start'"
                  >
                    <button rdxDropdownMenuItem>
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="folder"></span>
                      <span>View Project</span>
                    </button>
                    <button rdxDropdownMenuItem>
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="arrowRight"></span>
                      <span>Share Project</span>
                    </button>
                    <div rdxDropdownMenuSeparator></div>
                    <button rdxDropdownMenuItem variant="destructive">
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="trash"></span>
                      <span>Delete Project</span>
                    </button>
                  </div>
                </ng-template>
              </li>
              <li uiSidebarMenuItem>
                <button uiSidebarMenuButton class="text-sidebar-foreground/70">
                  <span class="text-sidebar-foreground/70 [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHoriz"></span>
                  <span>More</span>
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
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <span uiAvatar class="size-8 rounded-lg">
                  <img uiAvatarImage [src]="user.avatar" [alt]="user.name" />
                  <span uiAvatarFallback class="rounded-lg">{{ userInitials }}</span>
                </span>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{{ user.name }}</span>
                  <span class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
                </div>
                <span class="ml-auto [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="unfoldMore"></span>
              </button>
              <ng-template #userMenu>
                <div
                  rdxDropdownMenuContent
                  class="w-56"
                  [side]="isMobile() ? 'bottom' : 'right'"
                  align="end"
                  [sideOffset]="4"
                >
                  <div rdxDropdownMenuLabel class="p-0 font-normal">
                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <span uiAvatar class="size-8 rounded-lg">
                        <img uiAvatarImage [src]="user.avatar" [alt]="user.name" />
                        <span uiAvatarFallback class="rounded-lg">{{ userInitials }}</span>
                      </span>
                      <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-medium">{{ user.name }}</span>
                        <span class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
                      </div>
                    </div>
                  </div>
                  <div rdxDropdownMenuSeparator></div>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="sparkles"></span>
                    <span>Upgrade to Pro</span>
                  </button>
                  <div rdxDropdownMenuSeparator></div>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="badgeCheck"></span>
                    <span>Account</span>
                  </button>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="creditCard"></span>
                    <span>Billing</span>
                  </button>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="bell"></span>
                    <span>Notifications</span>
                  </button>
                  <div rdxDropdownMenuSeparator></div>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="logout"></span>
                    <span>Log out</span>
                  </button>
                </div>
              </ng-template>
            </li>
          </ul>
        </div>

        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-07-main">
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
export class Sidebar07Block {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly isMobile = injectIsMobile();

  // [innerHTML] runs through Angular's sanitizer, which strips raw <svg>
  // markup — bypassSecurityTrustHtml is required for owned, static icons
  // (same pattern as sidebar-01/11).
  protected readonly add: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(addIcon));
  protected readonly arrowRight: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(arrowRightIcon));
  protected readonly chevronRight: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(chevronRightIcon));
  protected readonly creditCard: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(creditCardIcon));
  protected readonly trash: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(deleteIcon));
  protected readonly folder: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(folderIcon));
  protected readonly logout: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(logoutIcon));
  protected readonly moreHoriz: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(moreHorizIcon));
  protected readonly sparkles: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(starShineIcon));
  protected readonly unfoldMore: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(unfoldMoreIcon));
  protected readonly badgeCheck: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(verifiedIcon));
  protected readonly bell: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(notificationsIcon));

  protected readonly teams: Team[] = [
    { name: 'Acme Inc', plan: 'Enterprise', icon: this.sanitizer.bypassSecurityTrustHtml(deco(stacksIcon)) },
    { name: 'Acme Corp.', plan: 'Startup', icon: this.sanitizer.bypassSecurityTrustHtml(deco(graphicEqIcon)) },
    { name: 'Evil Corp.', plan: 'Free', icon: this.sanitizer.bypassSecurityTrustHtml(deco(terminalIcon)) },
  ];
  protected readonly activeTeamName = signal(this.teams[0].name);
  protected readonly activeTeam = computed(
    () => this.teams.find((team) => team.name === this.activeTeamName()) ?? this.teams[0],
  );

  protected readonly navMain: NavMainItem[] = [
    {
      title: 'Playground',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(terminalIcon)),
      isActive: true,
      items: [{ title: 'History' }, { title: 'Starred' }, { title: 'Settings' }],
    },
    {
      title: 'Models',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(smartToyIcon)),
      items: [{ title: 'Genesis' }, { title: 'Explorer' }, { title: 'Quantum' }],
    },
    {
      title: 'Documentation',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(menuBookIcon)),
      items: [{ title: 'Introduction' }, { title: 'Get Started' }, { title: 'Tutorials' }, { title: 'Changelog' }],
    },
    {
      title: 'Settings',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(settingsIcon)),
      items: [{ title: 'General' }, { title: 'Team' }, { title: 'Billing' }, { title: 'Limits' }],
    },
  ];

  protected readonly projects: Project[] = [
    { name: 'Design Engineering', icon: this.sanitizer.bypassSecurityTrustHtml(deco(cropSquareIcon)) },
    { name: 'Sales & Marketing', icon: this.sanitizer.bypassSecurityTrustHtml(deco(pieChartIcon)) },
    { name: 'Travel', icon: this.sanitizer.bypassSecurityTrustHtml(deco(mapIcon)) },
  ];

  protected readonly user: User = { name: 'shadcn', email: 'm@example.com', avatar: 'https://github.com/shadcn.png' };
  protected readonly userInitials = 'CN';
}
