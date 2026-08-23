// [FORCE-UI] Ember port of examples/base/typography-rtl.tsx. Arabic joke-tax
// article with a fixed rtl dir per the ember RTL demo convention.
<template>
  <div dir="rtl" class="max-w-2xl">
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
      فرض الضرائب على الضحك: سجلات ضريبة النكتة
    </h1>
    <p class="mt-6 text-xl leading-7 text-muted-foreground">
      في قديم الزمان، في أرض بعيدة، كان هناك ملك كسول جداً يقضي يومه كله
      مستلقياً على عرشه. في أحد الأيام، جاءه مستشاروه بمشكلة: المملكة كانت
      تنفد من المال.
    </p>
    <h2
      class="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    >
      خطة الملك
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      فكر الملك طويلاً وبجد، وأخيراً توصل إلى
      <a
        class="font-medium text-primary underline underline-offset-4"
        href="#"
      >خطة عبقرية</a>: سيفرض ضريبة على النكات في المملكة.
    </p>
    <blockquote class="mt-6 border-s-2 ps-6 italic">
      "في النهاية،" قال، "الجميع يستمتع بنكتة جيدة، لذا من العدل أن يدفعوا
      مقابل هذا الامتياز."
    </blockquote>
    <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
      ضريبة النكتة
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      لم يكن رعايا الملك سعداء. تذمروا واشتكوا، لكن الملك كان حازماً:
    </p>
    <ul class="my-6 ms-6 list-disc [&>li]:mt-2">
      <li>المستوى الأول من التورية: 5 قطع ذهبية</li>
      <li>المستوى الثاني من النكات: 10 قطع ذهبية</li>
      <li>المستوى الثالث من النكات القصيرة: 20 قطعة ذهبية</li>
    </ul>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      والملك، عندما رأى مدى سعادة رعاياه، أدرك خطأه وألغى ضريبة النكتة.
      أُعلن المازح بطلاً، وعاشت المملكة في سعادة دائمة.
    </p>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      مغزى القصة هو: لا تستهن أبداً بقوة الضحك الجيد وكن دائماً حذراً من
      الأفكار السيئة.
    </p>
  </div>
</template>
