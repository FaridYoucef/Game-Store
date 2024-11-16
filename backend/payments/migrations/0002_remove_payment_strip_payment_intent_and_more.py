# Generated by Django 4.2.16 on 2024-11-05 03:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='strip_payment_intent',
        ),
        migrations.AddField(
            model_name='payment',
            name='stripe_payment_intent',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]