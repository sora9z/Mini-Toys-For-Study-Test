import openai

openai.api_key = "..."

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "Fix grammar errors:\n- I is a girl\n- You is a boy",
        },
    ],
)
# print(response)

print(response["choices"][0]["message"]["content"])

response = openai.ChatCompletion.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "당신은 지식이 풍부한 도우미입니다."},
        {"role": "user", "content": "세계에서 가장 큰 도시는 어디인가요?"},
    ],
)

print(response)
print(response["choices"][0]["message"]["content"])
