import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu';

interface BreadcrumbStoryArgs {
  collapsed: boolean;
  customSeparator: boolean;
}

const IMPORTS = [
  CommonModule,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
];

/**
 * `[uiBreadcrumb]` is the Angular port of the Force UI (radix-force-ui)
 * breadcrumb — a presentational set of attribute-selector decorators
 * (`[uiBreadcrumb]` / `List` / `Item` / `Link` / `Page` / `Separator` /
 * `Ellipsis`). Stories render the real compound markup with P4 One paths.
 */
const meta: Meta<BreadcrumbStoryArgs> = {
  title: 'UI/Breadcrumb',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: IMPORTS })],
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: 'Collapse the middle crumbs behind an ellipsis',
    },
    customSeparator: {
      control: 'boolean',
      description: 'Use a "/" text separator instead of the default chevron',
    },
  },
  args: {
    collapsed: false,
    customSeparator: false,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbStoryArgs>;

/**
 * Args-driven playground — toggle the collapsed (ellipsis) state and the
 * separator style in the Controls panel.
 */
export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <nav uiBreadcrumb>
        <ol uiBreadcrumbList>
          <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Workspace</a></li>
          <li uiBreadcrumbSeparator><ng-container *ngIf="customSeparator">/</ng-container></li>

          <ng-container *ngIf="collapsed; else fullTrail">
            <li uiBreadcrumbItem><span uiBreadcrumbEllipsis></span></li>
            <li uiBreadcrumbSeparator><ng-container *ngIf="customSeparator">/</ng-container></li>
          </ng-container>
          <ng-template #fullTrail>
            <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Characters</a></li>
            <li uiBreadcrumbSeparator><ng-container *ngIf="customSeparator">/</ng-container></li>
          </ng-template>

          <li uiBreadcrumbItem><span uiBreadcrumbPage>hero.fbx</span></li>
        </ol>
      </nav>
    `,
  }),
};

/** Default path — chevron separators, last crumb is the current page. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiBreadcrumb>
        <ol uiBreadcrumbList>
          <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Workspace</a></li>
          <li uiBreadcrumbSeparator></li>
          <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Characters</a></li>
          <li uiBreadcrumbSeparator></li>
          <li uiBreadcrumbItem><span uiBreadcrumbPage>hero.fbx</span></li>
        </ol>
      </nav>
    `,
  }),
};

/** Collapsed — middle crumbs hidden behind an ellipsis on deep paths. */
export const Collapsed: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiBreadcrumb>
        <ol uiBreadcrumbList>
          <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Workspace</a></li>
          <li uiBreadcrumbSeparator></li>
          <li uiBreadcrumbItem><span uiBreadcrumbEllipsis></span></li>
          <li uiBreadcrumbSeparator></li>
          <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Characters</a></li>
          <li uiBreadcrumbSeparator></li>
          <li uiBreadcrumbItem><span uiBreadcrumbPage>hero.fbx</span></li>
        </ol>
      </nav>
    `,
  }),
};

/**
 * Collapsed as a dropdown — the ellipsis is the trigger of a dropdown-menu that
 * reveals the hidden middle crumbs. This is the canonical pattern: the
 * `[uiBreadcrumbEllipsis]` glyph stays presentational, and interactivity comes
 * from composing it inside a real `[rdxDropdownMenuTrigger]` button (so it is
 * keyboard-operable and focus-visible via the trigger). The button carries the
 * accessible name; the hidden crumbs become menu items.
 */
export const CollapsedDropdown: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiBreadcrumb>
        <ol uiBreadcrumbList>
          <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Workspace</a></li>
          <li uiBreadcrumbSeparator></li>
          <li uiBreadcrumbItem>
            <button
              [rdxDropdownMenuTrigger]="hidden"
              aria-label="Show hidden folders"
              class="cursor-pointer rounded-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none"
            >
              <span uiBreadcrumbEllipsis></span>
            </button>
            <ng-template #hidden>
              <div rdxDropdownMenuContent class="w-44">
                <button rdxDropdownMenuItem>Characters</button>
                <button rdxDropdownMenuItem>Hero</button>
                <button rdxDropdownMenuItem>Textures</button>
              </div>
            </ng-template>
          </li>
          <li uiBreadcrumbSeparator></li>
          <li uiBreadcrumbItem><span uiBreadcrumbPage>hero.fbx</span></li>
        </ol>
      </nav>
    `,
  }),
};

/** Custom separator — a "/" text node projected into the separator. */
export const CustomSeparator: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiBreadcrumb>
        <ol uiBreadcrumbList>
          <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Workspace</a></li>
          <li uiBreadcrumbSeparator>/</li>
          <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Characters</a></li>
          <li uiBreadcrumbSeparator>/</li>
          <li uiBreadcrumbItem><span uiBreadcrumbPage>hero.fbx</span></li>
        </ol>
      </nav>
    `,
  }),
};

/** Every state side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <nav uiBreadcrumb>
          <ol uiBreadcrumbList>
            <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Workspace</a></li>
            <li uiBreadcrumbSeparator></li>
            <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Characters</a></li>
            <li uiBreadcrumbSeparator></li>
            <li uiBreadcrumbItem><span uiBreadcrumbPage>hero.fbx</span></li>
          </ol>
        </nav>

        <nav uiBreadcrumb>
          <ol uiBreadcrumbList>
            <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Workspace</a></li>
            <li uiBreadcrumbSeparator></li>
            <li uiBreadcrumbItem><span uiBreadcrumbEllipsis></span></li>
            <li uiBreadcrumbSeparator></li>
            <li uiBreadcrumbItem><span uiBreadcrumbPage>hero.fbx</span></li>
          </ol>
        </nav>

        <nav uiBreadcrumb>
          <ol uiBreadcrumbList>
            <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Workspace</a></li>
            <li uiBreadcrumbSeparator>/</li>
            <li uiBreadcrumbItem><a uiBreadcrumbLink href="#">Characters</a></li>
            <li uiBreadcrumbSeparator>/</li>
            <li uiBreadcrumbItem><span uiBreadcrumbPage>hero.fbx</span></li>
          </ol>
        </nav>
      </div>
    `,
  }),
};
