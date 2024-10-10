// Assignment #5 - Write an HTML file, that hits the backend server using fetch API
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sum", function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  const c = a + b;
  res.json({
    ans: c,
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
