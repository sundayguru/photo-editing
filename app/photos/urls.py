from django.conf.urls import url
from photos import views

urlpatterns = [
    url(r'^logout/$', views.logout_view),
]
