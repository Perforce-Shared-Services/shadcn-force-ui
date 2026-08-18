import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';
import { Badge } from '@/app/ui/badge';
import { Button } from '@/app/ui/button';
import { Switch } from '@/app/ui/switch';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './';

interface VersionRow {
  version: string;
  author: string;
  file: string;
  size: string;
  selected?: boolean;
}

const ROWS: VersionRow[] = [
  { version: 'v14', author: 'Ada Okafor', file: 'character_hero.fbx', size: '4.2 MB' },
  { version: 'v13', author: 'Ravi Patel', file: 'character_hero.fbx', size: '4.1 MB', selected: true },
  { version: 'v12', author: 'Mei Lin', file: 'character_hero.fbx', size: '3.9 MB' },
  { version: 'v11', author: 'Ada Okafor', file: 'character_hero.fbx', size: '3.8 MB' },
];

interface TableStoryArgs {
  caption: string;
  showCaption: boolean;
  showHeader: boolean;
  showFooter: boolean;
  rows: VersionRow[];
}

// Static template — slot visibility driven by *ngIf on props (Storybook-Angular
// only re-binds props between arg changes, it does not recompile the template
// string). Hosts stay native elements (<table>/<thead>/<tr>/<th>/<td>) so the
// real table semantics survive for assistive tech.
const TEMPLATE = `
  <div uiTableContainer class="w-[34rem]">
    <table uiTable [attr.aria-label]="caption">
      <caption uiTableCaption *ngIf="showCaption">{{ caption }}</caption>
      <thead uiTableHeader *ngIf="showHeader">
        <tr uiTableRow>
          <th uiTableHead scope="col">Version</th>
          <th uiTableHead scope="col">Author</th>
          <th uiTableHead scope="col">File</th>
          <th uiTableHead scope="col" class="text-right">Size</th>
        </tr>
      </thead>
      <tbody uiTableBody>
        <tr uiTableRow *ngFor="let r of rows"
            [attr.data-state]="r.selected ? 'selected' : null"
            [attr.aria-selected]="r.selected ? 'true' : null">
          <th uiTableHead scope="row" class="font-medium">{{ r.version }}</th>
          <td uiTableCell>{{ r.author }}</td>
          <td uiTableCell>{{ r.file }}</td>
          <td uiTableCell class="text-right">{{ r.size }}</td>
        </tr>
        <tr uiTableRow *ngIf="rows.length === 0">
          <td uiTableCell [attr.colspan]="4" class="h-24 text-center text-muted-foreground">
            No versions yet. Submit a version to see it here.
          </td>
        </tr>
      </tbody>
      <tfoot uiTableFooter *ngIf="showFooter">
        <tr uiTableRow>
          <td uiTableCell [attr.colspan]="3">Total</td>
          <td uiTableCell class="text-right">16.0 MB</td>
        </tr>
      </tfoot>
    </table>
  </div>`;

/**
 * `[uiTable]` is the Angular port of the Force UI (radix-force-ui) table — a
 * scannable grid for tabular data (version history, file lists, members). The
 * toolbar controls toggle the caption, header, and footer; the rows array
 * drives the body and shows a selected row via `data-state="selected"`.
 *
 * Ported registry-verbatim, with documented app-compat fixes: bare borders are
 * pinned to `border-border` (this app has no global border-color default), and
 * the row's `transition-colors` is guarded with `motion-reduce:transition-none`.
 * `[uiTableContainer]` is an Angular-specific split of the registry's internal
 * overflow-x wrapper — wrap a table in it whenever it can outgrow its column.
 *
 * Accessibility: keep the hosts native so screen readers get real table
 * semantics. Mark column headers `scope="col"` and row headers `scope="row"`,
 * and name the table with `<caption uiTableCaption>`.
 */
const meta: Meta<TableStoryArgs> = {
  title: 'UI/Table',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        TableContainer,
        Table,
        TableHeader,
        TableBody,
        TableFooter,
        TableRow,
        TableHead,
        TableCell,
        TableCaption,
        Avatar,
        AvatarImage,
        AvatarFallback,
        Badge,
        Button,
        Switch,
      ],
    }),
  ],
  argTypes: {
    caption: { control: 'text', description: 'Caption naming the table (read by screen readers)' },
    showCaption: { control: 'boolean', description: 'Caption below the table' },
    showHeader: { control: 'boolean', description: 'Header row of column labels' },
    showFooter: { control: 'boolean', description: 'Tinted summary footer with a top border' },
    rows: { control: 'object', description: 'Body rows; set `selected` to tint a row' },
  },
  args: {
    caption: 'Version history for character_hero.fbx',
    showCaption: true,
    showHeader: true,
    showFooter: true,
    rows: ROWS,
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<TableStoryArgs>;

/** Interactive playground — every slot and the row data available. */
export const Playground: Story = {};

/** Header and body only — the common read-only list. */
export const Basic: Story = { args: { showCaption: false, showFooter: false } };

/** With a tinted summary footer. */
export const WithFooter: Story = { args: { showCaption: false } };

/** With a caption naming the table for screen readers. */
export const WithCaption: Story = { args: { showFooter: false } };

/**
 * A selected row, tinted via `data-state="selected"`. Pair it with
 * `aria-selected="true"` on the same `<tr>` (as the template does) so screen
 * readers announce the selection — the tint alone is not conveyed to them.
 */
export const SelectedRow: Story = {
  args: {
    showCaption: false,
    showFooter: false,
    rows: ROWS.map((r, i) => ({ ...r, selected: i === 0 })),
  },
};

/**
 * Empty body — no rows yet. The template renders a single full-width cell with
 * a state description + suggested next step instead of a bare header, and the
 * table keeps an `aria-label` so its purpose is announced when empty.
 */
export const Empty: Story = {
  args: { showCaption: false, showFooter: false, rows: [] },
};

/**
 * Rich cells — a cell is just `<td uiTableCell>` projecting `<ng-content/>`, so
 * any already-ported UI component drops straight in: avatars, badges, switches,
 * buttons (this mirrors the Figma `Table / Cell` variant set). Nothing special
 * is needed on the table itself — compose the existing components inside cells.
 */
export const RichCells: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiTableContainer class="w-[44rem]">
        <table uiTable aria-label="Team assets">
          <thead uiTableHeader>
            <tr uiTableRow>
              <th uiTableHead scope="col">Owner</th>
              <th uiTableHead scope="col">Status</th>
              <th uiTableHead scope="col">Auto-sync</th>
              <th uiTableHead scope="col" class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody uiTableBody>
            <tr uiTableRow>
              <th uiTableHead scope="row" class="font-normal">
                <span class="flex items-center gap-2">
                  <span uiAvatar size="sm"><span uiAvatarFallback>AO</span></span>
                  <span>Ada Okafor</span>
                </span>
              </th>
              <td uiTableCell><span uiBadge variant="success">Synced</span></td>
              <td uiTableCell><button uiSwitch size="sm" [checked]="true" aria-label="Auto-sync for Ada's assets"></button></td>
              <td uiTableCell class="text-right">
                <button uiButton variant="ghost" size="sm">View</button>
                <button uiButton variant="ghost" size="sm">Share</button>
              </td>
            </tr>
            <tr uiTableRow>
              <th uiTableHead scope="row" class="font-normal">
                <span class="flex items-center gap-2">
                  <span uiAvatar size="sm"><span uiAvatarFallback>RP</span></span>
                  <span>Ravi Patel</span>
                </span>
              </th>
              <td uiTableCell><span uiBadge variant="warning">Local only</span></td>
              <td uiTableCell><button uiSwitch size="sm" [checked]="false" aria-label="Auto-sync for Ravi's assets"></button></td>
              <td uiTableCell class="text-right">
                <button uiButton variant="ghost" size="sm">View</button>
                <button uiButton variant="ghost" size="sm">Share</button>
              </td>
            </tr>
            <tr uiTableRow>
              <th uiTableHead scope="row" class="font-normal">
                <span class="flex items-center gap-2">
                  <span uiAvatar size="sm"><span uiAvatarFallback>ML</span></span>
                  <span>Mei Lin</span>
                </span>
              </th>
              <td uiTableCell><span uiBadge variant="secondary">In experiment</span></td>
              <td uiTableCell><button uiSwitch size="sm" [checked]="true" aria-label="Auto-sync for Mei's assets"></button></td>
              <td uiTableCell class="text-right">
                <button uiButton variant="ghost" size="sm">View</button>
                <button uiButton variant="ghost" size="sm">Share</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>`,
  }),
};

/** Gallery — the common table shapes stacked. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <div uiTableContainer class="w-[30rem]">
          <table uiTable aria-label="Version history for character_hero.fbx">
            <thead uiTableHeader>
              <tr uiTableRow>
                <th uiTableHead scope="col">Version</th>
                <th uiTableHead scope="col">Author</th>
                <th uiTableHead scope="col" class="text-right">Size</th>
              </tr>
            </thead>
            <tbody uiTableBody>
              <tr uiTableRow>
                <th uiTableHead scope="row" class="font-medium">v14</th>
                <td uiTableCell>Ada Okafor</td>
                <td uiTableCell class="text-right">4.2 MB</td>
              </tr>
              <tr uiTableRow data-state="selected">
                <th uiTableHead scope="row" class="font-medium">v13</th>
                <td uiTableCell>Ravi Patel</td>
                <td uiTableCell class="text-right">4.1 MB</td>
              </tr>
              <tr uiTableRow>
                <th uiTableHead scope="row" class="font-medium">v12</th>
                <td uiTableCell>Mei Lin</td>
                <td uiTableCell class="text-right">3.9 MB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div uiTableContainer class="w-[30rem]">
          <table uiTable>
            <caption uiTableCaption>Sync summary for this experiment</caption>
            <thead uiTableHeader>
              <tr uiTableRow>
                <th uiTableHead scope="col">File</th>
                <th uiTableHead scope="col" class="text-right">Size</th>
              </tr>
            </thead>
            <tbody uiTableBody>
              <tr uiTableRow>
                <th uiTableHead scope="row" class="font-medium">character_hero.fbx</th>
                <td uiTableCell class="text-right">4.2 MB</td>
              </tr>
              <tr uiTableRow>
                <th uiTableHead scope="row" class="font-medium">hero_textures.png</th>
                <td uiTableCell class="text-right">11.8 MB</td>
              </tr>
            </tbody>
            <tfoot uiTableFooter>
              <tr uiTableRow>
                <td uiTableCell>Total</td>
                <td uiTableCell class="text-right">16.0 MB</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `,
  }),
};
