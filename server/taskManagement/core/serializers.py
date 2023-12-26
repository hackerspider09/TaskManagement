from rest_framework import serializers
from .models import *

class SendInvitationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='invited_user_email')
    
    class Meta:
        model =Invitation
        fields = ('email','channel')

    def create(self, validated_data):
        request = self.context['request']

        member = Member.objects.get(user=request.user,channel=validated_data.get('channel'))
        
        if member.status == 'admin':
            invitation = Invitation.objects.create(status='pending', **validated_data)

            return invitation
                # raise serializers.ValidationError("User doesnot exixts")
        else:
            raise serializers.ValidationError("You don't have admin rights to create a task.")
        

class AcceptInvitationSerializer(serializers.ModelSerializer):
    invitationId = serializers.CharField(source='invitation_id')
    name = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    class Meta:
        model =Invitation
        fields = ('invitationId','name','password')

    def create(self, validated_data):
        print(validated_data)
        invitation_id = validated_data.get('invitation_id')
        print(invitation_id)
        invitation = Invitation.objects.get(invitation_id=invitation_id)

        if invitation.status == 'accepted':
            raise serializers.ValidationError("Already accepted.")
        
        try:
            user = userModel.User.objects.get(email=invitation.invited_user_email)
        except:
            if 'name' in validated_data and 'password' in validated_data:
                name = validated_data.get('name')
                password = validated_data.get('password')

                # Perform actions when 'name' and 'password' are provided
                user = userModel.User.objects.create(name=name, email=invitation.invited_user_email)
                user.set_password(password) 

            else:
                raise serializers.ValidationError("User is Not registered")
        
        user.save()

            # Handle case when 'name' and 'password' are not provided

        member = Member.objects.create(user=user, channel=invitation.channel, status='participant')
        invitation.status = 'accepted'
        invitation.save()
        return invitation
    

class ChannelCreateSerializer(serializers.ModelSerializer):
    # id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Channel
        fields = ('name',)

    def create(self, validated_data):
        return Channel.objects.create(**validated_data)
    
class ChannelMemberSerializer(serializers.ModelSerializer):
    channel_id = serializers.SerializerMethodField()
    channel = serializers.SerializerMethodField()
    
    class Meta:
        model = Member
        fields = ['channel','channel_id','status',]

    def get_channel(self,obj):
        return obj.channel.name
    
    def get_channel_id(self,obj):
        return obj.channel.id

    def create(self, validated_data):
        return Member.objects.create(**validated_data)

        
class MemberSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    class Meta:
        model = Member
        fields = ['user','name','email','status']
    
    def get_name(self,obj):
        return obj.user.name
    def get_email(self,obj):
        return obj.user.email

    

class TaskSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    canEdite = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id','channel','junior','title','description','deadline','status','canEdite','createdAt']
        # read_only_fields = ['channel', 'title', 'description', 'deadline', 'status'] 

    def get_canEdite(self,obj):
        request = self.context['request']
        if obj.junior == request.user:
            return False
        return True

    def create(self, validated_data):
        request = self.context['request']
        channel = validated_data.get('channel')
        junior = validated_data.get('junior')

        member = Member.objects.get(user=request.user,channel=channel)
        
        if member.status == 'admin':
            juniorQuery = Member.objects.filter(user=junior.id,channel=channel).exists()
            if juniorQuery:
                return super().create(validated_data)
                # raise serializers.ValidationError("User doesnot exixts")
            else:
                raise serializers.ValidationError("User does not exixts")

        else:
            raise serializers.ValidationError("You don't have admin rights to create a task.")
        
    def update(self, instance, validated_data):
        reqest = self.context['request']
        title = validated_data.get('title')
        description = validated_data.get('description')
        deadline = validated_data.get('deadline')
        status = validated_data.get('status')
        junior = validated_data.get('junior')

        member = Member.objects.filter(user=reqest.user,channel=instance.channel)

        if member.exists():
            member = member[0]

            if member.status == 'admin':
                
                if title:
                    instance.title = title
                if description:
                    instance.description = description
                if deadline:
                    instance.deadline = deadline
                if status:
                    instance.status = status
                if junior:
                    instance.junior = junior

                instance.save()
                return instance
            else:  
                print(status)
                if status:
                    instance.status = status
                    instance.save()
                    return instance
                else:
                    raise serializers.ValidationError("Junior can only update the status.")
        else:
                raise serializers.ValidationError("User does not exists")
        
    
            