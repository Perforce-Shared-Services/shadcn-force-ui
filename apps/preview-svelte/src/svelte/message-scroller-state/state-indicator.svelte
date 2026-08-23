<script lang="ts">
	import { getMessageScrollerContext } from "@/svelte-ui/message-scroller/context.js";

	// must render inside MessageScrollerProvider
	const scroller = getMessageScrollerContext("ScrollerStateIndicator");
</script>

<div class="flex items-center gap-3 text-xs">
	<span
		class="rounded-full px-2 py-0.5 font-medium transition-colors {scroller.atStart
			? 'bg-primary text-primary-foreground'
			: 'bg-muted text-muted-foreground'}"
	>
		atStart
	</span>
	<span
		class="rounded-full px-2 py-0.5 font-medium transition-colors {scroller.atEnd
			? 'bg-primary text-primary-foreground'
			: 'bg-muted text-muted-foreground'}"
	>
		atEnd
	</span>
</div>
