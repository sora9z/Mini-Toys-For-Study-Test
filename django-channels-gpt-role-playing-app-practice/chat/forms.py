from django import forms

from chat.translators import google_translate
from .models import RolePlayingRoom


class RolePlayingRoomForm(forms.ModelForm):
    class Meta:
        # 자동으로 Form 필드들을 생성
        # 사용자에게 제공학 HTML 입력 필드들을 이 Form 클래스가 생성, 유효성검사를 수행 
        model = RolePlayingRoom
        fields = [
            "language",
            "level",
            "situation",
            "situation_en",
            "my_role",
            "my_role_en",
            "gpt_role",
            "gpt_role_en",
        ]

    # clean method override. 이 메서드를 통해 여러 필드에 대한 유요성 검사를 수행할 수 있다.
    def clean(self):
        situation = self.cleaned_data.get("situation")
        situation_en = self.cleaned_data.get("situation_en")
        if situation and not situation_en:
            self.cleaned_data["situation_en"] = self._translate(situation)

        my_role = self.cleaned_data.get("my_role")
        my_role_en = self.cleaned_data.get("my_role_en")
        if my_role and not my_role_en:
            self.cleaned_data["my_role_en"] = self._translate(my_role)

        gpt_role = self.cleaned_data.get("gpt_role")
        gpt_role_en = self.cleaned_data.get("gpt_role_en")
        if gpt_role and not gpt_role_en:
            self.cleaned_data["gpt_role_en"] = self._translate(gpt_role)
        
    @staticmethod
    def _translate(original_text:str)->str:
        translated = google_translate(original_text, "auto", "en")
        if not translated:
            raise forms.ValidationError("번역 실패")
        return translated