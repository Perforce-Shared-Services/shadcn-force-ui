<script lang="ts">
	import * as AspectRatio from "@/svelte-ui/aspect-ratio/index.js";
</script>

<figure class="w-full max-w-sm" dir="rtl">
	<AspectRatio.Root ratio={16 / 9} class="rounded-lg bg-muted">
		<img
			src="https://avatar.vercel.sh/shadcn1"
			alt="Landscape"
			class="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
		/>
	</AspectRatio.Root>
	<figcaption class="text-muted-foreground mt-2 text-center text-sm">
		منظر طبيعي جميل
	</figcaption>
</figure>
