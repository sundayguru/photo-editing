from django.contrib.auth.models import User
import json, cloudinary
from django.shortcuts import get_object_or_404
from django.views.generic import View
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
)
from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from .serializers import *
from .permissions import IsOwner


class RegistrationApiView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class LoginApiView(View):
    def post(self, request, *args, **kwargs):

        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        print username, password
        user = authenticate(username=username, password=password)
        print user
        response_data = {}
        if user is not None:
            if user.is_active:
                login(request, user)
                response_data.update(
                    {'login':True, 'user': user.username}
                )
            else:
                response_data.update(
                    {'login':False, 'message': 'User inactive'}
                )
        else:
            response_data.update(
                {'login':False, 'message': 'Invalid credentials'}
            )

        response_json = json.dumps(response_data)
        return HttpResponse(response_json, content_type="application/json")



class FolderApiView(ListCreateAPIView):

    """
    Returns list of folders if you are doing a GET request.
    Creates new folder if you are doing a POST request.

    Method: GET
      Parameters:
          page  (optional)    default=1

      Response: JSON

    Method: POST
      Parameters:
          name  (required)
      Response: JSON
    """

    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    # before create
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Folder.objects.filter(user=self.request.user)
        return queryset

class PhotoApiView(ListCreateAPIView):

    """
    Returns list of photos if you are doing a GET request.
    Creates new photo if you are doing a POST request.

    Method: GET
      Parameters:
          page  (optional)    default=1

      Response: JSON

    Method: POST
      Parameters:
          image  (required)
      Response: JSON
    """

    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]

    # before create
    def perform_create(self, serializer):
        folder_id = self.request.POST.get('folder_id', 0)
        folder = Folder.objects.filter(user=self.request.user, id=folder_id).first()
        if folder is not None:
            instance = serializer.save(user=self.request.user, folder=folder)
        else:
            instance = serializer.save(user=self.request.user)

        detail = PhotoDetail(photo=instance)
        detail.save()



    def get_queryset(self):
        folder_id = self.kwargs.get('id', -1)
        if int(folder_id) == 0:
            return Photo.objects.filter(user=self.request.user, folder=0)
        folder = Folder.objects.filter(id=folder_id)
        if(folder):
            queryset = Photo.objects.filter(user=self.request.user, folder=folder)
        else:
            queryset = Photo.objects.filter(user=self.request.user)
        return queryset


class SingleFolderAPIView(RetrieveUpdateDestroyAPIView):

    """
    Returns individual folder detail if you are doing a GET request.
    Updates individual folder detail if you are doing a PUT request.
    Deletes individual folder detail if you are doing a DELETE request.

    Method: GET
    Response: JSON

    Method: PUT
      Parameters:
          name  (required)
      Response: JSON

    Method: DELETE
        Response: JSON

    """
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [IsOwner]
    lookup_field = 'id'



class SinglePhotoAPIView(RetrieveUpdateDestroyAPIView):

    """
    Returns individual photo detail if you are doing a GET request.
    Updates individual photo detail if you are doing a PUT request.
    Deletes individual photo detail if you are doing a DELETE request.

    Method: GET
    Response: JSON

    Method: PUT
      Parameters:
          title  (required)
      Response: JSON

    Method: DELETE
        Response: JSON

    """
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsOwner]
    lookup_field = 'id'

    def perform_destroy(self, instance):
        cloudinary.api.delete_resources([instance.image.public_id])
        instance.delete()


class PhotoDetailAPIView(RetrieveUpdateDestroyAPIView):

    """
    Returns individual photo detail if you are doing a GET request.
    Updates individual photo detail if you are doing a PUT request.
    Deletes individual photo detail if you are doing a DELETE request.

    Method: GET
    Response: JSON

    Method: PUT
      Parameters:
          title  (required)
      Response: JSON

    Method: DELETE
        Response: JSON

    """
    serializer_class = PhotoDetailSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        photo = Photo.objects.filter(id=self.kwargs.get('id', 0)).first()
        return PhotoDetail.objects.filter(photo=photo)
