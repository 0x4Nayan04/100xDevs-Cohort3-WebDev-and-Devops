// Assignment #2 - Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
const express = require("express");

const app = express();

function reuqestLogger(res, req, next) {
  console.log(`The Incoming Request Method: ${req.method}`);
  console.log(`The Incoming Request URL: http://localhost:3000${req.url}`);
  console.log(`The Incoming Request Timestamp: ${new Date()}`);

  next();
}

app.get("/", function (req, res) {
  res.send("Requet Received");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
