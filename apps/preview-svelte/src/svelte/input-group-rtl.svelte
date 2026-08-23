<script lang="ts">
	import * as InputGroup from "@/svelte-ui/input-group/index.js";
	import * as Field from "@/svelte-ui/field/index.js";
	import { Spinner } from "@/svelte-ui/spinner/index.js";
	import SearchIcon from "~icons/ms/search";
</script>

<div class="grid w-full max-w-sm gap-6" dir="rtl">
	<InputGroup.Root class="max-w-xs">
		<InputGroup.Input placeholder="بحث..." />
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Addon align="inline-end">١٢ نتيجة</InputGroup.Addon>
	</InputGroup.Root>
	<InputGroup.Root>
		<InputGroup.Input placeholder="جاري البحث..." />
		<InputGroup.Addon align="inline-end">
			<Spinner />
		</InputGroup.Addon>
	</InputGroup.Root>
	<InputGroup.Root>
		<InputGroup.Input placeholder="جاري حفظ التغييرات..." />
		<InputGroup.Addon align="inline-end">
			<InputGroup.Text>جاري الحفظ...</InputGroup.Text>
			<Spinner />
		</InputGroup.Addon>
	</InputGroup.Root>
	<Field.Group class="max-w-sm">
		<Field.Field>
			<Field.Label for="rtl-textarea">منطقة النص</Field.Label>
			<InputGroup.Root>
				<InputGroup.Textarea id="rtl-textarea" placeholder="اكتب تعليقًا..." />
				<InputGroup.Addon align="block-end">
					<InputGroup.Text>٠/٢٨٠</InputGroup.Text>
					<InputGroup.Button variant="default" size="sm" class="ms-auto">
						نشر
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
			<Field.Description>تذييل موضع أسفل منطقة النص.</Field.Description>
		</Field.Field>
	</Field.Group>
</div>
