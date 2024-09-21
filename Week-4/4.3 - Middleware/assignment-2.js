// Assignment #6 - You have to create a middleware for rate limiting a users request based on their username passed in the header
const express = require('express');

const app = express();

let numberOfRequestsForUser = {};

setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);

app.use(function (req, res, next) {
  const userId = req.headers['user-id'];

  if (numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId]++;

    if (numberOfRequestsForUser[userId] > 5) {
      res.status(404).send('No Entry!');
    } else {
      next();
    }
  } else {
    numberOfRequestsForUser[userId] = 1;
    next();
  }
});

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'Bharat' });
});

app.post('/user', function (req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000);
