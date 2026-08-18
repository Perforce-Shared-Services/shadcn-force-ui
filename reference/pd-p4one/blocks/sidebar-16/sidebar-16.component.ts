import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import creditCardIcon from '@material-symbols/svg-400/rounded/credit_card.svg?raw';
import cropSquareIcon from '@material-symbols/svg-400/rounded/crop_square.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';
import folderIcon from '@material-symbols/svg-400/rounded/folder.svg?raw';
import logoutIcon from '@material-symbols/svg-400/rounded/logout.svg?raw';
import mapIcon from '@material-symbols/svg-400/rounded/map.svg?raw';
import menuBookIcon from '@material-symbols/svg-400/rounded/menu_book.svg?raw';
import menuBookFillIcon from '@material-symbols/svg-400/rounded/menu_book-fill.svg?raw';
import moreHorizIcon from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';
import notificationsIcon from '@material-symbols/svg-400/rounded/notifications.svg?raw';
import pieChartIcon from '@material-symbols/svg-400/rounded/pie_chart.svg?raw';
import searchIcon from '@material-symbols/svg-400/rounded/search.svg?raw';
import sendIcon from '@material-symbols/svg-400/rounded/send.svg?raw';
import settingsIcon from '@material-symbols/svg-400/rounded/settings.svg?raw';
import settingsFillIcon from '@material-symbols/svg-400/rounded/settings-fill.svg?raw';
import shareIcon from '@material-symbols/svg-400/rounded/share.svg?raw';
import smartToyIcon from '@material-symbols/svg-400/rounded/smart_toy.svg?raw';
import smartToyFillIcon from '@material-symbols/svg-400/rounded/smart_toy-fill.svg?raw';
import starShineIcon from '@material-symbols/svg-400/rounded/star_shine.svg?raw';
import supportIcon from '@material-symbols/svg-400/rounded/support.svg?raw';
import terminalIcon from '@material-symbols/svg-400/rounded/terminal.svg?raw';
import terminalFillIcon from '@material-symbols/svg-400/rounded/terminal-fill.svg?raw';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import { Label } from '@/app/ui/label';
import { Separator } from '@/app/ui/separator';
import {
  injectIsMobile,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/app/ui/sidebar';

interface NavSubItem {
  title: string;
}

interface NavMainItem {
  title: string;
  icon: SafeHtml;
  iconFill: SafeHtml;
  isActive?: boolean;
  items: NavSubItem[];
}

interface Project {
  name: string;
  icon: SafeHtml;
}

interface SecondaryItem {
  title: string;
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
 * Port of `@force-ui/sidebar-16` — "a sidebar with a sticky site header".
 * Composed entirely from `ui/sidebar`, `ui/breadcrumb`, `ui/separator`,
 * `ui/collapsible`, `ui/dropdown-menu`, `ui/avatar`, `ui/label` — no new
 * primitives, no new tokens. Inlines the registry's `nav-main.tsx`,
 * `nav-projects.tsx`, `nav-secondary.tsx`, `nav-user.tsx`, `search-form.tsx`,
 * and `site-header.tsx` into this one file.
 *
 * The differentiator versus `sidebar-01`/`sidebar-07` is structural, not a
 * `Sidebar` prop: the registry's `page.tsx` moves the header OUT of
 * `SidebarInset` and renders it as a full-width `<header>` ABOVE a row
 * containing the sidebar + inset, inside a column-direction
 * `SidebarProvider`. Reproduced here as an outer wrapper carrying the
 * `--header-height` custom property (registry-verbatim
 * `[--header-height:calc(--spacing(14))]` — Tailwind v4's `--spacing()`
 * function, already used elsewhere in this codebase, e.g.
 * `ui/calendar`'s `[--cell-size:--spacing(N)]`), `class="flex ... flex-col"`
 * on `SidebarProvider` so the header stacks above the sidebar+inset row, and
 * the sidebar panel needing `top: var(--header-height)` /
 * `height: calc(100svh - var(--header-height))` so its `fixed` desktop
 * container starts below the sticky header instead of the viewport edge
 * (registry-verbatim VALUES, not a new token).
 *
 * REAL BUG, not a class-string typo: the registry achieves this override via
 * a plain `className` prop because React's `Sidebar` forwards it straight
 * onto the element that carries `fixed`. `ui/sidebar`'s `[uiSidebar]` is
 * structurally different — the HOST element (`<nav uiSidebar>`, where a
 * `class` binding actually lands) only toggles `hidden`/`md:block`; the
 * REAL `position: fixed; inset-y-0` element is an internal child div
 * (`[data-slot="sidebar-container"]`) that the component never threads
 * `this.className()` into. A `class="top-(--header-height)! h-[...]!"` on
 * `<nav uiSidebar>` compiles fine, reads correct in the template, and does
 * NOTHING — confirmed via `getComputedStyle(nav).position === 'static'`,
 * not by reasoning about the class string (that's what shipped first, and
 * looked plausible instead of leaking under the header on the first visual
 * pass too). Since the primitive exposes no class-override surface for
 * that internal container, this is one of `app/CLAUDE.md`'s sanctioned
 * `::ng-deep` cases — see `sidebar-16.component.scss`, targeting
 * `[data-slot="sidebar-container"]` directly. Flagged as a `ui/sidebar`
 * primitive gap worth a real `containerClass` input if another block needs
 * this same override.
 * Added `border-border` to the header's bare `border-b` (same fix
 * `ui/sidebar`'s own container border needed — this app has no global
 * `border-color` reset, so an unqualified `border-b` renders `currentColor`
 * instead of the token).
 *
 * The header's sidebar-toggle button reuses `uiSidebarTrigger` (which already
 * wraps a ghost icon-button calling `toggleSidebar`) rather than hand-rolling
 * the registry's separate `<Button variant="ghost" size="icon">` — same
 * component, same behavior, one less thing to keep in sync.
 *
 * No `SidebarRail` — the registry's `sidebar-16` `AppSidebar` genuinely omits
 * it (unlike `sidebar-01`/`sidebar-07`/`sidebar-11`), so this composition
 * matches that block's own real source rather than the other blocks'
 * convention.
 *
 * Nav-main here differs from `sidebar-07`'s: the registry keeps the primary
 * row a plain navigation button and adds a SEPARATE small `SidebarMenuAction`
 * chevron as the collapsible trigger (rather than the whole row being the
 * trigger) — reproduced faithfully, chevron rotation reads the action
 * button's own `data-state` via a `group/collapsible-toggle` marker, same
 * solved pattern as `sidebar-11`'s tree-toggle chevron. That toggle button
 * applies the raw `rdxCollapsibleTrigger` (`RdxCollapsibleTriggerDirective`)
 * directly rather than `ui/collapsible`'s `CollapsibleTrigger` component —
 * two Angular `@Component`s can't share one host element, and both
 * `SidebarMenuAction` and `CollapsibleTrigger` are components; the
 * underlying radix-ng primitive is a plain `@Directive` and co-applies fine
 * (same fix as `sidebar-11`'s and `sidebar-07`'s trigger buttons).
 *
 * Nav-secondary has no `SidebarGroupLabel` in the registry (a plain
 * unlabeled list) — `aria-label="Secondary"` is added directly to its
 * `<ul uiSidebarMenu>` so the list still has an accessible name, without
 * inventing a visible heading the design doesn't have.
 *
 * Audit fixes on top of the registry composition: `nav[uiSidebar]` (landmark,
 * the registry uses a plain `<div>`), a skip-to-content link, unique `[id]`s
 * on each `SidebarGroupLabel` with `aria-labelledby` on its sibling list, a
 * `(submit)` guard on the header search form, and the avatar-dropdown
 * pattern shared with `sidebar-07`.
 */
@Component({
  selector: 'app-block-sidebar-16',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './sidebar-16.component.scss',
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Label,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
  ],
  template: `
    <div class="[--header-height:calc(--spacing(14))] h-full">
      <a
        href="#sidebar-16-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <div uiSidebarProvider class="flex h-screen flex-col overflow-hidden">
        <header class="sticky top-0 z-50 flex w-full items-center border-b border-border bg-background">
          <div class="flex h-(--header-height) w-full items-center gap-2 px-4">
            <button uiSidebarTrigger class="h-8 w-8"></button>
            <div uiSeparator orientation="vertical" class="mr-2 h-4 self-auto!"></div>
            <nav uiBreadcrumb class="hidden sm:block">
              <ol uiBreadcrumbList>
                <li uiBreadcrumbItem>
                  <a uiBreadcrumbLink href="javascript:void(0)">Build Your Application</a>
                </li>
                <li uiBreadcrumbSeparator></li>
                <li uiBreadcrumbItem>
                  <span uiBreadcrumbPage>Data Fetching</span>
                </li>
              </ol>
            </nav>
            <form (submit)="$event.preventDefault()" class="w-full sm:ml-auto sm:w-auto">
              <div class="relative">
                <label uiLabel for="sidebar-16-search" class="sr-only">Search</label>
                <input uiSidebarInput id="sidebar-16-search" placeholder="Type to search..." class="h-8 pl-7" />
                <span
                  class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="search"
                ></span>
              </div>
            </form>
          </div>
        </header>

        <div class="flex min-h-0 flex-1">
          <nav uiSidebar aria-label="Application">
            <div uiSidebarHeader class="relative z-10 border-b border-sidebar-border">
              <ul uiSidebarMenu>
                <li uiSidebarMenuItem>
                  <button uiSidebarMenuButton size="lg">
                    <div
                      class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4 [&_svg]:fill-current"
                      [innerHTML]="terminal"
                    ></div>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-medium">Acme Inc</span>
                      <span class="truncate text-xs text-muted-foreground">Enterprise</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            <div uiSidebarContent>
              <div uiSidebarGroup>
                <div uiSidebarGroupLabel [id]="'sidebar-16-platform-label'">Platform</div>
                <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-16-platform-label'">
                  <li uiSidebarMenuItem *ngFor="let item of navMain">
                    <div uiCollapsible [open]="!!item.isActive" class="contents">
                      <button uiSidebarMenuButton [isActive]="!!item.isActive">
                        <span
                          class="[&_svg]:size-4 [&_svg]:fill-current"
                          [innerHTML]="item.isActive ? item.iconFill : item.icon"
                        ></span>
                        <span>{{ item.title }}</span>
                      </button>
                      <ng-container *ngIf="item.items.length">
                        <button uiSidebarMenuAction rdxCollapsibleTrigger class="group/collapsible-toggle">
                          <span
                            class="transition-transform motion-reduce:transition-none group-data-[state=open]/collapsible-toggle:rotate-90 [&_svg]:size-4 [&_svg]:fill-current"
                            [innerHTML]="chevronRight"
                          ></span>
                          <span class="sr-only">Toggle {{ item.title }}</span>
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
                      </ng-container>
                    </div>
                  </li>
                </ul>
              </div>

              <div uiSidebarGroup class="group-data-[collapsible=icon]:hidden">
                <div uiSidebarGroupLabel [id]="'sidebar-16-projects-label'">Projects</div>
                <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-16-projects-label'">
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
                        class="w-48"
                        [side]="isMobile() ? 'bottom' : 'right'"
                        [align]="isMobile() ? 'end' : 'start'"
                      >
                        <button rdxDropdownMenuItem>
                          <span class="text-muted-foreground [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="folder"></span>
                          <span>View Project</span>
                        </button>
                        <button rdxDropdownMenuItem>
                          <span class="text-muted-foreground [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="share"></span>
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
                    <button uiSidebarMenuButton>
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHoriz"></span>
                      <span>More</span>
                    </button>
                  </li>
                </ul>
              </div>

              <div uiSidebarGroup class="mt-auto">
                <div uiSidebarGroupContent>
                  <ul uiSidebarMenu aria-label="Secondary">
                    <li uiSidebarMenuItem *ngFor="let item of navSecondary">
                      <button uiSidebarMenuButton size="sm">
                        <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="item.icon"></span>
                        <span>{{ item.title }}</span>
                      </button>
                    </li>
                  </ul>
                </div>
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
          </nav>

          <main uiSidebarInset id="sidebar-16-main" class="min-h-0">
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
      </div>
    </div>
  `,
})
export class Sidebar16Block {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly isMobile = injectIsMobile();

  protected readonly chevronRight: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(chevronRightIcon));
  protected readonly creditCard: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(creditCardIcon));
  protected readonly folder: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(folderIcon));
  protected readonly logout: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(logoutIcon));
  protected readonly moreHoriz: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(moreHorizIcon));
  protected readonly search: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(searchIcon));
  protected readonly share: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(shareIcon));
  protected readonly sparkles: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(starShineIcon));
  protected readonly terminal: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(terminalIcon));
  protected readonly trash: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(deleteIcon));
  protected readonly unfoldMore: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(unfoldMoreIcon));
  protected readonly badgeCheck: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(verifiedIcon));
  protected readonly bell: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(notificationsIcon));

  protected readonly navMain: NavMainItem[] = [
    {
      title: 'Playground',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(terminalIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(terminalFillIcon)),
      isActive: true,
      items: [{ title: 'History' }, { title: 'Starred' }, { title: 'Settings' }],
    },
    {
      title: 'Models',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(smartToyIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(smartToyFillIcon)),
      items: [{ title: 'Genesis' }, { title: 'Explorer' }, { title: 'Quantum' }],
    },
    {
      title: 'Documentation',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(menuBookIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(menuBookFillIcon)),
      items: [{ title: 'Introduction' }, { title: 'Get Started' }, { title: 'Tutorials' }, { title: 'Changelog' }],
    },
    {
      title: 'Settings',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(settingsIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(settingsFillIcon)),
      items: [{ title: 'General' }, { title: 'Team' }, { title: 'Billing' }, { title: 'Limits' }],
    },
  ];

  protected readonly navSecondary: SecondaryItem[] = [
    { title: 'Support', icon: this.sanitizer.bypassSecurityTrustHtml(deco(supportIcon)) },
    { title: 'Feedback', icon: this.sanitizer.bypassSecurityTrustHtml(deco(sendIcon)) },
  ];

  protected readonly projects: Project[] = [
    { name: 'Design Engineering', icon: this.sanitizer.bypassSecurityTrustHtml(deco(cropSquareIcon)) },
    { name: 'Sales & Marketing', icon: this.sanitizer.bypassSecurityTrustHtml(deco(pieChartIcon)) },
    { name: 'Travel', icon: this.sanitizer.bypassSecurityTrustHtml(deco(mapIcon)) },
  ];

  protected readonly user: User = { name: 'shadcn', email: 'm@example.com', avatar: 'https://github.com/shadcn.png' };
  protected readonly userInitials = 'CN';
}
