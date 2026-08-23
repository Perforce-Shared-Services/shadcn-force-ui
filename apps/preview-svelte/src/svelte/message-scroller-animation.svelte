<script lang="ts">
	import {
		MessageScrollerProvider,
		MessageScroller,
		MessageScrollerViewport,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerButton,
	} from "@/svelte-ui/message-scroller/index.js";

	type Msg = { id: number; role: "user" | "assistant"; text: string };

	const seed: [Msg["role"], string][] = [
		["user", "Do messages animate in?"],
		["assistant", "Yours do — each item fades and slides up as it mounts."],
	];

	let messages = $state<Msg[]>(seed.map(([role, text], i) => ({ id: i, role, text })));
	let nextId = $state(seed.length);

	function add() {
		messages.push({
			id: nextId++,
			role: nextId % 2 === 0 ? "user" : "assistant",
			text: `Animated message #${nextId}.`,
		});
	}
</script>

<style>
	@keyframes msg-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-in-item {
		animation: msg-in 220ms ease-out both;
	}
</style>

<MessageScrollerProvider>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<div class="rounded-xl border bg-card">
			<MessageScroller class="h-80">
				<MessageScrollerViewport>
					<MessageScrollerContent class="p-4 gap-2">
						{#each messages as message (message.id)}
							<MessageScrollerItem>
								<span
									class="animate-in-item inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm
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
		<button
			class="hover:bg-accent h-9 rounded-md border text-sm font-medium"
			onclick={add}
		>
			Add animated message
		</button>
	</div>
</MessageScrollerProvider>
