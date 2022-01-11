# sortly-server-ORM

## 1. About

The Mini toy project is for practice make 3-Tier architecture server by use sequelize ORM abd MVC Design pattern</br>
This is a mini server that shortens a long URLs

---

## 2. Simple API

**- POST /links** </br>

- Request
  Content-type : application/json
  Payload : 단축 시킬 URL

  ```json
  {
  "url": “https://www.github.com”
  }
  ```

- Reqpose
  성공 시 status 201
  ```json
  {
  "id": 1,
  "url": "https://www.github.com",
  "title": "The world’s leading software development platform · GitHub",
  "visits": 1,
  "createdAt": "2020-07-25T20:07:15.000Z",
  "updatedAt": “2020-07-25T20:07:15.000Z"
  }
  ```

**- GET /links** </br>

- Reqpose
  성공 시 status 200</br>
  모든 urls 필드를 json으로 return

**- GET /links/:id** </br>

- Reqpose
  성공 시 status 302</br>
  id로 요청이 들어오면 url 필드값으로 redirection.

---
