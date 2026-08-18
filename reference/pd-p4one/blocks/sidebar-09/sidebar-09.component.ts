import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import archiveIcon from '@material-symbols/svg-400/rounded/archive.svg?raw';
import archiveFillIcon from '@material-symbols/svg-400/rounded/archive-fill.svg?raw';
import creditCardIcon from '@material-symbols/svg-400/rounded/credit_card.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';
import deleteFillIcon from '@material-symbols/svg-400/rounded/delete-fill.svg?raw';
import descriptionIcon from '@material-symbols/svg-400/rounded/description.svg?raw';
import descriptionFillIcon from '@material-symbols/svg-400/rounded/description-fill.svg?raw';
import inboxIcon from '@material-symbols/svg-400/rounded/inbox.svg?raw';
import inboxFillIcon from '@material-symbols/svg-400/rounded/inbox-fill.svg?raw';
import logoutIcon from '@material-symbols/svg-400/rounded/logout.svg?raw';
import notificationsIcon from '@material-symbols/svg-400/rounded/notifications.svg?raw';
import sendIcon from '@material-symbols/svg-400/rounded/send.svg?raw';
import sendFillIcon from '@material-symbols/svg-400/rounded/send-fill.svg?raw';
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
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/app/ui/sidebar';
import { Switch } from '@/app/ui/switch';
import { Tooltip, TooltipContent, TooltipContentBox, TooltipTrigger } from '@/app/ui/tooltip';

interface MailFolder {
  title: string;
  icon: SafeHtml;
  iconFill: SafeHtml;
}

interface Mail {
  name: string;
  email: string;
  subject: string;
  date: string;
  teaser: string;
}

// Decorative icons: sr-only labels/text already carry the accessible name.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');

const ALL_MAILS: Mail[] = [
  {
    name: 'William Smith',
    email: 'williamsmith@example.com',
    subject: 'Meeting Tomorrow',
    date: '09:34 AM',
    teaser:
      'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.',
  },
  {
    name: 'Alice Smith',
    email: 'alicesmith@example.com',
    subject: 'Re: Project Update',
    date: 'Yesterday',
    teaser:
      "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
  },
  {
    name: 'Bob Johnson',
    email: 'bobjohnson@example.com',
    subject: 'Weekend Plans',
    date: '2 days ago',
    teaser:
      "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
  },
  {
    name: 'Emily Davis',
    email: 'emilydavis@example.com',
    subject: 'Re: Question about Budget',
    date: '2 days ago',
    teaser:
      "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
  },
  {
    name: 'Michael Wilson',
    email: 'michaelwilson@example.com',
    subject: 'Important Announcement',
    date: '1 week ago',
    teaser:
      'Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company’s future.',
  },
  {
    name: 'Sarah Brown',
    email: 'sarahbrown@example.com',
    subject: 'Re: Feedback on Proposal',
    date: '1 week ago',
    teaser:
      "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
  },
  {
    name: 'David Lee',
    email: 'davidlee@example.com',
    subject: 'New Project Idea',
    date: '1 week ago',
    teaser:
      "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
  },
  {
    name: 'Olivia Wilson',
    email: 'oliviawilson@example.com',
    subject: 'Vacation Plans',
    date: '1 week ago',
    teaser:
      "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
  },
  {
    name: 'James Martin',
    email: 'jamesmartin@example.com',
    subject: 'Re: Conference Registration',
    date: '1 week ago',
    teaser:
      "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
  },
  {
    name: 'Sophia White',
    email: 'sophiawhite@example.com',
    subject: 'Team Dinner',
    date: '1 week ago',
    teaser:
      "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
  },
];

/**
 * Port of `@force-ui/sidebar-09` — "Collapsible nested sidebars", a
 * Gmail-style two-pane shell: a narrow icon-rail sidebar (mail folders) sits
 * directly beside a second, wider sidebar (the selected folder's mail list),
 * both inside one `[uiSidebarProvider]`, beside the usual `[uiSidebarInset]`
 * reading pane. Composed entirely from `ui/sidebar`, `ui/breadcrumb`,
 * `ui/separator`, `ui/dropdown-menu`, `ui/avatar`, `ui/switch`, `ui/label`,
 * `ui/tooltip` — no new primitives, no new tokens.
 *
 * TWO-PANE WIRING (verified against the real `app-sidebar.tsx`, not guessed):
 * the registry nests THREE `<Sidebar>`s — an outer `collapsible="icon"`
 * shell (`overflow-hidden *:data-[sidebar=sidebar]:flex-row`) wrapping two
 * inner `collapsible="none"` sidebars (the fixed-width icon rail, then a
 * `flex-1` mail-list pane). The outer shell owns the shared collapse
 * mechanic: toggling `SidebarProvider`'s `open` shrinks the outer
 * container down to icon width, and `overflow-hidden` clips the wide pane
 * out of view — the rail's own width is fixed regardless of collapse state.
 *
 * Reproduced here as: an outer `[uiSidebar] collapsible="icon"` on a plain
 * `<div>` (matches `ui/sidebar`'s own manifest usage snippet, not a `<nav>`
 * — it's a pure layout/collapse shell, not itself navigation content), with
 * a `<div class="flex h-full w-full flex-row">` wrapper around the two inner
 * `<nav uiSidebar collapsible="none">` panes. The wrapper substitutes for the
 * registry's `*:data-[sidebar=sidebar]:flex-row` trick: `ui/sidebar`'s
 * `SidebarComponent` only merges a caller's `class` input into its OWN host
 * classes, not into the internal `sidebar-container`/`sidebar-inner` divs the
 * registry targets with that selector (a real, documented primitive gap,
 * left unfixed here per the port-shadcn-block skill's composition-only
 * scope) — so getting the two nested sidebars to sit side-by-side has to
 * happen via the block's own wrapping markup instead of a class threaded
 * through the primitive. `overflow-hidden` IS reproducible directly (it only
 * needs the outer host's own classes), so it's passed straight through.
 *
 * DOCUMENTED DEVIATION — pane width: the registry's `page.tsx` overrides
 * `SidebarProvider`'s `--sidebar-width` to `350px` via inline style.
 * `SidebarProviderComponent.sidebarWidth` is a hardcoded protected field
 * (not an `input`), and since it's applied via the provider's OWN host style
 * binding, a consumer-side `style` override on the same element loses to the
 * binding, and a wrapping ancestor's CSS variable can't win over a
 * descendant's own inline declaration for the same property either — there
 * is no way to raise the pane width from a block. Sticking with the
 * default `16rem` total means the mail-list pane gets materially less room
 * than upstream (~13rem after the icon rail, vs. upstream's ~19rem). The
 * registry's fixed `w-[260px]` teaser width would overflow that narrower
 * pane, so this port uses `w-full` there instead — a robust fix regardless
 * of the exact available width, not a cosmetic swap.
 *
 * NAV-ITEM TOOLTIPS: the registry's `SidebarMenuButton` `tooltip` prop has no
 * Angular auto-wrap equivalent (`ui/sidebar`'s own documented parity gap) —
 * composed manually here with `rdxTooltipRoot`/`rdxTooltipTrigger`/
 * `rdxTooltipContent`, gated on the shared `sidebarOpen` signal so the label
 * only surfaces once the rail collapses to icon-only width (matching the
 * registry's `hidden={state !== "collapsed"}`). Same pattern as `ui/sidebar`'s
 * own `WithTooltip` story, which has the identical side effect: wrapping the
 * button in `<div rdxTooltipRoot>` breaks `SidebarMenuItem`'s `peer/menu-
 * button` sibling selector (the button is no longer a direct sibling of the
 * item's decorative accent-bar `<span>`), so the active item's left-edge
 * accent bar doesn't light up here. The primary active-state cue (background
 * tint + bold label, both driven by `data-active` on the button itself, no
 * peer relationship needed) still works — only the supplementary bar is
 * lost. Not fixed here since it's inherited from the primitive's own
 * suggested composition, not introduced by this block.
 *
 * The top "Acme Inc" brand row uses `asChild` to render an `<a>` in the
 * registry; `[uiSidebarMenuButton]`'s selector is tag-locked to `button`
 * (Angular's answer to `asChild` for the rest of this codebase is the
 * attribute-selector itself, but that requires the caller's own host tag to
 * match), so it stays a plain non-navigating `<button type="button">` here,
 * same as the upstream demo's own `href="#"` (a dead link either way).
 *
 * Nav-user avatar dropdown follows the already-solved pattern from this
 * porting batch (radix-ng dropdown-menu content + `injectIsMobile()` for
 * side placement) — a multi-action menu, so plain `rdxDropdownMenuItem`s,
 * not the radio-group pattern.
 *
 * No `SidebarGroupLabel` anywhere (registry-verbatim — both the rail's and
 * the mail-list's `SidebarGroup` go straight to `SidebarGroupContent`, no
 * header text), so the mandatory unique-id/`aria-labelledby` pairing for
 * group labels doesn't apply to this block.
 */
@Component({
  selector: 'app-block-sidebar-09',
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
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    Switch,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    ...TooltipContentBox,
  ],
  template: `
    <div uiSidebarProvider class="h-screen overflow-hidden" [(open)]="sidebarOpen">
      <a
        href="#sidebar-09-main"
        class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >Skip to main content</a
      >

      <div uiSidebar collapsible="icon" class="overflow-hidden">
        <div class="flex h-full w-full flex-row">
          <!-- Icon rail: fixed width, never itself collapses. -->
          <nav
            uiSidebar
            collapsible="none"
            class="w-[calc(var(--sidebar-width-icon)+1px)]! border-r border-border"
            aria-label="Mail folders"
          >
            <div uiSidebarHeader class="relative z-10 border-b border-sidebar-border">
              <ul uiSidebarMenu>
                <li uiSidebarMenuItem>
                  <button uiSidebarMenuButton size="lg" type="button" class="md:h-8 md:p-0">
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
                <div uiSidebarGroupContent class="px-1.5 md:px-0">
                  <ul uiSidebarMenu>
                    <li uiSidebarMenuItem *ngFor="let folder of navMain">
                      <div rdxTooltipRoot>
                        <button
                          uiSidebarMenuButton
                          rdxTooltipTrigger
                          [isActive]="activeItem().title === folder.title"
                          class="px-2.5 md:px-2"
                          (click)="selectFolder(folder)"
                        >
                          <span
                            class="[&_svg]:size-4 [&_svg]:fill-current"
                            [innerHTML]="activeItem().title === folder.title ? folder.iconFill : folder.icon"
                          ></span>
                          <span>{{ folder.title }}</span>
                        </button>
                        <ng-template rdxTooltipContent>
                          <div rdxTooltipContentAttributes side="right" [hidden]="sidebarOpen()">
                            {{ folder.title }}
                          </div>
                        </ng-template>
                      </div>
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
                    <div rdxDropdownMenuContent class="w-56" [side]="isMobile() ? 'bottom' : 'right'" align="end" [sideOffset]="4">
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
          </nav>

          <!-- Mail list: wide pane, fills the remaining space. -->
          <nav uiSidebar collapsible="none" class="hidden flex-1 md:flex" [attr.aria-label]="activeItem().title">
            <div uiSidebarHeader class="relative z-10 gap-3.5 border-b border-border p-4">
              <div class="flex w-full items-center justify-between">
                <div class="text-base font-medium text-foreground">{{ activeItem().title }}</div>
                <label uiLabel class="flex items-center gap-2 text-sm">
                  <span>Unreads</span>
                  <button uiSwitch class="shadow-none" [(checked)]="unreadsOnly" aria-label="Show unread mail only"></button>
                </label>
              </div>
              <label uiLabel for="sidebar-09-search" class="sr-only">Search mail</label>
              <input uiSidebarInput id="sidebar-09-search" placeholder="Type to search..." />
            </div>
            <div uiSidebarContent>
              <div uiSidebarGroup class="px-0">
                <div uiSidebarGroupContent>
                  <a
                    href="javascript:void(0)"
                    *ngFor="let mail of mails()"
                    class="flex flex-col items-start gap-2 border-b border-border p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <div class="flex w-full items-center gap-2">
                      <span>{{ mail.name }}</span>
                      <span class="ml-auto text-xs">{{ mail.date }}</span>
                    </div>
                    <span class="font-medium">{{ mail.subject }}</span>
                    <span class="line-clamp-2 w-full text-xs whitespace-break-spaces">{{ mail.teaser }}</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <main uiSidebarInset id="sidebar-09-main">
        <header class="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
          <button uiSidebarTrigger class="-ml-1"></button>
          <div uiSeparator orientation="vertical" class="mr-2 h-4 self-auto!"></div>
          <nav uiBreadcrumb>
            <ol uiBreadcrumbList>
              <li uiBreadcrumbItem class="hidden md:block">
                <a uiBreadcrumbLink href="javascript:void(0)">All Inboxes</a>
              </li>
              <li uiBreadcrumbSeparator class="hidden md:block"></li>
              <li uiBreadcrumbItem>
                <span uiBreadcrumbPage>{{ activeItem().title }}</span>
              </li>
            </ol>
          </nav>
        </header>
        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div class="aspect-video h-12 w-full rounded-lg bg-muted/50" *ngFor="let row of placeholderRows"></div>
        </div>
      </main>
    </div>
  `,
})
export class Sidebar09Block {
  private readonly sanitizer = inject(DomSanitizer);

  // [innerHTML] runs through Angular's sanitizer, which strips raw <svg>
  // markup — bypassSecurityTrustHtml is required for owned, static icons
  // (same pattern as sidebar-01 / SidebarTriggerComponent).
  protected readonly terminal: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(terminalIcon));
  protected readonly unfoldMore: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(unfoldMoreIcon));
  protected readonly sparkles: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(starShineIcon));
  protected readonly badgeCheck: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(verifiedIcon));
  protected readonly creditCard: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(creditCardIcon));
  protected readonly bell: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(notificationsIcon));
  protected readonly logout: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(deco(logoutIcon));

  protected readonly navMain: MailFolder[] = [
    {
      title: 'Inbox',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(inboxIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(inboxFillIcon)),
    },
    {
      title: 'Drafts',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(descriptionIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(descriptionFillIcon)),
    },
    {
      title: 'Sent',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(sendIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(sendFillIcon)),
    },
    {
      title: 'Junk',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(archiveIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(archiveFillIcon)),
    },
    {
      title: 'Trash',
      icon: this.sanitizer.bypassSecurityTrustHtml(deco(deleteIcon)),
      iconFill: this.sanitizer.bypassSecurityTrustHtml(deco(deleteFillIcon)),
    },
  ];

  protected readonly user = {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png',
    initials: 'SC',
  };

  protected readonly isMobile = injectIsMobile();

  /** Desktop expanded/collapsed state, shared with the outer icon-rail shell. */
  protected readonly sidebarOpen = signal(true);
  protected readonly unreadsOnly = signal(false);

  protected readonly activeItem = signal<MailFolder>(this.navMain[0]);
  protected readonly mails = signal<Mail[]>(ALL_MAILS);

  protected readonly placeholderRows: readonly number[] = Array.from({ length: 24 }, (_, i) => i);

  /**
   * Selecting a folder swaps the active item and re-samples the mail list —
   * registry-verbatim demo behavior ("IRL you should use the url/router").
   * Also re-expands the shell if it was collapsed, matching the registry's
   * `setOpen(true)` on item click so picking a folder from the icon rail
   * always reveals the mail-list pane.
   */
  protected selectFolder(folder: MailFolder): void {
    this.activeItem.set(folder);
    const shuffled = [...ALL_MAILS].sort(() => Math.random() - 0.5);
    const count = Math.max(5, Math.floor(Math.random() * 10) + 1);
    this.mails.set(shuffled.slice(0, count));
    this.sidebarOpen.set(true);
  }
}
