from rest_framework import serializers
from .models import Quiz

class QuizSerializer(serializers.ModelSerializer):
    # 아래의 필드를 담고있는 json 타입으로 변환해주는 시리얼라이저 
    class Meta:
        model = Quiz
        fields = ('title', 'body', 'answer')
