from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests

# ✅ Public API (for test)
@api_view(['GET'])
def test_public(request):
    return Response({"msg": "Public route working"})

# ✅ Protected API with World Bank Data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def worldbank_population(request):
    country = request.GET.get("country", "IND")
    start = request.GET.get("start", "2010")
    end = request.GET.get("end", "2020")

    url = f"http://api.worldbank.org/v2/country/{country}/indicator/SP.POP.TOTL?date={start}:{end}&format=json"
    res = requests.get(url).json()

    data = {
        "labels": [d["date"] for d in res[1]][::-1],
        "values": [d["value"] for d in res[1]][::-1]
    }
    return Response(data)
