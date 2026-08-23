import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
  SheetPortal,
} from "@/angular-ui/sheet"

// apps/v4/examples/base/sheet-rtl.tsx — the React example drives dir/labels
// from the language-selector translations (ar). Static Arabic labels + dir="rtl"
// + side="left" render the same visual state.
@Component({
  selector: "preview-sheet-rtl",
  standalone: true,
  imports: [
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetClose,
    Button,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
  ],
  template: `
    <div uiSheet>
      <button uiButton variant="outline" uiSheetTrigger>فتح</button>
      <ng-template uiSheetPortal>
        <div uiSheetOverlay></div>
        <div uiSheetContent dir="rtl" side="left">
          <div uiSheetHeader>
            <h2 uiSheetTitle>تعديل الملف الشخصي</h2>
            <p uiSheetDescription>قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.</p>
          </div>
          <div uiFieldGroup class="px-4">
            <div uiField>
              <label uiFieldLabel for="sheet-rtl-name">الاسم</label>
              <input uiInput id="sheet-rtl-name" value="Pedro Duarte" />
            </div>
            <div uiField>
              <label uiFieldLabel for="sheet-rtl-username">اسم المستخدم</label>
              <input uiInput id="sheet-rtl-username" value="peduarte" />
            </div>
          </div>
          <div uiSheetFooter>
            <button uiButton type="submit">حفظ التغييرات</button>
            <button uiButton variant="outline" uiSheetClose>إغلاق</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class SheetRtlComponent {}

export default SheetRtlComponent
