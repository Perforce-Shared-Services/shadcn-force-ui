<script lang="ts">
	// Demo-only markdown renderer for bubble/message examples.
	// ponytail: regex-based subset (bold, italic, inline code, fences, lists,
	// headings, links) over static trusted content — swap in a real md pipeline
	// if user-generated content ever flows through here.
	import { cn } from "@/svelte-lib/utils.js";

	let { content, class: className }: { content: string; class?: string } = $props();

	const html = $derived.by(() => {
		const escaped = content
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
		return escaped
			.replace(/```([\s\S]*?)```/g, (_m: string, code: string) =>
				`<pre class="bg-muted my-2 overflow-x-auto rounded-md p-3 text-sm"><code>${code.trim()}</code></pre>`
			)
			.replace(/^### (.*)$/gm, '<h3 class="font-semibold text-lg mt-4 mb-1">$1</h3>')
			.replace(/^## (.*)$/gm, '<h2 class="font-semibold text-xl mt-4 mb-2">$1</h2>')
			.replace(/^\d+\. (.*)$/gm, '<li class="ms-5 list-decimal">$1</li>')
			.replace(/^- (.*)$/gm, '<li class="ms-5 list-disc">$1</li>')
			.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
			.replace(/\*(.+?)\*/g, "<em>$1</em>")
			.replace(
				/`([^`]+)`/g,
				'<code class="bg-muted rounded px-1 py-0.5 font-mono text-[0.85em]">$1</code>'
			)
			.replace(
				/\[([^\]]+)\]\(([^)]+)\)/g,
				'<a class="text-primary font-medium underline underline-offset-4" href="$2">$1</a>'
			);
	});
</script>

<div class={cn("text-sm leading-relaxed [&>li]:mt-1", className)}>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static trusted demo content -->
	{@html html}
</div>
