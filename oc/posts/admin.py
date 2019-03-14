from django.contrib import admin
from .models import (post_table,
                     option_table,
                     opted_by_table,
                     comments_table
                     )

# Register your models here.

admin.site.register(post_table)
admin.site.register(option_table)
admin.site.register(opted_by_table)
admin.site.register(comments_table)
