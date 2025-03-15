const express = require("express");
const { initiatePayment, getPaymentDetails, handleWebhook } = require("../controllers/paymentController");

const router = express.Router();

router.post("/init-payment", initiatePayment);
router.get("/payment/:paymentId", getPaymentDetails);
router.get("/webhook", handleWebhook);

module.exports = router;
