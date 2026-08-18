import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './';

interface PaginationStoryArgs {
  currentPage: number;
  showEllipsis: boolean;
}

const IMPORTS = [
  CommonModule,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
];

/**
 * `[uiPagination]` is the Angular port of the Force UI (radix-force-ui)
 * pagination — a presentational compound (`[uiPagination]` / `Content` /
 * `Item` / `Link` / `Previous` / `Next` / `Ellipsis`) built on the
 * already-ported `[uiButton]` cva (`ghost` for other pages, `outline` for the
 * current page).
 */
const meta: Meta<PaginationStoryArgs> = {
  title: 'UI/Pagination',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: IMPORTS })],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'The active page number (1-5)',
    },
    showEllipsis: {
      control: 'boolean',
      description: 'Collapse the middle pages behind an ellipsis',
    },
  },
  args: {
    currentPage: 2,
    showEllipsis: false,
  },
};

export default meta;
type Story = StoryObj<PaginationStoryArgs>;

/** Args-driven playground — set the active page and toggle the ellipsis. */
export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <nav uiPagination>
        <ul uiPaginationContent>
          <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
          <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="currentPage === 1">1</a></li>
          <ng-container *ngIf="showEllipsis; else fullRun">
            <li uiPaginationItem><span uiPaginationEllipsis></span></li>
          </ng-container>
          <ng-template #fullRun>
            <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="currentPage === 2">2</a></li>
            <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="currentPage === 3">3</a></li>
          </ng-template>
          <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="currentPage === 4">4</a></li>
          <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
        </ul>
      </nav>
    `,
  }),
};

/** Default — a short run of pages, one marked as current. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiPagination>
        <ul uiPaginationContent>
          <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
          <li uiPaginationItem><a uiPaginationLink href="#">1</a></li>
          <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="true">2</a></li>
          <li uiPaginationItem><a uiPaginationLink href="#">3</a></li>
          <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
        </ul>
      </nav>
    `,
  }),
};

/** Collapsed — an ellipsis stands in for a run of hidden pages. */
export const Collapsed: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiPagination>
        <ul uiPaginationContent>
          <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
          <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="true">1</a></li>
          <li uiPaginationItem><a uiPaginationLink href="#">2</a></li>
          <li uiPaginationItem><span uiPaginationEllipsis></span></li>
          <li uiPaginationItem><a uiPaginationLink href="#">8</a></li>
          <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
        </ul>
      </nav>
    `,
  }),
};

/** First page — "Previous" is the boundary; still focusable (registry has no boundary-disable). */
export const FirstPage: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <nav uiPagination>
        <ul uiPaginationContent>
          <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
          <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="true">1</a></li>
          <li uiPaginationItem><a uiPaginationLink href="#">2</a></li>
          <li uiPaginationItem><a uiPaginationLink href="#">3</a></li>
          <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
        </ul>
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
        <nav uiPagination>
          <ul uiPaginationContent>
            <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
            <li uiPaginationItem><a uiPaginationLink href="#">1</a></li>
            <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="true">2</a></li>
            <li uiPaginationItem><a uiPaginationLink href="#">3</a></li>
            <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
          </ul>
        </nav>

        <nav uiPagination>
          <ul uiPaginationContent>
            <li uiPaginationItem><a uiPaginationPrevious href="#"></a></li>
            <li uiPaginationItem><a uiPaginationLink href="#" [isActive]="true">1</a></li>
            <li uiPaginationItem><a uiPaginationLink href="#">2</a></li>
            <li uiPaginationItem><span uiPaginationEllipsis></span></li>
            <li uiPaginationItem><a uiPaginationLink href="#">8</a></li>
            <li uiPaginationItem><a uiPaginationNext href="#"></a></li>
          </ul>
        </nav>
      </div>
    `,
  }),
};
