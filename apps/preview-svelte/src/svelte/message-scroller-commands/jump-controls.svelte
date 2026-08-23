<script lang="ts">
	import { getMessageScrollerContext } from "@/svelte-ui/message-scroller/context.js";
	import { Button } from "@/svelte-ui/button/index.js";

	// must render inside MessageScrollerProvider
	const scroller = getMessageScrollerContext("JumpControls");
</script>

<div class="flex gap-2">
	<Button variant="outline" size="sm" onclick={() => scroller.scrollTo("start")}>
		Jump to oldest ↑
	</Button>
	<Button variant="outline" size="sm" onclick={() => scroller.scrollTo("end")}>
		Jump to newest ↓
	</Button>
</div>
