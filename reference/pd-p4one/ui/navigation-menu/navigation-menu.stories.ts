import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentAnchor,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './';

const NAVIGATION_MENU_IMPORTS = [
  CommonModule,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContentAnchor,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
];

interface NavigationMenuStoryArgs {
  orientation: 'horizontal' | 'vertical';
  disabledExperiments: boolean;
  showIndicator: boolean;
}

/**
 * `[uiNavigationMenu]` is the Angular port of the Force UI (radix-force-ui)
 * navigation menu, built on `@radix-ng/primitives/navigation-menu`. Each
 * top-level trigger opens a shared, cross-fading viewport panel — reach for
 * this over a plain dropdown-menu when several top-level entries each need
 * their own panel of links (a marketing-style top nav), not for a single
 * one-off action list.
 *
 * Content-panel link grids below use plain `<div>` wrappers, not `<ul>`/`<li>`:
 * the panel carries `role="menu"` (set by radix-ng), which requires
 * `menuitem`-rooted owned elements — a `<li>`'s implicit `listitem` role
 * would sit between `menu` and `menuitem` and break that chain (confirmed via
 * axe), where a plain `<div>` is accessibility-tree-transparent.
 *
 * PARITY GAPS (see `index.ts`): `viewport=false` (inline, non-portalled
 * content) has no working code path in `@radix-ng/primitives` — a
 * `[uiNavigationMenuViewport]` is effectively required; entrance/exit slide
 * motion is replaced with a fade+zoom (radix-ng puts the animation-driving
 * attributes on an internal wrapper this port can't style); the active-trigger
 * indicator doesn't slide (radix-ng position math breaks under the registry's
 * own `position: relative` item wrapper).
 */
const meta: Meta<NavigationMenuStoryArgs> = {
  title: 'UI/NavigationMenu',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: NAVIGATION_MENU_IMPORTS })],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Arrow-key navigation axis',
    },
    disabledExperiments: {
      control: 'boolean',
      description: 'Disable the "Experiments" trigger (kept out of keyboard navigation)',
    },
    showIndicator: {
      control: 'boolean',
      description: 'Show the caret that tracks the open trigger',
    },
  },
  args: {
    orientation: 'horizontal',
    disabledExperiments: false,
    showIndicator: true,
  },
};

export default meta;
type Story = StoryObj<NavigationMenuStoryArgs>;

/** Args-driven playground — flip `orientation`, `disabledExperiments`, `showIndicator` in the Controls panel. */
export const Playground: Story = {
  render: (args) => ({
    props: { ...args, navigationMenuTriggerStyle },
    template: `
      <nav uiNavigationMenu [orientation]="orientation">
        <ul uiNavigationMenuList>
          <li uiNavigationMenuItem value="experiments">
            <button uiNavigationMenuTrigger [disabled]="disabledExperiments">Experiments</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-72 gap-1">
                  <a uiNavigationMenuLink href="#">
                    <div>
                      <div class="text-sm font-medium">Start an experiment</div>
                      <div class="text-xs text-muted-foreground">Try changes in an isolated sandbox.</div>
                    </div>
                  </a>
                  <a uiNavigationMenuLink href="#">
                    <div>
                      <div class="text-sm font-medium">Compare versions</div>
                      <div class="text-xs text-muted-foreground">See what changed between two versions.</div>
                    </div>
                  </a>
                </div>
              </div>
            </ng-template>
          </li>
          <li uiNavigationMenuItem value="shelves">
            <button uiNavigationMenuTrigger>Shelves</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-64 gap-1">
                  <a uiNavigationMenuLink href="#">
                    <div class="text-sm font-medium">Save for later</div>
                  </a>
                  <a uiNavigationMenuLink href="#">
                    <div class="text-sm font-medium">Share for feedback</div>
                  </a>
                </div>
              </div>
            </ng-template>
          </li>
          <li uiNavigationMenuItem>
            <a uiNavigationMenuLink [class]="navigationMenuTriggerStyle" href="#">Search</a>
          </li>
          <div *ngIf="showIndicator" uiNavigationMenuIndicator></div>
        </ul>
        <div uiNavigationMenuViewport></div>
      </nav>
    `,
  }),
};

/** Canonical two-menu nav with link-card panels — the shape most consumers reach for. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiNavigationMenu>
        <ul uiNavigationMenuList>
          <li uiNavigationMenuItem value="experiments">
            <button uiNavigationMenuTrigger>Experiments</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-72 gap-1">
                  <a uiNavigationMenuLink href="#">
                    <div>
                      <div class="text-sm font-medium">Start an experiment</div>
                      <div class="text-xs text-muted-foreground">Try changes in an isolated sandbox.</div>
                    </div>
                  </a>
                  <a uiNavigationMenuLink href="#">
                    <div>
                      <div class="text-sm font-medium">Compare versions</div>
                      <div class="text-xs text-muted-foreground">See what changed between two versions.</div>
                    </div>
                  </a>
                </div>
              </div>
            </ng-template>
          </li>
          <li uiNavigationMenuItem value="shelves">
            <button uiNavigationMenuTrigger>Shelves</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-64 gap-1">
                  <a uiNavigationMenuLink href="#">
                    <div class="text-sm font-medium">Save for later</div>
                  </a>
                  <a uiNavigationMenuLink href="#">
                    <div class="text-sm font-medium">Share for feedback</div>
                  </a>
                </div>
              </div>
            </ng-template>
          </li>
        </ul>
        <div uiNavigationMenuViewport></div>
      </nav>
    `,
  }),
};

/** A disabled trigger cannot be opened and is skipped by arrow-key roving focus. */
export const DisabledTrigger: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiNavigationMenu>
        <ul uiNavigationMenuList>
          <li uiNavigationMenuItem value="experiments">
            <button uiNavigationMenuTrigger>Experiments</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-64 gap-1">
                  <a uiNavigationMenuLink href="#"><div class="text-sm font-medium">Start an experiment</div></a>
                </div>
              </div>
            </ng-template>
          </li>
          <li uiNavigationMenuItem value="shelves">
            <button uiNavigationMenuTrigger disabled>Shelves</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-64 gap-1">
                  <a uiNavigationMenuLink href="#"><div class="text-sm font-medium">Save for later</div></a>
                </div>
              </div>
            </ng-template>
          </li>
        </ul>
        <div uiNavigationMenuViewport></div>
      </nav>
    `,
  }),
};

/** A plain top-level link (no dropdown) styled to match the triggers via `navigationMenuTriggerStyle`. */
export const PlainLink: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { navigationMenuTriggerStyle },
    template: `
      <nav uiNavigationMenu>
        <ul uiNavigationMenuList>
          <li uiNavigationMenuItem value="experiments">
            <button uiNavigationMenuTrigger>Experiments</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-64 gap-1">
                  <a uiNavigationMenuLink href="#"><div class="text-sm font-medium">Start an experiment</div></a>
                </div>
              </div>
            </ng-template>
          </li>
          <li uiNavigationMenuItem>
            <a uiNavigationMenuLink [class]="navigationMenuTriggerStyle" href="#">Search</a>
          </li>
        </ul>
        <div uiNavigationMenuViewport></div>
      </nav>
    `,
  }),
};

/** Vertical orientation — arrow-key navigation runs up/down instead of left/right. */
export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiNavigationMenu orientation="vertical" class="max-w-max">
        <ul uiNavigationMenuList class="flex-col items-start">
          <li uiNavigationMenuItem value="experiments">
            <button uiNavigationMenuTrigger>Experiments</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-64 gap-1">
                  <a uiNavigationMenuLink href="#"><div class="text-sm font-medium">Start an experiment</div></a>
                </div>
              </div>
            </ng-template>
          </li>
          <li uiNavigationMenuItem value="shelves">
            <button uiNavigationMenuTrigger>Shelves</button>
            <ng-template uiNavigationMenuContent>
              <div uiNavigationMenuContent>
                <div class="grid w-64 gap-1">
                  <a uiNavigationMenuLink href="#"><div class="text-sm font-medium">Save for later</div></a>
                </div>
              </div>
            </ng-template>
          </li>
        </ul>
        <div uiNavigationMenuViewport></div>
      </nav>
    `,
  }),
};

/** Side-by-side review of the common compositions. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col items-start gap-10">
        <nav uiNavigationMenu>
          <ul uiNavigationMenuList>
            <li uiNavigationMenuItem value="experiments">
              <button uiNavigationMenuTrigger>Experiments</button>
              <ng-template uiNavigationMenuContent>
                <div uiNavigationMenuContent>
                  <div class="grid w-72 gap-1">
                    <a uiNavigationMenuLink href="#"><div><div class="text-sm font-medium">Start an experiment</div><div class="text-xs text-muted-foreground">Try changes in an isolated sandbox.</div></div></a>
                    <a uiNavigationMenuLink href="#"><div><div class="text-sm font-medium">Compare versions</div><div class="text-xs text-muted-foreground">See what changed between two versions.</div></div></a>
                  </div>
                </div>
              </ng-template>
            </li>
            <li uiNavigationMenuItem value="shelves">
              <button uiNavigationMenuTrigger>Shelves</button>
              <ng-template uiNavigationMenuContent>
                <div uiNavigationMenuContent>
                  <div class="grid w-64 gap-1">
                    <a uiNavigationMenuLink href="#"><div class="text-sm font-medium">Save for later</div></a>
                    <a uiNavigationMenuLink href="#"><div class="text-sm font-medium">Share for feedback</div></a>
                  </div>
                </div>
              </ng-template>
            </li>
            <li uiNavigationMenuItem>
              <a uiNavigationMenuLink [class]="navigationMenuTriggerStyle" href="#">Search</a>
            </li>
            <div uiNavigationMenuIndicator></div>
          </ul>
          <div uiNavigationMenuViewport></div>
        </nav>
      </div>
    `,
    props: { navigationMenuTriggerStyle },
  }),
};
