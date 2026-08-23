import { Component } from "@angular/core"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/angular-ui/menubar"

// apps/v4/examples/base/menubar-rtl.tsx — the React example drives dir/labels
// from the language-selector translations (ar). Static Arabic labels +
// dir="rtl" render the same visual state (same convention as
// dropdown-menu-rtl.ts).
@Component({
  selector: "preview-menubar-rtl",
  standalone: true,
  imports: [
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarShortcut,
    MenubarSeparator,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
  ],
  template: `<div uiMenubar class="w-72" dir="rtl">
    <div uiMenubarMenu>
      <button uiMenubarTrigger>ملف</button>
      <div uiMenubarContent dir="rtl">
        <div uiMenubarGroup>
          <button uiMenubarItem>
            تبويب جديد <span uiMenubarShortcut>⌘T</span>
          </button>
          <button uiMenubarItem>
            نافذة جديدة <span uiMenubarShortcut>⌘N</span>
          </button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <div uiMenubarSub>
            <button uiMenubarSubTrigger>مشاركة</button>
            <div uiMenubarSubContent dir="rtl">
              <button uiMenubarItem>رابط البريد الإلكتروني</button>
              <button uiMenubarItem>الرسائل</button>
              <button uiMenubarItem>الملاحظات</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div uiMenubarMenu>
      <button uiMenubarTrigger>تحرير</button>
      <div uiMenubarContent dir="rtl">
        <div uiMenubarGroup>
          <button uiMenubarItem>
            تراجع <span uiMenubarShortcut>⌘Z</span>
          </button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarCheckboxItem>شريط المفضلة</button>
          <button uiMenubarCheckboxItem [checked]="true">العناوين الكاملة</button>
        </div>
      </div>
    </div>
    <div uiMenubarMenu>
      <button uiMenubarTrigger>الملفات الشخصية</button>
      <div uiMenubarContent dir="rtl">
        <div uiMenubarRadioGroup value="benoit">
          <button uiMenubarRadioItem value="andy">أندي</button>
          <button uiMenubarRadioItem value="benoit">بينوا</button>
          <button uiMenubarRadioItem value="luis">لويس</button>
        </div>
        <div uiMenubarSeparator></div>
        <div uiMenubarGroup>
          <button uiMenubarItem inset>تحرير...</button>
        </div>
      </div>
    </div>
  </div>`,
})
export class MenubarRtlComponent {}

export default MenubarRtlComponent
