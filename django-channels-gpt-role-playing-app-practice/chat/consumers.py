from typing import List
from urllib import response
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth.models import AbstractUser
import openai
from chat.models import GptMessage, RolePlayingRoom

class RolePlayingRoomConsumer(JsonWebsocketConsumer):

    # Consumer instance에 count 변수를 추가하여 클라이언트로부터 메시지를 받을 때마다 1씩 증가시킨다.    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.get_message:List[GptMessage] = []
        self.recommend_message:str = ""

    def connect(self):
        room = self.get_room()
        if room is None:
            self.close()
        else: 
            self.accept()
            # 연결이 되면 바로 초기 프롬프트 시작
            self.get_message = room.get_initial_messages()
            # 소켓 연결시 추천 프롬프트를 미리 조회히여 저장
            self.recommend_message = room.get_recommend_message()
            
            assistant_message = self.get_query()
            self.send_json(
                {
                    "type":"assistant-message",
                    "message": assistant_message
                }
            )


    def receive_json(self, content_dict, **kwargs):
        if content_dict["type"] =="user-message":
            assistant_message = self.get_query(user_query=content_dict["message"])
            self.send_json({
                "type":"assistant-message",
                "message": assistant_message
            })
        elif content_dict["type"] == "request-recommend-message":
            recommended_message = self.get_query(command_query=self.recommend_message)
            self.send_json({
                "type":"recommended-message",
                "message": recommended_message
            })
        else:
            self.send_json({
                "type":"error",
                "message":f"Invalid type: {content_dict['type']}"
            })

    # user,room_pk를 받아서 관련된 RolePlayingRoom 인스턴스 조회 및 반환 
    def get_room(self) -> RolePlayingRoom | None:
        user : AbstractUser = self.scope["user"]
        room_pk =  self.scope["url_route"]["kwargs"]["room_pk"]
        room : RolePlayingRoom = None

        if user.is_authenticated:
            try:
                room = RolePlayingRoom.objects.get(pk=room_pk, user=user)
            except RolePlayingRoom.DoesNotExist:
                pass
            return room
            
    # command_query : 추천 표현 요청 등의 명령어
    # user_query : 사용자 입력
    def get_query(self, command_query:str=None, user_query:str=None)->str:
        if command_query is not None and user_query is not None:
            raise ValueError("command_query와 user_query 중 하나만 입력해야 합니다.")
        elif command_query is not None:
            self.get_message.append(GptMessage(role="user",content=command_query))
        elif user_query is not None:
            self.get_message.append(GptMessage(role="user",content=user_query))

        response_dict = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages = self.get_message,
            temperature=1 # 0-1 범위의 실수값. 최대값인 1로 지정해서 무작위성을 최대한 높임 
        )

        response_role = response_dict["choices"][0]["message"]["role"]
        response_content = response_dict["choices"][0]["message"]["content"]
        
        if command_query is None:
            self.get_message.append(GptMessage(role=response_role,content=response_content))

        return response_content


    
