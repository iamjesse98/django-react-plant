from django.db import models
from django.utils import timezone
import time

# Create your models here.

# Plants Database
class Plants(models.Model):
    plant_id = models.IntegerField(primary_key=True)
    plant_name = models.CharField(max_length= 1000,default='mango')
    latitude = models.FloatField(default=None)
    longitude = models.FloatField(default=None)
    # temperature = models.CharField(max_length=1000, default='0')
    # humidity = models.CharField(max_length=1000, default='0')
    # time = models.TimeField(blank=True, null=True)
    # moisture = models.CharField(max_length=1000,default ='0')
    # distance = models.CharField(max_length=1000,default='0')
    def __str__(self):
        return str(self.plant_id)

#sensor values
class api(models.Model):
    pid = models.ForeignKey(Plants, blank=True, null=True,on_delete=models.CASCADE)
    temperature = models.CharField(max_length=1000, default='0')
    humidity = models.CharField(max_length=1000, default='0')
    time = models.TimeField(blank=True, null=True)
    moisture = models.CharField(max_length=1000,default ='0')
    distance = models.CharField(max_length=1000,default='0')
    rain = models.CharField(max_length=1000,default=0)
    #pid

    def __str__(self):
        return self.temperature
