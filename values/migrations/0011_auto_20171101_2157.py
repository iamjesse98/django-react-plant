# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-11-01 16:27
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('values', '0010_auto_20171101_2147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plants',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]