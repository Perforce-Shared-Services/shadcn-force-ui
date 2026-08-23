// [FORCE-UI] Ember port of sidebar block search-form
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-01/components/search-form.tsx)
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';

import Search from '~icons/ms/search';

import type { TOC } from '@ember/component/template-only';

interface SearchFormSignature {
  Element: HTMLFormElement;
  Args: { class?: string };
  Blocks: { default: [] };
}

const SearchForm: TOC<SearchFormSignature> = <template>
  <form ...attributes>
    <SidebarGroup @class="py-0">
      <SidebarGroupContent class="relative">
        <Label @for="search" class="sr-only">Search</Label>
        <SidebarInput id="search" placeholder="Search the docs..." class="pl-8" />
        <Search
          class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  </form>
</template>;

export { SearchForm };
