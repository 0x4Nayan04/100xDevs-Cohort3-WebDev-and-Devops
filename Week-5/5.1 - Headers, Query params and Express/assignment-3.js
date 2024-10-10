// Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it
const express = require("express");

const app = express();

let requestCount = 0;

function countTotalRequest(req, res, next) {
  requestCount++;
  next();
}

app.use(countTotalRequest);

app.get("/", function (req, res) {
  res.json({
    message: "Server is Running",
  });
});

app.get("/requestCounter", function (req, res) {
  res.json({
    requestCount: requestCount,
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
