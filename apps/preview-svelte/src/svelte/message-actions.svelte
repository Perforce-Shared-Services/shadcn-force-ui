<script lang="ts">
	import CopyIcon from "~icons/ms/content_copy";
	import RefreshIcon from "~icons/ms/refresh";
	import ThumbDownIcon from "~icons/ms/thumb_down";
	import ThumbUpIcon from "~icons/ms/thumb_up";
	import { Bubble, BubbleContent } from "@/svelte-ui/bubble/index.js";
	import { Button } from "@/svelte-ui/button/index.js";
	import {
		Message,
		MessageContent,
		MessageFooter,
	} from "@/svelte-ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Message>
		<MessageContent>
			<Bubble variant="muted">
				<BubbleContent>
					The install failure is coming from the workspace package.
				</BubbleContent>
			</Bubble>
			<MessageFooter>
				<Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
					<CopyIcon />
				</Button>
				<Button variant="ghost" size="icon" aria-label="Like" title="Like">
					<ThumbUpIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Dislike"
					title="Dislike"
				>
					<ThumbDownIcon />
				</Button>
			</MessageFooter>
		</MessageContent>
	</Message>
	<Message align="end">
		<MessageContent>
			<Bubble>
				<BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
			</Bubble>
			<MessageFooter class="gap-2">
				<span class="font-normal text-destructive">Failed to send</span>
				<Button variant="ghost" size="icon-xs" title="Retry" aria-label="Retry">
					<RefreshIcon />
				</Button>
			</MessageFooter>
		</MessageContent>
	</Message>
</div>
