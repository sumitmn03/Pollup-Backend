from django.contrib import admin
from .models import (poll_table,
                     option_table,
                     opted_by_table,
                     comments_table,
                     follow_table,
                     report_table,
                     notification_table
                     )

# Register your models here.

admin.site.register(poll_table)
admin.site.register(option_table)
admin.site.register(opted_by_table)
admin.site.register(comments_table)
admin.site.register(follow_table)
admin.site.register(report_table)
admin.site.register(notification_table)
