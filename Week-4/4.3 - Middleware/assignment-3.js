// Assignment #7 - You have to create a middleware for logging the number of errors on a server
const express = require("express");

const app = express();

let errorCount = 0;

app.get("/user", function (req, res) {
  throw new Error("Some Error");
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.get("/errorCount", function (req, res) {
  res.status(200).json({ errorCount });
});

app.use((err, req, res, next) => {
  res.status(404).send({});
  errorCount++;
});

app.listen(3000);
