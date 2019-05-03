# chat/routing.py
from django.urls import path

from . import consumer

websocket_urlpatterns = [
    path('ws/comments', consumer.ChatConsumer),
]
