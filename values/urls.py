from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from . import views

urlpatterns = [
    url(r'^$', views.values, name='values'),
    url(r'^gui/',views.gui,name="gui"),
    url(r'^line/', views.line, name="line"),
    url(r'^threed/', views.three, name="threeD-vis"),
    url(r'^spa/', views.spa, name="spa"),
    url(r'^react/', login_required(TemplateView.as_view(template_name='reactpage.html')), name='react'),
    url(r'^(?P<plant_id>[0-9]+)/$', views.plantID, name='plant_id'),
    url(r'^create/',views.create,name = 'create'),
    url(r'^motor/',views.motor,name = 'motor')
]
