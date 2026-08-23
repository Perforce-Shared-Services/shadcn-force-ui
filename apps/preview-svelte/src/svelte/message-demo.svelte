<script lang="ts">
	import * as Avatar from "@/svelte-ui/avatar/index.js";
	import {
		Bubble,
		BubbleContent,
		BubbleGroup,
		BubbleReactions,
	} from "@/svelte-ui/bubble/index.js";
	import { Marker, MarkerContent } from "@/svelte-ui/marker/index.js";
	import {
		Message,
		MessageAvatar,
		MessageContent,
		MessageFooter,
	} from "@/svelte-ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-6 py-12">
	<Message align="end">
		<MessageAvatar>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/evilrabbit.png" alt="@me" />
				<Avatar.Fallback>ME</Avatar.Fallback>
			</Avatar.Root>
		</MessageAvatar>
		<MessageContent>
			<Bubble>
				<BubbleContent>Deploying to prod real quick.</BubbleContent>
			</Bubble>
		</MessageContent>
	</Message>
	<Message>
		<MessageAvatar>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@rabbit" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</MessageAvatar>
		<MessageContent>
			<Bubble variant="muted">
				<BubbleContent>It's 4:55 PM. On a Friday.</BubbleContent>
			</Bubble>
		</MessageContent>
	</Message>
	<Message align="end">
		<MessageAvatar>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/evilrabbit.png" alt="@me" />
				<Avatar.Fallback>ME</Avatar.Fallback>
			</Avatar.Root>
		</MessageAvatar>
		<MessageContent>
			<Bubble>
				<BubbleContent>It's a one-line change.</BubbleContent>
			</Bubble>
			<MessageFooter>Delivered</MessageFooter>
		</MessageContent>
	</Message>
	<Message>
		<MessageAvatar>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@rabbit" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</MessageAvatar>
		<MessageContent>
			<BubbleGroup>
				<Bubble variant="muted">
					<BubbleContent>It's always a one-line change 😭.</BubbleContent>
				</Bubble>
				<Bubble variant="muted">
					<BubbleContent>Alright, let me take a look.</BubbleContent>
					<BubbleReactions aria-label="Reactions: thumbs up">
						<span>👍</span>
					</BubbleReactions>
				</Bubble>
			</BubbleGroup>
		</MessageContent>
	</Message>
	<Marker role="status">
		<MarkerContent class="shimmer">
			<span class="font-medium">Oliver</span> is typing...
		</MarkerContent>
	</Marker>
</div>
