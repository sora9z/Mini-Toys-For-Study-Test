// links router
const router = require("express").Router();
const linkController = require("../controllers");

router.get("/", linkController.get);
router.post("/", linkController.post);
router.get("/:id", linkController.redirection);

module.exports = router;
