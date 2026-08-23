import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"

// apps/v4/examples/base/dropdown-menu-rtl.tsx — the React example drives
// dir/labels from the language-selector translations (ar). Static Arabic
// labels + dir="rtl" render the same visual state (same convention as
// sheet-rtl.ts).
@Component({
  selector: "preview-dropdown-menu-rtl",
  standalone: true,
  imports: [
    Button,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
  ],
  template: `<div uiDropdownMenuRoot dir="rtl">
    <button uiButton variant="outline" uiDropdownMenuTrigger>افتح القائمة</button>
    <div uiDropdownMenuContent class="w-36" dir="rtl">
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuSub>
          <button uiDropdownMenuSubTrigger>الحساب</button>
          <div uiDropdownMenuSubContent dir="rtl">
            <button uiDropdownMenuItem>الملف الشخصي</button>
            <button uiDropdownMenuItem>الفوترة</button>
            <button uiDropdownMenuItem>الإعدادات</button>
          </div>
        </div>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>الفريق</div>
        <button uiDropdownMenuItem>الفريق</button>
        <div uiDropdownMenuSub>
          <button uiDropdownMenuSubTrigger>دعوة المستخدمين</button>
          <div uiDropdownMenuSubContent dir="rtl">
            <button uiDropdownMenuItem>البريد الإلكتروني</button>
            <button uiDropdownMenuItem>رسالة</button>
            <div uiDropdownMenuSub>
              <button uiDropdownMenuSubTrigger>المزيد</button>
              <div uiDropdownMenuSubContent dir="rtl">
                <button uiDropdownMenuItem>تقويم</button>
                <button uiDropdownMenuItem>دردشة</button>
                <div uiDropdownMenuSeparator></div>
                <button uiDropdownMenuItem>خطاف ويب</button>
              </div>
            </div>
            <div uiDropdownMenuSeparator></div>
            <button uiDropdownMenuItem>متقدم...</button>
          </div>
        </div>
        <button uiDropdownMenuItem>
          فريق جديد
          <span uiDropdownMenuShortcut>⌘+T</span>
        </button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>عرض</div>
        <button uiDropdownMenuCheckboxItem [(checked)]="showStatusBar">شريط الحالة</button>
        <button uiDropdownMenuCheckboxItem [(checked)]="showActivityBar">شريط النشاط</button>
        <button uiDropdownMenuCheckboxItem [(checked)]="showPanel">اللوحة</button>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <div uiDropdownMenuLabel>الموضع</div>
        <div uiDropdownMenuRadioGroup [(value)]="position">
          <button uiDropdownMenuRadioItem value="top">أعلى</button>
          <button uiDropdownMenuRadioItem value="bottom">أسفل</button>
          <button uiDropdownMenuRadioItem value="right">يمين</button>
          <button uiDropdownMenuRadioItem value="left">يسار</button>
        </div>
      </div>
      <div uiDropdownMenuSeparator></div>
      <div uiDropdownMenuGroup>
        <button uiDropdownMenuItem variant="destructive">تسجيل الخروج</button>
      </div>
    </div>
  </div>`,
})
export class DropdownMenuRtlComponent {
  protected readonly showStatusBar = signal(true)
  protected readonly showActivityBar = signal(false)
  protected readonly showPanel = signal(false)
  protected readonly position = signal("bottom")
}

export default DropdownMenuRtlComponent
