from django.conf.urls import url
#from rest_framework_jwt.views import obtain_jwt_token
#from rest_framework_jwt.views import refresh_jwt_token
from .views import *

urlpatterns = [
    url(r'^auth/register/$', RegistrationApiView.as_view(), name='register'),
    url(r'^auth/login/$', LoginApiView.as_view(), name='login'),
    url(r'^folders/$', FolderApiView.as_view(), name='list-folder'),
    url(r'^folders/$', FolderApiView.as_view(), name='list-folder'),
    url(r'^folders/(?P<id>\d+)/$', SingleFolderAPIView.as_view(), name='folder-detail'),
]
