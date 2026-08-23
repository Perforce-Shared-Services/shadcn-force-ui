<script lang="ts">
	import DownloadIcon from "~icons/ms/download";
	import FileTextIcon from "~icons/ms/description";
	import * as Attachment from "@/svelte-ui/attachment/index.js";
	import { Bubble, BubbleContent } from "@/svelte-ui/bubble/index.js";
	import { Message, MessageContent } from "@/svelte-ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Message align="end">
		<MessageContent>
			<Attachment.Root orientation="vertical">
				<Attachment.Media variant="image">
					<img
						src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
						alt="Workspace"
					/>
				</Attachment.Media>
			</Attachment.Root>
			<Bubble>
				<BubbleContent>
					Here's the image. Can you add it to the PDF? Use it for the cover
					page.
				</BubbleContent>
			</Bubble>
		</MessageContent>
	</Message>
	<Message>
		<MessageContent>
			<Bubble variant="muted">
				<BubbleContent>
					Done. Here's the PDF with the image added as the cover page.
				</BubbleContent>
			</Bubble>
			<Attachment.Root>
				<Attachment.Media><FileTextIcon /></Attachment.Media>
				<Attachment.Content>
					<Attachment.Title>sales-dashboard.pdf</Attachment.Title>
					<Attachment.Description>PDF · 2.4 MB</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions>
					<Attachment.Action
						type="button"
						title="Download"
						aria-label="Download"
						size="icon-sm"
						variant="secondary"
					>
						<DownloadIcon />
					</Attachment.Action>
				</Attachment.Actions>
			</Attachment.Root>
		</MessageContent>
	</Message>
	<Message align="end">
		<MessageContent>
			<Bubble>
				<BubbleContent>Thanks. Looks good.</BubbleContent>
			</Bubble>
		</MessageContent>
	</Message>
</div>
