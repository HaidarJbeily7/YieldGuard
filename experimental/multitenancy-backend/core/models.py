from django.db import models

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=2)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Airport(models.Model):
    name = models.CharField(max_length=255)
    iata_code = models.CharField(max_length=3, null=True, blank=True)
    icao_code = models.CharField(max_length=4, null=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField() 
    altitude = models.IntegerField()
    timezone = models.FloatField(null=True, blank=True)
    dst = models.CharField(max_length=1, null=True, blank=True)
    tz_database = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=255, null=True, blank=True)
    source = models.CharField(max_length=255, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name



class FlightCache(models.Model):
    key = models.CharField(max_length=255)
    flights = models.JSONField()
