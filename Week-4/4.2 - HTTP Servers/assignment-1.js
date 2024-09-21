// Assignment #1 - Trying to code a todo app and store data into the array
const express = require("express");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

let todos = [];

// Home route
app.get("/", (req, res) => {
  res.send("You can write your task and delete it in this app");
});

// POST to add a task (using req.body)
app.post("/task", (req, res) => {
  const task = req.body.task; // Get task from body
  if (task) {
    todos.push(task);
    res.send({ message: "Task added", todos });
  } else {
    res.status(400).send({ error: "Task is required" });
  }
});

// DELETE the last task (fixing the typo from /delte to /delete)
app.delete("/delete", (req, res) => {
  if (todos.length > 0) {
    const removedTask = todos.pop();
    res.send({ message: "Task deleted", removedTask, todos });
  } else {
    res.send({ message: "No tasks to delete" });
  }
});

// GET to show all tasks
app.get("/show", (req, res) => {
  res.send({ todos });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
