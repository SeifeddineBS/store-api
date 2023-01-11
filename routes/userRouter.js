const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/add", controller.create);
router.get("/find/:id", controller.getUserByid);

module.exports = router;
