from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import *
from .serializers import *

from rest_framework.response import Response
from .utils import *

from rest_framework.views import APIView
from rest_framework import status

"""
API to send email invitation
Method : POST
Authorization : Bearer <token>
Body : {
email : juniors email,
channel : channel id
}

"""
class SendInvitationView(GenericViewSet,mixins.CreateModelMixin):
    queryset = Invitation
    serializer_class = SendInvitationSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
        user = request.user
        serializer = self.serializer_class(data=request.data,context={'request':request})
        if serializer.is_valid():
            invitation = serializer.save()
            send_join_invite_email(invitation.invited_user_email,user.name,invitation.invitation_id)
            return Response({'msg': 'Email sent'})
        else:
            return Response({'msg': serializer.errors})


"""
API to accept invitation
Method : POST
Authorization : None
Body : {
invitationId : invitation id,
name : name of user only for new user,
password : password only for new user
}



""" 
class AcceptInvitationView(GenericViewSet,mixins.CreateModelMixin):
    queryset = Invitation
    serializer_class = AcceptInvitationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            invitation = serializer.save()
            return Response({'msg': 'Invitation Accepted'})
        else:
            return Response({'msg': serializer.errors})
        

"""
API to check invited user actually present on our DB
Method : GET
Authorization : None
Body : None
URL : https://domainname.com/path/{invitation_id}/
"""        
class InvitationDetail(APIView):
    def get(self, request, invitation_id):

        invitation = Invitation.objects.filter(invitation_id=invitation_id)

        if invitation.exists():
            data ={
                'invitationAccepted': False,
            }
            try:
                user = userModel.User.objects.get(email=invitation[0].invited_user_email)
                data['userExists'] = True
            except:
                data['userExists'] = False

            if invitation[0].status=='accepted':
                data['invitationAccepted'] = True

            return Response(data,status=status.HTTP_200_OK)

        else:
            return Response({
                'msg':'invitation does not exists'
            },status=status.HTTP_404_NOT_FOUND)


"""
API to create channel,list channel for requested user,retrive single channel
Method : POST,GET
Authorization : Bearer <token>
Body : (

    create channel = {
    name: name for channel
    }
)

list channel : https://domainname.com/path/
retrive channel : https://domainname.com/path/{channel_id}/

"""
class ChannelCreateView(GenericViewSet,mixins.CreateModelMixin,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Channel.objects.all()
    serializer_class = ChannelCreateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request':request})
        if serializer.is_valid():
            channel = serializer.save()
            try:
                memberQuery = Member.objects.create(user=request.user,status='admin',channel=channel)
                return Response({'msg': 'channel created with associated member'})
            except Exception as e:
                channel.delete()
                return Response({'msg': 'Failed to create member and channel'})
    
        return Response({'msg':serializer.errors})
    
    def list(self, request, *args, **kwargs):

        member_queryset = Member.objects.filter(user = request.user).order_by('status')

        serializer = ChannelMemberSerializer(member_queryset,many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object() 
        member = Member.objects.get(user=request.user,channel=instance)
        members = Member.objects.filter(channel=instance)

        member_data = MemberSerializer(members, many=True).data

        response = {
            'channel_name':instance.name,
            'status':member.status,
            'members':member_data
        }
        return Response(response)
    
    
    
"""
API to create and update task
Method : POST,PUT
Authorization : Bearer <token>
Body : create task{
    channel : channel id,
    junior : junior id,
    title : title of task,
    description : description for task
    deadline : date formate(YYYY-MM-DD)
    status : status for task
}


# To update task admin can update all fields participant can update only status
update task {
    all fields for admin ||  status field for participant
}
update URL : https://domainname.com/path/{taskId}/

"""
class CreateTask(GenericViewSet,mixins.CreateModelMixin,mixins.UpdateModelMixin):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Task created'})
        else:
            return Response({'msg':serializer.errors})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data, context={'request': request},partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Updated'})
        else:
            return Response({'msg':serializer.errors})
        

"""
API to list and retrive task
Method : GET
Authorization : Bearer <token>
Body : None

# URL : https://domainname.com/path/ => return tasks assigned to that user
# URL : https://domainname.com/path/?channel={channelId} => return tasks assigned to that useror by user for that channel
# URL : https://domainname.com/path/{taskId} => return task detail

"""
class ListRetriveTask(GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def list(self, request, *args, **kwargs):
        taskQuery = self.queryset

        channel_id = request.query_params.get('channel', None)
        
        if channel_id:
            try:
                channel = Channel.objects.get(id=channel_id)
            except:
                return Response({'msg':"channeldoes not exists"})
            
            member = Member.objects.get(user=request.user,channel=channel)
            if member.status == 'admin':
                taskQuery = taskQuery.filter(channel=channel)
                serializer = self.serializer_class(taskQuery,context={'request': request},many=True)
                return Response(serializer.data)
            else:
                taskQuery = taskQuery.filter(channel=channel,junior=request.user)
                serializer = self.serializer_class(taskQuery,context={'request': request},many=True)
                return Response(serializer.data)

        taskQuery = taskQuery.filter(junior=request.user)
        serializer = self.serializer_class(taskQuery,context={'request': request},many=True)
        return Response(serializer.data)

    

# JWT TOKENS

# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzY4Njk5LCJpYXQiOjE3MDMzMzY2OTksImp0aSI6ImVkOWM1ZTM2OGVhMjRlZjk4ZTA3MGQwMjMwYzE1YzdkIiwidXNlcl9pZCI6MX0.wizoVRRrEvJtzQOoeds8c_rQAplsHTF60P4XOt9W9p4
    
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzY5MTkzLCJpYXQiOjE3MDMzMzcxOTMsImp0aSI6IjBmYWU3MjYyNTU5ZjRjMzhhOGU2NDgyMjUyNGRmNDU1IiwidXNlcl9pZCI6Nn0.R8aFEYLIUBo_wwVWo8uHLQe1oqCU_4Gyo9t7ZGINCBg