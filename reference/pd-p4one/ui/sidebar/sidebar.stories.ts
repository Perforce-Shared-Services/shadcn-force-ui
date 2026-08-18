import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import homeFillIcon from '@material-symbols/svg-400/rounded/home-fill.svg?raw';
import folderIcon from '@material-symbols/svg-400/rounded/folder_open.svg?raw';
import descriptionIcon from '@material-symbols/svg-400/rounded/description.svg?raw';
import settingsIcon from '@material-symbols/svg-400/rounded/settings.svg?raw';
import searchIcon from '@material-symbols/svg-400/rounded/search.svg?raw';
import chevronRightIcon from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import addIcon from '@material-symbols/svg-400/rounded/add.svg?raw';
import moreHorizIcon from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';
import personIcon from '@material-symbols/svg-400/rounded/person.svg?raw';

import { Button } from '../button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible';
import { Tooltip, TooltipContent, TooltipContentBox, TooltipTrigger } from '../tooltip';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  type SidebarCollapsible,
  type SidebarSide,
  type SidebarVariant,
} from './';

// Demo icons are interpolated into the template literal with `${}` so they
// compile as static template HTML (real direct-child `<svg>`, per skill §9) —
// binding raw SVG via `[innerHTML]` would be stripped by Angular's sanitizer.
// Nav-item icons are decorative (the item's text is its accessible name).
//
// Active-item icon = the FILL cut (`<name>-fill.svg`), not outline (maintainer's
// call, 2026-07-03) — SidebarMenuButton doesn't own icons (content-projected,
// same pattern as ui/button: no per-variant icon input), so the outline/fill
// swap is the CONSUMER's job. Since there's no `isActive` input change here (the
// demo hardcodes `[isActive]="true"`), this just picks the fill import directly;
// a real consumer with a dynamic active route would gate it with `*ngIf`/
// `*ngSwitch` on their own active-state boolean (same static-template-plus-
// conditional pattern used elsewhere in this file, e.g. the chevron rotation).
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');
const homeFill = deco(homeFillIcon);
const folder = deco(folderIcon);
const description = deco(descriptionIcon);
const settings = deco(settingsIcon);
const search = deco(searchIcon);
const chevronRight = deco(chevronRightIcon);
const add = deco(addIcon);
const moreHoriz = deco(moreHorizIcon);
const person = deco(personIcon);

const SIDEBAR_IMPORTS = [
  CommonModule,
  Button,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  ...TooltipContentBox,
];

interface SidebarStoryArgs {
  variant: SidebarVariant;
  side: SidebarSide;
  collapsible: SidebarCollapsible;
  defaultOpen: boolean;
}

/**
 * `SidebarProvider`/`Sidebar` and their parts are the Angular port of the
 * Force UI (radix-force-ui) sidebar — a hand-built compound primitive (no
 * `@radix-ng/primitives/sidebar` exists), composed from `ui/button`,
 * `ui/separator`, `ui/sheet`, `ui/tooltip`, `ui/input`, and `ui/skeleton`.
 *
 * Wrap the whole app-shell region in `[uiSidebarProvider]` (owns the shared
 * open/collapsed/mobile state — every part below reads it via
 * `injectSidebar()`), then `[uiSidebar]` for the panel itself and
 * `[uiSidebarInset]` for the content area beside it. `collapsible` controls
 * how it collapses: `offcanvas` (default, slides fully off-screen), `icon`
 * (shrinks to an icon rail), or `none` (a fixed panel with no collapse — for
 * PERMANENT navigation, not the responsive shell case).
 *
 * On a narrow viewport (< 768px) the sidebar automatically becomes an
 * off-canvas Sheet, opened via `[uiSidebarTrigger]` — resize the preview
 * below 768px to see it.
 *
 * Parity gaps (see `index.ts`'s doc comment for the full list):
 * `SidebarMenuButton`'s collapsed-mode tooltip has no directive-only
 * auto-wrap (compose `rdxTooltipRoot` manually — see `WithTooltip`); the
 * mobile Sheet opens imperatively rather than as a static child.
 */
const meta: Meta<SidebarStoryArgs> = {
  title: 'UI/Sidebar',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: SIDEBAR_IMPORTS }),
  ],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['sidebar', 'floating', 'inset'],
      description: 'Panel treatment — a flush edge panel, a floating rounded card, or an inset content area.',
      table: { defaultValue: { summary: 'sidebar' } },
    },
    side: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Which edge the sidebar docks to.',
      table: { defaultValue: { summary: 'left' } },
    },
    collapsible: {
      control: 'inline-radio',
      options: ['offcanvas', 'icon', 'none'],
      description: 'How the sidebar collapses on desktop.',
      table: { defaultValue: { summary: 'offcanvas' } },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Desktop expanded/collapsed state on first render.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    variant: 'sidebar',
    side: 'left',
    collapsible: 'offcanvas',
    defaultOpen: true,
  },
  render: (args) => ({
    props: { ...args, groupOpen: true },
    template: `
      <div class="h-[600px] overflow-hidden rounded-lg border border-border">
        <div uiSidebarProvider [open]="defaultOpen" class="h-full">
          <div uiSidebar [variant]="variant" [side]="side" [collapsible]="collapsible">
            <div uiSidebarHeader>
              <div class="flex items-center gap-2 px-2 py-1">
                <span class="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-semibold">P4</span>
                <span class="truncate text-sm font-medium text-sidebar-foreground group-data-[collapsible=icon]:hidden">P4 One</span>
              </div>
              <input uiSidebarInput type="search" name="sidebar-search" placeholder="Search" aria-label="Search" />
            </div>

            <div uiSidebarContent>
              <div uiSidebarGroup>
                <div uiSidebarGroupLabel>Workspace</div>
                <ul uiSidebarMenu>
                  <li uiSidebarMenuItem>
                    <button uiSidebarMenuButton [isActive]="true">
                      ${homeFill}
                      <span>Overview</span>
                    </button>
                  </li>
                  <li uiSidebarMenuItem>
                    <div uiCollapsible [(open)]="groupOpen" class="contents">
                      <button uiSidebarMenuButton uiCollapsibleTrigger class="w-full justify-between">
                        <span class="flex items-center gap-2">${folder}<span>Versions</span></span>
                        <span class="inline-flex transition-transform motion-reduce:transition-none" [class.rotate-90]="groupOpen">${chevronRight}</span>
                      </button>
                      <div uiCollapsibleContent class="overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none">
                        <ul uiSidebarMenuSub>
                          <li uiSidebarMenuSubItem>
                            <a uiSidebarMenuSubButton [isActive]="true" href="javascript:void(0)">Local versions</a>
                          </li>
                          <li uiSidebarMenuSubItem>
                            <a uiSidebarMenuSubButton href="javascript:void(0)">Remote versions</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li uiSidebarMenuItem>
                    <button uiSidebarMenuButton>
                      ${description}
                      <span>Experiments</span>
                    </button>
                    <div uiSidebarMenuBadge>3</div>
                  </li>
                </ul>
              </div>

              <div uiSidebarSeparator></div>

              <div uiSidebarGroup>
                <div uiSidebarGroupLabel>Shared</div>
                <button uiSidebarGroupAction aria-label="Add shared item">${add}</button>
                <div uiSidebarGroupContent>
                  <ul uiSidebarMenu>
                    <li uiSidebarMenuItem>
                      <button uiSidebarMenuButton>
                        ${description}
                        <span>Shared with me</span>
                      </button>
                      <button uiSidebarMenuAction [showOnHover]="true" aria-label="More options">${moreHoriz}</button>
                    </li>
                    <li uiSidebarMenuItem>
                      <div uiSidebarMenuSkeleton [showIcon]="true"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div uiSidebarFooter>
              <ul uiSidebarMenu>
                <li uiSidebarMenuItem>
                  <button uiSidebarMenuButton>
                    ${settings}
                    <span>Settings</span>
                  </button>
                </li>
                <li uiSidebarMenuItem>
                  <button uiSidebarMenuButton>
                    ${person}
                    <span>Roman A.</span>
                  </button>
                </li>
              </ul>
            </div>
            <button uiSidebarRail aria-label="Toggle sidebar"></button>
          </div>

          <main uiSidebarInset>
            <div class="flex items-center gap-2 border-b border-border p-3">
              <button uiSidebarTrigger></button>
              <span class="text-sm font-medium">Working</span>
            </div>
            <div class="flex-1 p-6 text-sm text-muted-foreground">Main content area.</div>
          </main>
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<SidebarStoryArgs>;

export const Playground: Story = {};

/** Shrinks to a 3rem icon rail instead of sliding fully off-screen. */
export const IconCollapsible: Story = {
  args: { collapsible: 'icon', defaultOpen: false },
};

/** A fixed panel with no collapse control — permanent chrome, not a responsive shell. */
export const NonCollapsible: Story = {
  args: { collapsible: 'none' },
  parameters: { controls: { disable: true } },
};

/** Docked to the right edge. */
export const RightSide: Story = {
  args: { side: 'right' },
};

/**
 * `SidebarMenuButton`'s collapsed-mode label tooltip has no directive-only
 * auto-wrap (see the component doc comment) — compose `rdxTooltipRoot`
 * manually around the button, gated on the sidebar's own collapsed state so
 * it only shows in icon-rail mode (matching the registry's
 * `hidden={state !== "collapsed" || isMobile}`).
 */
export const WithTooltip: Story = {
  args: { collapsible: 'icon', defaultOpen: false },
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="h-[300px] overflow-hidden rounded-lg border border-border">
        <div uiSidebarProvider [open]="false" class="h-full">
          <div uiSidebar collapsible="icon">
            <div uiSidebarContent>
              <div uiSidebarGroup>
                <ul uiSidebarMenu>
                  <li uiSidebarMenuItem>
                    <div rdxTooltipRoot>
                      <button uiSidebarMenuButton [isActive]="true" rdxTooltipTrigger>
                        ${homeFill}
                        <span>Overview</span>
                      </button>
                      <ng-template rdxTooltipContent>
                        <div rdxTooltipContentAttributes side="right">Overview</div>
                      </ng-template>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <main uiSidebarInset>
            <div class="p-4 text-sm text-muted-foreground">Hover the icon for its label.</div>
          </main>
        </div>
      </div>
    `,
  }),
};

/** The three `variant` treatments side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-4">
        <div class="h-[320px] overflow-hidden rounded-lg border border-border">
          <div uiSidebarProvider [open]="true" class="h-full">
            <div uiSidebar variant="sidebar">
              <div uiSidebarContent>
                <div uiSidebarGroup>
                  <div uiSidebarGroupLabel>sidebar</div>
                  <ul uiSidebarMenu>
                    <li uiSidebarMenuItem><button uiSidebarMenuButton [isActive]="true">${homeFill}<span>Overview</span></button></li>
                    <li uiSidebarMenuItem><button uiSidebarMenuButton>${folder}<span>Versions</span></button></li>
                  </ul>
                </div>
              </div>
            </div>
            <main uiSidebarInset></main>
          </div>
        </div>

        <div class="h-[320px] overflow-hidden rounded-lg border border-border bg-sidebar">
          <div uiSidebarProvider [open]="true" class="h-full">
            <div uiSidebar variant="floating">
              <div uiSidebarContent>
                <div uiSidebarGroup>
                  <div uiSidebarGroupLabel>floating</div>
                  <ul uiSidebarMenu>
                    <li uiSidebarMenuItem><button uiSidebarMenuButton [isActive]="true">${homeFill}<span>Overview</span></button></li>
                    <li uiSidebarMenuItem><button uiSidebarMenuButton>${folder}<span>Versions</span></button></li>
                  </ul>
                </div>
              </div>
            </div>
            <main uiSidebarInset></main>
          </div>
        </div>

        <div class="h-[320px] overflow-hidden rounded-lg border border-border bg-sidebar">
          <div uiSidebarProvider [open]="true" class="h-full">
            <div uiSidebar variant="inset">
              <div uiSidebarContent>
                <div uiSidebarGroup>
                  <div uiSidebarGroupLabel>inset</div>
                  <ul uiSidebarMenu>
                    <li uiSidebarMenuItem><button uiSidebarMenuButton [isActive]="true">${homeFill}<span>Overview</span></button></li>
                    <li uiSidebarMenuItem><button uiSidebarMenuButton>${folder}<span>Versions</span></button></li>
                  </ul>
                </div>
              </div>
            </div>
            <main uiSidebarInset></main>
          </div>
        </div>
      </div>
    `,
  }),
};
