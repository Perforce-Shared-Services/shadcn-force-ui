import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { RdxCollapsibleTriggerDirective } from '@radix-ng/primitives/collapsible';

import terminalIcon from '@material-symbols/svg-400/rounded/terminal.svg?raw';
import terminalFillIcon from '@material-symbols/svg-400/rounded/terminal-fill.svg?raw';
import smartToyIcon from '@material-symbols/svg-400/rounded/smart_toy.svg?raw';
import smartToyFillIcon from '@material-symbols/svg-400/rounded/smart_toy-fill.svg?raw';
import menuBookIcon from '@material-symbols/svg-400/rounded/menu_book.svg?raw';
import menuBookFillIcon from '@material-symbols/svg-400/rounded/menu_book-fill.svg?raw';
import settingsIcon from '@material-symbols/svg-400/rounded/settings.svg?raw';
import settingsFillIcon from '@material-symbols/svg-400/rounded/settings-fill.svg?raw';
import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import cropSquareIcon from '@material-symbols/svg-400/rounded/crop_square.svg?raw';
import pieChartIcon from '@material-symbols/svg-400/rounded/pie_chart.svg?raw';
import mapIcon from '@material-symbols/svg-400/rounded/map.svg?raw';
import moreHorizIcon from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';
import folderIcon from '@material-symbols/svg-400/rounded/folder.svg?raw';
import shareIcon from '@material-symbols/svg-400/rounded/share.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';
import supportIcon from '@material-symbols/svg-400/rounded/support.svg?raw';
import sendIcon from '@material-symbols/svg-400/rounded/send.svg?raw';
import unfoldMoreIcon from '@material-symbols/svg-400/rounded/unfold_more.svg?raw';
import starShineIcon from '@material-symbols/svg-400/rounded/star_shine.svg?raw';
import verifiedIcon from '@material-symbols/svg-400/rounded/verified.svg?raw';
import creditCardIcon from '@material-symbols/svg-400/rounded/credit_card.svg?raw';
import notificationsIcon from '@material-symbols/svg-400/rounded/notifications.svg?raw';
import logoutIcon from '@material-symbols/svg-400/rounded/logout.svg?raw';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';
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
  iconFill: SafeHtml;
  isActive?: boolean;
  items?: NavSubItem[];
}

interface NavSecondaryItem {
  title: string;
  icon: SafeHtml;
}

interface ProjectItem {
  name: string;
  icon: SafeHtml;
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
 * Port of `@force-ui/sidebar-08` — an inset sidebar shell (`variant="inset"`)
 * with a branded header, a collapsible primary nav (`nav-main`), a project
 * list with a per-row overflow menu (`nav-projects`), a secondary/support nav
 * pinned to the bottom (`nav-secondary`), and a user-profile footer with an
 * avatar dropdown (`nav-user`). Composed entirely from `ui/sidebar`,
 * `ui/collapsible`, `ui/dropdown-menu`, `ui/avatar`, `ui/breadcrumb`,
 * `ui/separator` — no new primitives, no new tokens. The registry splits
 * `app-sidebar.tsx` + 4 `nav-*.tsx` files; inlined into this one file per this
 * category's convention (none of the four pieces is large enough alone to
 * warrant a sibling file).
 *
 * CANONICAL LAYOUT (maintainer note, 2026-07-03): this `variant="inset"`
 * composition — sidebar on `--sidebar` bg, `SidebarInset` as a white rounded
 * panel inset from the sidebar/viewport edges — is a near 1:1 match for the
 * the-force-design-spec MCP's `sidebar-only-shell` layout pattern (a topbar
 * variant of the same idea lives in `page-shell`). Per that spec: the panel's
 * own border + rounded shape + the bg-emphasis/bg-surface color contrast
 * ARE the visual separation — the sidebar's internal header should carry a
 * `border-b` divider only, never a `shadow-xs` (a shadow there has no spec
 * basis and visibly leaks above the header when the panel floats away from
 * the viewport edge, exactly the bug fixed here). Prefer this composition
 * over the flush "default"/`floating` variants when starting a new
 * full-page block or product shell — it's the one the spec actually
 * documents.
 *
 * DEVIATION (real bug avoided, not registry parity): `nav-main.tsx`'s
 * `CollapsibleTrigger asChild` wraps a `SidebarMenuAction` — i.e. one host
 * element carries BOTH the trigger and the action-button role. `ui/collapsible`'s
 * own `[uiCollapsibleTrigger]` is a `@Component` (like `[uiSidebarMenuAction]`),
 * and Angular does not allow two `@Component`s to match the same host element
 * (a real compile/runtime conflict, not a style choice) — confirmed against
 * both components' decorators before writing this template, not assumed. The
 * fix: apply the raw `RdxCollapsibleTriggerDirective` (`[rdxCollapsibleTrigger]`,
 * a plain `@Directive` with no Tailwind classes of its own) directly on the
 * `SidebarMenuAction` button instead of `ui/collapsible`'s wrapper Component.
 * Behaviour is identical (click-to-toggle + `aria-controls`/`aria-expanded`/
 * `data-state` off the same `CollapsibleRootContext`); only the trigger
 * Component wrapper is swapped for its underlying directive. Each row's
 * `<div uiCollapsible class="contents">` still supplies that context — the
 * `contents` display keeps it layout-transparent, same idiom `sidebar-11`
 * already uses for its recursive file tree.
 *
 * DEVIATION (dropdown positioning): the registry's `DropdownMenuContent`
 * accepts `side`/`align`/`sideOffset` directly, but `ui/dropdown-menu`'s port
 * moves those onto the TRIGGER (`[rdxDropdownMenuTrigger]`) since radix-ng's
 * CDK trigger owns positioning — documented on `dropdown-menu-trigger.directive.ts`
 * itself. Both dropdowns here (`nav-projects`' per-row menu, `nav-user`'s
 * profile menu) set `side`/`align`/`sideOffset` on the trigger only.
 *
 * DEVIATION (no anchor variant): every `SidebarMenuButton`/`SidebarMenuAction`
 * that the registry renders as `asChild` around an `<a href>` renders here as
 * a plain `<button>` with a `<span>` label — `ui/sidebar`'s `SidebarMenuButton`/
 * `SidebarMenuAction` selectors are fixed to `button`/generic (no anchor
 * variant like `SidebarMenuSubButton` has), matching `sidebar-01`'s and
 * `sidebar-11`'s own precedent. `SidebarMenuSubButton` DOES have a real anchor
 * selector, so sub-items use `<a uiSidebarMenuSubButton href="javascript:void(0)">`.
 *
 * Accessibility additions beyond the registry (matching this category's other
 * blocks): `nav[uiSidebar]` landmark with a descriptive `aria-label`, a
 * skip-to-content link, `aria-labelledby` linking each labelled nav group to
 * its list, and per-row "Toggle {title}" / "More options for {name}" labels
 * instead of the registry's generic "Toggle" / bare icon (distinguishable
 * accessible names for repeated icon-only buttons — WCAG 2.4.6).
 */
@Component({
  selector: 'app-block-sidebar-08',
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
        href="#sidebar-08-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >
      <nav uiSidebar [variant]="'inset'" aria-label="Acme Inc">
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
            <div uiSidebarGroupLabel [id]="'sidebar-08-platform-label'">Platform</div>
            <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-08-platform-label'">
              <li uiSidebarMenuItem *ngFor="let item of navMain; let i = index">
                <div
                  uiCollapsible
                  [open]="mainOpen()[i]"
                  (openChange)="setMainOpen(i, $event)"
                  [contentId]="'sidebar-08-navmain-' + i"
                  class="contents"
                >
                  <button uiSidebarMenuButton [isActive]="!!item.isActive">
                    <span
                      class="[&_svg]:size-4 [&_svg]:fill-current"
                      [innerHTML]="item.isActive ? item.iconFill : item.icon"
                    ></span>
                    <span>{{ item.title }}</span>
                  </button>
                  <ng-container *ngIf="item.items?.length">
                    <button
                      uiSidebarMenuAction
                      rdxCollapsibleTrigger
                      class="transition-transform motion-reduce:transition-none data-[state=open]:rotate-90"
                    >
                      <span class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="chevronRight"></span>
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
            <div uiSidebarGroupLabel [id]="'sidebar-08-projects-label'">Projects</div>
            <ul uiSidebarMenu [attr.aria-labelledby]="'sidebar-08-projects-label'">
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
                  <span class="sr-only">More options for {{ project.name }}</span>
                </button>
                <ng-template #projectMenu>
                  <div rdxDropdownMenuContent class="w-48">
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
              <ul uiSidebarMenu>
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
        <button uiSidebarRail></button>
      </nav>

      <main uiSidebarInset id="sidebar-08-main">
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
export class Sidebar08Block {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly isMobile = injectIsMobile();

  private icon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(deco(svg));
  }

  protected readonly terminal = this.icon(terminalIcon);
  protected readonly chevronRight = this.icon(chevronRightIcon);
  protected readonly moreHoriz = this.icon(moreHorizIcon);
  protected readonly folder = this.icon(folderIcon);
  protected readonly share = this.icon(shareIcon);
  protected readonly trash = this.icon(deleteIcon);
  protected readonly unfoldMore = this.icon(unfoldMoreIcon);
  protected readonly sparkles = this.icon(starShineIcon);
  protected readonly badgeCheck = this.icon(verifiedIcon);
  protected readonly creditCard = this.icon(creditCardIcon);
  protected readonly bell = this.icon(notificationsIcon);
  protected readonly logout = this.icon(logoutIcon);

  protected readonly navMain: NavMainItem[] = [
    {
      title: 'Playground',
      icon: this.icon(terminalIcon),
      iconFill: this.icon(terminalFillIcon),
      isActive: true,
      items: [{ title: 'History' }, { title: 'Starred' }, { title: 'Settings' }],
    },
    {
      title: 'Models',
      icon: this.icon(smartToyIcon),
      iconFill: this.icon(smartToyFillIcon),
      items: [{ title: 'Genesis' }, { title: 'Explorer' }, { title: 'Quantum' }],
    },
    {
      title: 'Documentation',
      icon: this.icon(menuBookIcon),
      iconFill: this.icon(menuBookFillIcon),
      items: [{ title: 'Introduction' }, { title: 'Get Started' }, { title: 'Tutorials' }, { title: 'Changelog' }],
    },
    {
      title: 'Settings',
      icon: this.icon(settingsIcon),
      iconFill: this.icon(settingsFillIcon),
      items: [{ title: 'General' }, { title: 'Team' }, { title: 'Billing' }, { title: 'Limits' }],
    },
  ];

  protected readonly navSecondary: NavSecondaryItem[] = [
    { title: 'Support', icon: this.icon(supportIcon) },
    { title: 'Feedback', icon: this.icon(sendIcon) },
  ];

  protected readonly projects: ProjectItem[] = [
    { name: 'Design Engineering', icon: this.icon(cropSquareIcon) },
    { name: 'Sales & Marketing', icon: this.icon(pieChartIcon) },
    { name: 'Travel', icon: this.icon(mapIcon) },
  ];

  protected readonly user: DemoUser = {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png',
    initials: 'CN',
  };

  // Per-row open state for the Platform group's collapsible sub-menus, seeded
  // from each item's `isActive` (matches the registry's `defaultOpen={item.isActive}`).
  protected readonly mainOpen = signal<boolean[]>(this.navMain.map((item) => !!item.isActive));

  protected setMainOpen(index: number, open: boolean): void {
    this.mainOpen.update((states) => states.map((value, i) => (i === index ? open : value)));
  }
}
