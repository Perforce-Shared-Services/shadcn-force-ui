// [FORCE-UI] Ember port of sidebar block calendars
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-12/components/calendars.tsx)
import { eq, lt } from 'ember-truth-helpers';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import Check from '~icons/ms/check';
import ChevronRight from '~icons/ms/chevron_right';

import type { TOC } from '@ember/component/template-only';

export interface CalendarGroup {
  name: string;
  items: string[];
}

interface CalendarsSignature {
  Element: HTMLDivElement;
  Args: { calendars: CalendarGroup[] };
  Blocks: { default: [] };
}

const Calendars: TOC<CalendarsSignature> = <template>
  {{#each @calendars as |calendar index|}}
    <SidebarGroup class="py-0">
      <Collapsible @defaultOpen={{eq index 0}} class="group/collapsible">
        <SidebarGroupLabel
          @asChild={{true}}
          class="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            {{calendar.name}}
            <ChevronRight
              class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {{#each calendar.items as |item itemIndex|}}
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div
                      data-active={{lt itemIndex 2}}
                      class="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary"
                    >
                      <Check
                        class="hidden size-3 group-data-[active=true]/calendar-item:block"
                      />
                    </div>
                    {{item}}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              {{/each}}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
    <SidebarSeparator class="mx-0" />
  {{/each}}
</template>;

export { Calendars };
