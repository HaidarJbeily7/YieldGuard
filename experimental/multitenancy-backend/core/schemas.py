from ninja import Schema, ModelSchema
from typing import Optional
from core.models import Country, City, Airport


class CountryOutput(Schema):
    id: int
    name: str
    code: str

class CityOutput(Schema):
    id: int
    name: str
    country: CountryOutput

class AirportOutput(Schema):
    id: int
    name: str
    iata_code: str
    icao_code: str
    latitude: float
    longitude: float
    altitude: int
    dst: str
    city: CityOutput

class CountrySearchInput(Schema):
    search: Optional[str] = ''


class CountrySchema(ModelSchema):
    class Meta:
        model = Country
        fields = ['id', 'name', 'code']