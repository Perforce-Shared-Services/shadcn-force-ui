<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Bubble, BubbleContent, BubbleGroup } from "$lib/registry/ui/bubble/index.js";
	import {
		Message,
		MessageAvatar,
		MessageContent,
		MessageFooter,
	} from "$lib/registry/ui/message/index.js";
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
				</Bubble>
			</BubbleGroup>
		</MessageContent>
	</Message>
</div>
