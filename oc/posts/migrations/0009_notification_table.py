# Generated by Django 2.1.7 on 2019-03-23 03:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0008_auto_20190322_1246'),
    ]

    operations = [
        migrations.CreateModel(
            name='notification_table',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notification_for', models.IntegerField(default=0)),
                ('post_type', models.IntegerField(default=0)),
                ('post_id', models.IntegerField(default=0)),
                ('count', models.IntegerField(default=0)),
                ('notification', models.CharField(blank=True, max_length=500, null=True)),
                ('comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='posts.comments_table')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
