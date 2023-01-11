const router = require("express").Router();
const controller = require("../controllers/purchaseController");

router.get("/getPurchaseByUser/:userId", controller.getPurchaseByUser);
module.exports = router;
