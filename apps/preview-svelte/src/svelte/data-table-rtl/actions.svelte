<script lang="ts">
	import MoreHorizontalIcon from "~icons/ms/more_horiz";
	import { Button } from "@/svelte-ui/button/index.js";
	import * as DropdownMenu from "@/svelte-ui/dropdown-menu/index.js";

	let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" class="size-8 p-0">
				<span class="sr-only">فتح القائمة</span>
				<MoreHorizontalIcon class="size-4" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>الإجراءات</DropdownMenu.Label>
		<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
			نسخ معرف الدفع
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>عرض العميل</DropdownMenu.Item>
		<DropdownMenu.Item>عرض تفاصيل الدفع</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
