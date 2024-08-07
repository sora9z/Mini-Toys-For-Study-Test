import os
import openai

# .env file 내역을 환경변수로서 로딩하기 위해 load_dotenv를 임포트 후에 호출한다.
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


response = openai.ChatCompletion.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "당신은 지식이 풍부한 도우미입니다."},
        {"role": "user", "content": "세계에서 가장 큰 도시는 어디인가요?"},
    ],
)

print(response)
print(response["choices"][0]["message"]["content"])
