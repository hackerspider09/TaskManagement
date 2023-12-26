from django.contrib import admin
from .models import *


# Register models 
class ChannelAdmin(admin.ModelAdmin):
    list_display= ('id','name','get_admin')
admin.site.register(Channel,ChannelAdmin)


class MemberAdmin(admin.ModelAdmin):
    list_display= ('channel','user','status')
admin.site.register(Member,MemberAdmin)


class InvitationAdmin(admin.ModelAdmin):
    list_display = ('id','channel','invitation_id','invited_user_email','status')
admin.site.register(Invitation,InvitationAdmin)


class TaskAdmin(admin.ModelAdmin):
    list_display= ('id','channel','title','get_name','status')
admin.site.register(Task,TaskAdmin)