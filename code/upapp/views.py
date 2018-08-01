# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseBadRequest, HttpResponseForbidden, JsonResponse
from .models import *
import os
import json
import urllib.request
import sys
from django.views.decorators.csrf import csrf_exempt
from django.http import FileResponse
from .tasks import *

# Create your views here.


def home(request):
    context={}
    b1task("b1_run in home")
    return render(request,'index.html',context)
def edit(request):
    context={}
    return render(request,'upload.html',context)

@csrf_exempt
def upload(request):
    try:
        print("-- filename?--",request.POST.get('fileName'))
        files = request.FILES.get('file')
        filename = request.POST.get('fileName')
        with open("static/files/%s" % filename,"ab+") as f:
            for chunk in files.chunks():
                f.write(chunk)
        return HttpResponse(json.dumps({"success":"ok"}))
    except Exception as e:
        return HttpResponse(json.dumps({"falied":e}))

@csrf_exempt
def getloadedsize(request):
   # HttpResponse.setItem("Access-Control-Allow-Origin","*")
    return HttpResponse(json.dumps({"uploadedSize":"100"}))
def downfile(request):
    filename = request.GET.get('url')
    file = open('static/files/{}' .format(filename),'rb')
    response=FileResponse(file)
    response['Content-Type']='application/octet-stream'
    response['Content-Disposition']='attachment;filename="{}"' .format(filename)
    return response

