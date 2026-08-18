import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import editIcon from '@material-symbols/svg-400/rounded/edit.svg?raw';
import copyIcon from '@material-symbols/svg-400/rounded/content_copy.svg?raw';
import shareIcon from '@material-symbols/svg-400/rounded/ios_share.svg?raw';
import deleteIcon from '@material-symbols/svg-400/rounded/delete.svg?raw';
import gridIcon from '@material-symbols/svg-400/rounded/grid_view.svg?raw';
import listIcon from '@material-symbols/svg-400/rounded/view_list.svg?raw';
import moreIcon from '@material-symbols/svg-400/rounded/more_vert.svg?raw';

import { Button } from '../button';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './';

// Demo icons are interpolated into the template literal with `${}` so they
// compile as static template HTML (real direct-child `<svg>` under the item) —
// binding raw SVG via `[innerHTML]` would be stripped by Angular's sanitizer
// (skill §9). Component-owned icons (the checkbox/radio check) use the
// sanitizer-bypassed `[innerHTML]` path inside the component itself.
//
// Leading action icons are decorative — the menu item's text is its accessible
// name — so mark each `<svg>` `aria-hidden` + `focusable="false"` (WCAG 1.1.1).
// This is the pattern engineers should copy: hide a leading icon from AT.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');
const edit = deco(editIcon);
const copy = deco(copyIcon);
const share = deco(shareIcon);
const del = deco(deleteIcon);
const grid = deco(gridIcon);
const list = deco(listIcon);
const more = deco(moreIcon);
const DROPDOWN_MENU_IMPORTS = [
  CommonModule,
  Button,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
];

interface DropdownMenuStoryArgs {
  triggerLabel: string;
  triggerVariant: 'default' | 'outline' | 'secondary' | 'ghost';
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
  showShortcuts: boolean;
  showDestructive: boolean;
  disabledItem: boolean;
}

/**
 * `[rdxDropdownMenuTrigger]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) dropdown menu, built on `@radix-ng/primitives/dropdown-menu`
 * (CDK Menu). The trigger is any `[uiButton]` carrying
 * `[rdxDropdownMenuTrigger]="tpl"`; the menu body lives in the referenced
 * `<ng-template>` and is portaled on open. There is no `<DropdownMenu>` root or
 * `<DropdownMenuPortal>` (the trigger owns the overlay).
 *
 * A dropdown menu's items execute ACTIONS (verbs: Edit, Duplicate, Delete). To
 * set a value from a list use a Select; for site navigation use a Nav. The
 * trigger gets `aria-haspopup="menu"` + `aria-expanded`; the panel is
 * `role="menu"`; items are `role="menuitem"` (or `menuitemcheckbox` /
 * `menuitemradio`). Arrows / Home / End / typeahead navigate; Escape closes and
 * returns focus to the trigger.
 *
 * Order items by frequency, keep menus to ~8 items, separate destructive actions
 * below a separator, and open a confirmation dialog before any destructive
 * action runs — never delete straight from the menu click.
 */
const meta: Meta<DropdownMenuStoryArgs> = {
  title: 'UI/DropdownMenu',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: DROPDOWN_MENU_IMPORTS })],
  argTypes: {
    triggerLabel: {
      control: 'text',
      description: 'Visible text on the trigger button.',
    },
    triggerVariant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost'],
      description: 'Button variant of the trigger (see Button).',
      table: { defaultValue: { summary: 'outline' } },
    },
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Preferred side the panel opens against the trigger.',
      table: { defaultValue: { summary: 'bottom' } },
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the panel against the trigger edge.',
      table: { defaultValue: { summary: 'start' } },
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
    triggerLabel: 'Actions',
    triggerVariant: 'outline',
    side: 'bottom',
    align: 'start',
    showShortcuts: true,
    showDestructive: true,
    disabledItem: false,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <button uiButton [variant]="triggerVariant" [rdxDropdownMenuTrigger]="menu" [side]="side" [align]="align">
        {{ triggerLabel }}
      </button>
      <ng-template #menu>
        <div rdxDropdownMenuContent class="w-56">
          <div rdxDropdownMenuLabel>This version</div>
          <div rdxDropdownMenuSeparator></div>
          <button rdxDropdownMenuItem>
            ${edit}
            <span>Edit</span>
            <span *ngIf="showShortcuts" rdxDropdownMenuShortcut>⌘E</span>
          </button>
          <button rdxDropdownMenuItem>
            ${copy}
            <span>Duplicate</span>
            <span *ngIf="showShortcuts" rdxDropdownMenuShortcut>⌘D</span>
          </button>
          <button rdxDropdownMenuItem [disabled]="disabledItem">
            ${share}
            <span>Share</span>
          </button>
          <ng-container *ngIf="showDestructive">
            <div rdxDropdownMenuSeparator></div>
            <button rdxDropdownMenuItem variant="destructive">
              ${del}
              <span>Delete</span>
              <span *ngIf="showShortcuts" rdxDropdownMenuShortcut>⌘⌫</span>
            </button>
          </ng-container>
        </div>
      </ng-template>
    `,
  }),
};

export default meta;
type Story = StoryObj<DropdownMenuStoryArgs>;

export const Playground: Story = {};

/**
 * The "More actions" pattern — an icon-only ghost trigger (three dots) that
 * reveals secondary row actions. Give an icon-only trigger an `aria-label`.
 */
export const IconTrigger: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="ghost" size="icon" aria-label="More actions for Character_Rig_v3.blend" [rdxDropdownMenuTrigger]="menu">
        ${more}
      </button>
      <ng-template #menu>
        <div rdxDropdownMenuContent class="w-48">
          <button rdxDropdownMenuItem>${edit}<span>Rename</span></button>
          <button rdxDropdownMenuItem>${copy}<span>Duplicate</span></button>
          <div rdxDropdownMenuSeparator></div>
          <button rdxDropdownMenuItem variant="destructive">${del}<span>Delete</span></button>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * Grouped items with section labels and a separator — for a longer menu where
 * visual grouping helps scannability.
 */
export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxDropdownMenuTrigger]="menu">File</button>
      <ng-template #menu>
        <div rdxDropdownMenuContent class="w-56">
          <div rdxDropdownMenuGroup>
            <div rdxDropdownMenuLabel>This version</div>
            <button rdxDropdownMenuItem>${edit}<span>Edit details</span></button>
            <button rdxDropdownMenuItem>${copy}<span>Duplicate</span></button>
          </div>
          <div rdxDropdownMenuSeparator></div>
          <div rdxDropdownMenuGroup>
            <div rdxDropdownMenuLabel>Share</div>
            <button rdxDropdownMenuItem>${share}<span>Share for feedback</span></button>
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
    props: { showName: true, showSize: true, showModified: false },
    template: `
      <button uiButton variant="outline" [rdxDropdownMenuTrigger]="menu">Columns</button>
      <ng-template #menu>
        <div rdxDropdownMenuContent class="w-52">
          <div rdxDropdownMenuLabel>Shown columns</div>
          <div rdxDropdownMenuSeparator></div>
          <button rdxDropdownMenuItemCheckbox [checked]="showName" (checkedChange)="showName = $event">Name</button>
          <button rdxDropdownMenuItemCheckbox [checked]="showSize" (checkedChange)="showSize = $event">Size</button>
          <button rdxDropdownMenuItemCheckbox [checked]="showModified" (checkedChange)="showModified = $event">Last modified</button>
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
    props: { view: 'grid' },
    template: `
      <button uiButton variant="outline" [rdxDropdownMenuTrigger]="menu">View: {{ view }}</button>
      <ng-template #menu>
        <div rdxDropdownMenuContent class="w-44">
          <div rdxDropdownMenuLabel>Layout</div>
          <div rdxDropdownMenuSeparator></div>
          <div rdxDropdownMenuItemRadioGroup [value]="view" (valueChange)="view = $event">
            <button rdxDropdownMenuItemRadio value="grid">${grid}<span>Grid</span></button>
            <button rdxDropdownMenuItemRadio value="list">${list}<span>List</span></button>
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
    template: `
      <button uiButton variant="outline" [rdxDropdownMenuTrigger]="menu">Edit</button>
      <ng-template #menu>
        <div rdxDropdownMenuContent class="w-52">
          <div rdxDropdownMenuLabel inset>Editing</div>
          <button rdxDropdownMenuItem>${edit}<span>Rename</span></button>
          <button rdxDropdownMenuItem inset>Move to folder</button>
          <button rdxDropdownMenuItem inset>Add to experiment</button>
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
    template: `
      <button uiButton variant="outline" [rdxDropdownMenuTrigger]="menu">Manage</button>
      <ng-template #menu>
        <div rdxDropdownMenuContent class="w-56">
          <button rdxDropdownMenuItem>${edit}<span>Edit details</span></button>
          <div rdxDropdownMenuSeparator></div>
          <button rdxDropdownMenuItem variant="destructive">${del}<span>Delete version</span></button>
        </div>
      </ng-template>
    `,
  }),
};

/** Several triggers for review of the common compositions side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <button uiButton variant="outline" [rdxDropdownMenuTrigger]="m1">Actions</button>
        <ng-template #m1>
          <div rdxDropdownMenuContent class="w-52">
            <button rdxDropdownMenuItem>${edit}<span>Edit</span><span rdxDropdownMenuShortcut>⌘E</span></button>
            <button rdxDropdownMenuItem>${copy}<span>Duplicate</span></button>
            <div rdxDropdownMenuSeparator></div>
            <button rdxDropdownMenuItem variant="destructive">${del}<span>Delete</span></button>
          </div>
        </ng-template>

        <button uiButton variant="secondary" [rdxDropdownMenuTrigger]="m2">Share</button>
        <ng-template #m2>
          <div rdxDropdownMenuContent class="w-48">
            <button rdxDropdownMenuItem>${share}<span>Share for feedback</span></button>
            <button rdxDropdownMenuItem disabled>${copy}<span>Copy link (offline)</span></button>
          </div>
        </ng-template>
      </div>
    `,
  }),
};
