<script lang="ts">
	import {
		MessageScrollerProvider,
		MessageScroller,
		MessageScrollerViewport,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerButton,
	} from "@/svelte-ui/message-scroller/index.js";
	import StateIndicator from "./message-scroller-state/state-indicator.svelte";

	type Msg = { id: number; role: "user" | "assistant"; text: string };

	const seed: [Msg["role"], string][] = [
		["user", "First message of a long thread."],
		["assistant", "Second message — scroll around and watch the pills update."],
		["user", "Third message."],
		["assistant", "Fourth message. The indicator shows which edge you're at."],
	];

	let messages = $state<Msg[]>(seed.map(([role, text], i) => ({ id: i, role, text })));
</script>

<MessageScrollerProvider>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<StateIndicator />
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
	</div>
</MessageScrollerProvider>
