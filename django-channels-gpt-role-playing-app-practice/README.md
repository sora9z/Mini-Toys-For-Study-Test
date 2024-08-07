## Description

- Django Channels를 이용한 채팅 서버 구현 연습
- OPENAI API 를 사용한 언어별 회화 연습 서버 구혀
- Django Channels, Django Framwork을 사용함
- 강의를 참고하였고 장고 및 채널스 스터디를 위한 프로젝트

- 점진적으로 디벨롭 예정

# 사용방법

공개적인 프로젝트는 아니라서 조금 불친절한 사용법

## 1. 서버실행

1. 환경변수 셋팅

- openai api key는 처음 가입하면 3개월 무료라고한다. 발급받아서 사용하자

```bash
.env 파일 생성
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
LANGUAGE_CODE='ko-KR'
```

2. 가상환경 생성 및 패키지 설치

```bash
python manage.py requirements.txt
```

3. 데이터베이스 마이그레이션

```bash
python manage.py makemigrations
```

4. python manage.py runserver 로 실행

## client 실행

1. 서버 실행 후 http://{host}/ 로 접속
2. 새 상황 마들기 -> 영어 부분은 작성하지 않으면 자동 번역이 된다
3. 자동재생을 누르면 gpt가 말할 때마다 음성이 나온다.
4. 추천받기 버튼을 누르면 추천 표현을 받을 수 있다.

## API Spec

알겠습니다. 아래는 요청된 형식으로 간단하게 작성된 API 명세서입니다.

API Specification

1. 채팅방 목록 조회
   - Method: GET
   - URL: http://{host}/
   - Description: 모든 채팅방 목록을 조회합니다.
2. 채팅방 생성
   - Method: POST
   - URL: http://{host}/new/
   - Description: 새로운 채팅방을 생성합니다.
3. 채팅방 상세 조회
   - Method: GET
   - URL: http://{host}/{pk}
   - Description: 특정 채팅방의 상세 정보를 조회합니다.
   - URL Parameters: pk - 채팅방의 고유 ID
4. 채팅방 수정
   - Method: POST
   - URL: http://{host}/{pk}/edit/
   - Description: 특정 채팅방의 정보를 수정합니다.
   - URL Parameters: pk - 채팅방의 고유 ID
5. 채팅방 삭제
   - Method: DELETE
   - URL: http://{host}/{pk}/delete/
   - Description: 특정 채팅방을 삭제합니다.
   - URL Parameters: pk - 채팅방의 고유 ID

# 요구사항정리

1. 사용자는 원하는 주제로 상황극 채팅방을 개설할 수 있다.
   - User인증, Database, 유저 요청 처리
   - 장고 기본 기능 사용 (Form, View)
2. 사용자는 1:1 채팅을 할 수 있어야하며 즉각적인 메시지 전송이필요하다
   - Websocket by Django channels
   - Http pooling, http long pooling등이 있지만 채팅에 적합한 것은 웹소켓
3. 각 사용자의 채팅방 messages 내역을 어딘가에 저장해야한다.
   - Database, file등에 저장할 수 있지만 테스트 용이기 때문에 메모리에 저장하자
   - 장고 채넣스에는 매 소켓 연결마다 생성되는 특별한 인스턴스가 있다. 그 인스턴스테 인스턴스 변수로 대화내역 리스트를 저장한다

## 한글->다른 언어로의 자동 번역 기능

- 빠른 테스트 환경을 위해 구글 번역 모바일 사이트를 크롤링 - 모바일 사이트는 페이지 구조가 단순(막힐 수 있다)
- 한글로 입력하면 자동번역해서 GTP로 요청하기 위해 구현
- 테스트 용도로 빠른 한경 구성을 위함
