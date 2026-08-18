import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, type WritableSignal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import terminalIcon from '@material-symbols/svg-400/rounded/terminal.svg?raw';
import searchIcon from '@material-symbols/svg-400/rounded/search.svg?raw';
import starShineIcon from '@material-symbols/svg-400/rounded/star_shine.svg?raw';
// Static isActive:true row (no dynamic swap needed) — fill cut per active-icon rule.
import homeIcon from '@material-symbols/svg-400/rounded/home-fill.svg?raw';
import inboxIcon from '@material-symbols/svg-400/rounded/inbox.svg?raw';
import calendarMonthIcon from '@material-symbols/svg-400/rounded/calendar_month.svg?raw';
import settingsIcon from '@material-symbols/svg-400/rounded/settings.svg?raw';
import widgetsIcon from '@material-symbols/svg-400/rounded/widgets.svg?raw';
import deleteIconRaw from '@material-symbols/svg-400/rounded/delete.svg?raw';
import quizIcon from '@material-symbols/svg-400/rounded/quiz.svg?raw';
import moreHorizontalIcon from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';
import starIcon from '@material-symbols/svg-400/rounded/star.svg?raw';
import linkIcon from '@material-symbols/svg-400/rounded/link.svg?raw';
import contentCopyIcon from '@material-symbols/svg-400/rounded/content_copy.svg?raw';
import turnRightIcon from '@material-symbols/svg-400/rounded/turn_right.svg?raw';
import turnLeftIcon from '@material-symbols/svg-400/rounded/turn_left.svg?raw';
import showChartIcon from '@material-symbols/svg-400/rounded/show_chart.svg?raw';
import stacksIcon from '@material-symbols/svg-400/rounded/stacks.svg?raw';
import notificationsIcon from '@material-symbols/svg-400/rounded/notifications.svg?raw';
import descriptionIcon from '@material-symbols/svg-400/rounded/description.svg?raw';
import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import addIcon from '@material-symbols/svg-400/rounded/add.svg?raw';
import northEastIcon from '@material-symbols/svg-400/rounded/north_east.svg?raw';
import keyboardArrowDownIcon from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';
import arrowUpwardIcon from '@material-symbols/svg-400/rounded/arrow_upward.svg?raw';
import arrowDownwardIcon from '@material-symbols/svg-400/rounded/arrow_downward.svg?raw';
import graphicEqIcon from '@material-symbols/svg-400/rounded/graphic_eq.svg?raw';

import { Button } from '@/app/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/app/ui/breadcrumb';
import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

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
import {
  Popover,
  PopoverContent,
  PopoverContentBox,
  PopoverTrigger,
} from '@/app/ui/popover';
import { Separator } from '@/app/ui/separator';
import {
  injectIsMobile,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/app/ui/sidebar';

interface TeamOption {
  name: string;
  plan: string;
  icon: SafeHtml;
}

interface NavMainItem {
  title: string;
  icon: SafeHtml;
  isActive?: boolean;
  badge?: string;
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
  open: WritableSignal<boolean>;
}

interface NavSecondaryItem {
  title: string;
  icon: SafeHtml;
}

interface NavAction {
  label: string;
  icon: SafeHtml;
}

// Decorative icons: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-10` — "A sidebar in a popover". Despite the
 * short description this is the richest sidebar-* block: a Notion-style
 * workspace shell composing a team switcher, primary nav, a favorites list
 * (each row with its own overflow dropdown), collapsible workspace groups
 * with sub-pages, and a secondary utility nav pinned to the bottom.
 *
 * The "in a popover" part of the name is `nav-actions.tsx` — a small overflow
 * menu in the page header (`ui/popover`) whose CONTENT happens to be a
 * `ui/sidebar` instance with `collapsible="none"`, reused purely for its
 * grouped-list visual styling (border-separated `SidebarGroup`s), not for
 * real sidebar behavior. It still needs to sit inside the page's
 * `SidebarProvider` for `injectSidebar()` to resolve, which it does here
 * because the popover's `<ng-template rdxPopoverContent>` is declared inside
 * this component's own template.
 *
 * The registry's demo forces the popover open via `useEffect` on mount
 * (`setIsOpen(true)`) purely to showcase it in a static screenshot — dropped
 * here in favor of normal click-to-open, since an unconditionally-open
 * overflow menu on page load isn't real product behavior worth reproducing.
 *
 * Every top-level nav row (`NavMain`, `NavSecondary`, `NavFavorites`,
 * `NavWorkspaces`' top row) uses the registry's `asChild` anchor — dropped in
 * favor of plain `<span>` text inside `<button uiSidebarMenuButton>`, same as
 * `sidebar-01`: `ui/sidebar`'s `SidebarMenuButton` selector is fixed to
 * `button[uiSidebarMenuButton]` (no anchor variant), so nesting an `<a>`
 * would double up interactive elements. `SidebarMenuSubButton` (workspace
 * sub-pages) IS a native `<a>` in `ui/sidebar` and is used as such here.
 *
 * Team switcher uses `rdxDropdownMenuItemRadioGroup`/`Radio` (real
 * `aria-checked` on the active team) rather than the registry's plain
 * `onClick` handler — same reasoning as `sidebar-01`'s version switcher: a
 * genuinely single-select list should carry selectable-item semantics, not
 * a manually-toggled row.
 *
 * The workspace-row toggle applies the raw `[rdxCollapsibleTrigger]` directive
 * (not `ui/collapsible`'s own `[uiCollapsibleTrigger]` wrapper — that's a
 * `@Component`, and stacking it with `uiSidebarMenuAction` puts two components
 * on one host element) — same fix used across this porting batch wherever a
 * collapsible trigger needed to co-exist with another `ui/sidebar` component.
 *
 * Icon substitution: the registry's "Remove from Favorites" uses a
 * struck-through star (`StarOffIcon`); Material Symbols Rounded has no
 * off-variant, so the plain outline `star` icon is reused (same glyph as the
 * header's "Add to favorites" action) — acceptable per the icon-swap
 * strategy's "map by meaning" rule when no closer glyph exists. Likewise
 * `BellIcon` → `notifications` (semantically identical).
 */
@Component({
  selector: 'app-block-sidebar-10',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
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
    Popover,
    PopoverContent,
    ...PopoverContentBox,
    PopoverTrigger,
    Separator,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
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
        href="#sidebar-10-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar aria-label="Workspace" class="border-r-0">
        <div uiSidebarHeader class="relative z-10 border-b border-sidebar-border">
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button uiSidebarMenuButton class="w-fit px-1.5" [rdxDropdownMenuTrigger]="teamMenu" align="start">
                <div
                  class="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground [&_svg]:size-4 [&_svg]:fill-current"
                  [innerHTML]="activeTeam().icon"
                ></div>
                <span class="truncate font-medium">{{ activeTeam().name }}</span>
                <span class="opacity-50 [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="keyboardArrowDown"></span>
              </button>
              <ng-template #teamMenu>
                <div rdxDropdownMenuContent class="w-64">
                  <div rdxDropdownMenuLabel class="text-xs text-muted-foreground">Teams</div>
                  <div rdxDropdownMenuItemRadioGroup [value]="activeTeam().name" (valueChange)="setActiveTeam($event)">
                    <button
                      *ngFor="let team of teams; let i = index"
                      rdxDropdownMenuItemRadio
                      [value]="team.name"
                      class="gap-2 p-2"
                    >
                      <span
                        class="flex size-6 items-center justify-center rounded-xs border border-border [&_svg]:size-4 [&_svg]:fill-current"
                        [innerHTML]="team.icon"
                      ></span>
                      <span>{{ team.name }}</span>
                      <span rdxDropdownMenuShortcut>&#8984;{{ i + 1 }}</span>
                    </button>
                  </div>
                  <div rdxDropdownMenuSeparator></div>
                  <button rdxDropdownMenuItem class="gap-2 p-2">
                    <span
                      class="flex size-6 items-center justify-center rounded-md border border-border bg-background [&_svg]:size-4 [&_svg]:fill-current"
                      [innerHTML]="add"
                    ></span>
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
              @if (item.badge) {
                <div uiSidebarMenuBadge>{{ item.badge }}</div>
              }
            </li>
          </ul>
        </div>

        <div uiSidebarContent>
          <div uiSidebarGroup class="group-data-[collapsible=icon]:hidden">
            <div uiSidebarGroupLabel id="sidebar-10-favorites-label">Favorites</div>
            <ul uiSidebarMenu aria-labelledby="sidebar-10-favorites-label">
              <li uiSidebarMenuItem *ngFor="let fav of favorites">
                <button uiSidebarMenuButton [title]="fav.name">
                  <span aria-hidden="true">{{ fav.emoji }}</span>
                  <span>{{ fav.name }}</span>
                </button>
                <button
                  uiSidebarMenuAction
                  showOnHover
                  class="aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
                  [rdxDropdownMenuTrigger]="favMenu"
                  [side]="isMobile() ? 'bottom' : 'right'"
                  [align]="isMobile() ? 'end' : 'start'"
                >
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHorizontal"></span>
                  <span class="sr-only">More options for {{ fav.name }}</span>
                </button>
                <ng-template #favMenu>
                  <div rdxDropdownMenuContent class="w-56">
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
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="deleteIcon"></span>
                      <span>Delete</span>
                    </button>
                  </div>
                </ng-template>
              </li>
              <li uiSidebarMenuItem>
                <button uiSidebarMenuButton class="text-sidebar-foreground/70">
                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHorizontal"></span>
                  <span>More</span>
                </button>
              </li>
            </ul>
          </div>

          <div uiSidebarGroup>
            <div uiSidebarGroupLabel id="sidebar-10-workspaces-label">Workspaces</div>
            <div uiSidebarGroupContent>
              <ul uiSidebarMenu aria-labelledby="sidebar-10-workspaces-label">
                <li uiSidebarMenuItem *ngFor="let ws of workspaces">
                  <div uiCollapsible [open]="ws.open()" (openChange)="ws.open.set($event)" class="contents">
                    <button uiSidebarMenuButton>
                      <span aria-hidden="true">{{ ws.emoji }}</span>
                      <span>{{ ws.name }}</span>
                    </button>
                    <button
                      uiSidebarMenuAction
                      rdxCollapsibleTrigger
                      showOnHover
                      class="left-2 bg-sidebar-accent text-sidebar-accent-foreground [&_svg]:transition-transform motion-reduce:[&_svg]:transition-none"
                      [class.rotate-90]="ws.open()"
                    >
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="chevronRight"></span>
                      <span class="sr-only">Toggle {{ ws.name }} pages</span>
                    </button>
                    <button uiSidebarMenuAction showOnHover>
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="add"></span>
                      <span class="sr-only">Add page to {{ ws.name }}</span>
                    </button>
                    <div
                      uiCollapsibleContent
                      class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none"
                    >
                      <ul uiSidebarMenuSub>
                        <li uiSidebarMenuSubItem *ngFor="let page of ws.pages">
                          <a uiSidebarMenuSubButton href="javascript:void(0)">
                            <span aria-hidden="true">{{ page.emoji }}</span>
                            <span>{{ page.name }}</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li uiSidebarMenuItem>
                  <button uiSidebarMenuButton class="text-sidebar-foreground/70">
                    <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="moreHorizontal"></span>
                    <span>More</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

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

      <main uiSidebarInset id="sidebar-10-main">
        <header class="flex h-14 shrink-0 items-center gap-2">
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
          <div class="ml-auto px-3">
            <div class="flex items-center gap-2 text-sm">
              <div class="hidden font-medium text-muted-foreground md:inline-block">Edit Oct 08</div>
              <button uiButton variant="ghost" size="icon-sm" aria-label="Add to favorites">
                <span class="[&_svg]:fill-current" [innerHTML]="star"></span>
              </button>
              <div rdxPopoverRoot>
                <button
                  uiButton
                  variant="ghost"
                  size="icon-sm"
                  rdxPopoverTrigger
                  aria-label="More actions"
                  class="data-[state=open]:bg-accent"
                >
                  <span class="[&_svg]:fill-current" [innerHTML]="moreHorizontal"></span>
                </button>
                <ng-template rdxPopoverContent side="bottom" align="end" [sideOffset]="6">
                  <div rdxPopoverContentAttributes class="w-56 overflow-hidden rounded-lg p-0">
                    <div uiSidebar collapsible="none" class="bg-transparent">
                      <div uiSidebarContent>
                        <div
                          uiSidebarGroup
                          *ngFor="let group of actionGroups; let last = last"
                          [class]="groupClass(last)"
                        >
                          <div uiSidebarGroupContent class="gap-0">
                            <ul uiSidebarMenu>
                              <li uiSidebarMenuItem *ngFor="let action of group">
                                <button uiSidebarMenuButton>
                                  <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="action.icon"></span>
                                  <span>{{ action.label }}</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
        </header>
        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-10">
          <div class="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50"></div>
          <div class="mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50"></div>
        </div>
      </main>
    </div>
  `,
})
export class Sidebar10Block {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly isMobile = injectIsMobile();

  private icon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(deco(svg));
  }

  protected readonly keyboardArrowDown = this.icon(keyboardArrowDownIcon);
  protected readonly add = this.icon(addIcon);
  protected readonly moreHorizontal = this.icon(moreHorizontalIcon);
  protected readonly star = this.icon(starIcon);
  protected readonly link = this.icon(linkIcon);
  protected readonly northEast = this.icon(northEastIcon);
  protected readonly deleteIcon = this.icon(deleteIconRaw);
  protected readonly chevronRight = this.icon(chevronRightIcon);

  protected readonly teams: TeamOption[] = [
    { name: 'Acme Inc', plan: 'Enterprise', icon: this.icon(terminalIcon) },
    { name: 'Acme Corp.', plan: 'Startup', icon: this.icon(graphicEqIcon) },
    { name: 'Evil Corp.', plan: 'Free', icon: this.icon(terminalIcon) },
  ];
  protected readonly activeTeamName = signal(this.teams[0].name);
  protected readonly activeTeam = computed(
    () => this.teams.find((team) => team.name === this.activeTeamName()) ?? this.teams[0],
  );

  protected setActiveTeam(name: string): void {
    this.activeTeamName.set(name);
  }

  protected readonly navMain: NavMainItem[] = [
    { title: 'Search', icon: this.icon(searchIcon) },
    { title: 'Ask AI', icon: this.icon(starShineIcon) },
    { title: 'Home', icon: this.icon(homeIcon), isActive: true },
    { title: 'Inbox', icon: this.icon(inboxIcon), badge: '10' },
  ];

  protected readonly navSecondary: NavSecondaryItem[] = [
    { title: 'Calendar', icon: this.icon(calendarMonthIcon) },
    { title: 'Settings', icon: this.icon(settingsIcon) },
    { title: 'Templates', icon: this.icon(widgetsIcon) },
    { title: 'Trash', icon: this.icon(deleteIconRaw) },
    { title: 'Help', icon: this.icon(quizIcon) },
  ];

  protected readonly favorites: FavoriteItem[] = [
    { name: 'Project Management & Task Tracking', emoji: '📊' },
    { name: 'Family Recipe Collection & Meal Planning', emoji: '🍳' },
    { name: 'Fitness Tracker & Workout Routines', emoji: '💪' },
    { name: 'Book Notes & Reading List', emoji: '📚' },
    { name: 'Sustainable Gardening Tips & Plant Care', emoji: '🌱' },
  ];

  protected readonly workspaces: Workspace[] = [
    {
      name: 'Personal Life Management',
      emoji: '🏠',
      open: signal(true),
      pages: [
        { name: 'Daily Journal & Reflection', emoji: '📔' },
        { name: 'Health & Wellness Tracker', emoji: '🍏' },
        { name: 'Personal Growth & Learning Goals', emoji: '🌟' },
      ],
    },
    {
      name: 'Professional Development',
      emoji: '💼',
      open: signal(false),
      pages: [
        { name: 'Career Objectives & Milestones', emoji: '🎯' },
        { name: 'Skill Acquisition & Training Log', emoji: '🧠' },
        { name: 'Networking Contacts & Events', emoji: '🤝' },
      ],
    },
    {
      name: 'Creative Projects',
      emoji: '🎨',
      open: signal(false),
      pages: [
        { name: 'Writing Ideas & Story Outlines', emoji: '✍️' },
        { name: 'Art & Design Portfolio', emoji: '🖼️' },
        { name: 'Music Composition & Practice Log', emoji: '🎵' },
      ],
    },
  ];

  protected readonly actionGroups: NavAction[][] = [
    [
      { label: 'Customize Page', icon: this.icon(settingsIcon) },
      { label: 'Turn into wiki', icon: this.icon(descriptionIcon) },
    ],
    [
      { label: 'Copy Link', icon: this.icon(linkIcon) },
      { label: 'Duplicate', icon: this.icon(contentCopyIcon) },
      { label: 'Move to', icon: this.icon(turnRightIcon) },
      { label: 'Move to Trash', icon: this.icon(deleteIconRaw) },
    ],
    [
      { label: 'Undo', icon: this.icon(turnLeftIcon) },
      { label: 'View analytics', icon: this.icon(showChartIcon) },
      { label: 'Version History', icon: this.icon(stacksIcon) },
      { label: 'Show delete pages', icon: this.icon(deleteIconRaw) },
      { label: 'Notifications', icon: this.icon(notificationsIcon) },
    ],
    [
      { label: 'Import', icon: this.icon(arrowUpwardIcon) },
      { label: 'Export', icon: this.icon(arrowDownwardIcon) },
    ],
  ];

  protected groupClass(last: boolean): string {
    return last ? 'gap-0' : 'gap-0 border-b border-border';
  }
}
