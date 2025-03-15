const axios = require("axios");

const KONNECT_API_KEY = process.env.KONNECT_API_KEY;
const RECEIVER_WALLET_ID = process.env.RECEIVER_WALLET_ID;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const initiatePayment = async (req, res) => {
  try {
    const paymentData = {
      receiverWalletId: RECEIVER_WALLET_ID,
      token: "TND",
      amount: req.body.amount,
      type: "immediate",
      description: req.body.description,
      acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR"],
      lifespan: 10,
      checkoutForm: true,
      addPaymentFeesToAmount: true,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      orderId: req.body.orderId,
      webhook: WEBHOOK_URL,
      successUrl: "http://localhost:3000/payment-success",
      failUrl: "http://localhost:3000/payment-failure",
      theme: "dark",
    };

    const response = await axios.post("https://api.konnect.network/api/v2/payments/init-payment", paymentData, {
      headers: {
        "x-api-key": process.env.KONNECT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    const { payUrl, payRef } = response.data;

    res.json({ payUrl, payRef }); 
  } catch (error) {
    console.error("Payment initiation failed:", error.response?.data);
    res.status(500).json({ message: "Payment initiation failed", error: error.response?.data });
  }
};

const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const response = await axios.get(`https://api.konnect.network/payments/${paymentId}`, {
      headers: {
        "x-api-key": KONNECT_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment details", error: error.response?.data });
  }
};

const handleWebhook = (req, res) => {
  console.log("Webhook received:", req.query);
  res.status(200).send("Webhook received");
};

module.exports = { initiatePayment, getPaymentDetails, handleWebhook };
