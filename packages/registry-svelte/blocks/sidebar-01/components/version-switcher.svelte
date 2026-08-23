<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-01 -->
<script lang="ts">
  import Check from "~icons/ms/check"
  import GalleryVerticalEnd from "~icons/ms/gallery_thumbnail"
  import ChevronsUpDown from "~icons/ms/unfold_more"
  import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    versions,
    defaultVersion,
  }: {
    versions: string[]
    defaultVersion: string
  } = $props()

  let selectedVersion = $state(defaultVersion)
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            {...props}
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <GalleryVerticalEnd class="size-4" />
            </div>
            <div class="flex flex-col gap-0.5 leading-none">
              <span class="font-medium">Documentation</span>
              <span class="">v{selectedVersion}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width)"
        align="start"
      >
        {#each versions as version (version)}
          <DropdownMenu.Item onSelect={() => (selectedVersion = version)}>
            v{version}
            {#if version === selectedVersion}<Check class="ml-auto" />{/if}
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
