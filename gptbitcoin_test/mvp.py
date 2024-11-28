from math import e
import pyupbit
import json
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

print(os.getenv("UPBIT_ACCESS_KEY"))


def ai_trading():
    # 1. 업비트 차트 데이터 가져오기(30일 일봉)
    df = pyupbit.get_ohlcv("KRW-BTC", interval='days', count=30)
    """
    - o(open): 시가, 첫 번째 거래 가격
    - H(High): 고가, 최고 거래 가격
    - L(Low): 저가, 최저 거래 가격
    - C(Close): 종가, 마지막 거래 가격
    - V(Volume): 거래량, 거래된 수량
    - V(Value): 거래금액, 거래된 총 금액
    """

    # 2. AI에게 데이터 제공하고 판단 받기

    client = OpenAI()

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You're a Bitcoin investing expert.\nTell me whether I should buy, sell, or hold at the moment based on the provided chart data. response in json format.\n\nResponse Example:\n{\"decision\" : \"buy\",\"reason\" : \"some technical reason\"}\n{\"decision\" : \"sell\",\"reason\" : \"some technical reason\"}\n{\"decision\" : \"hold\",\"reason\" : \"some technical reason\"}"
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": df.to_json()
                    }
                ]
            },
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "text": "{\"decision\" : \"hold\",\"reason\" : \"The recent price trend shows a lot of volatility with both upward and downward movements. Although there was a significant rally in recent days, the price faced resistance around the 137,000,000 mark and volume is showing a decreasing trend after reaching a peak. The current uptrend might face exhaustion, signaling caution. It's prudent to wait for more definitive signals for continuation or reversal before making a move.\"}"
                    }
                ]
            }
        ],
        response_format={
            "type": "json_object"
        },
        temperature=1,
        max_tokens=2048,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    result = response.choices[0].message.content
    result = json.loads(result)

    print('### AI Decision: ', result['decision'].upper(), '###')
    print(f"### Reason: {result['reason']} ###")

    # 3. 판단에 따라 실제로 자동매매 진행하기
    access = os.getenv('UPBIT_ACCESS_KEY')
    secrete = os.getenv('UPBIT_SECRETE_KEY')
    upbit = pyupbit.Upbit(access, secrete)

    if result["decision"] == 'buy':
        current_commision = 0.05*0.01  # 업비트 현재 수수료 0.05%
        my_krw = upbit.get_balance("KRW")
        my_krw_with_committion = my_krw*(1-current_commision)
        # 수수료를 제외한 급액이 최소 주문 금액이 5천원이다.
        if my_krw_with_committion > 5000:
            print("### Buy Order Executed ###")
            print(upbit.buy_market_order("KRW-BTC", my_krw_with_committion))
            upbit.buy_market_order("KRW-BTC", my_krw)  # 전량 매수
        else:
            print("### Buy Order Failed: Insufficient KRW (less than 5000 KRW) ###")
    elif result["decision"] == 'sell':
        # 내가 보유한 btc의 원화 가치가 5천원(최소 판매 급액) 이상이여야 한다
        my_btc = upbit.get_balance("KRW-BTC")
        current_btc_price = pyupbit.get_orderbook(
            ticket="KRW-BTC")['orderbook_units'][0]["ask_price"]
        if my_btc*current_btc_price > 5000:
            print("### Sell Order Executed ###")
            print(upbit.sell_market_order("KRW-BTC", my_btc))
        else:
            print("btc 5000원 미만")
    elif result["decision"] == 'hold':
        print("### Hold Position ###")


while True:
    import time
    time.sleep(10)
    ai_trading()
