<script lang="ts">
	import FileTextIcon from "~icons/ms/description";
	import * as Attachment from "@/svelte-ui/attachment/index.js";
</script>

<div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
	<Attachment.Root size="default" class="w-full">
		<Attachment.Media><FileTextIcon /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>Default attachment</Attachment.Title>
			<Attachment.Description>PDF · 2.4 MB</Attachment.Description>
		</Attachment.Content>
	</Attachment.Root>
	<Attachment.Root size="sm" class="w-full">
		<Attachment.Media><FileTextIcon /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>Small attachment</Attachment.Title>
			<Attachment.Description>PDF · 2.4 MB</Attachment.Description>
		</Attachment.Content>
	</Attachment.Root>
	<Attachment.Root size="xs" class="w-full">
		<Attachment.Media><FileTextIcon /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>Extra small attachment</Attachment.Title>
		</Attachment.Content>
	</Attachment.Root>
</div>
