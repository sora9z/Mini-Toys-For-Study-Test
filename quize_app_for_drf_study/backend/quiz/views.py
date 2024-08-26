import random
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Quiz
from .serializers import QuizSerializer

@api_view(['GET'])
def helloAPI(request):
    return Response("hello world")

@api_view(['GET'])
def randomQuiz(request,id):
    totlaQuizs = Quiz.objects.all() 
    randomQuizs = random.sample(list(totlaQuizs),id)
    serializers = QuizSerializer(randomQuizs,many=True) # many = True 는 다량의 데이터에 대해 직렬화 
    return Response(serializers.data)   