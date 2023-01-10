const router = require("express").Router();
const controller = require("../controllers/loginController");

router.get("/login", controller.login);
module.exports = router;
