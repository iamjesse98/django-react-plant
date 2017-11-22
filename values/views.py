from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse,HttpResponseRedirect,HttpResponse
from .models import api, Plants
from django.core import serializers
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login,logout
from django.views import View
from .forms import UserForm,plantForm,deleteForm
from django.contrib.auth.decorators import login_required
from django.http.response import StreamingHttpResponse
from .models import api
import datetime

import time

data = []
arr= []
# Create your views here.
# get the values including plant id
@csrf_exempt #to disable csrf protection for this view
def values(request):
    if request.method == 'POST':
        p=json.loads((request.body).decode('utf-8')).get('pid')
        foo_name = api.objects.create(temperature=json.loads((request.body).decode('utf-8')).get('temperature'),
                                      humidity=json.loads((request.body).decode('utf-8')).get('humidity'),
                                      moisture=json.loads((request.body).decode('utf-8')).get('moisture'),
                                      distance=json.loads((request.body).decode('utf-8')).get('distance'), time=datetime.datetime.now().time(),
                                      rain=json.loads((request.body).decode('utf-8')).get('rain'),
                                    pid = Plants(str(p)))

                                    
       # data.append(list(map(lambda x: x['fields'], json.loads(serializers.serialize('json', api.objects.all())))))
        #return JsonResponse(json.loads(json.dumps(data).decode('utf-8'))[0], safe=False)

        return JsonResponse(data, safe=False)
    if request.method == 'GET':
        #data = json.loads(json.dumps((request.POST['temperature'])))
        return JsonResponse(list(map(lambda x: x['fields'], json.loads(serializers.serialize('json', api.objects.all())))), safe=False)

# view to display graphs
@login_required
def gui(request):
    if request.method == 'GET':
        return render(request,'main.html')

# experimental
def spa(request):
    if request.method == 'GET':
        return render(request, 'spadash.html')

# line graph exprimental
def line(request):
    if request.method == 'GET':
        return render(request, 'hist_chart.html')

# login view
def login_user(request):
    flag = 0
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active and flag == 0:
                login(request, user)
                flag = 1
                #return render(request, 'index.html')
                return HttpResponseRedirect('/values/react/')
            else:
                return render(request, 'login.html', {'error_message': 'Your account has been disabled'})
        else:
            return render(request, 'login.html', {'error_message': 'Invalid login'})
    return render(request, 'login.html')

# create a plant to database
@csrf_exempt
def create(request):
    # form = plantForm(request.POST)
    # if request.method == 'POST':
    #     if form.is_valid():
    #     #newplant = form.save(commit=False)
    #         pid = form.cleaned_data['pid']
    #         longitude = form.cleaned_data['longitude']
    #         latitude = form.cleaned_data['latitude']
    #         print(pid)
    #         print(longitude)
    #         print('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    #         foo = Plants.objects.create(plant_id = int(pid),latitude =float(latitude),longitude = float(longitude))
    #     #newplant.save()
    #         return HttpResponseRedirect('/values/react')
    #     else:
    #         form = plantForm()
    # return render(request,'new.html',{'form':form})
    if request.method == 'POST':
        id_ = json.loads(request.body.decode('utf-8')).get('apid')
        lt_ = json.loads(request.body.decode('utf-8')).get('lat')
        lg_ = json.loads(request.body.decode('utf-8')).get('lng')
        foo = Plants.objects.create(plant_id=int(id_), latitude=float(lt_), longitude=float(lg_))
        return JsonResponse({'success': 'true'}, safe=True)

# account register view
def register(request):
    form = UserForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=False)
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user.set_password(password)
        user.save()
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                #return render(request,'index.html')
                return HttpResponseRedirect('/values/react/')
    context = {
        "form": form,
    }
    return render(request, 'register.html', context)

# this is route to find the total number of plants, which helps to get the values according to pland id
def noof(request):
    all_p = Plants.objects.all()
    arr = [] 
    for p in all_p:
        arr.append(p.plant_id)
    print(arr)
    return JsonResponse({'pids': arr}, safe=True)

# get plant details according to plant id
def plantID(request, plant_id):
    all_plants = Plants.objects.all()
    html = {}
    html = []
    for plant in all_plants:
        if str(plant.plant_id) == str(plant_id):
            html = {"longitude": plant.longitude, "latitude":  plant.latitude}
    html1 = list(map(lambda x: x['fields'], json.loads(serializers.serialize('json', api.objects.filter(pid=plant_id)))))
    return JsonResponse({"loc": html, "values": html1}, safe=False)

# logout view
def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/login/')

# index page
def index(request):
    return render(request, 'index.html')

# dummys
def three(request):
    return render(request, 'threed.html')

# motor control from user
st = []
@csrf_exempt
def motor(request):
    if request.method == 'POST':
        # on = request.body.on
        on = json.loads(request.body.decode('utf-8')).get('on')
        st.append(on)
        return JsonResponse({'success': 'true' }, safe=True)
    if request.method == 'GET':
        return HttpResponse(st[-1])


# view to delete plant in database
@csrf_exempt
def delet(request):
    # form = deleteForm(request.POST)
    # if request.method == 'POST':
    #     if form.is_valid():
    #         #newplant = form.save(commit=False)
    #         pid = form.cleaned_data['pid']
    #         print('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    #         p = Plants.objects.filter(plant_id=pid)
    #         p.delete()
    #         return HttpResponseRedirect('/values/react')
    #     else:
    #         form = deleteForm()
    # return render(request, 'delete.html', {'form': form})
    if request.method == 'POST':
        id_ = int(json.loads(request.body.decode('utf-8')).get('dpid'))
        foo = Plants.objects.filter(plant_id=id_)
        foo.delete()
        return JsonResponse({'success': 'true'}, safe=True)
