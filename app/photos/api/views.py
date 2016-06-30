from django.contrib.auth.models import User
import json
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
from rest_framework import status
from rest_framework.decorators import api_view

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username', '')
    password = request.data.get('password', '')
    print request.data
    user = authenticate(username=username, password=password)
    print user
    response_data = {}
    if user is not None:
        if user.is_active:
            login(request, user)
            response_data.update(
                {'login':True, 'user': user}
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

