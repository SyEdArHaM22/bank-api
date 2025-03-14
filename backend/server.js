const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const paymentRef = req.query.payment_ref;
  {
    res.status("This is work Perfectly");
  } 
});

app.listen(port, () => {
  `Server is Running on port ${port}`
});