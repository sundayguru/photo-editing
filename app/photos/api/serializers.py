from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.serializers import (
    ModelSerializer,
    HyperlinkedIdentityField,
    SerializerMethodField,
)

from photos.models import *


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'email',
            'first_name',
            'last_name',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data.get('username'),
            email=validated_data.get('email'),
        )
        user.set_password(validated_data.get('password'))
        user.save()
        return user


class FolderSerializer(ModelSerializer):

    class Meta:
        model = Folder
        fields = [
            'id',
            'name',
            'user',
            'parent',
            'date_created',
            'date_modified',
        ]
        extra_kwargs = {'date_created': {'read_only': True}, 'date_modified': {'read_only': True}}
