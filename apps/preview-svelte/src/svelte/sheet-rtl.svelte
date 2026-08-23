<script lang="ts">
	import { Button, buttonVariants } from "@/svelte-ui/button/index.js";
	import * as Sheet from "@/svelte-ui/sheet/index.js";
	import { Input } from "@/svelte-ui/input/index.js";
	import { Label } from "@/svelte-ui/label/index.js";
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: "outline" })}>فتح</Sheet.Trigger>
	<Sheet.Content dir="rtl" side="left">
		<Sheet.Header>
			<Sheet.Title>تعديل الملف الشخصي</Sheet.Title>
			<Sheet.Description>
				قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.
			</Sheet.Description>
		</Sheet.Header>
		<div class="grid flex-1 auto-rows-min gap-6 px-4">
			<div class="grid gap-3">
				<Label for="sheet-rtl-name">الاسم</Label>
				<Input id="sheet-rtl-name" value="Pedro Duarte" />
			</div>
			<div class="grid gap-3">
				<Label for="sheet-rtl-username">اسم المستخدم</Label>
				<Input id="sheet-rtl-username" value="@peduarte" />
			</div>
		</div>
		<Sheet.Footer>
			<Button type="submit">حفظ التغييرات</Button>
			<Sheet.Close class={buttonVariants({ variant: "outline" })}>إغلاق</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
