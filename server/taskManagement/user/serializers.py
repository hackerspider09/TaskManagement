from rest_framework import serializers
from .models import *
from django.db.models import Q
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['email','password','name']
        # fields = "__all__"

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        
        if password is not None:
            user.set_password(password)  # Set the password for the user
        else:
            user.set_password("password")  # Set the password for the user

        user.save()
        return user
