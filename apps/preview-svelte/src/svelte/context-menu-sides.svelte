<script lang="ts">
	import * as ContextMenu from "@/svelte-ui/context-menu/index.js";

	const sides = [
		{ side: "top", fine: "Right click (top)", coarse: "Long press (top)" },
		{ side: "right", fine: "Right click (right)", coarse: "Long press (right)" },
		{ side: "bottom", fine: "Right click (bottom)", coarse: "Long press (bottom)" },
		{ side: "left", fine: "Right click (left)", coarse: "Long press (left)" },
	] as const;
</script>

<div class="grid w-full max-w-sm grid-cols-2 gap-4">
	{#each sides as { side, fine, coarse } (side)}
		<ContextMenu.Root>
			<ContextMenu.Trigger
				class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
			>
				<span class="pointer-coarse:hidden">{fine}</span>
				<span class="pointer-fine:hidden">{coarse}</span>
			</ContextMenu.Trigger>
			<ContextMenu.Content {side}>
				<ContextMenu.Group>
					<ContextMenu.Item>Back</ContextMenu.Item>
					<ContextMenu.Item>Forward</ContextMenu.Item>
					<ContextMenu.Item>Reload</ContextMenu.Item>
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Root>
	{/each}
</div>
