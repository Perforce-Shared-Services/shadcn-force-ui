<script lang="ts">
	import BookmarkIcon from "~icons/ms/bookmark";
	import HeartIcon from "~icons/ms/favorite";
	import InboxIcon from "~icons/ms/inbox";
	import StarIcon from "~icons/ms/star";
	import * as Empty from "$lib/registry/ui/empty/index.js";

	const states = [
		{ icon: InboxIcon, title: "No messages", description: "Your inbox is empty. New messages will appear here." },
		{ icon: StarIcon, title: "No favorites", description: "Items you mark as favorites will appear here." },
		{ icon: HeartIcon, title: "No likes yet", description: "Content you like will be saved here for easy access." },
		{ icon: BookmarkIcon, title: "No bookmarks", description: "Save interesting content by bookmarking it." },
	];
</script>

<div class="grid gap-8 md:grid-cols-2">
	{#each states as state (state.title)}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<state.icon />
				</Empty.Media>
				<Empty.Title>{state.title}</Empty.Title>
				<Empty.Description>{state.description}</Empty.Description>
			</Empty.Header>
		</Empty.Root>
	{/each}
</div>
