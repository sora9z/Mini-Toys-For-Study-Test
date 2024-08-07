# Generated by Django 4.2.1 on 2024-08-05 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("chat", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="roleplayingroom",
            old_name="mu_role_en",
            new_name="my_role_en",
        ),
        migrations.AlterField(
            model_name="roleplayingroom",
            name="level",
            field=models.SmallIntegerField(
                choices=[(1, "Beginner"), (2, "Intermediate"), (3, "Advanced")],
                default=1,
                verbose_name="레벨",
            ),
        ),
    ]
