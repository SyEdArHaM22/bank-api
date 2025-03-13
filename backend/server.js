const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser'); // Add body-parser for parsing JSON payloads
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json()); // Add body-parser middleware

// GET route for testing webhook (optional)
app.get('/webhook', (req, res) => {
  const paymentRef = req.query.payment_ref;
  if (paymentRef) {
    res.status(200).send('Webhook received');
  } else {
    res.status(400).send('Missing payment_ref');
  }
});

// POST route for handling webhook requests
app.post('/webhook', (req, res) => {
  const payload = req.body; // Webhook payload
  console.log('Webhook Payload:', payload);

  // Validate the webhook (optional but recommended)
  if (!validateWebhook(payload)) {
    return res.status(400).json({ error: 'Invalid webhook payload' });
  }

  // Process the webhook data
  processWebhook(payload);

  // Respond with a success status
  res.status(200).json({ message: 'Webhook received' });
});

// Function to validate the webhook (optional but recommended)
function validateWebhook(payload) {
  // Add validation logic here (e.g., verify signature)
  // Example: Check if required fields are present
  if (!payload.paymentRef || !payload.status) {
    return false;
  }
  return true;
}

// Function to process the webhook data
function processWebhook(payload) {
  const paymentRef = payload.paymentRef; // Payment reference
  const status = payload.status; // Payment status (e.g., 'completed', 'failed')

  if (status === 'completed') {
    console.log('Payment successful. Updating database...');
    // TODO: Update your database or trigger actions
  } else if (status === 'failed') {
    console.log('Payment failed. Notifying user...');
    // TODO: Notify the user or handle failed payments
  }
}

// POST route to initiate payment
app.post('/initiate-payment', async (req, res) => {
  const apiKey = '67d2ac8a844b7ec4608b7375:eD9w7QUGWomfQwLcqxJHtVdmk';
  const apiUrl = 'https://api.sandbox.konnect.network/api/v2/payments/init-payment';

  try {
    console.log('Request Body:', req.body);

    const response = await axios.post(apiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    console.log('Konnect API Response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error initiating payment:', error);

    res.status(500).json({
      error: 'Failed to initiate payment',
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});