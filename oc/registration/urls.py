from django.urls import path

from .api import (
    EmailOtpViewset
)


urlpatterns = [
    path('api/requestotp', EmailOtpViewset.as_view())
]
