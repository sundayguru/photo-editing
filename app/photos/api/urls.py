from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^auth/register/$', RegistrationApiView.as_view(), name='register'),
    url(r'^auth/login/$', LoginApiView.as_view(), name='login'),
    url(r'^folders/$', FolderApiView.as_view(), name='list-folder'),
    url(r'^folders/(?P<id>\d+)/$', SingleFolderAPIView.as_view(), name='folder-detail'),
    url(r'^folders/(?P<id>\d+)/photos/$', PhotoApiView.as_view(), name='folder-photos'),
    url(r'^photos/$', PhotoApiView.as_view(), name='list-photo'),
    url(r'^photos/(?P<id>\d+)/$', SinglePhotoAPIView.as_view(), name='photo-single'),
    url(r'^photos/share/$', PhotoShare.as_view(), name='photo-share'),
    #url(r'^photos/(?P<id>\d+)/detail/(?P<pk>\d+)/$', PhotoDetailAPIView.as_view(), name='photo-detail'),
    url(r'^photos/(?P<id>\d+)/preview/$', PhotoPreview.as_view(), name='photo-preview'),
]
