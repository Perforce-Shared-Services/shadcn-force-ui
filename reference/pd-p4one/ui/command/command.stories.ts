import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import fileIcon from '@material-symbols/svg-400/rounded/description.svg?raw';
import experimentIcon from '@material-symbols/svg-400/rounded/science.svg?raw';
import syncIcon from '@material-symbols/svg-400/rounded/sync.svg?raw';
import shareIcon from '@material-symbols/svg-400/rounded/ios_share.svg?raw';
import historyIcon from '@material-symbols/svg-400/rounded/history.svg?raw';

import { Button } from '../button';
import { Kbd } from '../kbd';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './';

// Leading item icons are interpolated into the template literal with `${}` so
// they compile as static, direct-child `<svg>` (binding raw SVG via
// `[innerHTML]` would be sanitizer-stripped — skill §9). They are decorative
// (the item's text is its accessible name), so mark each `aria-hidden` +
// `focusable="false"` (WCAG 1.1.1). This is the copy-from-stories pattern.
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');
const file = deco(fileIcon);
const experiment = deco(experimentIcon);
const sync = deco(syncIcon);
const share = deco(shareIcon);
const history = deco(historyIcon);

const COMMAND_IMPORTS = [
  CommonModule,
  Button,
  Kbd,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
];

interface CommandStoryArgs {
  placeholder: string;
  emptyMessage: string;
  shouldFilter: boolean;
  showGroups: boolean;
  showShortcuts: boolean;
  showChecks: boolean;
  disabledItem: boolean;
}

/**
 * `[uiCommand]` and its parts are the Angular port of the Force UI `command`
 * palette (built on cmdk). Type to fuzzy-filter; ArrowUp/Down to move the
 * highlight (wraps), Enter to run the highlighted item. It's a compositional
 * component — no cva variants — so the stories toggle the optional pieces
 * (groups, shortcuts, selection checks, disabled rows) rather than variants.
 *
 * The frame here (`w-[420px] rounded-xl border border-border shadow-md`) is
 * demo chrome; the root itself only owns the `bg-popover` + padding. In an app
 * the palette usually lives inside `CommandDialog` (see the InDialog story).
 */
const meta: Meta<CommandStoryArgs> = {
  title: 'UI/Command',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: COMMAND_IMPORTS }),
  ],
  argTypes: {
    placeholder: { control: 'text', description: 'Search input placeholder.' },
    emptyMessage: { control: 'text', description: 'Shown when a search matches nothing.' },
    shouldFilter: {
      control: 'boolean',
      description: 'Built-in fuzzy filter. Turn off to supply an externally filtered list.',
      table: { defaultValue: { summary: 'true' } },
    },
    showGroups: { control: 'boolean', description: 'Group items under headings with a separator.' },
    showShortcuts: { control: 'boolean', description: 'Show keyboard-shortcut hints on actions.' },
    showChecks: {
      control: 'boolean',
      description: 'Mark items as selected (combobox-style trailing check).',
    },
    disabledItem: { control: 'boolean', description: 'Disable one row (visible but inert).' },
  },
  args: {
    placeholder: 'Search versions, experiments and actions',
    emptyMessage: 'No matches. Try a different term.',
    shouldFilter: true,
    showGroups: true,
    showShortcuts: true,
    showChecks: false,
    disabledItem: false,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <div uiCommand [shouldFilter]="shouldFilter" class="w-[420px] rounded-xl border border-border shadow-md">
        <div uiCommandInput [placeholder]="placeholder"></div>
        <div uiCommandList aria-label="Versions, experiments and actions">
          <div uiCommandEmpty>{{ emptyMessage }}</div>

          <ng-container *ngIf="showGroups; else flat">
            <div uiCommandGroup heading="Recent">
              <div uiCommandItem [checked]="showChecks">${file} Character_Rig_v3.blend</div>
              <div uiCommandItem [checked]="false">${history} Restore previous version</div>
            </div>
            <div uiCommandSeparator></div>
            <div uiCommandGroup heading="Actions">
              <div uiCommandItem aria-keyshortcuts="Meta+E">
                ${experiment} New experiment
                <span uiCommandShortcut *ngIf="showShortcuts"><kbd uiKbd>⌘</kbd><kbd uiKbd>E</kbd></span>
              </div>
              <div uiCommandItem aria-keyshortcuts="Meta+S">
                ${sync} Sync latest from server
                <span uiCommandShortcut *ngIf="showShortcuts"><kbd uiKbd>⌘</kbd><kbd uiKbd>S</kbd></span>
              </div>
              <div uiCommandItem [disabled]="disabledItem" aria-keyshortcuts="Meta+Shift+S">
                ${share} Share for feedback
                <span uiCommandShortcut *ngIf="showShortcuts"><kbd uiKbd>⌘</kbd><kbd uiKbd>⇧</kbd><kbd uiKbd>S</kbd></span>
              </div>
            </div>
          </ng-container>

          <ng-template #flat>
            <div uiCommandGroup>
              <div uiCommandItem [checked]="showChecks">${file} Character_Rig_v3.blend</div>
              <div uiCommandItem>${experiment} New experiment</div>
              <div uiCommandItem>${sync} Sync latest from server</div>
              <div uiCommandItem [disabled]="disabledItem">${share} Share for feedback</div>
            </div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<CommandStoryArgs>;

/** Full control set — toggle groups, shortcuts, selection checks and disabled. */
export const Playground: Story = {};

/** A flat palette: one group, no headings, fuzzy filter on. */
export const Basic: Story = {
  args: { showGroups: false, showShortcuts: false },
};

/** Grouped with headings, a separator, and shortcut hints on actions. */
export const Grouped: Story = {
  args: { showGroups: true, showShortcuts: true },
};

/** Combobox pattern — selected items carry a trailing check. */
export const WithSelection: Story = {
  args: { showGroups: false, showShortcuts: false, showChecks: true },
};

/** The empty state, forced by a search that matches nothing. */
export const EmptyState: Story = {
  render: (args) => ({
    props: { ...args },
    template: `
      <div uiCommand class="w-[420px] rounded-xl border border-border shadow-md">
        <div uiCommandInput value="zzzzzz" [placeholder]="placeholder"></div>
        <div uiCommandList aria-label="Versions and actions">
          <div uiCommandEmpty>{{ emptyMessage }}</div>
          <div uiCommandGroup>
            <div uiCommandItem>Character_Rig_v3.blend</div>
            <div uiCommandItem>New experiment</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/** A disabled row stays visible but is skipped by keyboard and click. */
export const WithDisabled: Story = {
  args: { showGroups: false, showShortcuts: false, disabledItem: true },
};

/** The palette in a modal overlay (⌘K style) via `CommandDialog`. */
export const InDialog: Story = {
  render: () => ({
    props: { open: false },
    template: `
      <button uiButton variant="outline" (click)="open = true">Open command palette</button>
      <ui-command-dialog [(open)]="open" title="Command palette"
                         description="Search versions, experiments and actions">
        <ng-template>
          <div uiCommand>
            <div uiCommandInput placeholder="Type a command or search…"></div>
            <div uiCommandList aria-label="Versions, experiments and actions">
              <div uiCommandEmpty>No matches. Try a different term.</div>
              <div uiCommandGroup heading="Actions">
                <div uiCommandItem (select)="open = false">${experiment} New experiment</div>
                <div uiCommandItem (select)="open = false">${sync} Sync latest from server</div>
                <div uiCommandItem (select)="open = false">${share} Share for feedback</div>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-command-dialog>
    `,
  }),
};

/** Static reference — the assembled palette at a glance. */
export const Gallery: Story = {
  render: () => ({
    template: `
      <div uiCommand class="w-[420px] rounded-xl border border-border shadow-md">
        <div uiCommandInput placeholder="Search versions, experiments and actions"></div>
        <div uiCommandList aria-label="Versions, experiments and actions">
          <div uiCommandEmpty>No matches. Try a different term.</div>
          <div uiCommandGroup heading="Recent">
            <div uiCommandItem checked>${file} Character_Rig_v3.blend</div>
            <div uiCommandItem>${history} Restore previous version</div>
          </div>
          <div uiCommandSeparator></div>
          <div uiCommandGroup heading="Actions">
            <div uiCommandItem aria-keyshortcuts="Meta+E">${experiment} New experiment<span uiCommandShortcut><kbd uiKbd>⌘</kbd><kbd uiKbd>E</kbd></span></div>
            <div uiCommandItem aria-keyshortcuts="Meta+S">${sync} Sync latest from server<span uiCommandShortcut><kbd uiKbd>⌘</kbd><kbd uiKbd>S</kbd></span></div>
            <div uiCommandItem disabled aria-keyshortcuts="Meta+Shift+S">${share} Share for feedback<span uiCommandShortcut><kbd uiKbd>⌘</kbd><kbd uiKbd>⇧</kbd><kbd uiKbd>S</kbd></span></div>
          </div>
        </div>
      </div>
    `,
  }),
};
