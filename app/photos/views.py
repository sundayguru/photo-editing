from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.contrib.auth import logout
from django.shortcuts import redirect
import json
import cloudinary
from PIL import Image, ImageFilter, ImageOps
from django.conf import settings
from photos.models import *
from api.image_edit import *

# Create your views here.
def index(request):
    context = {
    'index': 'Login' if not request.user.is_authenticated() else 'Dashboard',
    'user': request.user.username
    }
    return render(request, 'base.html', context)

def logout_view(request):
    logout(request)
    return redirect('/')