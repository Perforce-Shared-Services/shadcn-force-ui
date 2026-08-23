<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-10 -->
<script lang="ts">
  import Plus from "~icons/ms/add"
  import GalleryVerticalEnd from "~icons/ms/gallery_thumbnail"
  import Command from "~icons/ms/keyboard_command_key"
  import ChevronsUpDown from "~icons/ms/unfold_more"
  import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js"
  import { useSidebar } from "$lib/registry/ui/sidebar/context.svelte.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    teams,
  }: {
    teams: { name: string; logo: typeof GalleryVerticalEnd; plan: string }[]
  } = $props()

  const sidebar = useSidebar()
  // ponytail: single active team state, no persistence — matches React demo behavior
  let activeTeam = $state(teams[0])
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
              <activeTeam.logo class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{activeTeam.name}</span>
              <span class="truncate text-xs">{activeTeam.plan}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        align="start"
        side={sidebar.isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        <DropdownMenu.Group>
          <DropdownMenu.Label class="text-xs text-muted-foreground"
            >Teams</DropdownMenu.Label
          >
          {#each teams as team, index (team.name)}
            <DropdownMenu.Item
              onSelect={() => (activeTeam = team)}
              class="gap-2 p-2"
            >
              <div
                class="flex size-6 items-center justify-center rounded-md border"
              >
                <team.logo class="size-3.5 shrink-0" />
              </div>
              {team.name}
              <DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item class="gap-2 p-2">
          <div
            class="flex size-6 items-center justify-center rounded-md border bg-transparent"
          >
            <Plus class="size-4" />
          </div>
          <div class="font-medium text-muted-foreground">Add team</div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
