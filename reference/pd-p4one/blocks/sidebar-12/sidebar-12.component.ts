import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type WritableSignal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import addIconRaw from '@material-symbols/svg-400/rounded/add.svg?raw';
import chevronRightIconRaw from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import unfoldMoreIconRaw from '@material-symbols/svg-400/rounded/unfold_more.svg?raw';
import starShineIconRaw from '@material-symbols/svg-400/rounded/star_shine.svg?raw';
import verifiedIconRaw from '@material-symbols/svg-400/rounded/verified.svg?raw';
import creditCardIconRaw from '@material-symbols/svg-400/rounded/credit_card.svg?raw';
import notificationsIconRaw from '@material-symbols/svg-400/rounded/notifications.svg?raw';
import logoutIconRaw from '@material-symbols/svg-400/rounded/logout.svg?raw';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/app/ui/breadcrumb';
import { Calendar } from '@/app/ui/calendar';
import { Checkbox } from '@/app/ui/checkbox';
import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

import { Collapsible, CollapsibleContent } from '@/app/ui/collapsible';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/app/ui/sidebar';

interface CalendarGroup {
  name: string;
  items: string[];
  open: WritableSignal<boolean>;
}

interface DemoUser {
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

// Decorative icons: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

/**
 * Port of `@force-ui/sidebar-12` — "A sidebar with a calendar". Structurally
 * close to `sidebar-01`'s shell: a `nav-user` avatar-dropdown header, a
 * `ui/calendar` date picker, three collapsible calendar-list groups
 * (`My Calendars` / `Favorites` / `Other`, each with a checked-state color
 * swatch per item), and a footer "New Calendar" action.
 *
 * `nav-user.tsx`'s avatar-dropdown is the same pattern used by
 * `sidebar-11`'s footer (solved once, reused verbatim): `SidebarMenuButton`
 * as the `rdxDropdownMenuTrigger`, content mirrors the trigger's avatar +
 * name/email block, then Upgrade/Account/Billing/Notifications/Log out.
 *
 * `calendars.tsx`'s per-group header is `SidebarGroupLabel asChild` wrapping
 * a `CollapsibleTrigger` — reproduced as `uiSidebarGroupLabel` + the raw
 * `[rdxCollapsibleTrigger]` directive (not `ui/collapsible`'s own
 * `[uiCollapsibleTrigger]` wrapper, which is a `@Component` and can't share
 * a host element with another `@Component` like `uiSidebarGroupLabel`).
 *
 * The per-item "checked" swatch is a genuine toggle (`isCalendarActive`/
 * `toggleCalendar`, seeded from the registry's static `index < 2`), rendered
 * via the real `button[uiCheckbox]` wrapped in a `<label>` (the established
 * card-composition pattern from `ui/checkbox`'s own `BoxCard` story) rather
 * than the registry's hand-rolled color-swatch `<div>` — reproducing that div
 * would have duplicated `ui/checkbox`'s exact visual spec via ad-hoc classes
 * (and did, in an earlier draft of this file, get the icon centering wrong).
 * A `<button>` is a labelable element, so clicking the row text also toggles
 * the checkbox.
 *
 * Icon substitution: registry's `ChevronsUpDownIcon` → `unfold_more`,
 * `SparklesIcon` → `star_shine`, `BadgeCheckIcon` → `verified`, `BellIcon` →
 * `notifications` (no closer Material Symbols equivalent for any of these).
 */
@Component({
  selector: 'app-block-sidebar-12',
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
    Checkbox,
    Collapsible,
    CollapsibleContent,
    RdxCollapsibleTriggerDirective,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
  ],
  template: `
    <div uiSidebarProvider class="h-screen overflow-hidden">
      <a
        href="#sidebar-12-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar aria-label="Calendar">
        <div uiSidebarHeader class="relative z-10 h-16 border-b border-sidebar-border">
          <ul uiSidebarMenu>
            <li uiSidebarMenuItem>
              <button
                uiSidebarMenuButton
                size="lg"
                [rdxDropdownMenuTrigger]="userMenu"
                [side]="isMobile() ? 'bottom' : 'right'"
                align="end"
                [sideOffset]="4"
              >
                <span uiAvatar class="size-8 rounded-lg">
                  <img uiAvatarImage [src]="user.avatar" [alt]="user.name" />
                  <span uiAvatarFallback class="rounded-lg">{{ user.initials }}</span>
                </span>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{{ user.name }}</span>
                  <span class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
                </div>
                <span class="ml-auto [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="unfoldMore"></span>
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

          <ng-container *ngFor="let group of calendarGroups; let last = last; let groupIdx = index">
            <div uiSidebarGroup>
              <div uiCollapsible [open]="group.open()" (openChange)="group.open.set($event)" class="contents">
                <button
                  uiSidebarGroupLabel
                  rdxCollapsibleTrigger
                  class="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  {{ group.name }}
                  <span
                    class="ml-auto inline-flex [&_svg]:size-4 [&_svg]:fill-current [&_svg]:transition-transform motion-reduce:[&_svg]:transition-none"
                    [class.rotate-90]="group.open()"
                    [innerHTML]="chevronRight"
                  ></span>
                </button>
                <div uiCollapsibleContent>
                  <div uiSidebarGroupContent>
                    <ul uiSidebarMenu>
                      <li uiSidebarMenuItem *ngFor="let item of group.items; let idx = index">
                        <label
                          [for]="'sidebar-12-cal-' + groupIdx + '-' + idx"
                          class="flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-sm text-sidebar-foreground select-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sidebar-ring"
                        >
                          <button
                            uiCheckbox
                            [id]="'sidebar-12-cal-' + groupIdx + '-' + idx"
                            [checked]="isCalendarActive(groupIdx, idx)"
                            (checkedChange)="toggleCalendar(groupIdx, idx)"
                          ></button>
                          <span>{{ item }}</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div uiSidebarSeparator class="mx-0"></div>
          </ng-container>
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

        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-12-main">
        <header class="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <button uiSidebarTrigger class="-ml-1"></button>
          <div uiSeparator orientation="vertical" class="mr-2 h-4 self-auto!"></div>
          <nav uiBreadcrumb>
            <ol uiBreadcrumbList>
              <li uiBreadcrumbItem>
                <span uiBreadcrumbPage>October 2024</span>
              </li>
            </ol>
          </nav>
        </header>
        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-5">
            <div *ngFor="let cell of placeholderCells" class="aspect-square rounded-xl bg-muted/50"></div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class Sidebar12Block {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly isMobile = injectIsMobile();

  private icon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(deco(svg));
  }

  protected readonly add = this.icon(addIconRaw);
  protected readonly chevronRight = this.icon(chevronRightIconRaw);
  protected readonly unfoldMore = this.icon(unfoldMoreIconRaw);
  protected readonly sparkles = this.icon(starShineIconRaw);
  protected readonly badgeCheck = this.icon(verifiedIconRaw);
  protected readonly creditCard = this.icon(creditCardIconRaw);
  protected readonly bell = this.icon(notificationsIconRaw);
  protected readonly logout = this.icon(logoutIconRaw);

  protected readonly user: DemoUser = {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png',
    initials: 'CN',
  };

  protected readonly selectedDate = signal<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );

  protected readonly calendarGroups: CalendarGroup[] = [
    { name: 'My Calendars', items: ['Personal', 'Work', 'Family'], open: signal(true) },
    { name: 'Favorites', items: ['Holidays', 'Birthdays'], open: signal(false) },
    { name: 'Other', items: ['Travel', 'Reminders', 'Deadlines'], open: signal(false) },
  ];

  protected readonly placeholderCells = Array.from({ length: 20 });

  /** Per-row toggle state, keyed `${groupIndex}-${itemIndex}`. Absent = default (first two rows per group start active, matching the registry's static `index < 2`). */
  private readonly calendarOverrides = signal<Record<string, boolean>>({});

  protected isCalendarActive(groupIndex: number, itemIndex: number): boolean {
    const key = `${groupIndex}-${itemIndex}`;
    const state = this.calendarOverrides();
    return key in state ? state[key] : itemIndex < 2;
  }

  protected toggleCalendar(groupIndex: number, itemIndex: number): void {
    const key = `${groupIndex}-${itemIndex}`;
    this.calendarOverrides.update((state) => ({ ...state, [key]: !this.isCalendarActive(groupIndex, itemIndex) }));
  }
}
