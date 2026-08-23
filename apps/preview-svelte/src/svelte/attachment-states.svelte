<script lang="ts">
	import CheckIcon from "~icons/ms/check";
	import ClockIcon from "~icons/ms/schedule";
	import FileTextIcon from "~icons/ms/description";
	import FileWarningIcon from "~icons/ms/warning";
	import RefreshIcon from "~icons/ms/refresh";
	import XIcon from "~icons/ms/close";
	import * as Attachment from "@/svelte-ui/attachment/index.js";
</script>

<div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
	<Attachment.Root state="idle" class="w-full">
		<Attachment.Media><ClockIcon /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>selected-file.pdf</Attachment.Title>
			<Attachment.Description>Ready to upload</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Remove selected-file.pdf"><XIcon /></Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root state="processing" class="w-full">
		<Attachment.Media><FileTextIcon /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>market-research.pdf</Attachment.Title>
			<Attachment.Description>Processing document</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Remove market-research.pdf"><XIcon /></Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root state="error" class="w-full">
		<Attachment.Media><FileWarningIcon /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>quarterly-report.pdf</Attachment.Title>
			<Attachment.Description>Upload failed — retry</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Retry upload"><RefreshIcon /></Attachment.Action>
			<Attachment.Action aria-label="Remove quarterly-report.pdf"><XIcon /></Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root state="done" class="w-full">
		<Attachment.Media><CheckIcon /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>design-system.zip</Attachment.Title>
			<Attachment.Description>Uploaded · 18 MB</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Remove design-system.zip"><XIcon /></Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
</div>
