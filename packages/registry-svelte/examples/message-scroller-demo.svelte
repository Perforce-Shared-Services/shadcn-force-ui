<script lang="ts">
	import {
		MessageScrollerProvider,
		MessageScroller,
		MessageScrollerViewport,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerButton,
	} from "$lib/registry/ui/message-scroller/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	type Msg = { id: number; role: "user" | "assistant"; text: string };

	let messages = $state<Msg[]>(
		Array.from({ length: 8 }, (_, i) => ({
			id: i,
			role: (i % 2 === 0 ? "user" : "assistant") as Msg["role"],
			text: `Message ${i + 1}`,
		}))
	);
	let nextId = $state(8);
	let draft = $state("");

	function send() {
		const text = draft.trim();
		if (!text) return;
		messages.push({ id: nextId++, role: "user", text });
		draft = "";
	}
</script>

<MessageScrollerProvider>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<MessageScroller class="h-96 rounded-xl border bg-card">
			<MessageScrollerViewport>
				<MessageScrollerContent class="gap-2 p-4">
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
