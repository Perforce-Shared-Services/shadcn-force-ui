import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/angular-ui/dialog"
import { Field, FieldGroup } from "@/angular-ui/field"
import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"

// The React example drives dir/labels from the language-selector translations
// (ar). Static Arabic labels + dir="rtl" render the same visual state.
@Component({
  selector: "preview-dialog-rtl",
  standalone: true,
  imports: [DialogOverlay, Button, DialogRoot, DialogTrigger, DialogPortal, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Field, FieldGroup, Label, Input],
  template: `
    <div uiDialogRoot>
      <form class="grid gap-4">
        <button uiButton variant="outline" uiDialogTrigger type="button">
          فتح الحوار
        </button>
        <ng-template uiDialogPortal>
          <div uiDialogOverlay></div>
          <div uiDialogContent dir="rtl" class="sm:max-w-sm">
            <div uiDialogHeader>
              <h2 uiDialogTitle>تعديل الملف الشخصي</h2>
              <p uiDialogDescription>
                قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند
                الانتهاء.
              </p>
            </div>
            <div uiFieldGroup>
              <div uiField>
                <label uiLabel for="name-1">الاسم</label>
                <input uiInput id="name-1" name="name" value="Pedro Duarte" />
              </div>
              <div uiField>
                <label uiLabel for="username-1">اسم المستخدم</label>
                <input uiInput id="username-1" name="username" value="@peduarte" />
              </div>
            </div>
            <div uiDialogFooter>
              <button uiButton variant="outline" type="button" uiDialogClose>
                إلغاء
              </button>
              <button uiButton type="submit">حفظ التغييرات</button>
            </div>
          </div>
        </ng-template>
      </form>
    </div>
  `,
})
export class DialogRtlComponent {}

export default DialogRtlComponent
