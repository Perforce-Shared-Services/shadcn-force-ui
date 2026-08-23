<script lang="ts">
	import CopyIcon from "~icons/ms/content_copy";
	import FileSearchIcon from "~icons/ms/plagiarism";
	import XIcon from "~icons/ms/close";
	import * as Attachment from "@/svelte-ui/attachment/index.js";
	import * as Dialog from "@/svelte-ui/dialog/index.js";
	import { Button } from "@/svelte-ui/button/index.js";

	let open = $state(false);
</script>

<div class="mx-auto w-full max-w-sm py-12">
	<Dialog.Root bind:open>
		<Attachment.Root class="relative w-full">
			<Attachment.Media><FileSearchIcon /></Attachment.Media>
			<Attachment.Content>
				<Attachment.Title>research-summary.pdf</Attachment.Title>
				<Attachment.Description>Open preview dialog</Attachment.Description>
			</Attachment.Content>
			<Attachment.Actions>
				<Attachment.Action aria-label="Copy link"><CopyIcon /></Attachment.Action>
				<Attachment.Action aria-label="Remove research-summary.pdf"><XIcon /></Attachment.Action>
			</Attachment.Actions>
			<!-- [FORCE-UI] the trigger overlays the card; actions sit above it via z-index -->
			<button
				class="absolute inset-0 z-0"
				aria-label="Preview research-summary.pdf"
				onclick={() => (open = true)}
				type="button"
			></button>
		</Attachment.Root>
		<Dialog.Content class="sm:max-w-md">
			<Dialog.Header>
				<Dialog.Title>research-summary.pdf</Dialog.Title>
				<Dialog.Description>
					The attachment trigger fills the card and opens the dialog, while
					the actions stay independently clickable above it.
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</div>
