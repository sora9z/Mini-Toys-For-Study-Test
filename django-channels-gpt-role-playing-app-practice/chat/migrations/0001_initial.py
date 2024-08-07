# Generated by Django 4.2.1 on 2024-08-05 05:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="RolePlayingRoom",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "language",
                    models.CharField(
                        choices=[
                            ("en-US", "English"),
                            ("ja-JP", "Japanese"),
                            ("zh-CN", "Chinese"),
                            ("es-ES", "Spanish"),
                            ("fr-FR", "French"),
                            ("de-DE", "German"),
                            ("ru-RU", "Russian"),
                        ],
                        default="en-US",
                        max_length=10,
                        verbose_name="언어",
                    ),
                ),
                (
                    "level",
                    models.SmallIntegerField(
                        choices=[
                            ("1", "Beginner"),
                            ("2", "Intermediate"),
                            ("3", "Advanced"),
                        ],
                        default="1",
                        verbose_name="레벨",
                    ),
                ),
                ("situation", models.CharField(max_length=100, verbose_name="상황")),
                (
                    "situation_en",
                    models.CharField(
                        blank=True,
                        help_text="GPT 프롬프트에 직접적으로 활용됨. 비어있는 경우 situation 필드를 번역하여 자동으로 반영",
                        max_length=100,
                        verbose_name="상환(영문)",
                    ),
                ),
                ("my_role", models.CharField(max_length=100, verbose_name="내 역할")),
                (
                    "mu_role_en",
                    models.CharField(
                        blank=True,
                        help_text="GPT 프롬프트에 직접적으로 활용됨. 비어있는 경우 my_role 필드를 번역하여 자동으로 반영",
                        max_length=100,
                        verbose_name="내 역할(영문)",
                    ),
                ),
                ("gpt_role", models.CharField(max_length=100, verbose_name="GPT 역할")),
                (
                    "gpt_role_en",
                    models.CharField(
                        blank=True,
                        help_text="GPT 프롬프트에 직접적으로 활용됨. 비어있는 경우 gpt_role 필드를 번역하여 자동으로 반영",
                        max_length=100,
                        verbose_name="GPT 역할(영문)",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ["-pk"],
            },
        ),
    ]