<script lang="ts">
	import CalendarIcon from "~icons/ms/calendar_month";
	import HouseIcon from "~icons/ms/house";
	import InboxIcon from "~icons/ms/inbox";
	import SearchIcon from "~icons/ms/search";
	import SettingsIcon from "~icons/ms/settings";
	import * as Sidebar from "@/svelte-ui/sidebar/index.js";

	// Menu items.
	const items = [
		{
			title: "الرئيسية",
			url: "#",
			icon: HouseIcon,
		},
		{
			title: "صندوق الوارد",
			url: "#",
			icon: InboxIcon,
		},
		{
			title: "التقويم",
			url: "#",
			icon: CalendarIcon,
		},
		{
			title: "البحث",
			url: "#",
			icon: SearchIcon,
		},
		{
			title: "الإعدادات",
			url: "#",
			icon: SettingsIcon,
		},
	];
</script>

<Sidebar.Provider dir="rtl">
	<Sidebar.Root>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>التطبيق</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={item.url} {...props}>
											<item.icon />
											<span>{item.title}</span>
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
	<Sidebar.Inset>
		<header class="flex h-12 items-center justify-between px-4">
			<Sidebar.Trigger />
		</header>
	</Sidebar.Inset>
</Sidebar.Provider>
