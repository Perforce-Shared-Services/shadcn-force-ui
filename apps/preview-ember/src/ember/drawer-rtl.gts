// [FORCE-UI] Ember port of examples/base/drawer-rtl.tsx. Fixed rtl dir per
// the ember RTL demo convention; delivery-slot radio content simplified to
// static Arabic copy.
import { Button } from '@/ember-ui/button';
import { Field, FieldLabel } from '@/ember-ui/field';
import { Input } from '@/ember-ui/input';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ember-ui/drawer';

<template>
  <Drawer>
    <DrawerTrigger>
      <Button @variant="outline">فتح الدرج</Button>
    </DrawerTrigger>
    <DrawerContent dir="rtl">
      <DrawerHeader>
        <DrawerTitle>اختر وقت التوصيل</DrawerTitle>
        <DrawerDescription>سنجهز طلبك في أقرب وقت ممكن.</DrawerDescription>
      </DrawerHeader>
      <div class="flex-1 px-4">
        <Field>
          <FieldLabel @for="drawer-rtl-name">الاسم</FieldLabel>
          <Input id="drawer-rtl-name" dir="rtl" value="Pedro Duarte" />
        </Field>
      </div>
      <DrawerFooter>
        <Button type="submit">تأكيد وقت التوصيل</Button>
        <DrawerClose asChild={{true}}>
          <Button @variant="outline">إلغاء</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
