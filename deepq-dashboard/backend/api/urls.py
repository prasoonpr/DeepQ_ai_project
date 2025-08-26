from django.urls import path
from .views import test_public, worldbank_population

urlpatterns = [
    path("public/", test_public),
    path("population/", worldbank_population),
]
