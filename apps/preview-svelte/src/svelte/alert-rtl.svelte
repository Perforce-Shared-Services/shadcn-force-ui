<script lang="ts">
	import * as Alert from "@/svelte-ui/alert/index.js";
	import CheckCircle2Icon from "~icons/ms/check_circle";
	import InfoIcon from "~icons/ms/info";
</script>

<div class="grid w-full max-w-md items-start gap-4" dir="rtl">
	<Alert.Root>
		<CheckCircle2Icon />
		<Alert.Title>تم الدفع بنجاح</Alert.Title>
		<Alert.Description>
			تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك الإلكتروني.
		</Alert.Description>
	</Alert.Root>
	<Alert.Root>
		<InfoIcon />
		<Alert.Title>ميزة جديدة متاحة</Alert.Title>
		<Alert.Description>
			لقد أضفنا دعم الوضع الداكن. يمكنك تفعيله في إعدادات حسابك.
		</Alert.Description>
	</Alert.Root>
</div>
