# API Document

## 1. GET Items

### Request

Retrieves a list of items

```js
GET / items;
```

### Response

- Status Code 200
- Response body

```js
[
  {
    id: 1,
    name: "노른자 분리기",
    price: 9900,
    image: "../images/egg.png",
  },
  {
    id: 2,
    name: "2020년 달력",
    price: 12000,
    image: "../images/2020.jpg",
  },
  {
    id: 3,
    name: "개구리 안대",
    price: 2900,
    image: "../images/frog.jpg",
  },
];
```

## 2. Order

### Request

Add new order

### Request

- request format : JSON MIME type : application/json

| parameter  | type   | desc        | must or not |
| ---------- | ------ | ----------- | ----------- |
| orders     | array  | order Items | must        |
| totalPrice | number | total price | must        |

```js
POST /users/:userId/orders
```

- payload

```js
{
  "orders": [
    {
      "quantity": 1,
      "itemId": 2
    }
  ],
  "totalPrice": 16900
}

```

### Response

- Status Code 201 (if success)

## 3.Show Order History

### Request

```js
GET /usres/:userId/orders
```

### Response

- format : json
- Status Code 200

```js
[
  {
    id: 1, // orders 테이블의 id
    created_at: "2021-02-19T04:34:11.000Z",
    total_price: 7800,
    name: "칼라 립스틱",
    price: 2900,
    image: "../images/lip.jpg",
    order_quantity: 1,
  },
  {
    id: 1,
    created_at: "2021-02-19T04:34:11.000Z",
    total_price: 7800,
    name: "뜯어온 보도블럭",
    price: 4900,
    image: "../images/block.jpg",
    order_quantity: 1,
  },
];
```

# 구성

- Controller - Router - App.js
- Model - DB (Mysql)
