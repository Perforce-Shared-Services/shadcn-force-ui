<script lang="ts">
	import * as Avatar from "@/svelte-ui/avatar/index.js";
	import Markdown from "../lib/markdown-demo.svelte";
	import { Bubble, BubbleContent } from "@/svelte-ui/bubble/index.js";
	import {
		Message,
		MessageAvatar,
		MessageContent,
	} from "@/svelte-ui/message/index.js";

	const response = `Here's how to render markdown in a message:

1. Render assistant text through **Markdown**.
2. Keep user messages as plain text.
3. Use a \`ghost\` bubble so the response is unframed.
`;
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Message align="end">
		<MessageAvatar>
			<Avatar.Root>
				<Avatar.Image src="https://github.com/evilrabbit.png" alt="@me" />
				<Avatar.Fallback>ME</Avatar.Fallback>
			</Avatar.Root>
		</MessageAvatar>
		<MessageContent>
			<Bubble>
				<BubbleContent>
					How do I render markdown in a message?
				</BubbleContent>
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
			<Bubble variant="ghost">
				<BubbleContent>
					<Markdown content={response} />
				</BubbleContent>
			</Bubble>
		</MessageContent>
	</Message>
</div>
