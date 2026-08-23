<script lang="ts">
	import {
		MessageScrollerProvider,
		MessageScroller,
		MessageScrollerViewport,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerButton,
	} from "@/svelte-ui/message-scroller/index.js";
	import OpeningPosition from "./message-scroller-opening-position/opening-position.svelte";

	type Msg = { id: number; role: "user" | "assistant"; text: string };

	let messages = $state<Msg[]>([]);
	let nextId = $state(0);
	for (let i = 0; i < 14; i++) {
		messages.push({
			id: nextId++,
			role: i % 2 === 0 ? "user" : "assistant",
			text:
				i % 2 === 0
					? `Question #${i + 1} about the transcript API.`
					: `Answer #${i + 1} with plenty of detail to make this scroll.`,
		});
	}
</script>

<div class="mx-auto flex w-full max-w-sm flex-col gap-2">
	<p class="text-muted-foreground text-sm">
		This transcript opens pinned to the newest message instead of the top.
	</p>
	<MessageScrollerProvider autoScroll={false}>
		<div class="rounded-xl border bg-card">
			<MessageScroller class="h-80">
				<OpeningPosition position="end" />
				<MessageScrollerViewport>
					<MessageScrollerContent class="p-4 gap-2">
						{#each messages as message (message.id)}
							<MessageScrollerItem>
								<span
									class="inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm
										{message.role === 'user'
										? 'ml-auto bg-primary text-primary-foreground'
										: 'bg-muted'}"
								>
									{message.text}
								</span>
							</MessageScrollerItem>
						{/each}
					</MessageScrollerContent>
				</MessageScrollerViewport>
				<MessageScrollerButton />
			</MessageScroller>
		</div>
	</MessageScrollerProvider>
</div>
