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

	let nextId = 0;
	const msg = (role: Msg["role"], text: string): Msg => ({
		id: nextId++,
		role,
		text,
	});

	let messages = $state<Msg[]>(
		Array.from({ length: 12 }, (_, i) =>
			msg(i % 2 === 0 ? "user" : "assistant", `Message ${i + 1}`)
		)
	);
</script>

<MessageScrollerProvider>
	<div class="relative h-80 w-full max-w-sm">
		<MessageScroller>
			<MessageScrollerViewport>
				<MessageScrollerContent class="p-4">
					{#each messages as message (message.id)}
						<MessageScrollerItem class="mb-2 w-full">
							<span
								class="inline-block max-w-[85%] rounded-lg px-3 py-2
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
