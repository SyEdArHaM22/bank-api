const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  {
    res.status("This is work Perfectly");
  } 
});

app.listen(port, () => {
  `Server is Running on port ${port}`
});