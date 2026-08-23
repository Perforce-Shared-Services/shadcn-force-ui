import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/angular-ui/bubble"
import { Component } from "@angular/core"

// apps/v4/examples/base has no bubble-rtl; RTL demos are a Force UI docs
// standard requirement. Static Arabic labels + dir="rtl" per port convention.
@Component({
  selector: "preview-bubble-rtl",
  standalone: true,
  imports: [Bubble, BubbleContent, BubbleGroup, BubbleReactions],
  template: `
    <div dir="rtl" class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiBubble variant="muted">
        <div uiBubbleContent>مرحبا! كيف يمكنني المساعدة اليوم؟</div>
      </div>
      <div uiBubbleGroup>
        <div uiBubble align="end"><div uiBubbleContent>أحتاج مساعدة في حسابي.</div></div>
        <div uiBubble align="end">
          <div uiBubbleContent>لا أستطيع تسجيل الدخول منذ الأمس.</div>
          <div uiBubbleReactions align="start" role="img" aria-label="تفاعل: عينان"><span>👀</span></div>
        </div>
      </div>
      <div uiBubble variant="muted">
        <div uiBubbleContent>سأقوم بالتحقق من ذلك لك الآن.</div>
        <div uiBubbleReactions role="img" aria-label="تفاعلات: إعجاب"><span>👍</span></div>
      </div>
    </div>
  `,
})
export class BubbleRtlComponent {}

export default BubbleRtlComponent
