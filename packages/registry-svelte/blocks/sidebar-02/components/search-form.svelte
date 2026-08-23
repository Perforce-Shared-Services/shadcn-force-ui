<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-02 -->
<script lang="ts">
  import Search from "~icons/ms/search"
  import { Label } from "$lib/registry/ui/label/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"
  import type { HTMLAttributes } from "svelte/elements"

  let { class: className, ...restProps }: HTMLAttributes<HTMLFormElement> =
    $props()
</script>

<form {...restProps}>
  <Sidebar.Group class="py-0">
    <Sidebar.GroupContent class="relative">
      <Label for="search" class="sr-only">Search</Label>
      <Sidebar.Input
        id="search"
        placeholder="Search the docs..."
        class="pl-8"
      />
      <Search
        class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none"
      />
    </Sidebar.GroupContent>
  </Sidebar.Group>
</form>
