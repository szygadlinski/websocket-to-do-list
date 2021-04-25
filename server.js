const express = require('express');

const app = express();


app.use((req, res) => {
  res.status(404).send('<h1>404 - page not found...</h1>');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000: http://localhost:8000');
});
