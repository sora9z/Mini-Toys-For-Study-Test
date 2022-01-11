const router = require("express").Router();

const itemRouter = require("./items");
const usersRouter = require("./users");
// end point에 따라 router 분기
router.use("/items", itemRouter);
router.use("/users", usersRouter);

module.exports = router;
