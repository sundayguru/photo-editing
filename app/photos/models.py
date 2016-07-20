from __future__ import unicode_literals
from django.db import models
from django.conf import settings


class Folder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
    name = models.CharField(max_length=100)
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
    folder = models.ForeignKey(Folder, null=True, blank=True)
    image = models.ImageField(upload_to='main',
        null=True,
        blank=True)
    title = models.CharField(max_length=100, default="")
    file_size = models.CharField(max_length=10, default="")
    effects = models.TextField(default='')
    edited_image = models.CharField(max_length=255, default="")
    share_code = models.CharField(max_length=50, default="")
    date_modified = models.DateTimeField(auto_now=True, auto_now_add=False)
    date_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ['-date_created']
