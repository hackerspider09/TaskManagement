"""
URL configuration for taskManagement project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path,include
from .views import *

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'accept-invitation', AcceptInvitationView, basename='accept_invitation')
router.register(r'send-invitation', SendInvitationView, basename='send_invitation')
router.register(r'channel', ChannelCreateView, basename='channel_create')
router.register(r'create-task', CreateTask, basename='create_task')
router.register(r'task', ListRetriveTask, basename='list_retrive_task')

urlpatterns = [
    path('', include(router.urls)),
    path('invitation/<str:invitation_id>/', InvitationDetail.as_view(), name='invitation-detail'),

]
