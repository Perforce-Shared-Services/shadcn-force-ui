import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

import addIcon from '@material-symbols/svg-400/rounded/add.svg?raw';
import calendarMonthIcon from '@material-symbols/svg-400/rounded/calendar_month.svg?raw';
import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import creditCardIcon from '@material-symbols/svg-400/rounded/credit_card.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';
import graphicEqIcon from '@material-symbols/svg-400/rounded/graphic_eq.svg?raw';
// `-fill` cut: this entry is the demo's hardcoded `isActive: true` row — the
// established convention (see `ui/sidebar/sidebar.stories.ts`'s own doc
// comment) is the active row uses the fill icon directly for a static demo,
// dynamic active-state gates the swap in the template instead (see sidebar-09
// / sidebar-13's `activeItem()`/`activeSection()`-driven rows for that case).
import homeIcon from '@material-symbols/svg-400/rounded/home-fill.svg?raw';
import inboxIcon from '@material-symbols/svg-400/rounded/inbox.svg?raw';
import keyboardArrowDownIcon from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';
import linkIcon from '@material-symbols/svg-400/rounded/link.svg?raw';
import logoutIcon from '@material-symbols/svg-400/rounded/logout.svg?raw';
import moreHorizIcon from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';
import northEastIcon from '@material-symbols/svg-400/rounded/north_east.svg?raw';
import notificationsIcon from '@material-symbols/svg-400/rounded/notifications.svg?raw';
import quizIcon from '@material-symbols/svg-400/rounded/quiz.svg?raw';
import searchIcon from '@material-symbols/svg-400/rounded/search.svg?raw';
import settingsIcon from '@material-symbols/svg-400/rounded/settings.svg?raw';
import sparklesIcon from '@material-symbols/svg-400/rounded/star_shine.svg?raw';
import starIcon from '@material-symbols/svg-400/rounded/star.svg?raw';
import terminalIcon from '@material-symbols/svg-400/rounded/terminal.svg?raw';
import unfoldMoreIcon from '@material-symbols/svg-400/rounded/unfold_more.svg?raw';
import verifiedIcon from '@material-symbols/svg-400/rounded/verified.svg?raw';
import widgetsIcon from '@material-symbols/svg-400/rounded/widgets.svg?raw';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/app/ui/breadcrumb';
import { Calendar } from '@/app/ui/calendar';
import { Collapsible, CollapsibleContent } from '@/app/ui/collapsible';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
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
  SidebarSeparator,
  SidebarTrigger,
} from '@/app/ui/sidebar';

import { Sidebar15CalendarsComponent, type CalendarGroupConfig } from './sidebar-15-calendars.component';

interface Team {
  name: string;
  logo: SafeHtml;
}

interface NavMainItem {
  title: string;
  icon: SafeHtml;
  isActive?: boolean;
}

interface FavoriteItem {
  name: string;
  emoji: string;
}

interface WorkspacePage {
  name: string;
  emoji: string;
}

interface Workspace {
  name: string;
  emoji: string;
  pages: WorkspacePage[];
}

interface SecondaryItem {
  title: string;
  icon: SafeHtml;
}

interface AppUser {
  name: string;
  email: string;
  avatar: string;
}

// Decorative icon: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-15` — "A left and right sidebar", the richest
 * block in the `sidebar-*` category. Composed entirely from `ui/sidebar`,
 * `ui/breadcrumb`, `ui/separator`, `ui/collapsible`, `ui/dropdown-menu`,
 * `ui/calendar`, `ui/avatar` — no new primitives, no new tokens.
 *
 * Structure (verified against the registry's `page.tsx` +
 * `sidebar-left.tsx`/`sidebar-right.tsx`, not assumed): one
 * `div[uiSidebarProvider]` contains TWO independent `nav[uiSidebar]` landmarks
 * plus `main[uiSidebarInset]` in between —
 *   left  (`side="left"`,  default `collapsible="offcanvas"`): team-switcher
 *         dropdown + main nav in the header, favorites + workspaces +
 *         secondary nav (pinned via `mt-auto`) in the content;
 *   right (`side="right"`, `collapsible="none"`, sticky, `lg:flex` only —
 *         registry-verbatim "hidden below the `lg` breakpoint" behavior, this
 *         is a fixed reference panel, not a collapsible drawer): nav-user
 *         dropdown in the header, a mini date-picker `ui/calendar` + the
 *         togglable calendars list (`Sidebar15CalendarsComponent`, split out
 *         as the one genuinely substantial sub-piece) in the content, a
 *         static "New Calendar" row in the footer.
 * `main[uiSidebarInset]` renders a sticky breadcrumb header (its one
 * `BreadcrumbPage` reads "Project Management & Task Tracking" — the
 * registry's own copy, incidentally matching the first Favorites entry) plus
 * placeholder content blocks, registry-verbatim.
 *
 * `border-sidebar-border` is added to the right sidebar's `border-l` (registry
 * ships a bare `border-l`) — same bare-border-resolves-to-currentColor gotcha
 * already fixed in `ui/sidebar`'s own desktop-branch container classes and in
 * the `calendar-01` block pilot; a plain `border-*` utility with no explicit
 * color renders `currentColor` in this app (no global `* { border-border }`
 * reset), not the `--sidebar-border` token.
 *
 * Team-switcher: genuinely single-select (exactly one active team), so it
 * uses `rdxDropdownMenuItemRadioGroup`/`rdxDropdownMenuItemRadio` (real
 * `aria-checked`) instead of the registry's manually-toggled `useState`,
 * matching `sidebar-01`'s own version-switcher pattern. The registry's `plan`
 * field on each team is carried in the source data but never actually
 * rendered anywhere in the upstream JSX — reproduced as-is: the field is
 * simply omitted from this port's `Team` shape rather than adding UI for it.
 * Same treatment for `NavMain`'s sample `Inbox` item: the registry's
 * `sidebar-left.tsx` sample data carries `badge: "10"` on it, but `NavMain`'s
 * own component (verified — its props type has no `badge` field and its JSX
 * never reads one) never renders it; `NavSecondary` is the nav list that
 * actually supports badges, and none of ITS sample items carry one. Both are
 * dead fields in the upstream source; this port's `NavMainItem` drops the
 * unused field rather than reproducing dead data.
 *
 * Nav-user avatar dropdown: the solved pattern from `nav-user.tsx`, ported
 * with the registry's own `align="start"` (not `"end"` — verified against the
 * real `sidebar-right.tsx` source, which differs from the generic dashboard
 * nav-user block this pattern is sometimes seen with elsewhere).
 *
 * Favorites row actions (`SidebarMenuAction` + its own dropdown) and
 * workspace rows (`SidebarMenuAction` collapsible-trigger + `SidebarMenuAction`
 * "add" button) are siblings of `button[uiSidebarMenuButton]`, never nested
 * inside it (checklist rule 5) — matches the registry's own sibling
 * `asChild` structure. The workspace row's collapsible-trigger action uses
 * the RAW `[rdxCollapsibleTrigger]` directive (not `ui/collapsible`'s
 * `CollapsibleTrigger` wrapper) alongside `uiSidebarMenuAction` — same
 * one-Component-per-element reasoning documented in full on
 * `Sidebar15CalendarsComponent`. All primary rows render as plain
 * `button[uiSidebarMenuButton]` text (no nested `<a>`), same convention as
 * every other `sidebar-*` block in this app (no anchor variant of
 * `SidebarMenuButton` exists); `SidebarMenuSubButton`
 * (`a[uiSidebarMenuSubButton]`) IS itself an anchor and is used directly for
 * workspace sub-pages, with `href="javascript:void(0)"` matching this
 * category's existing demo-link convention.
 *
 * Registry deviation (real, not cosmetic — see
 * `Sidebar15CalendarsComponent`'s own doc comment): the Calendars list's
 * checkbox-style rows are static decoration upstream (`data-active={index <
 * 2}`, no click handler at all). This port makes them real toggle buttons.
 *
 * Audit fixes on top of the registry composition (matching every other
 * `sidebar-*` block): a skip-to-content link, `aria-label` on both `nav`
 * landmarks, unique `[id]`/`aria-labelledby` pairing on every group label +
 * its list, and no bare forms needing a `(submit)` guard (this block has none).
 */
@Component({
  selector: 'app-block-sidebar-15',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    Calendar,
    Collapsible,
    CollapsibleContent,
    RdxCollapsibleTriggerDirective,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
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
    SidebarSeparator,
    SidebarTrigger,
    Sidebar15CalendarsComponent,
  ],
  template: `
    <div uiSidebarProvider class="h-screen overflow-hidden">
      <a
        href="#sidebar-15-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >

      <!-- ============ LEFT SIDEBAR ============ -->
      <nav uiSidebar side="left" aria-label="Primary navigation" class="border-r-0">
        <div uiSidebarHeader class="relative z-10 border-b border-sidebar-border">
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button
                uiSidebarMenuButton
                class="w-fit px-1.5"
                [rdxDropdownMenuTrigger]="teamMenu"
                align="start"
                side="bottom"
                [sideOffset]="4"
              >
                <div
                  class="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="activeTeam().logo"
                ></div>
                <span class="truncate font-medium">{{ activeTeam().name }}</span>
                <span class="opacity-50 [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="chevronDown"></span>
              </button>
              <ng-template #teamMenu>
                <div rdxDropdownMenuContent class="w-64 rounded-lg">
                  <div rdxDropdownMenuLabel class="text-xs text-muted-foreground">Teams</div>
                  <div
                    rdxDropdownMenuItemRadioGroup
                    [value]="activeTeamName()"
                    (valueChange)="activeTeamName.set($event)"
                  >
                    <button
                      *ngFor="let team of teams; let i = index"
                      rdxDropdownMenuItemRadio
                      [value]="team.name"
                      class="gap-2 p-2"
                    >
                      <div class="flex size-6 items-center justify-center rounded-xs border [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="team.logo"></div>
                      <span>{{ team.name }}</span>
                      <span rdxDropdownMenuShortcut>&#8984;{{ i + 1 }}</span>
                    </button>
                  </div>
                  <div rdxDropdownMenuSeparator></div>
                  <button rdxDropdownMenuItem class="gap-2 p-2">
                    <div class="flex size-6 items-center justify-center rounded-md border bg-background [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="add"></div>
                    <span class="font-medium text-muted-foreground">Add team</span>
                  </button>
                </div>
              </ng-template>
            </li>
          </ul>

          <ul uiSidebarMenu>
            <li uiSidebarMenuItem *ngFor="let item of navMain">
              <button uiSidebarMenuButton [isActive]="!!item.isActive">
                <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="item.icon"></span>
                <span>{{ item.title }}</span>
              </button>
            </li>
          </ul>
        </div>

        <div uiSidebarContent>
          <!-- Favorites -->
          <div uiSidebarGroup>
            <div uiSidebarGroupLabel [id]="'sidebar-15-favorites-label'">Favorites</div>
            <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-15-favorites-label'">
              <li uiSidebarMenuItem *ngFor="let fav of favorites">
                <button uiSidebarMenuButton [title]="fav.name">
                  <span>{{ fav.emoji }}</span>
                  <span>{{ fav.name }}</span>
                </button>
                <button
                  uiSidebarMenuAction
                  [showOnHover]="true"
                  class="aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
                  [rdxDropdownMenuTrigger]="favMenu"
                  [side]="isMobile() ? 'bottom' : 'right'"
                  [align]="isMobile() ? 'end' : 'start'"
                >
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHoriz"></span>
                  <span class="sr-only">More</span>
                </button>
                <ng-template #favMenu>
                  <div rdxDropdownMenuContent class="w-56 rounded-lg" [side]="isMobile() ? 'bottom' : 'right'" [align]="isMobile() ? 'end' : 'start'">
                    <button rdxDropdownMenuItem>
                      <span class="text-muted-foreground [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="star"></span>
                      <span>Remove from Favorites</span>
                    </button>
                    <div rdxDropdownMenuSeparator></div>
                    <button rdxDropdownMenuItem>
                      <span class="text-muted-foreground [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="link"></span>
                      <span>Copy Link</span>
                    </button>
                    <button rdxDropdownMenuItem>
                      <span class="text-muted-foreground [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="northEast"></span>
                      <span>Open in New Tab</span>
                    </button>
                    <div rdxDropdownMenuSeparator></div>
                    <button rdxDropdownMenuItem variant="destructive">
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="deleteI"></span>
                      <span>Delete</span>
                    </button>
                  </div>
                </ng-template>
              </li>
              <li uiSidebarMenuItem>
                <button uiSidebarMenuButton class="text-sidebar-foreground/70">
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHoriz"></span>
                  <span>More</span>
                </button>
              </li>
            </ul>
          </div>

          <!-- Workspaces -->
          <div uiSidebarGroup>
            <div uiSidebarGroupLabel [id]="'sidebar-15-workspaces-label'">Workspaces</div>
            <div uiSidebarGroupContent>
              <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-15-workspaces-label'">
                <li uiSidebarMenuItem *ngFor="let ws of workspaces">
                  <div uiCollapsible class="contents">
                    <button uiSidebarMenuButton>
                      <span>{{ ws.emoji }}</span>
                      <span>{{ ws.name }}</span>
                    </button>
                    <button
                      uiSidebarMenuAction
                      rdxCollapsibleTrigger
                      [showOnHover]="true"
                      class="left-2 bg-sidebar-accent text-sidebar-accent-foreground transition-transform motion-reduce:transition-none data-[state=open]:rotate-90"
                    >
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="chevronRight"></span>
                    </button>
                    <button uiSidebarMenuAction [showOnHover]="true">
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="add"></span>
                    </button>
                    <div
                      uiCollapsibleContent
                      class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none"
                    >
                      <ul uiSidebarMenuSub>
                        <li uiSidebarMenuSubItem *ngFor="let page of ws.pages">
                          <a uiSidebarMenuSubButton href="javascript:void(0)">
                            <span>{{ page.emoji }}</span>
                            <span>{{ page.name }}</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li uiSidebarMenuItem>
                  <button uiSidebarMenuButton class="text-sidebar-foreground/70">
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHoriz"></span>
                    <span>More</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Secondary nav, pinned to the bottom of the scroll area -->
          <div uiSidebarGroup class="mt-auto">
            <div uiSidebarGroupContent>
              <ul uiSidebarMenu>
                <li uiSidebarMenuItem *ngFor="let item of navSecondary">
                  <button uiSidebarMenuButton>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="item.icon"></span>
                    <span>{{ item.title }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button uiSidebarRail></button>
      </nav>

      <!-- ============ MAIN CONTENT ============ -->
      <main uiSidebarInset id="sidebar-15-main">
        <header class="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div class="flex flex-1 items-center gap-2 px-3">
            <button uiSidebarTrigger></button>
            <div uiSeparator orientation="vertical" class="mr-2 h-4 self-auto!"></div>
            <nav uiBreadcrumb>
              <ol uiBreadcrumbList>
                <li uiBreadcrumbItem>
                  <span uiBreadcrumbPage class="line-clamp-1">Project Management &amp; Task Tracking</span>
                </li>
              </ol>
            </nav>
          </div>
        </header>
        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div class="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50"></div>
          <div class="mx-auto h-screen w-full max-w-3xl rounded-xl bg-muted/50"></div>
        </div>
      </main>

      <!-- ============ RIGHT SIDEBAR ============ -->
      <nav
        uiSidebar
        side="right"
        collapsible="none"
        aria-label="Calendars"
        class="sticky top-0 hidden h-svh border-l border-sidebar-border lg:flex"
      >
        <div uiSidebarHeader class="relative z-10 h-16 border-b border-sidebar-border">
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button
                uiSidebarMenuButton
                size="lg"
                [rdxDropdownMenuTrigger]="userMenu"
                [side]="isMobile() ? 'bottom' : 'right'"
                align="start"
                [sideOffset]="4"
              >
                <span uiAvatar class="size-8 rounded-lg">
                  <img uiAvatarImage [src]="user.avatar" [alt]="user.name" />
                  <span uiAvatarFallback class="rounded-lg">CN</span>
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
                  class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  [side]="isMobile() ? 'bottom' : 'right'"
                  align="start"
                  [sideOffset]="4"
                >
                  <div rdxDropdownMenuLabel class="p-0 font-normal">
                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <span uiAvatar class="size-8 rounded-lg">
                        <img uiAvatarImage [src]="user.avatar" [alt]="user.name" />
                        <span uiAvatarFallback class="rounded-lg">CN</span>
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
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="verified"></span>
                    <span>Account</span>
                  </button>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="creditCard"></span>
                    <span>Billing</span>
                  </button>
                  <button rdxDropdownMenuItem>
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="notifications"></span>
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

        <div uiSidebarContent>
          <div uiSidebarGroup class="px-0">
            <div uiSidebarGroupContent>
              <div
                uiCalendar
                mode="single"
                [(selected)]="selectedDate"
                captionLayout="dropdown"
                class="bg-transparent [--cell-size:2.1rem]"
              ></div>
            </div>
          </div>
          <div uiSidebarSeparator class="mx-0"></div>
          <app-block-sidebar-15-calendars [calendars]="calendarGroups" />
        </div>

        <div uiSidebarFooter>
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button uiSidebarMenuButton>
                <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="add"></span>
                <span>New Calendar</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  `,
})
export class Sidebar15Block {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly icon = (svg: string): SafeHtml => this.sanitizer.bypassSecurityTrustHtml(deco(svg));

  protected readonly isMobile = injectIsMobile();

  protected readonly chevronDown: SafeHtml = this.icon(keyboardArrowDownIcon);
  protected readonly add: SafeHtml = this.icon(addIcon);
  protected readonly moreHoriz: SafeHtml = this.icon(moreHorizIcon);
  protected readonly star: SafeHtml = this.icon(starIcon);
  protected readonly link: SafeHtml = this.icon(linkIcon);
  protected readonly northEast: SafeHtml = this.icon(northEastIcon);
  protected readonly deleteI: SafeHtml = this.icon(deleteIcon);
  protected readonly chevronRight: SafeHtml = this.icon(chevronRightIcon);
  protected readonly unfoldMore: SafeHtml = this.icon(unfoldMoreIcon);
  protected readonly sparkles: SafeHtml = this.icon(sparklesIcon);
  protected readonly verified: SafeHtml = this.icon(verifiedIcon);
  protected readonly creditCard: SafeHtml = this.icon(creditCardIcon);
  protected readonly notifications: SafeHtml = this.icon(notificationsIcon);
  protected readonly logout: SafeHtml = this.icon(logoutIcon);

  protected readonly teams: Team[] = [
    { name: 'Acme Inc', logo: this.icon(terminalIcon) },
    { name: 'Acme Corp.', logo: this.icon(graphicEqIcon) },
    { name: 'Evil Corp.', logo: this.icon(terminalIcon) },
  ];
  protected readonly activeTeamName = signal(this.teams[0].name);
  protected readonly activeTeam = computed(
    () => this.teams.find((team) => team.name === this.activeTeamName()) ?? this.teams[0],
  );

  protected readonly navMain: NavMainItem[] = [
    { title: 'Search', icon: this.icon(searchIcon) },
    { title: 'Ask AI', icon: this.icon(sparklesIcon) },
    { title: 'Home', icon: this.icon(homeIcon), isActive: true },
    { title: 'Inbox', icon: this.icon(inboxIcon) },
  ];

  protected readonly navSecondary: SecondaryItem[] = [
    { title: 'Calendar', icon: this.icon(calendarMonthIcon) },
    { title: 'Settings', icon: this.icon(settingsIcon) },
    { title: 'Templates', icon: this.icon(widgetsIcon) },
    { title: 'Trash', icon: this.icon(deleteIcon) },
    { title: 'Help', icon: this.icon(quizIcon) },
  ];

  protected readonly favorites: FavoriteItem[] = [
    { name: 'Project Management & Task Tracking', emoji: '📊' },
    { name: 'Family Recipe Collection & Meal Planning', emoji: '🍳' },
    { name: 'Fitness Tracker & Workout Routines', emoji: '💪' },
    { name: 'Book Notes & Reading List', emoji: '📚' },
    { name: 'Sustainable Gardening Tips & Plant Care', emoji: '🌱' },
    { name: 'Language Learning Progress & Resources', emoji: '🗣️' },
    { name: 'Home Renovation Ideas & Budget Tracker', emoji: '🏠' },
    { name: 'Personal Finance & Investment Portfolio', emoji: '💰' },
    { name: 'Movie & TV Show Watchlist with Reviews', emoji: '🎬' },
    { name: 'Daily Habit Tracker & Goal Setting', emoji: '✅' },
  ];

  protected readonly workspaces: Workspace[] = [
    {
      name: 'Personal Life Management',
      emoji: '🏠',
      pages: [
        { name: 'Daily Journal & Reflection', emoji: '📔' },
        { name: 'Health & Wellness Tracker', emoji: '🍏' },
        { name: 'Personal Growth & Learning Goals', emoji: '🌟' },
      ],
    },
    {
      name: 'Professional Development',
      emoji: '💼',
      pages: [
        { name: 'Career Objectives & Milestones', emoji: '🎯' },
        { name: 'Skill Acquisition & Training Log', emoji: '🧠' },
        { name: 'Networking Contacts & Events', emoji: '🤝' },
      ],
    },
    {
      name: 'Creative Projects',
      emoji: '🎨',
      pages: [
        { name: 'Writing Ideas & Story Outlines', emoji: '✍️' },
        { name: 'Art & Design Portfolio', emoji: '🖼️' },
        { name: 'Music Composition & Practice Log', emoji: '🎵' },
      ],
    },
    {
      name: 'Home Management',
      emoji: '🏡',
      pages: [
        { name: 'Household Budget & Expense Tracking', emoji: '💰' },
        { name: 'Home Maintenance Schedule & Tasks', emoji: '🔧' },
        { name: 'Family Calendar & Event Planning', emoji: '📅' },
      ],
    },
    {
      name: 'Travel & Adventure',
      emoji: '🧳',
      pages: [
        { name: 'Trip Planning & Itineraries', emoji: '🗺️' },
        { name: 'Travel Bucket List & Inspiration', emoji: '🌎' },
        { name: 'Travel Journal & Photo Gallery', emoji: '📸' },
      ],
    },
  ];

  protected readonly user: AppUser = {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png',
  };

  protected readonly selectedDate = signal<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );

  protected readonly calendarGroups: CalendarGroupConfig[] = [
    { name: 'My Calendars', items: ['Personal', 'Work', 'Family'] },
    { name: 'Favorites', items: ['Holidays', 'Birthdays'] },
    { name: 'Other', items: ['Travel', 'Reminders', 'Deadlines'] },
  ];
}
