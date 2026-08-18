import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import editIcon from '@material-symbols/svg-400/rounded/edit.svg?raw';
import copyIcon from '@material-symbols/svg-400/rounded/content_copy.svg?raw';
import shareIcon from '@material-symbols/svg-400/rounded/ios_share.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';
import gridIcon from '@material-symbols/svg-400/rounded/grid_view.svg?raw';
import listIcon from '@material-symbols/svg-400/rounded/view_list.svg?raw';
import openIcon from '@material-symbols/svg-400/rounded/open_in_new.svg?raw';

import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from './';

// Demo icons are interpolated into the template literal with `${}` so they
// compile as static template HTML (real direct-child `<svg>` under the item) —
// binding raw SVG via `[innerHTML]` would be stripped by Angular's sanitizer
// (skill §9). Component-owned icons (the checkbox/radio check) use the
// sanitizer-bypassed `[innerHTML]` path inside the component itself.
//
// Leading action icons are decorative — the menu item's text is its accessible
// name — so mark each `<svg>` `aria-hidden` + `focusable="false"` (WCAG 1.1.1).
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');
const edit = deco(editIcon);
const copy = deco(copyIcon);
const share = deco(shareIcon);
const del = deco(deleteIcon);
const grid = deco(gridIcon);
const list = deco(listIcon);
const open = deco(openIcon);

const CONTEXT_MENU_IMPORTS = [
  CommonModule,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
];

// The right-click drop zone every story reuses, so the trigger surface reads
// consistently across the set.
const ZONE =
  'flex h-36 w-72 cursor-default items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground';

interface ContextMenuStoryArgs {
  zoneLabel: string;
  showShortcuts: boolean;
  showDestructive: boolean;
  disabledItem: boolean;
}

/**
 * `[rdxContextMenuTrigger]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) context menu, built on `@radix-ng/primitives/context-menu`
 * (CDK Menu). It is the right-click sibling of the dropdown menu: the trigger is
 * any element carrying `[rdxContextMenuTrigger]="tpl"`; the menu body lives in
 * the referenced `<ng-template>` and is portaled at the cursor on right-click.
 * There is no `<ContextMenu>` root or `<ContextMenuPortal>` (the trigger owns
 * the overlay), and no `side`/`align` — a context menu always opens at the
 * pointer.
 *
 * Reach for a context menu for the actions that target the object under the
 * cursor — right-click a file row or thumbnail to get Open, Rename, Duplicate,
 * Delete. The panel is `role="menu"`; items are `role="menuitem"` (or
 * `menuitemcheckbox` / `menuitemradio`). Arrows / Home / End / typeahead
 * navigate; Escape closes and returns focus to the trigger.
 *
 * Mirror the object's primary actions, keep menus to ~8 items, separate
 * destructive actions below a separator, and open a confirmation dialog before
 * any destructive action runs — never delete straight from the menu click.
 */
const meta: Meta<ContextMenuStoryArgs> = {
  title: 'UI/ContextMenu',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: CONTEXT_MENU_IMPORTS })],
  argTypes: {
    zoneLabel: {
      control: 'text',
      description: 'Hint text shown in the right-click drop zone.',
    },
    showShortcuts: {
      control: 'boolean',
      description: 'Show a trailing keyboard-shortcut hint on each item.',
    },
    showDestructive: {
      control: 'boolean',
      description: 'Append a separator + a destructive "Delete" item.',
    },
    disabledItem: {
      control: 'boolean',
      description: 'Disable the "Share" item (kept out of keyboard navigation).',
    },
  },
  args: {
    zoneLabel: 'Right-click this file',
    showShortcuts: true,
    showDestructive: true,
    disabledItem: false,
  },
  render: (args) => ({
    props: { ...args, zone: ZONE },
    template: `
      <div [class]="zone" [rdxContextMenuTrigger]="menu">{{ zoneLabel }}</div>
      <ng-template #menu>
        <div rdxContextMenuContent class="w-56">
          <div rdxContextMenuLabel>This file</div>
          <div rdxContextMenuSeparator></div>
          <button rdxContextMenuItem>
            ${open}
            <span>Open</span>
            <span *ngIf="showShortcuts" rdxContextMenuShortcut>⌘O</span>
          </button>
          <button rdxContextMenuItem>
            ${edit}
            <span>Rename</span>
            <span *ngIf="showShortcuts" rdxContextMenuShortcut>⏎</span>
          </button>
          <button rdxContextMenuItem>
            ${copy}
            <span>Duplicate</span>
            <span *ngIf="showShortcuts" rdxContextMenuShortcut>⌘D</span>
          </button>
          <button rdxContextMenuItem [disabled]="disabledItem">
            ${share}
            <span>Share for feedback</span>
          </button>
          <ng-container *ngIf="showDestructive">
            <div rdxContextMenuSeparator></div>
            <!-- In real use, wire (onSelect) to a confirmation dialog — never
                 delete straight from the menu click (Error prevention, H5). -->
            <button rdxContextMenuItem variant="destructive">
              ${del}
              <span>Delete</span>
              <span *ngIf="showShortcuts" rdxContextMenuShortcut>⌘⌫</span>
            </button>
          </ng-container>
        </div>
      </ng-template>
    `,
  }),
};

export default meta;
type Story = StoryObj<ContextMenuStoryArgs>;

export const Playground: Story = {};

/**
 * Grouped items with section labels and a separator — for a longer menu where
 * visual grouping helps scannability.
 */
export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { zone: ZONE },
    template: `
      <div [class]="zone" [rdxContextMenuTrigger]="menu">Right-click a version</div>
      <ng-template #menu>
        <div rdxContextMenuContent class="w-56">
          <div rdxContextMenuGroup>
            <div rdxContextMenuLabel>This version</div>
            <button rdxContextMenuItem>${open}<span>Open</span></button>
            <button rdxContextMenuItem>${edit}<span>Edit details</span></button>
            <button rdxContextMenuItem>${copy}<span>Duplicate</span></button>
          </div>
          <div rdxContextMenuSeparator></div>
          <div rdxContextMenuGroup>
            <div rdxContextMenuLabel>Share</div>
            <button rdxContextMenuItem>${share}<span>Share for feedback</span></button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * Checkbox items toggle persistent on/off state and keep the menu open across
 * selections (`role="menuitemcheckbox"`) — the column-visibility pattern.
 */
export const CheckboxItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { zone: ZONE, showName: true, showSize: true, showModified: false },
    template: `
      <div [class]="zone" [rdxContextMenuTrigger]="menu">Right-click the list header</div>
      <ng-template #menu>
        <div rdxContextMenuContent class="w-52">
          <div rdxContextMenuLabel>Visible columns</div>
          <div rdxContextMenuSeparator></div>
          <button rdxContextMenuItemCheckbox [checked]="showName" (checkedChange)="showName = $event">Name</button>
          <button rdxContextMenuItemCheckbox [checked]="showSize" (checkedChange)="showSize = $event">Size</button>
          <button rdxContextMenuItemCheckbox [checked]="showModified" (checkedChange)="showModified = $event">Last modified</button>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * Radio items pick one value from a set (`role="menuitemradio"`), coordinated by
 * an enclosing radio group.
 */
export const RadioItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { zone: ZONE, view: 'grid' },
    template: `
      <div [class]="zone" [rdxContextMenuTrigger]="menu">View: {{ view }}</div>
      <ng-template #menu>
        <div rdxContextMenuContent class="w-44">
          <div rdxContextMenuLabel>Layout</div>
          <div rdxContextMenuSeparator></div>
          <div rdxContextMenuItemRadioGroup [value]="view" (valueChange)="view = $event">
            <button rdxContextMenuItemRadio value="grid">${grid}<span>Grid</span></button>
            <button rdxContextMenuItemRadio value="list">${list}<span>List</span></button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * Inset items: when some items have leading icons and others do not, set `inset`
 * on the icon-less ones (and the label) so their text aligns into the same
 * gutter.
 */
export const Inset: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { zone: ZONE },
    template: `
      <div [class]="zone" [rdxContextMenuTrigger]="menu">Right-click a file</div>
      <ng-template #menu>
        <div rdxContextMenuContent class="w-52">
          <div rdxContextMenuLabel inset>Editing</div>
          <button rdxContextMenuItem>${edit}<span>Rename</span></button>
          <button rdxContextMenuItem inset>Move to folder</button>
          <button rdxContextMenuItem inset>Add to experiment</button>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * A destructive item, separated below the constructive actions. Destructive
 * items adopt the error label/icon colour and MUST open a confirmation dialog
 * before running — the colour is on the label only, not the row background.
 */
export const Destructive: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { zone: ZONE },
    template: `
      <div [class]="zone" [rdxContextMenuTrigger]="menu">Right-click to manage</div>
      <ng-template #menu>
        <div rdxContextMenuContent class="w-56">
          <button rdxContextMenuItem>${edit}<span>Edit details</span></button>
          <div rdxContextMenuSeparator></div>
          <button rdxContextMenuItem variant="destructive">${del}<span>Delete version</span></button>
        </div>
      </ng-template>
    `,
  }),
};

/** Several drop zones for review of the common compositions side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { zone: ZONE },
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <div [class]="zone" [rdxContextMenuTrigger]="m1">File actions</div>
        <ng-template #m1>
          <div rdxContextMenuContent class="w-52">
            <button rdxContextMenuItem>${open}<span>Open</span><span rdxContextMenuShortcut>⌘O</span></button>
            <button rdxContextMenuItem>${copy}<span>Duplicate</span></button>
            <div rdxContextMenuSeparator></div>
            <button rdxContextMenuItem variant="destructive">${del}<span>Delete</span></button>
          </div>
        </ng-template>

        <div [class]="zone" [rdxContextMenuTrigger]="m2">Share actions</div>
        <ng-template #m2>
          <div rdxContextMenuContent class="w-48">
            <button rdxContextMenuItem>${share}<span>Share for feedback</span></button>
            <button rdxContextMenuItem disabled title="Available when you reconnect">${copy}<span>Copy link</span></button>
          </div>
        </ng-template>
      </div>
    `,
  }),
};
