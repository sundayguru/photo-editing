from django.shortcuts import render

# Create your views here.
def index(request):
    context = { 'index': 'Login' if not request.user.is_authenticated() else 'Dashboard'}
    return render(request, 'base.html', context)