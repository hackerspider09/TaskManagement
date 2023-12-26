from django.urls import path,include
from .views import *

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'register', RegisterApi, basename='register_user')

urlpatterns = [
    path('', include(router.urls)),
    path('test/',test,name="test_view"),
     path('user-details/', UserDetailsView.as_view(), name='user_details'),

]