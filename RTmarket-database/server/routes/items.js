// items router에서 endpoint에 따라 controller를 연결한다.
const router = require("express").Router();
const controller = require("../controller");

// "./  Get 요청 이므로 conroller.items.get 요청을 한다.
router.get("/", controller.items.get);

module.exports = router;
