import logging
import asyncio
import time
from typing import List, Literal, TypedDict
import os

from openai import AsyncOpenAI, APIConnectionError, RateLimitError, APIStatusError

from dotenv import load_dotenv



logger = logging.getLogger(__name__)

load_dotenv()

class GptMessage(TypedDict):
    role : Literal["system","user","assistant"]
    content : str

class OpenAiService:

    def __init__(self):
          # OpenAI API 키 설정
        self.api_key = os.getenv("OPENAI_API_KEY") 
        self.client = AsyncOpenAI(api_key=self.api_key)

    async def get_chat_response(self, get_message: List[GptMessage])  -> GptMessage:
        """
        OpenAI의 ChatCompletion API에 요청을 보내고 응답을 받는다
        """
        try:
            
            response_dict = await self.client.chat.completions.create(
                model='gpt-3.5-turbo', 
                messages= get_message,
                temperature=1 # 0-1 범위의 실수값. 최대값인 1로 지정해서 무작위성을 최대한 높임)
            )  

            response_role = response_dict.choices[0].message.role
            response_content = response_dict.choices[0].message.content

            print(response_role)
            print(response_content)

            return GptMessage(role=response_role, content=response_content)
        except APIConnectionError as e:
            logger.error("The server could not be reached",e)
        except RateLimitError as e:
            logger.error("A 429 status code was received; we should back off a bit.",e)
        except APIStatusError as e:
            logger.error("Another non-200-range status code was received",e)

# 실행 

async def test_openai_service():
    print(os.getenv("OPENAI_API"))
    # OpenAiService 인스턴스 생성
    openai_service = OpenAiService()

    # 테스트 메시지 목록 생성
    test_messages = [
        GptMessage(role="system", content="당신은 지식이 풍부한 도우미입니다."),
        GptMessage(role="user", content="세계에서 가장 큰 도시는 어디인가요?")
    ]

    # OpenAI API 호출 및 응답 확인
    response_message = await openai_service.get_chat_response(test_messages)
    print("testst",response_message)

    if response_message:
        print(f"Role: {response_message.role}")
        print(f"Content: {response_message.content}")
    else:
        print("No response received from OpenAI.")

# asyncio를 통해 비동기 테스트 실행
if __name__ == "__main__":
    asyncio.run(test_openai_service())

