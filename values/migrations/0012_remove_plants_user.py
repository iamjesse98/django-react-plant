# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-11-01 16:40
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('values', '0011_auto_20171101_2157'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plants',
            name='user',
        ),
    ]
