# Generated by Django 4.2.1 on 2023-05-28 14:04

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='members',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.PositiveIntegerField(), blank=True, null=True, size=None),
        ),
    ]
