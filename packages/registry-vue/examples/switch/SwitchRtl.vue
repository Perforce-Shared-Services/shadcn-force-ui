<script setup lang="ts">
import { ref } from 'vue'
import { Field, FieldContent, FieldDescription, FieldLabel } from '@/ui/field'
import { Switch } from '@/ui/switch'

const checked = ref(true)
</script>

<template>
  <Field orientation="horizontal" dir="rtl" class="max-w-sm">
    <FieldContent>
      <FieldLabel for="switch-focus-mode-rtl">المشاركة عبر الأجهزة</FieldLabel>
      <FieldDescription>
        تتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.
      </FieldDescription>
    </FieldContent>
    <Switch id="switch-focus-mode-rtl" v-model="checked" dir="rtl" />
  </Field>
</template>
