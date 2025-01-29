from ninja_extra import api_controller, http_get
from core.models import Airport, Country
from typing import List
from ninja_jwt.authentication import JWTAuth
from core.schemas import  AirportOutput, CountryOutput, CountrySchema
from ninja_extra.searching import searching, Searching
from serpapi import GoogleSearch
from django.conf import settings
from core.models import FlightCache


@api_controller("/core/", tags=["Core API"])
class PublicCoreController:
    
    @http_get("/airports/", response=List[AirportOutput])
    @searching(Searching, search_fields=["name", "iata_code", "icao_code"])
    def get_airports(self, country_id: int):
        airports = Airport.objects.filter(country_id=country_id)
        return airports
    
    @http_get("/countries/", response=List[CountrySchema])
    @searching(Searching, search_fields=["name", "code"])
    def get_countries(self):
        countries = Country.objects.all()
        return countries
    
    @http_get("/flights-search/", response=dict)
    def get_serper_search(self, departure_id: str, arrival_id: str, outbound_date: str, return_date: str):
        key = f"{departure_id}-{arrival_id}-{outbound_date}-{return_date}"
        flight_cache = FlightCache.objects.filter(key=key).first()
        if flight_cache:
            return flight_cache.flights
        params = {
            "engine": "google_flights",
            "departure_id": departure_id,
            "arrival_id": arrival_id,
            "outbound_date": outbound_date,
            "return_date": return_date,
            "currency": "OMR",
            "hl": "en",
            "api_key": settings.SERPER_API_KEY
        }

        search = GoogleSearch(params)
        results = search.get_dict()
        return results