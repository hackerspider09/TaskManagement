from django.shortcuts import render,HttpResponse
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.response import Response

from .models import *
from .serializers import *

from .utils import *
from core import models as coreModel


"""
API to register user on platform
Method : POST
Authorization : None
Body : {
email : email of user,
name : name of user,
password : password of user
}

"""
class RegisterApi(GenericViewSet,mixins.CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    # permission_classes = [IsAdminUser]


# Test api
def test(request):
    # send_email_util()

    return HttpResponse("hello")


"""
API to get user detail like performance
Method : GET
Authorization : Bearer <token>
Body : None

# URL = https://domainname.com/path/?channel={channelId} => return details of user

"""
class UserDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  

        channel_id = request.query_params.get('channel', None)
        if channel_id:
            taskAssignedtoUser = coreModel.Task.objects.filter(junior=user,channel=channel_id)
            # taskAssignedtoUserPerformance = calcOwnPerformance(taskAssignedtoUser)
            dataForChannel={
                'completed':taskAssignedtoUser.filter(status='completed').count(),
                'on_hold':taskAssignedtoUser.filter(status='on_hold').count(),
                'rejected':taskAssignedtoUser.filter(status='rejected').count(),
                'not_completed':taskAssignedtoUser.filter(status='not_completed').count(),
            }


            memberQuery = coreModel.Member.objects.filter(user=user,status='admin')
            if (memberQuery.exists()):
                taskAssignedbyUser = coreModel.Task.objects.filter(channel=channel_id)
                dataForChannel={
                    'completed':taskAssignedbyUser.filter(status='completed').count(),
                    'on_hold':taskAssignedbyUser.filter(status='on_hold').count(),
                    'rejected':taskAssignedbyUser.filter(status='rejected').count(),
                    'not_completed':taskAssignedbyUser.filter(status='not_completed').count(),
                }

            user_data = {
                'name': user.name,
                'email': user.email,
                'taskData':dataForChannel,
            }

            return Response(user_data)


        taskAssignedtoUser = coreModel.Task.objects.filter(junior=user)
        taskAssignedtoUserPerformance = calcOwnPerformance(taskAssignedtoUser)


        memberQuery = coreModel.Member.objects.filter(user=user,status='admin')
        
        taskAssignedbyUserPerformance = calcOthersPerformance(memberQuery)
        

        user_data = {
            'name': user.name,
            'email': user.email,
            'assignedBy':taskAssignedbyUserPerformance,
            'assignedTo':taskAssignedtoUserPerformance
        }
        return Response(user_data)


"""
('completed', 'Completed'),
('on_hold', 'On Hold'),
('rejected', 'Rejected'),
('not_completed', 'Not Completed'),
"""