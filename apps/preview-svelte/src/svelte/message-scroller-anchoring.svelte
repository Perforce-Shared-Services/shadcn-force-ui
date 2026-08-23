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

	type Msg = { id: number; role: "user" | "assistant"; text: string; done?: boolean };

	let messages = $state<Msg[]>([]);
	let nextId = $state(0);
	let streaming = $state(false);
	let timers: ReturnType<typeof setTimeout>[] = [];

	function seed() {
		for (let i = 0; i < 8; i++) {
			messages.push({
				id: nextId++,
				role: i % 2 === 0 ? "user" : "assistant",
				text:
					i % 2 === 0
						? `Question #${i + 1} to fill out the transcript.`
						: `Answer #${i + 1}, long enough to make the viewport scroll.`,
			});
		}
	}
	seed();

	function streamOne() {
		if (streaming) return;
		streaming = true;
		const id = nextId++;
		messages.push({ id, role: "assistant", text: "", done: false });
		const full = `Streaming reply #${id}: the anchor item keeps the newest message pinned while its content grows, and following stops as soon as you scroll away.`;
		let i = 0;
		const tick = () => {
			const msg = messages.find((m) => m.id === id);
			if (!msg) return;
			msg.text = full.slice(0, ++i);
			if (i < full.length) {
				timers.push(setTimeout(tick, 16));
			} else {
				msg.done = true;
				streaming = false;
			}
		};
		timers.push(setTimeout(tick, 150));
	}
</script>

<MessageScrollerProvider>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<p class="text-muted-foreground text-sm">
			The last item is marked with <code>scrollAnchor</code>. While you're at the
			bottom it stays pinned as the text streams in — scroll up and the reader's
			position is respected instead.
		</p>
		<div class="rounded-xl border bg-card">
			<MessageScroller class="h-80">
				<MessageScrollerViewport>
					<MessageScrollerContent class="p-4 gap-2">
						{#each messages as message (message.id)}
							<MessageScrollerItem scrollAnchor={message.id === messages.at(-1)?.id}>
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
		<Button onclick={streamOne} disabled={streaming}>
			{streaming ? "Streaming…" : "Stream an anchored reply"}
		</Button>
	</div>
</MessageScrollerProvider>
