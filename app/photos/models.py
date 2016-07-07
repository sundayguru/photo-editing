from __future__ import unicode_literals
from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField


class Folder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', default=0)
    date_modified = models.DateTimeField(auto_now=True, auto_now_add=False)
    date_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __unicode__(self):
        return self.name

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-date_created']

    def __repr__(self):
        return '<Folder %r>' % self.name


class Photo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
    folder = models.ForeignKey(Folder, default=0)
    image = CloudinaryField('image')
    date_modified = models.DateTimeField(auto_now=True, auto_now_add=False)
    date_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ['-date_created']


class PhotoDetail(models.Model):
    photo = models.ForeignKey(Photo, default=0)
    title = models.CharField(max_length=100)
    effects = models.TextField()
    date_modified = models.DateTimeField(auto_now=True, auto_now_add=False)
    date_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ['-date_created']
