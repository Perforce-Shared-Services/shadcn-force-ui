// [FORCE-UI] Ember port of registry:block dashboard-01 data-table
// (React reference: apps/v4/registry/new-york-v4/blocks/dashboard-01/components/data-table.tsx)
// ponytail: plain sortable-free table standing in for the @tanstack/react-table
// version (drag-and-drop row ordering, faceted filters, column visibility,
// pagination) — those libraries have no ember equivalent in the monorepo.
// Upgrade path: add an ember table/headless dep or hand-roll stateful sorting.
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import DotsVertical from '~icons/ms/more_vert';
import Plus from '~icons/ms/add';

import type { TOC } from '@ember/component/template-only';

interface TableRowData {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

interface DataTableSignature {
  Element: HTMLDivElement;
  Args: {
    data: TableRowData[];
  };
  Blocks: { default: [] };
}

const DataTable: TOC<DataTableSignature> = <template>
  <div
    class="flex flex-col gap-4 px-4 lg:px-6"
    ...attributes
  >
    <div class="flex items-center justify-between px-1">
      <div class="text-sm font-medium">Documents</div>
      <Button @variant="outline" @size="sm">
        <Plus />
        Add document
      </Button>
    </div>
    <div class="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-12">
              <Checkbox aria-label="Select all" />
            </TableHead>
            <TableHead>Header</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Limit</TableHead>
            <TableHead>Reviewer</TableHead>
            <TableHead class="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {{#each @data as |row|}}
            <TableRow>
              <TableCell>
                <Checkbox aria-label="Select row {{row.id}}" />
              </TableCell>
              <TableCell class="font-medium">{{row.header}}</TableCell>
              <TableCell>{{row.type}}</TableCell>
              <TableCell>
                <Badge @variant="outline">{{row.status}}</Badge>
              </TableCell>
              <TableCell>{{row.target}}</TableCell>
              <TableCell>{{row.limit}}</TableCell>
              <TableCell>{{row.reviewer}}</TableCell>
              <TableCell>
                <Button @variant="ghost" @size="icon-xs">
                  <DotsVertical />
                  <span class="sr-only">Open menu</span>
                </Button>
              </TableCell>
            </TableRow>
          {{/each}}
        </TableBody>
      </Table>
    </div>
  </div>
</template>;

export { DataTable };
