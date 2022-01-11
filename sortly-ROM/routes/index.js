// root router
const router = require("express").Router();

router.get("/", (req, res) => res.send("Make your url shortly ;)"));

module.exports = router;
