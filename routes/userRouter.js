const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/add", controller.create);
module.exports = router;
