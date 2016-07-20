from django.contrib.auth import logout
from django.shortcuts import render
from django.shortcuts import redirect

from photos.models import Photo
from photos.api.image_edit import *


def index(request):
    context = {
        'index': 'Login' if not request.user.is_authenticated()
        else 'Dashboard',
        'user': request.user.username
    }
    return render(request, 'base.html', context)

def logout_view(request):
    logout(request)
    return redirect('/')

def download(request):
    id = request.GET.get('image')
    photo = Photo.objects.get(id=id)
    if photo:
        image = ImageEdit(photo.image.path.replace('main','edited'))
        return image.download(photo.title)
    return redirect('/')