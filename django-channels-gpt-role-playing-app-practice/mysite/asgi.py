"""
ASGI config for mysite project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")

django_asgi_app = get_asgi_application()

import chat.routing

application = ProtocolTypeRouter({
    "http":django_asgi_app,
    # WebSocket 연결 시 사용자 인증을 처리하는 미들웨어 스택
    # 세션 및 쿠키 기반 인증, 사용자 정보 접근 : WebSocket 연결을 처리할 때, scope 객체를 통해 연결된 사용자의 정보를 사용할 수 있다.
    "websocket":AuthMiddlewareStack( URLRouter(chat.routing.websocket_urlpatterns)) 
})