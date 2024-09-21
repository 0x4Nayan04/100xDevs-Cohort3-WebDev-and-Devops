// Assignment #5 - You have to create a middleware for logging the number of requests on a server
const express = require('express');

const app = express();

let requestCount = 0;

app.use(function (req, res, next) {
  requestCount = requestCount + 1;
  next();
});

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'Bharat' });
});

app.post('/user', function (req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function (req, res) {
  res.status(200).json({ requestCount });
});

app.listen(3000);
