<script lang="ts">
	import * as Avatar from "@/svelte-ui/avatar/index.js";
	import { Bubble, BubbleContent, BubbleGroup } from "@/svelte-ui/bubble/index.js";
	import {
		Message,
		MessageAvatar,
		MessageContent,
	} from "@/svelte-ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-6 py-12">
	<Message>
		<MessageAvatar>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@avatar" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</MessageAvatar>
		<MessageContent>
			<Bubble variant="muted">
				<BubbleContent>
					The build failed during dependency installation.
				</BubbleContent>
			</Bubble>
		</MessageContent>
	</Message>
	<Message align="end">
		<MessageAvatar>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/evilrabbit.png" alt="@avatar" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</MessageAvatar>
		<MessageContent>
			<Bubble>
				<BubbleContent>Can you share the exact error?</BubbleContent>
			</Bubble>
		</MessageContent>
	</Message>
	<Message>
		<MessageAvatar>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@avatar" />
				<Avatar.Fallback>R</Avatar.Fallback>
			</Avatar.Root>
		</MessageAvatar>
		<MessageContent>
			<BubbleGroup>
				<Bubble variant="muted">
					<BubbleContent>Here's the error from the logs</BubbleContent>
				</Bubble>
				<Bubble variant="muted">
					<BubbleContent>
						Something went wrong with the build. The libraries are not
						installed correctly. Try running the build again.
					</BubbleContent>
				</Bubble>
			</BubbleGroup>
		</MessageContent>
	</Message>
</div>
