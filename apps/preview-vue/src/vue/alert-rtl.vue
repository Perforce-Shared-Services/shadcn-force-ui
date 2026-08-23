<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert"
import CheckCircle2Icon from "@material-symbols/svg-400/rounded/check_circle.svg?component"
import InfoIcon from "@material-symbols/svg-400/rounded/info.svg?component"
</script>

<template>
  <div class="grid w-full max-w-md items-start gap-4" dir="rtl">
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>تم الدفع بنجاح</AlertTitle>
      <AlertDescription>
        تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك
        الإلكتروني.
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
