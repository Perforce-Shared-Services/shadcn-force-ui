<script lang="ts">
	import Markdown from "../lib/markdown-demo.svelte";
	import { Bubble, BubbleContent } from "@/svelte-ui/bubble/index.js";

	const response = `Here's how to render markdown in a bubble:

1. Render assistant text through **Markdown**.
2. Keep user messages as plain text.
3. Use a \`ghost\` bubble so the response is unframed.
`;
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble align="end" variant="muted">
		<BubbleContent>
			<Markdown content={`Hello! Are you actually **thinking**?`} />
		</BubbleContent>
	</Bubble>
	<Bubble variant="ghost">
		<BubbleContent>
			<Markdown
				content={`Ghost bubbles work for assistant text, **markdown**, and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container. You can also render \`code\` in it.

Ghost bubbles are full width and can take the full width of the container.`}
			/>
		</BubbleContent>
	</Bubble>
</div>
