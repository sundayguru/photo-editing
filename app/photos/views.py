from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
import json

# Create your views here.
def index(request):
    context = { 'index': 'Login' if not request.user.is_authenticated() else 'Dashboard'}
    return render(request, 'base.html', context)

# Create your views here.
def test(request):
    response_dict = {'status':'ok', 'test':'hello'}
    response = json.dumps(response_dict)
    return HttpResponse(response, content_type="application/json")