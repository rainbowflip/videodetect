from django.db import models

# Create your models here.

class Basefiles(models.Model):
    client_filename = models.CharField(max_length=100)
    server_filename = models.CharField(max_length=100)
    last_modified_date = models.IntegerField()
    status = models.IntegerField()
    uploaded_size = models.CharField(max_length=10)
    

