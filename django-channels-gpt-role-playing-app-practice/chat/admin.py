from django.contrib import admin
from chat.forms import RolePlayingRoomForm
from chat.models import RolePlayingRoom

# Register your models here.
@admin.register(RolePlayingRoom) # admin에 등록 
class RolePlayingRoomAdmin(admin.ModelAdmin):
    form = RolePlayingRoomForm # RolePlayingRoomForm을 사용하여 admin 페이지에서 RolePlayingRoom을 생성할 수 있도록 한다.

    def save_model(self, request,obj, form, change): # change는 수정인지 생성인지 확인하는 변수
        if change is False and form.is_valid():
            obj.user = request.user
        super().save_model(request, obj, form, change)
