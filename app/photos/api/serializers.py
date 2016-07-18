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
    photos = SerializerMethodField()

    class Meta:
        model = Folder
        fields = [
            'id',
            'name',
            'user',
            'photos',
            'date_created',
            'date_modified',
        ]
        extra_kwargs = {'date_created': {'read_only': True},
                        'date_modified': {'read_only': True}}

    def get_photos(self, obj):
        serialized_photos = []
        photos = obj.photo_set.all()
        for photo in photos:
            serializer = PhotoSerializer(photo)
            serialized_photos.append(serializer.data)
        return serialized_photos


class PhotoDetailSerializer(ModelSerializer):

    class Meta:
        model = PhotoDetail
        fields = [
            'id',
            'title',
            'effects',
            'date_created',
            'date_modified',
        ]
        extra_kwargs = {'date_created': {'read_only': True},
                        'date_modified': {'read_only': True}}


class PhotoSerializer(ModelSerializer):
    detail = SerializerMethodField()
    folder_name = SerializerMethodField()
    uploader = SerializerMethodField()
    file_size = SerializerMethodField()

    class Meta:
        model = Photo
        fields = [
            'id',
            'image',
            'edited_image',
            'folder_name',
            'share_code',
            'detail',
            'uploader',
            'file_size',
            'user',
            'date_created',
            'date_modified',
        ]
        extra_kwargs = {'date_created': {'read_only': True},
                        'date_modified': {'read_only': True}}

    def get_folder_name(self, obj):
        try:
            return obj.folder.name
        except:
            return 'None'

    def get_uploader(self, obj):
        return obj.user.username

    def get_file_size(self, obj):
        return int(obj.image.size/1000)

    def get_detail(self, obj):
        detail = PhotoDetail.objects.filter(photo=obj).first()
        if(not detail):
            return {}
        serializer = PhotoDetailSerializer(detail)
        return serializer.data
