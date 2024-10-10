// Assignment #4 - Create a backend server in node.js, that returns the sum endpoint
const express = require("express");

const app = express();

app.use(express.json());

app.get("/sum", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const c = a + b;
  res.json({
    ans: c,
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
