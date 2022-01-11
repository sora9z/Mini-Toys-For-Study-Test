// Controller의 호출에 따라 DB와 연결한다.
// model.items.get -> select * from items
// model.orders.get -> select properties from ...
// model.orders.post -> insert into  orders & order_items (using orderse result as FK)

const db = require("../db");
const { query } = require("express");

module.exports = {
  items: {
    get: (callback) => {
      const qs = `SELECT * FROM items`;
      db.query(qs, (err, result) => {
        callback(err, result); // callback은 router를 거쳐어 오기 때문에 비동기 함수이다.
      });
    },
  },

  orders: {
    get: (userId, callback) => {
      const qs = `SELECT o.id, o.created_at, o.total_price, i.name, i.price, i.image, oi.order_quantity FROM items AS i JOIN order_items AS oi ON (i.id=oi.item_id)
        JOIN orders AS o ON (o.id=oi.order_id)
        WHERE (o.user_id=?)`;

      const params = [userId];
      db.query(qs, params, (err, result) => {
        callback(err, result);
      });
    },

    post: (userId, orders, totalPrice, callback) => {
      const qsO = `INSERT INTO orders (user_id,total_price) VALUES ??`;
      const qsOi = `INSERT INTO order_items (order_id,item_id,order_quantity) VALUES ?`;

      const params = [userId, totalPrice];

      db.query(qsO, params, (err, result) => {
        const params = orders.map((order) => {
          return [result.insertId, order.itemId, order.quantity];
        });
        db.query(qsOi, [params], (err, result) => {
          callback(err, result);
        });
      });
    },
  },
};
