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
		["user", "…and that's where the visible thread starts."],
		["assistant", "Earlier turns can be pulled in above on demand."],
	];

	let historyOffset = $state(3);
	let messages = $state<Msg[]>(
		recent.map(([role, text], i) => ({ id: 100 + i, role, text }))
	);

	function loadPreviousContext() {
		const older: Msg[] = [];
		for (let i = 0; i < 3; i++) {
			older.unshift({
				id: historyOffset--,
				role: i % 2 === 0 ? "user" : "assistant",
				text: `Prior context #${historyOffset + 1}: earlier decisions that led to the current state.`,
			});
		}
		messages = [...older, ...messages];
	}
</script>

<MessageScrollerProvider autoScroll={false}>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<div class="rounded-xl border bg-card">
			<MessageScroller class="h-72">
				<div class="p-2 text-center">
					<Button variant="ghost" size="sm" onclick={loadPreviousContext}>
						Load previous context
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
	</div>
</MessageScrollerProvider>
