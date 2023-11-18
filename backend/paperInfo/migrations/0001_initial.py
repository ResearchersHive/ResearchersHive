# Generated by Django 4.1.12 on 2023-11-16 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PaperInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paperId', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('abstract', models.TextField()),
                ('year', models.PositiveIntegerField()),
                ('authors', models.CharField(max_length=511)),
                ('venue', models.CharField(max_length=255)),
                ('venue_type', models.CharField(choices=[('conference', 'Conference'), ('journal', 'Journal')], max_length=50)),
                ('venue_link', models.URLField()),
            ],
        ),
    ]
