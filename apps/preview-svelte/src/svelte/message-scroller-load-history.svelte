<script lang="ts">
	import {
		MessageScrollerProvider,
		MessageScroller,
		MessageScrollerViewport,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerButton,
	} from "@/svelte-ui/message-scroller/index.js";
	import { Button } from "@/svelte-ui/button/index.js";

	type Msg = { id: number; role: "user" | "assistant"; text: string };

	const recent: [Msg["role"], string][] = [
		["user", "…and that's where the transcript currently starts."],
		["assistant", "Got it. Older messages can be loaded above on demand."],
	];

	let historyOffset = $state(3);
	let messages = $state<Msg[]>(
		recent.map(([role, text], i) => ({ id: 100 + i, role, text }))
	);

	function loadHistory() {
		const older: Msg[] = [];
		for (let i = 0; i < 5; i++) {
			older.unshift({
				id: historyOffset--,
				role: i % 2 === 0 ? "user" : "assistant",
				text: `Archived message #${historyOffset + 1} from earlier in the conversation.`,
			});
		}
		// prepend; autoScroll is off so the reading position stays put
		messages = [...older, ...messages];
	}
</script>

<MessageScrollerProvider autoScroll={false}>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<div class="rounded-xl border bg-card">
			<MessageScroller class="h-80">
				<div class="p-2 text-center">
					<Button variant="ghost" size="sm" onclick={loadHistory}>
						Load earlier messages
					</Button>
				</div>
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
		<p class="text-muted-foreground text-center text-xs">
			autoScroll is disabled here so prepending keeps your place.
		</p>
	</div>
</MessageScrollerProvider>
