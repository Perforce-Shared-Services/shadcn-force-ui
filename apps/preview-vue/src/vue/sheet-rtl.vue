<script setup lang="ts">
import { Button } from "@/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet"
import { ref } from "vue"

const side = ref<"right" | "left">("right")
</script>

<template>
  <div dir="rtl" class="flex gap-2">
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" @click="side = 'right'"
          >افتح من اليمين</Button
        >
      </SheetTrigger>
      <SheetContent :side="side" dir="rtl">
        <SheetHeader>
          <SheetTitle>لوحة جانبية</SheetTitle>
          <SheetDescription>
            تدعم اللوحة الاتجاه من اليمين إلى اليسار.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" @click="side = 'left'">افتح من اليسار</Button>
      </SheetTrigger>
      <SheetContent :side="side" dir="rtl">
        <SheetHeader>
          <SheetTitle>لوحة جانبية</SheetTitle>
          <SheetDescription>اتجاه أقصى اليسار.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  </div>
</template>
