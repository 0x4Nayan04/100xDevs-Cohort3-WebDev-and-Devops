const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "secret";

const users = [];

const app = express();
app.use(express.json());

const SALT_ROUNDS = 10;

const findUserByUsername = (username) =>
  users.find((user) => user.username === username);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  if (findUserByUsername(username)) {
    return res.status(409).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "Signup successful!" });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({
    message: "Signin successful!",
    token,
  });
});

app.get("/me", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is required." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      message: "Success",
      username: decoded.username,
    });
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
