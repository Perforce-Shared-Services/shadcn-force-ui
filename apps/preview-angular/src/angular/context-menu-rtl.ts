import { Component } from "@angular/core"

import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-rtl.tsx
//
// Per the established Angular RTL demo convention: static Arabic labels with
// `dir="rtl"` (the React example's trilingual useTranslation switch is a docs
// -site concern, not a component one).
// Material Symbols (ArrowLeftIcon → "arrow_left", ArrowRightIcon →
// "arrow_right", RotateCwIcon → "rotate_right" via material-symbols-map).
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="${d}"/></svg>`

const ARROW_LEFT = svg("M534-306 376-464q-3-3-5-7.06-2-4.07-2-8.94 0-4.88 2-8.94t5-7.06l158-158q2-2 4.76-3.5 2.77-1.5 5.92-1.5 6.32 0 10.82 4.12 4.5 4.13 4.5 10.88v328q0 6.75-4.64 10.87-4.63 4.13-10.81 4.13-1.55 0-10.55-5Z")
const ARROW_RIGHT = svg("M415.32-301q-6.32 0-10.82-4.13-4.5-4.12-4.5-10.87v-328q0-6.75 4.64-10.88 4.63-4.12 10.81-4.12 1.55 0 10.55 5l158 158q3 3 5 7.06t2 8.94q0 4.87-2 8.94-2 4.06-5 7.06L426-306q-2 2-4.76 3.5-2.77 1.5-5.92 1.5Z")
const ROTATE = svg("M804-488q-10 0-18.5-7T775-512q-5-24-14.5-47T737-605q-5-9-4-20t9-19q11-11 25-9.5t22 14.5q16 26 27 54.5t18 60.5q3 14-6 25t-24 11ZM526-116q0-10 7-18.5t17-10.5q23-5 46-14.5t46-23.5q9-5 19.5-4.5T680-179q11 11 9.5 25T675-132q-27 17-55.5 28T562-86q-14 3-25-6t-11-24Zm216-126q-7-7-8-18.5t4-20.5q14-23 23-46t14-47q2-10 10-17t19-7q15 0 23.5 10.5T833-363q-8 32-19 61t-26 55q-8 13-21.5 14.5T742-242ZM401-86q-123-28-201-127t-78-230q0-151 104.5-255.5T482-803h20l-57-57q-9-9-9-22t9-22q9-9 22-9t22 9l110 110q5 5 7 10t2 11q0 6-2 11t-7 10L489-642q-9 9-22 9t-22-9q-9-9-9-22t9-22l57-57h-20q-127 0-213.5 86.5T182-443q0 110 65 190.5T413-146q10 2 17 10.5t7 19.5q0 15-11 24t-25 6Z")

@Component({
  selector: "preview-context-menu-rtl",
  standalone: true,
  imports: [
    ContextMenuRoot,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
    ContextMenuSeparator,
    ContextMenuCheckboxItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuLabel,
  ],
  template: `<div uiContextMenuRoot dir="rtl">
    <div
      uiContextMenuTrigger
      class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
      dir="rtl"
    >
      <span class="hidden pointer-fine:inline-block">انقر بزر الماوس الأيمن هنا</span>
      <span class="hidden pointer-coarse:inline-block">اضغط مطولاً هنا</span>
    </div>
    <div uiContextMenuContent class="w-48" dir="rtl">
      <div uiContextMenuGroup>
        <div uiContextMenuSub>
          <button uiContextMenuSubTrigger>التنقل</button>
          <div uiContextMenuSubContent class="w-44" dir="rtl">
            <div uiContextMenuGroup>
              <button uiContextMenuItem>
                <svg aria-hidden="true" focusable="false" [innerHTML]="arrowLeft"></svg>
                رجوع
                <span uiContextMenuShortcut>⌘[</span>
              </button>
              <button uiContextMenuItem disabled>
                <svg aria-hidden="true" focusable="false" [innerHTML]="arrowRight"></svg>
                تقدم
                <span uiContextMenuShortcut>⌘]</span>
              </button>
              <button uiContextMenuItem>
                <svg aria-hidden="true" focusable="false" [innerHTML]="reload"></svg>
                إعادة تحميل
                <span uiContextMenuShortcut>⌘R</span>
              </button>
            </div>
          </div>
        </div>
        <div uiContextMenuSub>
          <button uiContextMenuSubTrigger>المزيد من الأدوات</button>
          <div uiContextMenuSubContent class="w-44" dir="rtl">
            <div uiContextMenuGroup>
              <button uiContextMenuItem>حفظ الصفحة...</button>
              <button uiContextMenuItem>إنشاء اختصار...</button>
              <button uiContextMenuItem>تسمية النافذة...</button>
            </div>
            <div uiContextMenuSeparator></div>
            <div uiContextMenuGroup>
              <button uiContextMenuItem>أدوات المطور</button>
            </div>
            <div uiContextMenuSeparator></div>
            <div uiContextMenuGroup>
              <button uiContextMenuItem variant="destructive">حذف</button>
            </div>
          </div>
        </div>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <button uiContextMenuCheckboxItem [checked]="true">إظهار الإشارات المرجعية</button>
        <button uiContextMenuCheckboxItem>إظهار عناوين URL الكاملة</button>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <div uiContextMenuRadioGroup value="pedro">
          <div uiContextMenuLabel>الأشخاص</div>
          <button uiContextMenuRadioItem value="pedro">Pedro Duarte</button>
          <button uiContextMenuRadioItem value="colm">Colm Tuite</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class ContextMenuRtlComponent {
  protected readonly arrowLeft = ARROW_LEFT
  protected readonly arrowRight = ARROW_RIGHT
  protected readonly reload = ROTATE
}

export default ContextMenuRtlComponent
