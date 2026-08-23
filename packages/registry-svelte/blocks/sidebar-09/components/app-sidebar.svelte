<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-09 -->
<script lang="ts">
  import UsersIcon from "~icons/ms/group"
  import Command from "~icons/ms/keyboard_command_key"
  import Send from "~icons/ms/send"
  import Settings from "~icons/ms/settings"
  import * as Avatar from "$lib/registry/ui/avatar/index.js"
  import { Label } from "$lib/registry/ui/label/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"
  import { Switch } from "$lib/registry/ui/switch/index.js"

  import NavUser from "./nav-user.svelte"

  // This is sample data.
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }

  const navMain = [
    { title: "Inbox", icon: Send },
    { title: "Drafts", icon: Settings },
    { title: "Sent", icon: UsersIcon },
    { title: "Junk", icon: Command },
  ]

  const allMails = Array.from({ length: 12 }, (_, i) => ({
    name: `Encyclopedia Astronautica ${i + 1}`,
    email: `user${i + 1}@example.com`,
    subject: i % 2 === 0 ? "Launch Schedule Update" : "Mission Report",
    date: new Date(2024, 5, i + 1).toLocaleDateString("en-US"),
    teaser:
      "Lorem ipsum dolor sit amet consectetur. Sit vitae volutpat sagittis viverra semper.",
  }))

  // Note: using state to show active item; IRL you should use the url/router.
  let activeItem = $state(navMain[0])
  let mails = $state(allMails.slice(0, 8))
</script>

<Sidebar.Root
  collapsible="icon"
  class="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
>
  <!-- This is the first sidebar -->
  <!-- We disable collapsible and adjust width to icon. -->
  <!-- This will make the sidebar appear as icons. -->
  <Sidebar.Root
    collapsible="none"
    class="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
  >
    <Sidebar.Header>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton size="lg" class="md:h-8 md:p-0">
            {#snippet child({ props })}
              <a href="#" {...props}>
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                >
                  <Command class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">Acme Inc</span>
                  <span class="truncate text-xs">Enterprise</span>
                </div>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupContent class="px-1.5 md:px-0">
          <Sidebar.Menu>
            {#each navMain as item (item.title)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton
                  isActive={activeItem?.title === item.title}
                  class="px-2.5 md:px-2"
                  tooltipContent={item.title}
                  onclick={() => {
                    activeItem = item
                    mails = [...allMails]
                      .sort(() => Math.random() - 0.5)
                      .slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1))
                  }}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
      <NavUser {user} />
    </Sidebar.Footer>
  </Sidebar.Root>

  <!-- This is the second sidebar -->
  <!-- We disable collapsible and let it fill remaining space -->
  <Sidebar.Root collapsible="none" class="hidden flex-1 md:flex">
    <Sidebar.Header class="gap-3.5 border-b p-4">
      <div class="flex w-full items-center justify-between">
        <div class="text-base font-medium text-foreground">
          {activeItem?.title}
        </div>
        <Label class="flex items-center gap-2 text-sm">
          <span>Unreads</span>
          <Switch class="shadow-none" />
        </Label>
      </div>
      <Sidebar.Input placeholder="Type to search..." />
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group class="px-0">
        <Sidebar.GroupContent>
          {#each mails as mail (mail.email)}
            <a
              href="#"
              class="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div class="flex w-full items-center gap-2">
                <span>{mail.name}</span>
                <span class="ml-auto text-xs">{mail.date}</span>
              </div>
              <span class="font-medium">{mail.subject}</span>
              <span
                class="line-clamp-2 w-[260px] text-xs whitespace-break-spaces"
              >
                {mail.teaser}
              </span>
            </a>
          {/each}
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar.Root>
</Sidebar.Root>
