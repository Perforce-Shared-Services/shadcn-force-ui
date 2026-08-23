<script lang="ts">
	import * as Avatar from "@/svelte-ui/avatar/index.js";
	import { Bubble, BubbleContent } from "@/svelte-ui/bubble/index.js";
	import {
		Message,
		MessageAvatar,
		MessageContent,
		MessageGroup,
	} from "@/svelte-ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-6 py-12">
	<MessageGroup>
		<Message>
			<MessageAvatar />
			<MessageContent>
				<Bubble variant="muted">
					<BubbleContent>I checked the registry addresses.</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
		<Message>
			<MessageAvatar>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="@avatar" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</MessageAvatar>
			<MessageContent>
				<Bubble variant="muted">
					<BubbleContent>
						The component and example JSON now live under the UI registry.
					</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
	</MessageGroup>
</div>
