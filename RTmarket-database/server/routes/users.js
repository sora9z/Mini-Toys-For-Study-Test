// users router와 controller를 연결한다.
const router = require("express").Router();
const controller = require("../controller");

// ./users/:userId/orders get 요청 controller.orders.get에 연결
router.get("/:userId/orders", controller.orders.get);

// ./users/:userId/orders post 요청 controller.orders.post에 연결
router.post("/:userId/orders", controller.orders.post);

module.exports = router;
