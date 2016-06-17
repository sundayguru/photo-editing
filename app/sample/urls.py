from django.conf.urls import url
from sample import views

urlpatterns = [
    url(r'^$', views.index),
]
