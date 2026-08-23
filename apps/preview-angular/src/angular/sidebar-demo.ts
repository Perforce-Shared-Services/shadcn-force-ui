import { Component, computed, inject, signal } from "@angular/core"

import { Avatar, AvatarFallback, AvatarImage } from "@/angular-ui/avatar"
import {
  CollapsibleContent,
  Collapsible,
  CollapsibleTrigger,
} from "@/angular-ui/collapsible"
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-demo.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const GALLERY_VERTICAL_END = svg("M223-80q-20 0-33.5-14T176-128v-704q0-19 13.5-33t33.5-14h314l253 253v498q0 20-14 33.5T736-80H223Zm30-505h200v-200L253-585ZM480-267q42 0 71-29t29-71v-173h-40v173q0 25-17.5 42.5T480-302q-25 0-42.5-17.5T420-362v-193q0-11 7-18.5t18-7.5q11 0 18.5 7.5T471-555v173h40V555q0-27-18.5-46.5T445-489q-27 0-46 18.5T380-424v162q0 42 29 71t71 29Z")
const AUDIO_WAVEFORM = svg("M120-400v-160h60v160h-60Zm165 115v-390h60v390h-60Zm165 125v-640h60v640h-60Zm165-125v-390h60v390h-60Zm165 65v-520h60v520h-60Z")
const COMMAND_ICON = svg("M340-120q-51 0-85.5-34.5T220-240H120v-60h100v-80H120v-60h100v-80H120v-60h100v-40q0-54 38-92t92-38q54 0 91 37.5t38 90.5h62q1-53 38-90.5T670-800q54 0 92 38t38 92v40h90v60h-90v80h90v60h-90v80h90v60H800q0 51-35.5 85.5T678-110q-50 0-84-34.5T560-230h-62q-1 51-37.5 80.5T340-110Zm-60-130h120v-500H280v500Zm260 0h120v-500H540v500Z")
const BOT_ICON = svg("M240-80q-50 0-85-35t-35-85v-360q0-50 35-85t85-35h320v-80h40v80h120q50 0 85 35t35 85v360q0 50-35 85t-85 35H240Zm-40-140h560v-280H200v280Zm180-40q-25 0-42.5-17.5T360-320q0-25 17.5-42.5T420-380q25 0 42.5 17.5T480-320q0 25-17.5 42.5T420-260Zm160 0q-25 0-42.5-17.5T520-320q0-25 17.5-42.5T580-380q25 0 42.5 17.5T640-320q0 25-17.5 42.5T580-260Z")
const SQUARE_TERMINAL = svg("M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-60-42-42 78-78-78-78 42-42 120 120-120 120Zm180 0v-60h200v60H480Z")
const BOOK_OPEN = svg("M300-240q55 0 105 16t95 47v-479q-43-32-94.5-48T300-720q-41 0-76 9.5T160-684v482q32-19 67-28.5t73-9.5Zm160 63q45-31 95-47t105-16q38 0 73 9.5t67 28.5v-482q-29-17-64-26.5T660-720q-54 0-105.5 16T460-656v479Zm-20 77q-48-38-104-59T300-240q-42 0-83 10t-77 30q-21 11-40.5-1T80-238v-482q0-12 6-23t17-17q46-24 96-36.5T300-808q57 0 111 15.5T520-748q55-29 109-44.5T740-808q50 0 99 12t95 36q11 6 18 17t7 23v482q0 25-19.5 37t-39.5 1q-36-20-77-30t-83-10q-80 0-136 21t-104 59Z")
const SETTINGS_2 = svg("M400-120q-33 0-56.5-23.5T320-200v-40q-88-14-144-82t-56-158q0-100 70-170t170-70q90 0 158 56t82 144h150l-72-72 56-56 168 168-168 168-56-56 72-72H640q-14-66-66-108t-114-42q-75 0-127.5 52.5T280-520q0 62 42 114t108 66v220Z")
const FRAME = svg("M120-120v-320h80v240h240v80H120Zm400 0v-80h240v-240h80v320H520ZM120-520v-320h320v80H200v240h-80Zm640 0v-240H520v-80h320v320h-80Z")
const PIE_CHART = svg("M440-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T80-440h360v360Zm80 0v-360h360q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T520-80ZM80-520q0-75 28.5-140.5t77-114q48.5-48.5 114-77T440-880v360H80Zm440 0v-360q75 0 140.5 28.5t114 77q48.5 48.5 77 114T880-520H520Z")
const MAP = svg("m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l192-64 240 84 186-72q20-8 37 4.5t17 32.5v560q0 13-7.5 23T792-184l-192 64Zm-20-98v-468l-200-68v468l200 68Z")
const LIFE_BUOY = svg("M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM363-517 217-663q-26 40-41.5 86T160-480q0 54 15.5 100t41.5 86l146-143Zm117-43q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0 160q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-80q-21 0-35.5-14.5T430-520q0-21 14.5-35.5T480-570q21 0 35.5 14.5T530-520q0 21-14.5 35.5T480-480Zm0 320q54 0 100-15.5t86-41.5L520-363q-19-9-40-9t-40 9L294-217q40 26 86 41.5T480-160Zm117-357 146 143q26-40 41.5-86T800-480q0-54-15.5-100T743-663L597-517Z")
const SEND = svg("M120-160v-240l320-80-320-80v-240l720 320-720 320Z")
const MORE_HORIZONTAL = svg("M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z")
const FOLDER = svg("M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z")
const FORWARD = svg("m480-120-42-43 205-205H160v-60h483L438-733l42-43 280 280-280 280Z")
const TRASH_2 = svg("M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h160v-40h200v40h160v80h-40v520q0 33-23.5 56.5T560-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z")
const PLUS = svg("M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z")
const BADGE_CHECK = svg("m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm48-210 210-210-56-56-154 154-74-74-56 58 130 128Z")
const BELL = svg("M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z")
const CREDIT_CARD = svg("M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-160H160v160Z")
const LOG_OUT = svg("M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v80H200v560h240v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z")
const SPARKLES = svg("M480-80 398-272 200-360l198-88 82-192 82 192 198 88-198 88-82 192ZM200-600l-42-98-98-42 98-42 42-98 42 98 98 42-98 42-42 98Zm560 40-32-72-72-32 72-32 32-72 32 72 72 32-72 32-32 72Z")
const CHEVRONS_UP_DOWN = svg("M480-262 280-462l42-42 158 158 158-158 42 42-200 200Zm0-240L280-702l42-42 158 158 158-158 42 42-200 200Z")
const CHEVRON_RIGHT = svg("m384-240 168-240-168-240h96l168 240-168 240h-96Z")
const CHEVRON_UP = svg("m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z")

interface Team {
  name: string
  logo: string
  plan: string
}
interface NavMainItem {
  title: string
  url: string
  icon?: string
  isActive?: boolean
  items?: { title: string; url: string }[]
}

// This is sample data.
const data = {
  user: { name: "shadcn", email: "m@example.com", avatar: "/avatars/shadcn.jpg" },
  teams: [
    { name: "Acme Inc", logo: GALLERY_VERTICAL_END, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AUDIO_WAVEFORM, plan: "Startup" },
    { name: "Evil Corp.", logo: COMMAND_ICON, plan: "Free" },
  ] as Team[],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SQUARE_TERMINAL,
      isActive: true,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: BOT_ICON,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BOOK_OPEN,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: SETTINGS_2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ] as NavMainItem[],
  projects: [
    { name: "Design Engineering", url: "#", icon: FRAME },
    { name: "Sales & Marketing", url: "#", icon: PIE_CHART },
    { name: "Travel", url: "#", icon: MAP },
  ] as { name: string; url: string; icon: string }[],
}

@Component({
  selector: "preview-sidebar-demo",
  standalone: true,
  imports: [
    Avatar, AvatarImage, AvatarFallback,
    Collapsible, CollapsibleTrigger, CollapsibleContent,
    DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuLabel, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuSeparator,
    SidebarProvider, Sidebar, SidebarHeader, SidebarContent,
    SidebarFooter, SidebarGroup, SidebarGroupLabel,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarMenuAction, SidebarMenuSub, SidebarMenuSubItem,
    SidebarMenuSubButton, SidebarRail, SidebarTrigger,
    SidebarInset,
  ],
  template: `
    <div class="flex h-[420px] w-full overflow-hidden rounded-lg border border-border">
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar collapsible="icon">
          <div uiSidebarHeader>
            <!-- TeamSwitcher -->
            <ul uiSidebarMenu>
              <li uiSidebarMenuItem>
                <div uiDropdownMenuRoot>
                  <button
                    uiDropdownMenuTrigger
                    uiSidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <span
                      class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&>svg]:size-4"
                      [innerHTML]="activeTeam().logo"
                    ></span>
                    <span class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-medium">{{ activeTeam().name }}</span>
                      <span class="truncate text-xs">{{ activeTeam().plan }}</span>
                    </span>
                    <span class="ml-auto [&>svg]:fill-current" [innerHTML]="CHEVRONS_UP_DOWN"></span>
                  </button>
                  <div
                    uiDropdownMenuContent
                    class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  >
                    <div uiDropdownMenuGroup>
                      <div uiDropdownMenuLabel class="text-xs text-muted-foreground">Teams</div>
                      @for (team of teams(); track team.name; let i = $index) {
                        <button uiDropdownMenuItem (click)="setActiveTeam(team)" class="gap-2 p-2">
                          <span class="flex size-6 items-center justify-center rounded-md border [&>svg]:shrink-0 [&>svg]:size-3.5" [innerHTML]="team.logo"></span>
                          {{ team.name }}
                          <span uiDropdownMenuShortcut>&#8984;{{ i + 1 }}</span>
                        </button>
                      }
                    </div>
                    <div uiDropdownMenuSeparator></div>
                    <div uiDropdownMenuGroup>
                      <button uiDropdownMenuItem class="gap-2 p-2">
                        <span class="flex size-6 items-center justify-center rounded-md border bg-transparent [&>svg]:size-4" [innerHTML]="PLUS"></span>
                        <span class="font-medium text-muted-foreground">Add team</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div uiSidebarContent>
            <!-- NavMain -->
            <div uiSidebarGroup>
              <div uiSidebarGroupLabel>Platform</div>
              <ul uiSidebarMenu>
                @for (item of navMain(); track item.title) {
                  <li uiSidebarMenuItem>
                    <div uiCollapsible [open]="!!item.isActive" class="group/collapsible contents">
                      <button
                        uiCollapsibleTrigger
                        uiSidebarMenuButton
                        [tooltip]="item.title"
                      >
                        @if (item.icon) {
                          <span [innerHTML]="item.icon"></span>
                        }
                        <span>{{ item.title }}</span>
                        <span class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 [&>svg]:fill-current" [innerHTML]="CHEVRON_RIGHT"></span>
                      </button>
                      <div uiCollapsibleContent class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none">
                        <ul uiSidebarMenuSub>
                          @for (subItem of item.items ?? []; track subItem.title) {
                            <li uiSidebarMenuSubItem>
                              <a uiSidebarMenuSubButton [href]="subItem.url">
                                <span>{{ subItem.title }}</span>
                              </a>
                            </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </li>
                }
              </ul>
            </div>

            <!-- NavProjects -->
            <div uiSidebarGroup class="group-data-[collapsible=icon]:hidden">
              <div uiSidebarGroupLabel>Projects</div>
              <ul uiSidebarMenu>
                @for (project of projects(); track project.name) {
                  <li uiSidebarMenuItem>
                    <a uiSidebarMenuButton [href]="project.url">
                      <span [innerHTML]="project.icon"></span>
                      <span>{{ project.name }}</span>
                    </a>
                    <div uiDropdownMenuRoot>
                      <button uiDropdownMenuTrigger uiSidebarMenuAction showOnHover>
                        <span [innerHTML]="MORE_HORIZONTAL"></span>
                        <span class="sr-only">More</span>
                      </button>
                      <div uiDropdownMenuContent class="w-48 rounded-lg">
                        <button uiDropdownMenuItem>
                          <span class="text-muted-foreground [&>svg]:size-4" [innerHTML]="FOLDER"></span>
                          <span>View Project</span>
                        </button>
                        <button uiDropdownMenuItem>
                          <span class="text-muted-foreground [&>svg]:size-4" [innerHTML]="FORWARD"></span>
                          <span>Share Project</span>
                        </button>
                        <div uiDropdownMenuSeparator></div>
                        <button uiDropdownMenuItem>
                          <span class="[&>svg]:size-4" [innerHTML]="TRASH"></span>
                          <span>Delete Project</span>
                        </button>
                      </div>
                    </div>
                  </li>
                }
                <li uiSidebarMenuItem>
                  <button uiSidebarMenuButton class="text-sidebar-foreground/70">
                    <span class="text-sidebar-foreground/70" [innerHTML]="MORE_HORIZONTAL"></span>
                    <span>More</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div uiSidebarFooter>
            <!-- NavUser -->
            <ul uiSidebarMenu>
              <li uiSidebarMenuItem>
                <div uiDropdownMenuRoot>
                  <button
                    uiDropdownMenuTrigger
                    uiSidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <span uiAvatar class="h-8 w-8 rounded-lg">
                      <img uiAvatarImage [src]="user().avatar" [alt]="user().name" />
                      <span uiAvatarFallback class="rounded-lg">CN</span>
                    </span>
                    <span class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-medium">{{ user().name }}</span>
                      <span class="truncate text-xs">{{ user().email }}</span>
                    </span>
                    <span class="ml-auto size-4 [&>svg]:fill-current" [innerHTML]="CHEVRONS_UP_DOWN"></span>
                  </button>
                  <div
                    uiDropdownMenuContent
                    class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  >
                    <div uiDropdownMenuGroup>
                      <div uiDropdownMenuLabel class="p-0 font-normal">
                        <span class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                          <span uiAvatar class="h-8 w-8 rounded-lg">
                            <img uiAvatarImage [src]="user().avatar" [alt]="user().name" />
                            <span uiAvatarFallback class="rounded-lg">CN</span>
                          </span>
                          <span class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-medium">{{ user().name }}</span>
                            <span class="truncate text-xs">{{ user().email }}</span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div uiDropdownMenuSeparator></div>
                    <div uiDropdownMenuGroup>
                      <button uiDropdownMenuItem><span [innerHTML]="SPARKLES"></span>Upgrade to Pro</button>
                    </div>
                    <div uiDropdownMenuSeparator></div>
                    <div uiDropdownMenuGroup>
                      <button uiDropdownMenuItem><span [innerHTML]="BADGE_CHECK"></span>Account</button>
                      <button uiDropdownMenuItem><span [innerHTML]="CREDIT_CARD"></span>Billing</button>
                      <button uiDropdownMenuItem><span [innerHTML]="BELL"></span>Notifications</button>
                    </div>
                    <div uiDropdownMenuSeparator></div>
                    <div uiDropdownMenuGroup>
                      <button uiDropdownMenuItem><span [innerHTML]="LOG_OUT"></span>Log out</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <button uiSidebarRail></button>
        </nav>

        <main uiSidebarInset>
          <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div class="flex items-center gap-2 px-4">
              <button uiSidebarTrigger class="-ml-1"></button>
            </div>
          </header>
        </main>
      </div>
    </div>
  `,
})
export default class SidebarDemoComponent {
  protected readonly CHEVRONS_UP_DOWN = CHEVRONS_UP_DOWN
  protected readonly CHEVRON_RIGHT = CHEVRON_RIGHT
  protected readonly PLUS = PLUS
  protected readonly MORE_HORIZONTAL = MORE_HORIZONTAL
  protected readonly FOLDER = FOLDER
  protected readonly FORWARD = FORWARD
  protected readonly TRASH = TRASH_2
  protected readonly SPARKLES = SPARKLES
  protected readonly BADGE_CHECK = BADGE_CHECK
  protected readonly CREDIT_CARD = CREDIT_CARD
  protected readonly BELL = BELL
  protected readonly LOG_OUT = LOG_OUT

  private readonly activeIndex = signal(0)
  protected readonly teams = computed(() => data.teams)
  protected readonly activeTeam = computed(() => data.teams[this.activeIndex()])
  protected readonly navMain = computed(() => data.navMain)
  protected readonly projects = computed(() => data.projects)
  protected readonly user = computed(() => data.user)

  protected setActiveTeam(team: Team): void {
    this.activeIndex.set(this.teams().indexOf(team))
  }
}
