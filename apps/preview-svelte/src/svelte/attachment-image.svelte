<script lang="ts">
	import * as Attachment from "@/svelte-ui/attachment/index.js";

	const image = {
		name: "workspace.png",
		meta: "PNG · 820 KB",
		src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
	};
</script>

<div class="mx-auto w-full max-w-sm py-12">
	<Attachment.Root orientation="vertical" class="w-64">
		<Attachment.Media variant="image">
			<img src={image.src} alt={image.name} />
		</Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>{image.name}</Attachment.Title>
			<Attachment.Description>{image.meta}</Attachment.Description>
		</Attachment.Content>
	</Attachment.Root>
</div>
