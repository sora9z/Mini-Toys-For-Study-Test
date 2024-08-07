from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.generic import CreateView, UpdateView, ListView, DetailView, DeleteView
from gtts import gTTS
from .models import RolePlayingRoom
from .forms import RolePlayingRoomForm


# 클래스 기반 뷰 정의

@method_decorator(staff_member_required, name="dispatch")
class RolePlayingRoomListView(ListView):
    model = RolePlayingRoom

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user=self.request.user)
        return qs
    
role_playing_room_list = RolePlayingRoomListView.as_view()


@method_decorator(staff_member_required, name="dispatch")
class RolePlayingRoomDetailView(DetailView):
    model = RolePlayingRoom

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user=self.request.user)
        return qs
    
role_playing_room_detail = RolePlayingRoomDetailView.as_view()

# 로그인 페이지가 없았지만 장고 어드민 기능을 활용하기 위해 staff_member_required 데코레이터를 사용한다.
# staff_member_required 데코레이터는 요청 유저가 스태프인지 확인한다. 스태프가 아니면 admin 로그인을 요청한다.
@method_decorator(staff_member_required, name="dispatch")
class  RolePlayingRoomCreateView(CreateView):
     model = RolePlayingRoom
     form_class = RolePlayingRoomForm

    # form_valid 메서드를 오버라이드하여 user 필드에 request.user를 저장
    # 유효성 검사를 통과하면 이 메서드가 실행이 된다.
     def form_valid(self, form):
        role_playing_room = form.save(commit=False) # form을 통한 모델 instance 생성 시에 instance.save()호출되지 않도록 한다.
        role_playing_room.user = self.request.user # save 전에 user 필드에 request.user를 저장
        return super().form_valid(form) # 부로를 호출 하여 form_valid() 메서드를 실행한다.
     # self.request.user  는 현재 요청 유저의 인스턴스이다. user 외래키 할당을 위해 이 view는 로그인 상태임이 보장되어야 한다.
# 클래스 기반 뷰를 함수 기반 뷰로 변환
# 장고의 클래스기반 뷰 클래스는 .as_view() 메서드를 호출해서 새로운 view 함수를 생성한다.(함수 기반 뷰로 변환)
role_playing_room_new = RolePlayingRoomCreateView.as_view()

# CreateView는 templates/<app_label>/<model_name>_form.html 템플릿을 찾는다. 그리고 이 템플릿에 form을 렌더링하여 사용자에게 보내준다.


class RolePlayingRoomUpdateView(UpdateView):
    model = RolePlayingRoom
    form_class= RolePlayingRoomForm

    # override
    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user=self.request.user)  # User가 본인이 생성한 채팅방만 수정 다른 유저의 채팅방을 수정하려고 하면 404 응답 
        return qs
    
role_playing_room_edit = RolePlayingRoomUpdateView.as_view()

@method_decorator(staff_member_required, name="dispatch")
class RolePlayingRoomDeleteView(DeleteView):
    model = RolePlayingRoom
    success_url = reverse_lazy("role_playing_room_list")

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user=self.request.user)
        return qs

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, "채팅방을 삭제했습니다.")
        return response


role_playing_room_delete = RolePlayingRoomDeleteView.as_view()


@staff_member_required
def make_voice(request):
    lang = request.GET.get("lang", "en")
    message = request.GET.get("message")

    response = HttpResponse()
    gTTS(message, lang=lang).write_to_fp(response)
    response["Content-Type"] = "audio/mpeg"

    return response


