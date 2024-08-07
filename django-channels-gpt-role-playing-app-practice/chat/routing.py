# url 별로 그 요청을 처리할 Consumer 클래스를 매핑할 수 있다.
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/chat/<int:room_pk>/",consumers.RolePlayingRoomConsumer.as_asgi()), # as_asgi 를 호출하여 ASGI application을 생성한다.
]
