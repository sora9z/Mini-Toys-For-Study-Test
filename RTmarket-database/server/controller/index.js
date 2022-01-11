// 요청에 따라 model을 통해 DB에 접근한다
// GET /items  -> 모든 주문 조회 -> model.items.get
// POST users/:userId/orders -> 새로운 주문 추가 -> model.orders.post
// GET users/:userId/orders ->  주문 내역 조회 -> model.orders.get

const model = require("../model");

module.exports = {
  items: {
    get: (req, res) => {
      model.items.get((err, result) => {
        if (err) {
          res.status(500).send("Internal Server Error");
        } else {
          res.status(200).json(result);
        }
      });
    },
  },

  orders: {
    get: (req, res) => {
      const userId = req.params.userId;
      if (!userId) res.status(400).send("Unvalid query string").end();
      model.orders.get(userId, (err, result) => {
        if (err) res.status(500).send("Internal Server Error");
        else res.status(200).json(result);
      });
    },

    post: (req, res) => {
      const userId = req.params.userId;
      // req.body에서 필요한 정보를 받아온다.
      const { orders, totalPrice } = req.body;
      // err handling (400)
      if (!userId || !orders || !totalPrice) {
        res.status(400).send("Unvalid query string").end();
      }

      model.orders.post(userId, orders, totalPrice, (err, result) => {
        if (err) res.status(500).send("Internal Server Error");
        else res.status(201).send("Success");
      });
    },
  },
};
