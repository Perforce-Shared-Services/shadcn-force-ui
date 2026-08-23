// [FORCE-UI] Ember port of examples/base/sheet-rtl.tsx. Fixed rtl dir per
// the ember RTL demo convention.
import { Button } from '@/ember-ui/button';
import { Field, FieldGroup, FieldLabel } from '@/ember-ui/field';
import { Input } from '@/ember-ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ember-ui/sheet';

<template>
  <Sheet>
    <SheetTrigger>
      <Button @variant="outline">فتح</Button>
    </SheetTrigger>
    <SheetContent @side="left" dir="rtl">
      <SheetHeader>
        <SheetTitle>تعديل الملف الشخصي</SheetTitle>
        <SheetDescription>
          قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.
        </SheetDescription>
      </SheetHeader>
      <FieldGroup class="px-4">
        <Field>
          <FieldLabel @for="sheet-rtl-name">الاسم</FieldLabel>
          <Input id="sheet-rtl-name" defaultValue="Pedro Duarte" />
        </Field>
        <Field>
          <FieldLabel @for="sheet-rtl-username">اسم المستخدم</FieldLabel>
          <Input id="sheet-rtl-username" defaultValue="peduarte" />
        </Field>
      </FieldGroup>
      <SheetFooter>
        <Button type="submit">حفظ التغييرات</Button>
        <SheetClose asChild={{true}}>
          <Button @variant="outline">إغلاق</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
