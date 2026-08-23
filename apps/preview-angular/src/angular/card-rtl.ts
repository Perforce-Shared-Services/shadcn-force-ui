import { Button } from "@/angular-ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/angular-ui/card"
import { Input } from "@/angular-ui/input"
import { Label } from "@/angular-ui/label"
import { Component } from "@angular/core"

// apps/v4/examples/base/card-rtl.tsx — the React example drives dir/labels
// from the language-selector translations (ar). Static Arabic labels +
// dir="rtl" render the same visual state.
@Component({
  selector: "preview-card-rtl",
  standalone: true,
  imports: [Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label],
  template: `<div uiCard class="w-full max-w-sm" dir="rtl">
    <div uiCardHeader>
      <h3 uiCardTitle>تسجيل الدخول إلى حسابك</h3>
      <p uiCardDescription>أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك</p>
      <div uiCardAction><button uiButton variant="link">إنشاء حساب</button></div>
    </div>
    <div uiCardContent>
      <form>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <label uiLabel for="email-card-rtl">البريد الإلكتروني</label>
            <input uiInput id="email-card-rtl" type="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <label uiLabel for="password-card-rtl">كلمة المرور</label>
              <a href="#" class="ms-auto inline-block text-sm underline-offset-4 hover:underline">نسيت كلمة المرور؟</a>
            </div>
            <input uiInput id="password-card-rtl" type="password" required />
          </div>
        </div>
      </form>
    </div>
    <div uiCardFooter class="flex-col gap-2">
      <button uiButton type="submit" class="w-full">تسجيل الدخول</button>
      <button uiButton variant="outline" class="w-full">
        تسجيل الدخول باستخدام Google
      </button>
    </div>
  </div>`,
})
export class CardRtlComponent {}

export default CardRtlComponent
