<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-13 -->
<script lang="ts">
  import CreditCard from "~icons/ms/credit_card"
  import UsersIcon from "~icons/ms/group"
  import Bell from "~icons/ms/notifications"
  import User from "~icons/ms/person"
  import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js"
  import { Button } from "$lib/registry/ui/button/index.js"
  import * as Dialog from "$lib/registry/ui/dialog/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let open = $state(false)

  const navItems = [
    { name: "Notifications", icon: Bell },
    { name: "Billing", icon: CreditCard },
    { name: "Profile", icon: User },
    { name: "Team", icon: UsersIcon },
  ]
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button size="sm" {...props}>Open Dialog</Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content
    class="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]"
  >
    <Dialog.Title class="sr-only">Settings</Dialog.Title>
    <Dialog.Description class="sr-only"
      >Customize your settings here.</Dialog.Description
    >
    <Sidebar.Provider class="items-start">
      <Sidebar.Root collapsible="none" class="hidden md:flex">
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {#each navItems as item (item.name)}
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      {#snippet child({ props })}
                        <a href="#" {...props}>
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      {/snippet}
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                {/each}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Root>
      <main class="flex h-[480px] flex-1 flex-col overflow-hidden">
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item class="hidden md:block">
                  <Breadcrumb.Link href="#Settings">Settings</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator class="hidden md:block" />
                <Breadcrumb.Item>
                  <Breadcrumb.Page>Messages & media</Breadcrumb.Page>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
          {#each Array(5) as _, i (i)}
            <div class="aspect-video max-w-3xl rounded-xl bg-muted/50"></div>
          {/each}
        </div>
      </main>
    </Sidebar.Provider>
  </Dialog.Content>
</Dialog.Root>
