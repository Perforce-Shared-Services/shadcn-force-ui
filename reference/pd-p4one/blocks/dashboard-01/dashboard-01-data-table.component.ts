import { CdkDrag, type CdkDragDrop, CdkDragHandle, CdkDragPreview, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { ChartArea } from '@/app/ui/chart';
import { Badge } from '@/app/ui/badge';
import { Button } from '@/app/ui/button';
import { Checkbox } from '@/app/ui/checkbox';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/ui/drawer';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectRootDirective,
  SelectTrigger,
  SelectValue,
  SelectValueDirective,
} from '@/app/ui/select';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from '@/app/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/ui/tabs';

import { DASHBOARD_SECTION_ROWS, DASHBOARD_VISITORS_SERIES, sliceLastDays, type DashboardSectionRow } from './dashboard-01.data';
import { DASHBOARD01_ICONS, decorativeIcon } from './dashboard-01.icons';

/** The Outline tab plus 3 placeholder tabs — a TS enum per this app's "3+ named alternatives" rule. */
enum DataTableTab {
  Outline = 'outline',
  PastPerformance = 'past-performance',
  KeyPersonnel = 'key-personnel',
  FocusDocuments = 'focus-documents',
}

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50] as const;
const REVIEWER_OPTIONS = ['Jamik Tashpulatov', 'Eddie Lake'] as const;

function isDataTableTab(value: string): value is DataTableTab {
  return Object.values(DataTableTab).includes(value as DataTableTab);
}

/**
 * The `dashboard-01` block's data-table card: a tab strip (only "Outline"
 * renders a real table — the other three are dashed placeholders, matching
 * the real upstream demo exactly, not a corner cut here), a toolbar
 * ("Customize Columns" + "Add Section"), the Outline table itself, and a
 * pagination footer.
 *
 * Two real upstream gaps this port resolves without a new dependency:
 * - Row reordering: upstream uses `@dnd-kit/*` + `@tanstack/react-table`
 *   (React-only). This port uses `@angular/cdk/drag-drop`
 *   (`CdkDropList`/`CdkDrag`/`CdkDragHandle`/`moveItemInArray`) plus plain
 *   signals for sort/pagination/selection/column-visibility state instead —
 *   the dataset is small and static, so a full data-grid engine isn't needed.
 * - Row detail: the drawer that opens from a row's "Header" link is
 *   `ui/drawer` (`direction="right"`), ported for this Block on
 *   `component/drawer` (already merged to `main`).
 *
 * DELIBERATE SIMPLIFICATION: drag-drop reorders rows WITHIN THE CURRENT PAGE
 * only (`onDrop` splices the reordered page back into the full `rows` array
 * at the same offset) — a demo dataset has no real cross-page reorder need.
 * Native HTML5 drag (what CDK drag-drop rides on) is pointer/touch-only (the
 * same real-world limitation dnd-kit has without extra keyboard-sensor
 * wiring) — every other row affordance (checkbox, header link, actions menu)
 * stays fully keyboard operable.
 *
 * DELIBERATE SIMPLIFICATION: the drag preview (`*cdkDragPreview`) renders a
 * single compact pill (icon + header text) rather than a full replica of the
 * multi-column row — CDK portals the preview into an overlay OUTSIDE the
 * `<table>`, so a cloned `<tr>`/`<td>` set loses its column widths there
 * regardless (a well-known CDK-vs-table-layout gap, not fixable by copying
 * more markup into the preview).
 */
@Component({
  selector: 'app-block-dashboard-01-data-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Badge,
    Button,
    CdkDrag,
    CdkDragHandle,
    CdkDragPreview,
    CdkDropList,
    ChartArea,
    Checkbox,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectRootDirective,
    SelectTrigger,
    SelectValue,
    SelectValueDirective,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  ],
  template: `
    <div uiTabs [value]="activeTab()" (valueChange)="onTabChange($event)" class="flex w-full flex-col gap-6">
      <div class="flex flex-wrap items-center justify-between gap-2 px-4 lg:px-6">
        <div uiTabsList>
          <button uiTabsTrigger [value]="tabs.Outline">Outline</button>
          <button uiTabsTrigger [value]="tabs.PastPerformance" class="gap-1.5">
            Past Performance
            <span uiBadge variant="secondary">3</span>
          </button>
          <button uiTabsTrigger [value]="tabs.KeyPersonnel" class="gap-1.5">
            Key Personnel
            <span uiBadge variant="secondary">2</span>
          </button>
          <button uiTabsTrigger [value]="tabs.FocusDocuments">Focus Documents</button>
        </div>
        <div class="flex items-center gap-2">
          <button uiButton variant="outline" size="sm" [rdxDropdownMenuTrigger]="columnsMenu">
            Customize Columns
            <span aria-hidden="true" [innerHTML]="keyboardArrowDownIcon"></span>
          </button>
          <ng-template #columnsMenu>
            <div rdxDropdownMenuContent class="w-48">
              <button rdxDropdownMenuItemCheckbox [checked]="showSectionType()" (checkedChange)="showSectionType.set($event)">
                Section Type
              </button>
              <button rdxDropdownMenuItemCheckbox [checked]="showReviewer()" (checkedChange)="showReviewer.set($event)">
                Reviewer
              </button>
            </div>
          </ng-template>
          <button uiButton variant="secondary" size="sm" (click)="onAddSection()">
            <span aria-hidden="true" [innerHTML]="addIcon"></span>
            Add Section
          </button>
        </div>
      </div>

      <div uiTabsContent [value]="tabs.Outline" class="flex flex-col gap-4 px-4 lg:px-6">
        <div uiTableContainer>
          <table uiTable aria-label="Document outline sections">
            <thead uiTableHeader>
              <tr uiTableRow>
                <th uiTableHead class="w-8"><span class="sr-only">Reorder</span></th>
                <th uiTableHead class="w-8">
                  <button
                    uiCheckbox
                    [checked]="headerCheckedState()"
                    (checkedChange)="onHeaderCheckedChange($event)"
                    aria-label="Select all rows on this page"
                  ></button>
                </th>
                <th uiTableHead>Header</th>
                @if (showSectionType()) {
                  <th uiTableHead>Section Type</th>
                }
                <th uiTableHead>Status</th>
                <th uiTableHead>Target</th>
                <th uiTableHead>Limit</th>
                @if (showReviewer()) {
                  <th uiTableHead>Reviewer</th>
                }
                <th uiTableHead class="w-8"><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody uiTableBody cdkDropList [cdkDropListData]="pagedRows()" (cdkDropListDropped)="onDrop($event)">
              @for (row of pagedRows(); track row.id) {
                <tr uiTableRow cdkDrag [cdkDragData]="row" [attr.data-state]="isSelected(row.id) ? 'selected' : null">
                  <ng-template cdkDragPreview>
                    <div class="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground shadow-md">
                      <span aria-hidden="true" class="text-muted-foreground [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="dragIndicatorIcon"></span>
                      {{ row.header }}
                    </div>
                  </ng-template>
                  <td uiTableCell>
                    <button
                      uiButton
                      variant="ghost"
                      size="icon"
                      class="size-7 cursor-grab text-muted-foreground"
                      cdkDragHandle
                      [attr.aria-label]="'Drag to reorder ' + row.header"
                    >
                      <span aria-hidden="true" [innerHTML]="dragIndicatorIcon"></span>
                    </button>
                  </td>
                  <td uiTableCell>
                    <button
                      uiCheckbox
                      [checked]="isSelected(row.id)"
                      (checkedChange)="toggleRowSelected(row.id, $event)"
                      [attr.aria-label]="'Select ' + row.header"
                    ></button>
                  </td>
                  <td uiTableCell>
                    <button
                      uiButton
                      variant="link"
                      class="h-auto justify-start p-0 text-left font-normal text-foreground"
                      [rdxDrawerTrigger]="rowDrawer"
                      [rdxDrawerConfig]="{ ariaLabel: row.header }"
                    >
                      {{ row.header }}
                    </button>
                    <ng-template #rowDrawer>
                      <div rdxDrawerContent direction="right">
                        <div rdxDrawerHeader>
                          <h2 rdxDrawerTitle>{{ row.header }}</h2>
                          <p rdxDrawerDescription>Showing total visitors for the last 6 months.</p>
                        </div>
                        <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4">
                          <ui-chart-area [data]="drawerChartData" [stacked]="true" [gradient]="true" [legend]="false" class="block" />
                          <p class="flex items-center gap-1.5 text-sm font-medium">
                            Trending up by 5.2% this month
                            <span aria-hidden="true" class="text-success [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="trendingUpIcon"></span>
                          </p>
                          <p class="text-sm text-muted-foreground">
                            Reader engagement is up on this section compared to the rest of the document. Track this
                            figure over the next few versions to confirm the trend holds.
                          </p>
                          <div class="flex flex-col gap-3">
                            <div class="flex flex-col gap-1.5">
                              <label uiLabel [attr.for]="'drawer-header-' + row.id">Header</label>
                              <input uiInput [id]="'drawer-header-' + row.id" type="text" [value]="row.header" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                              <label uiLabel [attr.for]="'drawer-type-' + row.id">Type</label>
                              <input uiInput [id]="'drawer-type-' + row.id" type="text" [value]="row.sectionType" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                              <label uiLabel [id]="'drawer-status-label-' + row.id">Status</label>
                              <div rdxSelect [defaultValue]="row.status" [matchTriggerWidth]="true">
                                <button rdxSelectTrigger [attr.aria-labelledby]="'drawer-status-label-' + row.id" class="w-full">
                                  <span rdxSelectValue></span>
                                </button>
                                <div rdxSelectContent>
                                  <button rdxSelectItem value="Done">Done</button>
                                  <button rdxSelectItem value="In Process">In Process</button>
                                </div>
                              </div>
                            </div>
                            <div class="grid grid-cols-2 gap-3">
                              <div class="flex flex-col gap-1.5">
                                <label uiLabel [attr.for]="'drawer-target-' + row.id">Target</label>
                                <input uiInput [id]="'drawer-target-' + row.id" type="text" [value]="row.target" />
                              </div>
                              <div class="flex flex-col gap-1.5">
                                <label uiLabel [attr.for]="'drawer-limit-' + row.id">Limit</label>
                                <input uiInput [id]="'drawer-limit-' + row.id" type="text" [value]="row.limit" />
                              </div>
                            </div>
                            <div class="flex flex-col gap-1.5">
                              <label uiLabel [id]="'drawer-reviewer-label-' + row.id">Reviewer</label>
                              <div rdxSelect [defaultValue]="row.reviewer ?? ''" [matchTriggerWidth]="true">
                                <button rdxSelectTrigger [attr.aria-labelledby]="'drawer-reviewer-label-' + row.id" class="w-full">
                                  <span rdxSelectValue placeholder="Assign reviewer"></span>
                                </button>
                                <div rdxSelectContent>
                                  @for (reviewer of reviewerOptions; track reviewer) {
                                    <button rdxSelectItem [value]="reviewer">{{ reviewer }}</button>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div rdxDrawerFooter>
                          <button uiButton rdxDialogClose>Save</button>
                          <button uiButton variant="outline" rdxDialogClose>Cancel</button>
                        </div>
                      </div>
                    </ng-template>
                  </td>
                  @if (showSectionType()) {
                    <td uiTableCell>
                      <span uiBadge variant="outline" class="text-muted-foreground">{{ row.sectionType }}</span>
                    </td>
                  }
                  <td uiTableCell>
                    <span uiBadge variant="outline" class="text-muted-foreground">
                      <span
                        data-icon="inline-start"
                        aria-hidden="true"
                        class="[&_svg]:size-3.5 [&_svg]:fill-current"
                        [class.text-success]="row.status === 'Done'"
                        [innerHTML]="row.status === 'Done' ? checkCircleIcon : progressActivityIcon"
                      ></span>
                      {{ row.status }}
                    </span>
                  </td>
                  <td uiTableCell>
                    <label class="sr-only" [attr.for]="'target-' + row.id">Target for {{ row.header }}</label>
                    <input uiInput [id]="'target-' + row.id" type="text" class="h-8 w-16" [value]="row.target" />
                  </td>
                  <td uiTableCell>
                    <label class="sr-only" [attr.for]="'limit-' + row.id">Limit for {{ row.header }}</label>
                    <input uiInput [id]="'limit-' + row.id" type="text" class="h-8 w-16" [value]="row.limit" />
                  </td>
                  @if (showReviewer()) {
                    <td uiTableCell>
                      @if (row.reviewer) {
                        {{ row.reviewer }}
                      } @else {
                        <div rdxSelect defaultValue="" [matchTriggerWidth]="true">
                          <button rdxSelectTrigger size="sm" class="w-40" [attr.aria-label]="'Assign reviewer for ' + row.header">
                            <span rdxSelectValue placeholder="Assign reviewer"></span>
                          </button>
                          <div rdxSelectContent>
                            @for (reviewer of reviewerOptions; track reviewer) {
                              <button rdxSelectItem [value]="reviewer">{{ reviewer }}</button>
                            }
                          </div>
                        </div>
                      }
                    </td>
                  }
                  <td uiTableCell>
                    <button
                      uiButton
                      variant="ghost"
                      size="icon"
                      class="size-7"
                      [rdxDropdownMenuTrigger]="rowActionsMenu"
                      [attr.aria-label]="'Actions for ' + row.header"
                    >
                      <span aria-hidden="true" [innerHTML]="moreVertIcon"></span>
                    </button>
                    <ng-template #rowActionsMenu>
                      <div rdxDropdownMenuContent class="w-40">
                        <button rdxDropdownMenuItem>
                          <span aria-hidden="true" class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="editIcon"></span>
                          <span>Edit</span>
                        </button>
                        <button rdxDropdownMenuItem>
                          <span aria-hidden="true" class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="contentCopyIcon"></span>
                          <span>Make a copy</span>
                        </button>
                        <button rdxDropdownMenuItem>
                          <span aria-hidden="true" class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="starIcon"></span>
                          <span>Favorite</span>
                        </button>
                        <div rdxDropdownMenuSeparator></div>
                        <button rdxDropdownMenuItem variant="destructive">
                          <span aria-hidden="true" class="[&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="deleteIcon"></span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </ng-template>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="text-sm text-muted-foreground">{{ selectedIds().size }} of {{ rows().length }} row(s) selected.</div>
          <div class="flex flex-wrap items-center gap-6 lg:gap-8">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium">Rows per page</span>
              <div rdxSelect defaultValue="10" (onValueChange)="onPageSizeChange($event)" [matchTriggerWidth]="true">
                <button rdxSelectTrigger size="sm" class="w-[4.5rem]" aria-label="Rows per page">
                  <span rdxSelectValue></span>
                </button>
                <div rdxSelectContent>
                  @for (size of pageSizeOptions; track size) {
                    <button rdxSelectItem [value]="size.toString()">{{ size }}</button>
                  }
                </div>
              </div>
            </div>
            <div class="text-sm font-medium">Page {{ pageIndex() + 1 }} of {{ pageCount() }}</div>
            <div class="flex items-center gap-1">
              <button uiButton variant="outline" size="icon" class="size-8" [disabled]="pageIndex() === 0" (click)="goToFirstPage()" aria-label="Go to first page">
                <span aria-hidden="true" [innerHTML]="firstPageIcon"></span>
              </button>
              <button uiButton variant="outline" size="icon" class="size-8" [disabled]="pageIndex() === 0" (click)="goToPreviousPage()" aria-label="Go to previous page">
                <span aria-hidden="true" [innerHTML]="chevronLeftIcon"></span>
              </button>
              <button uiButton variant="outline" size="icon" class="size-8" [disabled]="pageIndex() >= pageCount() - 1" (click)="goToNextPage()" aria-label="Go to next page">
                <span aria-hidden="true" [innerHTML]="chevronRightIcon"></span>
              </button>
              <button uiButton variant="outline" size="icon" class="size-8" [disabled]="pageIndex() >= pageCount() - 1" (click)="goToLastPage()" aria-label="Go to last page">
                <span aria-hidden="true" [innerHTML]="lastPageIcon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div uiTabsContent [value]="tabs.PastPerformance" class="flex flex-col px-4 lg:px-6">
        <div class="aspect-video w-full flex-1 rounded-lg border border-dashed border-border"></div>
      </div>
      <div uiTabsContent [value]="tabs.KeyPersonnel" class="flex flex-col px-4 lg:px-6">
        <div class="aspect-video w-full flex-1 rounded-lg border border-dashed border-border"></div>
      </div>
      <div uiTabsContent [value]="tabs.FocusDocuments" class="flex flex-col px-4 lg:px-6">
        <div class="aspect-video w-full flex-1 rounded-lg border border-dashed border-border"></div>
      </div>
    </div>
  `,
})
export class Dashboard01DataTableComponent {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly icons = DASHBOARD01_ICONS;
  protected readonly tabs = DataTableTab;
  protected readonly reviewerOptions = REVIEWER_OPTIONS;
  protected readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  protected readonly activeTab = signal<DataTableTab>(DataTableTab.Outline);
  protected readonly rows = signal<DashboardSectionRow[]>([...DASHBOARD_SECTION_ROWS]);
  protected readonly selectedIds = signal<Set<number>>(new Set());
  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal<number>(10);
  protected readonly showSectionType = signal(true);
  protected readonly showReviewer = signal(true);

  /** The row-detail drawer's mini chart reuses the last-30-days slice of the same dataset the "Total Visitors" card plots (matches upstream's own composition — the drawer literally re-renders the chart). */
  protected readonly drawerChartData = sliceLastDays(DASHBOARD_VISITORS_SERIES, 30);

  protected readonly pageCount = computed(() => Math.max(1, Math.ceil(this.rows().length / this.pageSize())));

  protected readonly pagedRows = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.rows().slice(start, start + this.pageSize());
  });

  private readonly pageAllSelected = computed(() => {
    const page = this.pagedRows();
    return page.length > 0 && page.every((row) => this.selectedIds().has(row.id));
  });

  private readonly pageSomeSelected = computed(
    () => this.pagedRows().some((row) => this.selectedIds().has(row.id)) && !this.pageAllSelected(),
  );

  protected readonly headerCheckedState = computed<boolean | 'indeterminate'>(() =>
    this.pageAllSelected() ? true : this.pageSomeSelected() ? 'indeterminate' : false,
  );

  private icon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(decorativeIcon(svg));
  }

  protected readonly dragIndicatorIcon = this.icon(DASHBOARD01_ICONS.dragIndicator);
  protected readonly checkCircleIcon = this.icon(DASHBOARD01_ICONS.checkCircle);
  protected readonly progressActivityIcon = this.icon(DASHBOARD01_ICONS.progressActivity);
  protected readonly moreVertIcon = this.icon(DASHBOARD01_ICONS.moreVert);
  protected readonly editIcon = this.icon(DASHBOARD01_ICONS.edit);
  protected readonly contentCopyIcon = this.icon(DASHBOARD01_ICONS.contentCopy);
  protected readonly starIcon = this.icon(DASHBOARD01_ICONS.star);
  protected readonly deleteIcon = this.icon(DASHBOARD01_ICONS.delete);
  protected readonly addIcon = this.icon(DASHBOARD01_ICONS.add);
  protected readonly keyboardArrowDownIcon = this.icon(DASHBOARD01_ICONS.keyboardArrowDown);
  protected readonly firstPageIcon = this.icon(DASHBOARD01_ICONS.firstPage);
  protected readonly lastPageIcon = this.icon(DASHBOARD01_ICONS.lastPage);
  protected readonly chevronLeftIcon = this.icon(DASHBOARD01_ICONS.chevronLeft);
  protected readonly chevronRightIcon = this.icon(DASHBOARD01_ICONS.chevronRight);
  protected readonly trendingUpIcon = this.icon(DASHBOARD01_ICONS.trendingUp);

  protected isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  protected onTabChange(value: string): void {
    if (isDataTableTab(value)) {
      this.activeTab.set(value);
    }
  }

  protected toggleRowSelected(id: number, checked: boolean | 'indeterminate'): void {
    this.selectedIds.update((ids) => {
      const next = new Set(ids);
      if (checked === true) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  protected onHeaderCheckedChange(checked: boolean | 'indeterminate'): void {
    const shouldSelect = checked === true;
    this.selectedIds.update((ids) => {
      const next = new Set(ids);
      for (const row of this.pagedRows()) {
        if (shouldSelect) {
          next.add(row.id);
        } else {
          next.delete(row.id);
        }
      }
      return next;
    });
  }

  /** Reorders rows within the current page only — see the class doc comment. */
  protected onDrop(event: CdkDragDrop<DashboardSectionRow[]>): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }
    const start = this.pageIndex() * this.pageSize();
    this.rows.update((current) => {
      const next = [...current];
      const page = next.slice(start, start + this.pageSize());
      moveItemInArray(page, event.previousIndex, event.currentIndex);
      next.splice(start, page.length, ...page);
      return next;
    });
  }

  protected onPageSizeChange(value: string): void {
    const size = Number(value);
    if (!Number.isFinite(size) || size <= 0) {
      return;
    }
    this.pageSize.set(size);
    this.pageIndex.set(0);
  }

  protected goToFirstPage(): void {
    this.pageIndex.set(0);
  }

  protected goToPreviousPage(): void {
    this.pageIndex.update((i) => Math.max(0, i - 1));
  }

  protected goToNextPage(): void {
    this.pageIndex.update((i) => Math.min(this.pageCount() - 1, i + 1));
  }

  protected goToLastPage(): void {
    this.pageIndex.set(this.pageCount() - 1);
  }

  /** No-op demo stub — appending fake rows to a static dataset has no product meaning; a real "Add Section" would route through a Service UI Flow, not mutate local state directly. */
  protected onAddSection(): void {
    // Intentional no-op — see method doc comment.
  }
}
