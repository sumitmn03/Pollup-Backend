from django.urls import path

from .consumer import ChatConsumer

websocket_urlpatterns = [
    path('ws/comments/<int:id>/', ChatConsumer),
]
