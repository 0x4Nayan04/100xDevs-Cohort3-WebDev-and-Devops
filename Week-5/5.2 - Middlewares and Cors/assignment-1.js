// Assignment #1 - Try converting the calculator assignment to use POST endpoints. Check if it works with/without the express.json middleware
const express = require("express");

const app = express();

app.use(express.json());

app.post("/sum", function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  const c = a + b;
  res.json({
    ans: c,
  });
});

app.post("/multiply", function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  const c = a * b;
  res.json({
    ans: c,
  });
});

app.post("/subtract", function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  let c;
  if (a > b) {
    c = a - b;
  } else {
    c = b - a;
  }

  res.json({
    ans: c,
  });
});

app.post("/divide", function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  let c;
  if (b !== 0) {
    c = a / b;
  } else {
    return res.status(400).json({
      error: "Cannot divide by zero",
    });
  }

  res.json({
    ans: c,
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
