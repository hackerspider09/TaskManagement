from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as translate
from .models import *
"""
Below class defines how the model list should look like in django admin panel.
ordering - how the list is displayed
list_display - which fields to be displayed
fieldsets - what fields to be included for individual user view (edit user info)
add_fieldsets - fields to be included while creating new obj (add user info)
"""
class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['id','email', 'name']
    fieldsets = (
        (None, {'fields' : ('email', 'password','name')}),
        (
            translate('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (translate('Important dates'), {'fields': ('last_login',)})
    )
    readonly_fields = ['last_login']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
            )
        }),
    )

# Register models 
admin.site.register(User, UserAdmin)