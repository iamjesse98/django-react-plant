# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-10-06 20:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('values', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='api',
            name='jsons',
        ),
        migrations.AddField(
            model_name='api',
            name='humidity',
            field=models.CharField(default='0', max_length=1000),
        ),
        migrations.AddField(
            model_name='api',
            name='temperature',
            field=models.CharField(default='0', max_length=1000),
        ),
        migrations.AddField(
            model_name='api',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
