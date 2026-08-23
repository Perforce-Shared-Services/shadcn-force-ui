<script lang="ts">
	import {
		MessageScrollerProvider,
		MessageScroller,
		MessageScrollerViewport,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerButton,
	} from "@/svelte-ui/message-scroller/index.js";

	type Msg = { id: number; role: "user" | "assistant"; text: string; done?: boolean };

	const replies = [
		"Sure — here's the plan broken into steps.\n\n1. Keep the reader pinned while tokens stream in.\n2. Stop following the moment they scroll up.",
		"The key detail is edge detection: following only happens within a threshold of the bottom edge.",
		"That way history reading is never interrupted by live traffic.",
	];

	let messages = $state<Msg[]>([]);
	let nextId = $state(0);
	let streaming = $state(false);
	let timers: ReturnType<typeof setTimeout>[] = [];

	function startStream() {
		if (streaming) return;
		streaming = true;
		const id = nextId++;
		messages.push({ id, role: "assistant", text: "", done: false });

		const full = replies[nextId % replies.length];
		let i = 0;
		const tick = () => {
			const msg = messages.find((m) => m.id === id);
			if (!msg) return;
			msg.text = full.slice(0, ++i);
			if (i < full.length) {
				timers.push(setTimeout(tick, 18));
			} else {
				msg.done = true;
				streaming = false;
			}
		};
		timers.push(setTimeout(tick, 200));
	}
</script>

<MessageScrollerProvider>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<div class="rounded-xl border bg-card">
			<MessageScroller class="h-80">
				<MessageScrollerViewport>
					<MessageScrollerContent class="p-4 gap-2">
						{#each messages as message (message.id)}
							<MessageScrollerItem>
								<span
									class="inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap
										{message.role === 'user'
										? 'ml-auto bg-primary text-primary-foreground'
										: 'bg-muted'}"
								>
									{message.text}{message.done === false ? "▍" : ""}
								</span>
							</MessageScrollerItem>
						{/each}
					</MessageScrollerContent>
				</MessageScrollerViewport>
				<MessageScrollerButton />
			</MessageScroller>
		</div>
		<div class="flex gap-2">
			<button
				class="bg-primary text-primary-foreground h-9 flex-1 rounded-md text-sm font-medium disabled:opacity-50"
				disabled={streaming}
				onclick={() => {
					messages.push({
						id: nextId++,
						role: "user",
						text: "Walk me through it again.",
					});
					startStream();
				}}
			>
				{streaming ? "Streaming…" : "Send & stream reply"}
			</button>
		</div>
	</div>
</MessageScrollerProvider>
