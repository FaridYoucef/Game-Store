# Generated by Django 4.2.16 on 2024-11-02 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basket', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='basketitem',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]
