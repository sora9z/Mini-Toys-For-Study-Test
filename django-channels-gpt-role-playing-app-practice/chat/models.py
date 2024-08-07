from typing import TypedDict, Literal, List
from django.conf import settings
from django.db import models
from django.urls import reverse

# TypedDict은 사전으로 사용이 되지만 타입으로도 지정할 수 있다.
class GptMessage(TypedDict):
    role : Literal["system","user","assistant"]
    content : str

# Create your models here.
class RolePlayingRoom(models.Model):
    class Language(models.TextChoices):
        ENGLISH = "en-US", "English" # 코드에서 사용, 데이터베이스에 저장, 사용자에게 보여지는 값
        JAPANESE = "ja-JP", "Japanese"
        CHiNESE = "zh-CN", "Chinese"
        SPANISH = "es-ES", "Spanish"
        FRENCH = "fr-FR", "French"
        GERMAN = "de-DE", "German"
        RUSSIAN = "ru-RU", "Russian"

    class Level(models.IntegerChoices):
        BEGINNER = 1, "Beginner"
        INTERMEDIATE = 2, "Intermediate"
        ADVANCED = 3, "Advanced"

    class Meta:
        ordering = ["-pk"] # 이 모델로부터 사행되는 QuerySet에 기본 정렬방향 지정. pk의 역순 

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    language = models.CharField(
        max_length=10,
        choices=Language.choices,
        default=Language.ENGLISH,
        verbose_name="언어"
    )
    level = models.SmallIntegerField(
        choices=Level.choices,
        default=Level.BEGINNER, 
        verbose_name="레벨"
    )
    situation = models.CharField(max_length=100,verbose_name="상황")
    situation_en = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="상환(영문)",
        help_text="GPT 프롬프트에 직접적으로 활용됨. 비어있는 경우 situation 필드를 번역하여 자동으로 반영"
    )
    my_role = models.CharField(max_length=100,verbose_name="내 역할")
    my_role_en = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="내 역할(영문)",
        help_text="GPT 프롬프트에 직접적으로 활용됨. 비어있는 경우 my_role 필드를 번역하여 자동으로 반영"
    )
    gpt_role = models.CharField(max_length=100,verbose_name="GPT 역할")
    gpt_role_en = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="GPT 역할(영문)",
        help_text="GPT 프롬프트에 직접적으로 활용됨. 비어있는 경우 gpt_role 필드를 번역하여 자동으로 반영"
    )

    # 특정 객체의 절대 URL을 반환
    def get_absolute_url(self)->str:
        return reverse("role_playing_room_detail",args=[self.pk])

    def get_initial_messages(self)->List[GptMessage]:
        gpt_name = "RolePlayingBot"
        language = self.get_language_display()
        situation_en = self.situation_en
        my_role_en = self.my_role_en
        gpt_role_en = self.gpt_role_en

        if self.level == self.Level.BEGINNER:
            level_string = f"s beginner in {language}"
            level_word = "very simple"
        elif self.level == self.Level.INTERMEDIATE:
            level_string = f"s intermediate in {language}"
            level_word = "simple"
        elif self.level == self.Level.ADVANCED:
            level_string = f"s advanced in {language}"
            level_word = "difficult"
        else: 
            raise ValueError(f"Invalid level : {self.level}")
      
        system_message = (
            f"You are helpful assistant supporting people learning {language}. "
            f"Your name is {gpt_name}. "
            f"Please assume that the user you are assisting is {level_string}. "
            f"And please write only the sentence without the character role."
        )

        user_message = (
            f"Let's have a conversation in {language}. "
            f"Please answer in {language} only "
            f"without providing a translation. "
            f"And please don't write down the pronunciation either. "
            f"Let us assume that the situation in '{situation_en}'. "
            f"I am {my_role_en}. The character I want you to act as is {gpt_role_en}. "
            f"Please make sure that I'm {level_string}, so please use {level_word} words "
            f"as much as possible. Now, start a conversation with the first sentence!"
        )

        return [
            GptMessage(role="system",content=system_message),
            GptMessage(role="user",content=user_message)
        ]


    def get_recommend_message(self)->str:
        level = self.level

        if level == self.Level.BEGINNER:
            level_word = "very simple"
        elif level == self.Level.INTERMEDIATE:
            level_word = "simple"
        elif level == self.Level.ADVANCED:
            level_word = "difficult"
        else:
            raise ValueError(f"Invalid level : {level}")
        return (
            f"Can you please provide me an {level_word} example "
            f"of how to respond to the last sentence "
            f"in this situation, without providing a translation "
            f"and any introductory phrases or sentences."
        )
    


    
    