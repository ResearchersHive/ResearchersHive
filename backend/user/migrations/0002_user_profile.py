# Generated by Django 4.1.12 on 2023-10-27 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile',
            field=models.CharField(default='scholar', max_length=10),
        ),
    ]
