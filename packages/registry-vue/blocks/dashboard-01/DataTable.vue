<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/dashboard-01
// ponytail: no dnd-kit equivalent in the Vue stack, so row drag-to-reorder is
// omitted; add a Vue DnD lib and restore the DraggableRow wrapper if needed.
import { h, ref, watch } from 'vue'
import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import type { ColumnDef, SortingState, VisibilityState } from '@tanstack/vue-table'
import z from 'zod'
import KeyboardArrowDown from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?component'
import Add from '@material-symbols/svg-400/rounded/add.svg?component'
import ChevronLeft from '@material-symbols/svg-400/rounded/chevron_left.svg?component'
import ChevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?component'
import FirstPage from '@material-symbols/svg-400/rounded/first_page.svg?component'
import LastPage from '@material-symbols/svg-400/rounded/last_page.svg?component'
import CheckCircle from '@material-symbols/svg-400/rounded/check_circle.svg?component'
import ProgressActivity from '@material-symbols/svg-400/rounded/progress_activity.svg?component'
import ViewColumn from '@material-symbols/svg-400/rounded/view_column.svg?component'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Label } from '@/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

type Schema = z.infer<typeof schema>

const props = defineProps<{ data: Schema[] }>()

const sorting = ref<SortingState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref<Record<string, boolean>>({})

function SelectAllCell({ table }: { table: any }) {
  return h('div', { class: 'flex items-center justify-center' }, [
    h(Checkbox, {
      modelValue:
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate') || false,
      'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
        table.toggleAllPageRowsSelected(value === true),
      'aria-label': 'Select all',
    }),
  ])
}

const columns: ColumnDef<Schema>[] = [
  {
    id: 'select',
    header: ({ table }) => h(SelectAllCell, { table }),
    cell: ({ row }) =>
      h('div', { class: 'flex items-center justify-center' }, [
        h(Checkbox, {
          modelValue: row.getIsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
            row.toggleSelected(value === true),
          'aria-label': 'Select row',
        }),
      ]),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'header',
    header: 'Header',
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: 'Section Type',
    cell: ({ row }) =>
      h('div', { class: 'w-32' }, [
        h(Badge, { variant: 'outline', class: 'px-1.5 text-muted-foreground' }, () => row.original.type),
      ]),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(Badge, { variant: 'outline', class: 'px-1.5 text-muted-foreground' }, () => [
        row.original.status === 'Done'
          ? h(CheckCircle, { class: 'fill-green-500 dark:fill-green-400' })
          : h(ProgressActivity),
        row.original.status,
      ]),
  },
  {
    accessorKey: 'target',
    header: 'Target',
  },
  {
    accessorKey: 'limit',
    header: 'Limit',
  },
  {
    accessorKey: 'reviewer',
    header: 'Reviewer',
  },
]

const table = useVueTable({
  data: props.data,
  columns,
  state: {
    get sorting() { return sorting.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
  getRowId: (row) => row.id.toString(),
  enableRowSelection: true,
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  onColumnVisibilityChange: (updater) => {
    columnVisibility.value = typeof updater === 'function' ? updater(columnVisibility.value) : updater
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

watch(() => props.data, (data) => table.setOptions((prev) => ({ ...prev, data })))
</script>

<template>
  <Tabs default-value="outline" class="w-full flex-col justify-start gap-6">
    <div class="flex items-center justify-between px-4 lg:px-6">
      <Label for="view-selector" class="sr-only">View</Label>
      <TabsList class="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
        <TabsTrigger value="outline">Outline</TabsTrigger>
        <TabsTrigger value="past-performance">
          Past Performance <Badge variant="secondary">3</Badge>
        </TabsTrigger>
      </TabsList>
      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">
              <ViewColumn />
              <span class="hidden lg:inline">Customize Columns</span>
              <span class="lg:hidden">Columns</span>
              <KeyboardArrowDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuCheckboxItem
              v-for="column in table.getAllColumns().filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())"
              :key="column.id"
              class="capitalize"
              :model-value="column.getIsVisible()"
              @update:model-value="(value) => column.toggleVisibility(!!value)"
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm">
          <Add />
          <span class="hidden lg:inline">Add Section</span>
        </Button>
      </div>
    </div>
    <TabsContent value="outline" class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <div class="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-muted">
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead v-for="header in headerGroup.headers" :key="header.id" :col-span="header.colSpan">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="**:data-[slot=table-cell]:first:w-8">
            <template v-if="table.getRowModel().rows?.length">
              <TableRow v-for="row in table.getRowModel().rows" :key="row.id" :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
            </template>
            <TableRow v-else>
              <TableCell :col-span="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class="flex items-center justify-between px-4">
        <div class="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div class="flex w-full items-center gap-8 lg:w-fit">
          <div class="hidden items-center gap-2 lg:flex">
            <Label for="rows-per-page" class="text-sm font-medium">Rows per page</Label>
            <Select
              :model-value="`${table.getState().pagination.pageSize}`"
              @update:model-value="(value) => table.setPageSize(Number(value))"
            >
              <SelectTrigger size="sm" class="w-20" id="rows-per-page">
                <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
                  {{ pageSize }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex w-fit items-center justify-center text-sm font-medium">
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </div>
          <div class="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              class="hidden h-8 w-8 p-0 lg:flex"
              @click="table.setPageIndex(0)"
              :disabled="!table.getCanPreviousPage()"
            >
              <span class="sr-only">Go to first page</span>
              <FirstPage />
            </Button>
            <Button
              variant="outline"
              class="size-8"
              size="icon"
              @click="table.previousPage()"
              :disabled="!table.getCanPreviousPage()"
            >
              <span class="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              class="size-8"
              size="icon"
              @click="table.nextPage()"
              :disabled="!table.getCanNextPage()"
            >
              <span class="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              class="hidden size-8 lg:flex"
              size="icon"
              @click="table.setPageIndex(table.getPageCount() - 1)"
              :disabled="!table.getCanNextPage()"
            >
              <span class="sr-only">Go to last page</span>
              <LastPage />
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
  </Tabs>
</template>
