// [FORCE-UI] Ember port of sidebar block date-picker
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-12/components/date-picker.tsx)
// ponytail: static October-2024 month grid standing in for the react-day-picker
// based Calendar component — no calendar library exists in the ember stack.
// Upgrade path: port the calendar UI component, then render it here instead.
import {
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import { eq } from 'ember-truth-helpers';

import type { TOC } from '@ember/component/template-only';

const days = ['Mo','Tu','We','Th','Fr','Sa','Su'];

const weeks: number[][] = [
  [29, 30, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 1, 2],
];

const DatePicker: TOC<{ Element: HTMLDivElement; Blocks: { default: [] } }> =
  <template>
    <SidebarGroup class="px-0" ...attributes>
      <SidebarGroupContent>
        <div class="inline-flex w-full flex-col items-start gap-2 rounded-md border p-3 shadow-sm">
          <div class="flex w-full items-center justify-between">
            <button type="button" class="text-muted-foreground text-sm">‹</button>
            <div class="cn-font-heading font-medium">October 2024</div>
            <button type="button" class="text-muted-foreground text-sm">›</button>
          </div>
          <table role="grid" class="w-full border-collapse">
            <thead>
              <tr class="flex w-full">
                {{#each days as |day|}}
                  <th
                    role="columnheader"
                    class="text-muted-foreground w-[33px] rounded-md text-[0.8rem] font-normal"
                  >{{day}}</th>
                {{/each}}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {{#each weeks as |week|}}
                <tr role="row" class="flex w-full mt-2">
                  {{#each week as |day dayIndex|}}
                    <td
                      role="gridcell"
                      class="relative w-[33px] last:[&>span]:rounded-r-md first:[&>span]:rounded-l-md"
                    >
                      <span
                        class={{
                          if
                          (eq day 18)
                          "bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md text-sm font-medium"
                          "hover:bg-accent hover:text-accent-foreground flex size-8 items-center justify-center rounded-md text-sm"
                        }}
                      >{{day}}</span>
                    </td>
                  {{/each}}
                </tr>
              {{/each}}
            </tbody>
          </table>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  </template>;

export { DatePicker };
