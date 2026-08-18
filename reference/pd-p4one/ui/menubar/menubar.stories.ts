import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import openIcon from '@material-symbols/svg-400/rounded/open_in_new.svg?raw';
import saveIcon from '@material-symbols/svg-400/rounded/save.svg?raw';
import editIcon from '@material-symbols/svg-400/rounded/edit.svg?raw';
import copyIcon from '@material-symbols/svg-400/rounded/content_copy.svg?raw';
import shareIcon from '@material-symbols/svg-400/rounded/ios_share.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
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
const open = deco(openIcon);
const save = deco(saveIcon);
const edit = deco(editIcon);
const copy = deco(copyIcon);
const share = deco(shareIcon);
const del = deco(deleteIcon);

const MENUBAR_IMPORTS = [
  CommonModule,
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
];

interface MenubarStoryArgs {
  showShortcuts: boolean;
  showDestructive: boolean;
  disabledItem: boolean;
}

/**
 * `[rdxMenubar]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) menubar, built on `@radix-ng/primitives/menubar` (CDK
 * MenuBar). It's the persistent, always-visible sibling of the dropdown menu:
 * one bar hosts several `[rdxMenubarTrigger]` labels (File, Edit, View, ...),
 * each opening its own dropdown panel, with left/right arrow keys roving
 * focus between triggers and Enter/Down opening the highlighted one.
 *
 * Unlike a dropdown/context-menu trigger, `[rdxMenubarTrigger]` takes its
 * panel through a separate `[menuTriggerFor]` input rather than the selector
 * attribute itself, and it carries its own visual style directly (it isn't
 * composed with `[uiButton]`).
 *
 * Reach for a menubar for a persistent top-level command surface (an app's
 * File/Edit/View bar) — not for a single one-off action list (use
 * dropdown-menu) or a right-click context action set (use context-menu).
 * Panels are `role="menu"`; items are `role="menuitem"` (or
 * `menuitemcheckbox` / `menuitemradio"`). Escape closes the open panel and
 * returns focus to its trigger.
 */
const meta: Meta<MenubarStoryArgs> = {
  title: 'UI/Menubar',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: MENUBAR_IMPORTS })],
  argTypes: {
    showShortcuts: {
      control: 'boolean',
      description: 'Show a trailing keyboard-shortcut hint on each item.',
    },
    showDestructive: {
      control: 'boolean',
      description: 'Append a separator + a destructive "Delete version" item to File.',
    },
    disabledItem: {
      control: 'boolean',
      description: 'Disable the "Share" item (kept out of keyboard navigation).',
    },
  },
  args: {
    showShortcuts: true,
    showDestructive: true,
    disabledItem: false,
  },
  render: (args) => ({
    props: { ...args, showGrid: true, showStatusBar: false, zoom: '100' },
    template: `
      <div rdxMenubar>
        <button rdxMenubarTrigger [menuTriggerFor]="fileMenu">File</button>
        <ng-template #fileMenu>
          <div rdxMenubarContent class="w-56">
            <button rdxMenubarItem>
              ${open}
              <span>Open</span>
              <span *ngIf="showShortcuts" rdxMenubarShortcut>Ctrl+O</span>
            </button>
            <button rdxMenubarItem>
              ${save}
              <span>Save</span>
              <span *ngIf="showShortcuts" rdxMenubarShortcut>Ctrl+S</span>
            </button>
            <button rdxMenubarItem [disabled]="disabledItem">
              ${share}
              <span>Share for feedback</span>
            </button>
            <ng-container *ngIf="showDestructive">
              <div rdxMenubarSeparator></div>
              <!-- In real use, wire (onSelect) to a confirmation dialog — never
                   delete straight from the menu click (Error prevention, H5). -->
              <button rdxMenubarItem variant="destructive">
                ${del}
                <span>Delete version</span>
                <span *ngIf="showShortcuts" rdxMenubarShortcut>Ctrl+Backspace</span>
              </button>
            </ng-container>
          </div>
        </ng-template>

        <button rdxMenubarTrigger [menuTriggerFor]="editMenu">Edit</button>
        <ng-template #editMenu>
          <div rdxMenubarContent class="w-48">
            <button rdxMenubarItem>${edit}<span>Rename</span></button>
            <button rdxMenubarItem>${copy}<span>Duplicate</span></button>
          </div>
        </ng-template>

        <button rdxMenubarTrigger [menuTriggerFor]="viewMenu">View</button>
        <ng-template #viewMenu>
          <div rdxMenubarContent class="w-52">
            <button rdxMenubarCheckboxItem [checked]="showGrid" (checkedChange)="showGrid = $event">Show grid</button>
            <button rdxMenubarCheckboxItem [checked]="showStatusBar" (checkedChange)="showStatusBar = $event">Show status bar</button>
            <div rdxMenubarSeparator></div>
            <div rdxMenubarLabel>Zoom</div>
            <div rdxMenubarRadioGroup>
              <button rdxMenubarRadioItem [checked]="zoom === '100'" (onValueChange)="zoom = '100'">100%</button>
              <button rdxMenubarRadioItem [checked]="zoom === '150'" (onValueChange)="zoom = '150'">150%</button>
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<MenubarStoryArgs>;

export const Playground: Story = {};

/**
 * Grouped items with section labels and a separator — for a longer panel where
 * visual grouping helps scannability.
 */
export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {},
    template: `
      <div rdxMenubar>
        <button rdxMenubarTrigger [menuTriggerFor]="fileMenu">File</button>
        <ng-template #fileMenu>
          <div rdxMenubarContent class="w-56">
            <div rdxMenubarGroup>
              <div rdxMenubarLabel>This version</div>
              <button rdxMenubarItem>${open}<span>Open</span></button>
              <button rdxMenubarItem>${edit}<span>Edit details</span></button>
              <button rdxMenubarItem>${copy}<span>Duplicate</span></button>
            </div>
            <div rdxMenubarSeparator></div>
            <div rdxMenubarGroup>
              <div rdxMenubarLabel>Share</div>
              <button rdxMenubarItem>${share}<span>Share for feedback</span></button>
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/**
 * Checkbox items toggle persistent on/off state and keep the menu open across
 * selections (`role="menuitemcheckbox"`) — the view-options pattern.
 */
export const CheckboxItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { showGrid: true, showRulers: false, showStatusBar: true },
    template: `
      <div rdxMenubar>
        <button rdxMenubarTrigger [menuTriggerFor]="viewMenu">View</button>
        <ng-template #viewMenu>
          <div rdxMenubarContent class="w-52">
            <div rdxMenubarLabel>Show</div>
            <div rdxMenubarSeparator></div>
            <button rdxMenubarCheckboxItem [checked]="showGrid" (checkedChange)="showGrid = $event">Grid</button>
            <button rdxMenubarCheckboxItem [checked]="showRulers" (checkedChange)="showRulers = $event">Rulers</button>
            <button rdxMenubarCheckboxItem [checked]="showStatusBar" (checkedChange)="showStatusBar = $event">Status bar</button>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/**
 * Radio items pick one value from a set (`role="menuitemradio"`). Unlike the
 * sibling dropdown-menu/context-menu ports, `[rdxMenubarRadioGroup]` has no
 * aggregate `value`/`(valueChange)` — each `[rdxMenubarRadioItem]` reports its
 * own `(onValueChange)`, and the consumer sets that item's `[checked]` in
 * response (documented radix-ng upstream gap, see menubar-selectable.component.ts).
 */
export const RadioItems: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { zoom: '100' },
    template: `
      <div rdxMenubar>
        <button rdxMenubarTrigger [menuTriggerFor]="viewMenu">Zoom: {{ zoom }}%</button>
        <ng-template #viewMenu>
          <div rdxMenubarContent class="w-40">
            <div rdxMenubarRadioGroup>
              <button rdxMenubarRadioItem [checked]="zoom === '75'" (onValueChange)="zoom = '75'">75%</button>
              <button rdxMenubarRadioItem [checked]="zoom === '100'" (onValueChange)="zoom = '100'">100%</button>
              <button rdxMenubarRadioItem [checked]="zoom === '150'" (onValueChange)="zoom = '150'">150%</button>
            </div>
          </div>
        </ng-template>
      </div>
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
    props: {},
    template: `
      <div rdxMenubar>
        <button rdxMenubarTrigger [menuTriggerFor]="fileMenu">File</button>
        <ng-template #fileMenu>
          <div rdxMenubarContent class="w-52">
            <div rdxMenubarLabel inset>Editing</div>
            <button rdxMenubarItem>${edit}<span>Rename</span></button>
            <button rdxMenubarItem inset>Move to folder</button>
            <button rdxMenubarItem inset>Add to experiment</button>
          </div>
        </ng-template>
      </div>
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
    props: {},
    template: `
      <div rdxMenubar>
        <button rdxMenubarTrigger [menuTriggerFor]="fileMenu">File</button>
        <ng-template #fileMenu>
          <div rdxMenubarContent class="w-56">
            <button rdxMenubarItem>${edit}<span>Edit details</span></button>
            <div rdxMenubarSeparator></div>
            <button rdxMenubarItem variant="destructive">${del}<span>Delete version</span></button>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/** Two independent bars for review of the common compositions side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {},
    template: `
      <div class="flex flex-col items-start gap-4">
        <div rdxMenubar>
          <button rdxMenubarTrigger [menuTriggerFor]="m1">File</button>
          <ng-template #m1>
            <div rdxMenubarContent class="w-52">
              <button rdxMenubarItem>${open}<span>Open</span><span rdxMenubarShortcut>Ctrl+O</span></button>
              <button rdxMenubarItem>${copy}<span>Duplicate</span></button>
              <div rdxMenubarSeparator></div>
              <button rdxMenubarItem variant="destructive">${del}<span>Delete</span></button>
            </div>
          </ng-template>

          <button rdxMenubarTrigger [menuTriggerFor]="m2">Edit</button>
          <ng-template #m2>
            <div rdxMenubarContent class="w-48">
              <button rdxMenubarItem>${edit}<span>Rename</span></button>
              <button rdxMenubarItem disabled title="Available when you reconnect">${share}<span>Share for feedback</span></button>
            </div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};
