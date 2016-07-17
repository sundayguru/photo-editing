from django.contrib.auth import logout
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect
from photos.api.image_edit import *
# Create your views here.

def index(request):
    context = {
        'index': 'Login' if not request.user.is_authenticated()
        else 'Dashboard',
        'user': request.user.username
    }
    return render(request, 'base.html', context)

def test(request):
    im = ImageEdit("http://res.cloudinary.com/dfsbzqadc/image/upload/v1467974977/ak73wzbogz6cybssd17f.jpg")
    im.filter('contour')
    return HttpResponse('<img src="data:image/jpeg;base64, ' + im.preview() +'" />')

def logout_view(request):
    logout(request)
    return redirect('/')
