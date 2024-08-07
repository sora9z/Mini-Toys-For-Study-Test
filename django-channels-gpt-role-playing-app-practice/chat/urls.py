from django.urls import path
from . import views

urlpatterns = [
    # view 함수에 대한 url 매핑
    path("",views.role_playing_room_list,name="role_playing_room_list"),
    # new 으로 끝나는 요청이 오면 role_playing_room_new 라는 함수가 호출이 된다.
    path("new/",views.role_playing_room_new,name="role_playing_room_new"),
    # 1/
    path("<int:pk>",views.role_playing_room_detail,name="role_playing_room_detail"),
    # 1/edit
    path("<int:pk>/edit/",views.role_playing_room_edit,name="role_playing_room_edit"),
    # 1/delete
    path("<int:pk>/delete/", views.role_playing_room_delete,name="role_playing_room_delete"),
    # 음성 요청 
    path("voice/",views.make_voice,name="make_voice"),
]
