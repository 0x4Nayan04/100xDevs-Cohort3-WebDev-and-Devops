// Assignment #3 - Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

const express = require("express");

const app = express();

function countTotalRequest(req, res, next) {
  requestCount++;
}
app.use(countTotalRequest);

app.get("/", function (req, res) {
  res.send("GET request Recived");
});

app.get("/endpoint", function (req, res) {
  res.send(`Total Request Count: ${requestCount}`);
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
