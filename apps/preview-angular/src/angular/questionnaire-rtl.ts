import { Component } from "@angular/core"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/angular-ui/questionnaire"

// RTL — same flow as the demo with static Arabic labels and `dir="rtl"`.
// Layout is logical-property/`ms-auto`-based, so it mirrors automatically.
@Component({
  selector: "preview-questionnaire-rtl",
  standalone: true,
  imports: [
    Questionnaire,
    QuestionnaireProgress,
    QuestionnaireItem,
    QuestionnaireTitle,
    QuestionnaireDescription,
    QuestionnaireChoices,
    QuestionnaireChoice,
    QuestionnaireError,
    QuestionnaireActions,
    QuestionnairePrevious,
    QuestionnaireSkip,
    QuestionnaireNext,
    QuestionnaireSubmit,
  ],
  template: `
    <form
      uiQuestionnaire
      dir="rtl"
      class="mx-auto max-w-lg"
      aria-label="استبيان تخطيط النموذج الأولي"
    >
      <span uiQuestionnaireProgress></span>
      <fieldset uiQuestionnaireItem name="direction" required>
        <legend uiQuestionnaireTitle>ما الذي يجب أن نضع نموذجًا أوليًا له بعد؟</legend>
        <p uiQuestionnaireDescription>اختر اتجاهًا واحدًا أو اكتب إجابتك الخاصة.</p>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="delegation">تفويض الوكلاء الفرعيين</label>
          <label uiQuestionnaireChoice value="questions">أسئلة المطالبة</label>
          <label uiQuestionnaireChoice value="both">كلاهما معًا</label>
        </div>
        <div uiQuestionnaireError></div>
      </fieldset>
      <fieldset uiQuestionnaireItem name="signals" multiple>
        <legend uiQuestionnaireTitle>ما الذي يجب أن يتضمنه كل تحديث للتقدّم؟</legend>
        <p uiQuestionnaireDescription>حدد كل ما ينطبق، أو تخطَّ هذا السؤال.</p>
        <div uiQuestionnaireChoices>
          <label uiQuestionnaireChoice value="progress">التقدّم</label>
          <label uiQuestionnaireChoice value="decisions">القرارات</label>
          <label uiQuestionnaireChoice value="risks">المخاطر</label>
        </div>
        <div uiQuestionnaireError></div>
      </fieldset>
      <div uiQuestionnaireActions>
        <button uiQuestionnairePrevious></button>
        <button uiQuestionnaireSkip></button>
        <button uiQuestionnaireNext></button>
        <button uiQuestionnaireSubmit></button>
      </div>
    </form>
  `,
})
export class QuestionnaireRtlComponent {}

export default QuestionnaireRtlComponent
