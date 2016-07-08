from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.contrib.auth import logout
from django.shortcuts import redirect
import json
import cloudinary

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


def logout_view(request):
    logout(request)
    return redirect('/')