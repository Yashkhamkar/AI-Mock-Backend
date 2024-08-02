const express = require("express");
const {
  getUserStatus,
  upgradeUser,
  handlePaymentSuccess,
} = require("../Controller/PaymentController");
const router = express.Router();

router.get("/user-status", getUserStatus);
router.post("/upgrade", upgradeUser);
router.post("/success", handlePaymentSuccess);

module.exports = router;
