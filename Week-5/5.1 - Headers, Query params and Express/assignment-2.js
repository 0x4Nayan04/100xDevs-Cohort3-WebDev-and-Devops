// Assignment #2 - Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
const express = require("express");

const app = express();

function requestLogger(req, res, next) {
  console.log(`The Incoming Request Method: ${req.method}`);
  console.log(`The Incoming Request URL: http://localhost:3000${req.url}`);
  console.log(`The Incoming Request Timestamp: ${new Date()}`);
}

app.use(requestLogger);

app.get("/", function (req, res) {
  res.json({ message: "Request Logged Successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
