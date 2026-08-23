<script lang="ts">
	import {
		MessageScrollerProvider,
		MessageScroller,
		MessageScrollerViewport,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerButton,
	} from "@/svelte-ui/message-scroller/index.js";
	import JumpControls from "./message-scroller-commands/jump-controls.svelte";

	type Msg = { id: number; role: "user" | "assistant"; text: string };

	const seed: [Msg["role"], string][] = [
		["user", "How do I scroll this transcript programmatically?"],
		["assistant", "Use the context's scrollTo('start' | 'end') — try the buttons below."],
		["user", "Nice, that's exactly the commands API I needed."],
		["assistant", "The jump button in the corner uses the same mechanism."],
	];

	let messages = $state<Msg[]>(seed.map(([role, text], i) => ({ id: i, role, text })));
	let draft = $state("");
	let nextId = $state(seed.length);

	function send() {
		const text = draft.trim();
		if (!text) return;
		messages.push({ id: nextId++, role: "user", text });
		draft = "";
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
		<JumpControls />
		<form
			class="flex gap-2"
			onsubmit={(e) => {
				e.preventDefault();
				send();
			}}
		>
			<input
				class="border-input flex h-9 w-full rounded-md border px-3 text-sm"
				bind:value={draft}
				placeholder="Type a message…"
			/>
			<button
				type="submit"
				class="bg-primary text-primary-foreground h-9 rounded-md px-4 text-sm font-medium"
			>
				Send
			</button>
		</form>
	</div>
</MessageScrollerProvider>
