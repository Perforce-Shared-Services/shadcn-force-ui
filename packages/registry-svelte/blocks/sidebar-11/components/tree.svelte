<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-11 -->
<script lang="ts">
  import ChevronRight from "~icons/ms/chevron_right"
  import FileIcon from "~icons/ms/description"
  import FolderIcon from "~icons/ms/folder"
  import * as Collapsible from "$lib/registry/ui/collapsible/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import Self from "./tree.svelte"

  type TreeItem = string | TreeItem[]

  let { item }: { item: TreeItem } = $props()

  const [name, ...items] = Array.isArray(item) ? item : [item]

  let open = $state(name === "components" || name === "ui")
</script>

{#if !items.length}
  <Sidebar.MenuButton class="data-[active=true]:bg-transparent">
    <FileIcon />
    {name}
  </Sidebar.MenuButton>
{:else}
  <Sidebar.MenuItem>
    <Collapsible.Root
      class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      bind:open
    >
      <Collapsible.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton {...props}>
            <ChevronRight class="transition-transform" />
            <FolderIcon />
            {name}
          </Sidebar.MenuButton>
        {/snippet}
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Sidebar.MenuSub>
          {#each items as subItem, index (index)}
            <Self item={subItem} />
          {/each}
        </Sidebar.MenuSub>
      </Collapsible.Content>
    </Collapsible.Root>
  </Sidebar.MenuItem>
{/if}
