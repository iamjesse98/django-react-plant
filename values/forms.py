from django.contrib.auth.models import User
from django import forms

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
     model = User
     fields = ['username','email','password']

class plantForm(forms.Form):
    pid = forms.CharField(max_length=100)
    latitude = forms.CharField(max_length=100)
    longitude = forms.CharField(max_length=100)

class deleteForm(forms.Form):
    pid = forms.CharField(max_length=100)
