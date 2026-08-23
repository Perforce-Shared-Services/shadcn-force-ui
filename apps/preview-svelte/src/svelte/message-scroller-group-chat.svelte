<script lang="ts">
	import * as Avatar from "@/svelte-ui/avatar/index.js";
	import {
		MessageScrollerProvider,
		MessageScroller,
		MessageScrollerViewport,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerButton,
	} from "@/svelte-ui/message-scroller/index.js";

	type Msg = { id: number; who: "ada" | "linus" | "grace"; text: string };

	const people = {
		ada: { name: "Ada", img: "https://github.com/shadcn.png" },
		linus: { name: "Linus", img: "https://github.com/evilrabbit.png" },
		grace: { name: "Grace", img: "https://github.com/ghost.png" },
	} as const;

	const seed: [Msg["who"], string][] = [
		["ada", "Standup time! What's everyone on today?"],
		["linus", "Finishing the scroller port, edge cases are brutal."],
		["grace", "Docs for the blocks are almost done."],
		["ada", "Great. I'll take the registry build then."],
		["linus", "FYI the auto-follow only pins while you're at the bottom."],
		["grace", "That's the correct behavior honestly."],
	];

	let messages = $state<Msg[]>(seed.map(([who, text], i) => ({ id: i, who, text })));
	let nextId = $state(seed.length);

	function post() {
		const who = (Object.keys(people) as (keyof typeof people)[])[
			nextId % Object.keys(people).length
		];
		messages.push({ id: nextId++, who, text: `Automated check-in #${nextId}.` });
	}
</script>

<MessageScrollerProvider>
	<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
		<div class="rounded-xl border bg-card">
			<div class="border-b p-4">
				<p class="font-medium">Team standup</p>
			</div>
			<MessageScroller class="h-96">
				<MessageScrollerViewport>
					<MessageScrollerContent class="p-4 gap-3">
						{#each messages as message (message.id)}
							<MessageScrollerItem>
								<div class="flex items-start gap-2">
									<Avatar.Root class="size-7 shrink-0">
										<Avatar.Image src={people[message.who].img} alt={people[message.who].name} />
										<Avatar.Fallback>{people[message.who].name.slice(0, 1)}</Avatar.Fallback>
									</Avatar.Root>
									<div>
										<p class="text-muted-foreground text-xs font-medium">
											{people[message.who].name}
										</p>
										<p class="bg-muted inline-block rounded-lg px-3 py-1.5 text-sm">
											{message.text}
										</p>
									</div>
								</div>
							</MessageScrollerItem>
						{/each}
					</MessageScrollerContent>
				</MessageScrollerViewport>
				<MessageScrollerButton />
			</MessageScroller>
			<div class="border-t p-2">
				<button
					class="hover:bg-accent w-full rounded-md py-1.5 text-sm font-medium"
					onclick={post}
				>
					Simulate a teammate checking in
				</button>
			</div>
		</div>
	</div>
</MessageScrollerProvider>
