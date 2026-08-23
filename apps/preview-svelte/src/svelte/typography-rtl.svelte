<script lang="ts">
	const t = {
		title: "فرض الضرائب على الضحك: سجلات ضريبة النكتة",
		leadParagraph:
			"في قديم الزمان، في أرض بعيدة، كان هناك ملك كسول جداً يقضي يومه كله مستلقياً على عرشه. في أحد الأيام، جاءه مستشاروه بمشكلة: المملكة كانت تنفد من المال.",
		kingsPlan: "خطة الملك",
		brilliantPlan: "خطة عبقرية",
		blockquote:
			'"في النهاية،" قال، "الجميع يستمتع بنكتة جيدة، لذا من العدل أن يدفعوا مقابل هذا الامتياز."',
		jokeTax: "ضريبة النكتة",
		stoppedTelling:
			"نتيجة لذلك، توقف الناس عن رواية النكات، وغرقت المملكة في الكآبة.",
		jokestersRevolt: "ثورة المازح",
		discovered:
			"وبعد ذلك، في يوم من الأيام، اكتشف سكان المملكة أن النكات التي تركها المازح كانت مضحكة جداً لدرجة أنهم لم يستطيعوا منع أنفسهم من الضحك.",
		peoplesRebellion: "ثورة الشعب",
		uplifted:
			"شعر سكان المملكة بالبهجة من الضحك، وبدأوا في رواية النكات والتورية مرة أخرى، وسرعان ما أصبحت المملكة بأكملها جزءاً من النكتة.",
		kingsTreasury: "خزينة الملك",
		peoplesHappiness: "سعادة الشعب",
		empty: "فارغة",
		overflowing: "فائضة",
		modest: "متواضعة",
		satisfied: "راضٍ",
		realized:
			"الملك، عندما رأى مدى سعادة رعاياه، أدرك خطأه وألغى ضريبة النكتة. أُعلن المازح بطلاً، وعاشت المملكة في سعادة دائمة.",
		moral: "مغزى القصة هو: لا تستهن أبداً بقوة الضحك الجيد وكن دائماً حذراً من الأفكار السيئة.",
	};
</script>

<div dir="rtl">
	<h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
		{t.title}
	</h1>
	<p class="text-muted-foreground mt-6 text-xl leading-7 [&:not(:first-child)]:mt-6">
		{t.leadParagraph}
	</p>
	<h2
		class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		{t.kingsPlan}
	</h2>
	<p class="leading-7 [&:not(:first-child)]:mt-6">
		{t.kingsPlan}{" "}
		<a href="#" class="text-primary font-medium underline underline-offset-4">
			{t.brilliantPlan}
		</a>
	</p>
	<blockquote class="mt-6 border-s-2 ps-6 italic">{t.blockquote}</blockquote>
	<h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
		{t.jokeTax}
	</h3>
	<p class="leading-7 [&:not(:first-child)]:mt-6">{t.stoppedTelling}</p>
	<h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
		{t.jokestersRevolt}
	</h3>
	<p class="leading-7 [&:not(:first-child)]:mt-6">{t.discovered}</p>
	<h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
		{t.peoplesRebellion}
	</h3>
	<p class="leading-7 [&:not(:first-child)]:mt-6">{t.uplifted}</p>
	<div class="my-6 w-full overflow-y-auto">
		<table class="w-full">
			<thead>
				<tr class="even:bg-muted m-0 border-t p-0">
					<th class="border px-4 py-2 font-bold text-start">{t.kingsTreasury}</th>
					<th class="border px-4 py-2 font-bold text-start">
						{t.peoplesHappiness}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr class="even:bg-muted m-0 border-t p-0">
					<td class="border px-4 py-2 text-start">{t.empty}</td>
					<td class="border px-4 py-2 text-start">{t.overflowing}</td>
				</tr>
				<tr class="even:bg-muted m-0 border-t p-0">
					<td class="border px-4 py-2 text-start">{t.modest}</td>
					<td class="border px-4 py-2 text-start">{t.satisfied}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<p class="leading-7 [&:not(:first-child)]:mt-6">{t.realized}</p>
	<p class="leading-7 [&:not(:first-child)]:mt-6">{t.moral}</p>
</div>
