// [FORCE-UI] Ember port of examples/base/alert-rtl.tsx. The React version
// switches locales through the language selector; this port follows the
// existing ember RTL demo convention with a fixed dir attribute.
import CheckCircle2Icon from '~icons/ms/check_circle';
import InfoIcon from '~icons/ms/info';
import { Alert, AlertDescription, AlertTitle } from '@/ember-ui/alert';

<template>
  <div class="grid w-full max-w-md items-start gap-4" dir="rtl">
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>تم الدفع بنجاح</AlertTitle>
      <AlertDescription>
        تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان
        بريدك الإلكتروني.
      </AlertDescription>
    </Alert>
    <Alert>
      <InfoIcon />
      <AlertTitle>ميزة جديدة متاحة</AlertTitle>
      <AlertDescription>
        لقد أضفنا دعم الوضع الداكن. يمكنك تفعيله في إعدادات حسابك.
      </AlertDescription>
    </Alert>
  </div>
</template>
