<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-07 -->
<script lang="ts">
  import Sparkles from "~icons/ms/auto_awesome_motion"
  import CreditCard from "~icons/ms/credit_card"
  import LogOut from "~icons/ms/logout"
  import Bell from "~icons/ms/notifications"
  import ChevronsUpDown from "~icons/ms/unfold_more"
  import BadgeCheck from "~icons/ms/verified"
  import * as Avatar from "$lib/registry/ui/avatar/index.js"
  import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js"
  import { useSidebar } from "$lib/registry/ui/sidebar/context.svelte.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    user,
  }: {
    user: { name: string; email: string; avatar: string }
  } = $props()

  const sidebar = useSidebar()
  const isMobile = $derived(sidebar.isMobile)
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
            <Avatar.Root class="h-8 w-8 rounded-lg">
              <Avatar.Image src={user.avatar} alt={user.name} />
              <Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user.name}</span>
              <span class="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar.Root class="h-8 w-8 rounded-lg">
              <Avatar.Image src={user.avatar} alt={user.name} />
              <Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user.name}</span>
              <span class="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <BadgeCheck />
            Account
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CreditCard />
            Billing
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Bell />
            Notifications
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <LogOut />
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
