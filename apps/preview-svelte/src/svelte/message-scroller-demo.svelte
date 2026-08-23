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
	import { Input } from "@/svelte-ui/input/index.js";

	type Msg = { id: number; role: "user" | "assistant"; text: string };

	const seed: [Msg["role"], string][] = [
		["user", "I'm building a chat for our app and the scroll behavior is driving me nuts."],
		[
			"assistant",
			"That's the classic streaming scroll problem. Wrap your message list in MessageScroller and turn on autoScroll — the viewport pins to the bottom as tokens arrive.",
		],
		[
			"user",
			"Okay, but when someone sends a new message the view still feels jarring.",
		],
		[
			"assistant",
			"Auto-scroll only runs while the reader is already at the bottom. The moment they scroll up, their position is preserved. The scroll button appears when there is unseen content below.",
		],
	];

	let messages = $state<Msg[]>(seed.map(([role, text], i) => ({ id: i, role, text })));
	let nextId = $state(seed.length);
	let draft = $state("");

	function send() {
		const text = draft.trim();
		if (!text) return;
		messages.push({ id: nextId++, role: "user", text });
		draft = "";
		// simulated reply exercises auto-follow
		setTimeout(() => {
			messages.push({
				id: nextId++,
				role: "assistant",
				text: `Got it — you said: "${text}"`,
			});
		}, 600);
	}
</script>

<MessageScrollerProvider>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<div class="rounded-xl border bg-card">
			<div class="gap-1 border-b p-4">
				<p class="font-medium">New Chat</p>
				<p class="text-muted-foreground text-sm">How can I help you today?</p>
			</div>
			<MessageScroller class="h-96">
				<MessageScrollerViewport>
					<MessageScrollerContent class="p-4 gap-2">
						{#each messages as message (message.id)}
							<MessageScrollerItem scrollAnchor={message.role === "user"}>
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
		<form
			class="flex gap-2"
			onsubmit={(e) => {
				e.preventDefault();
				send();
			}}
		>
			<Input bind:value={draft} placeholder="Type a message…" />
			<Button type="submit">Send</Button>
		</form>
	</div>
</MessageScrollerProvider>
