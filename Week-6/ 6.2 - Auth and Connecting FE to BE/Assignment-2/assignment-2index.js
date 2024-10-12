/* Try to create a TODO application where

User can signup/signin
User can create/delete/update TODOs
User can see their existing todos and mark them as done */

const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const app = express();
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.static("Public"));

const users = [];
const todos = [];

// Authentication middleware
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public/index.html"));
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User created successfully" });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const token = jwt.sign({ username }, JWT_SECRET);
  res.json({ token });
});

app.post("/todos", authenticateUser, (req, res) => {
  const { title } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
    username: req.user.username,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(id) && todo.username === req.user.username
  );
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todos.splice(todoIndex, 1);
  res.status(200).json({ message: "Todo deleted successfully" });
});

app.put("/todos/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todo = todos.find(
    (todo) => todo.id === parseInt(id) && todo.username === req.user.username
  );
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todo.title = title;
  res.status(200).json({ message: "Todo updated successfully", todo });
});

app.patch("/todos/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  const todo = todos.find(
    (todo) => todo.id === parseInt(id) && todo.username === req.user.username
  );
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todo.completed = true;
  res.status(200).json({ message: "Todo marked as done", todo });
});

app.get("/todos", authenticateUser, (req, res) => {
  const userTodos = todos.filter((todo) => todo.username === req.user.username);
  res.json(userTodos);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
