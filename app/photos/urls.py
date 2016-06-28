from django.conf.urls import url
from photos import views

urlpatterns = [
    url(r'^$', views.index),
]
