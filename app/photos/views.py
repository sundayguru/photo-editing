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
    # print cloudinary.utils.cloudinary_url('v1467899704', width = 150,
    #                             height = 150, crop = "fill", quality = 50,  transformation = [
    #           { "effect": "green:-50" },
    #           { "effect": "brightness:50" },
    #           { "effect": "gradient_fade" }
    #          ])[0]
    return render(request, 'base.html', context)


def test(request):
    context = {
    'index': 'Login' if not request.user.is_authenticated() else 'Dashboard',
    'user': request.user.username
    }

    #Read image
    photos = Photo.objects.all();
    if photos:
        #print photos[0].image.path
        im = ImageEdit(photos[0].image.path)
        #im.black_and_white()
        #im.text('hello', 50, 70, (25,255,25))
        #im.colorize("#f00", '#ff0')
        im.quantize(0)

        #im.enhance('Contrast', 1.5)
        context['image'] =  im.preview()
        im.save()
        #im = Image.open(photos[0].image.path)
        #out = im.filter(ImageFilter.SHARPEN).transpose(Image.ROTATE_90).convert("L")
        #out = im.rotate(45)
        #out = ImageOps.colorize(out, '#ff0', '#f00')
        #out = ImageOps.posterize(out, 2)
        #out = im.filter(ImageFilter.SMOOTH)

        #im.filter(ImageFilter.SHARPEN)
        #out.save(photos[0].image.path.replace('main', 'edited'))
    #Display image

    return render(request, 'test.html', context)


def logout_view(request):
    logout(request)
    return redirect('/')