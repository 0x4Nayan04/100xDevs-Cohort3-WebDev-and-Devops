// Assignment #2 - Trying to code a filesystem based todo app and store data into the file
// this means every time we hti the request we need to save the task a JSON File.
const express = require("express");
const fs = require("fs");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

let todos = [];

// Load existing todos from file (if available)
if (fs.existsSync("todos.json")) {
  const fileData = fs.readFileSync("todos.json", "utf-8");
  todos = JSON.parse(fileData);
}

// Function to save todos to a JSON file
function saveTodosToFile(todos) {
  const jsonData = JSON.stringify(todos, null, 2);
  fs.writeFile("todos.json", jsonData, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Todos have been successfully saved to todos.json");
    }
  });
}

// Home route
app.get("/", (req, res) => {
  res.send("You can write your task and delete it in this app");
});

// POST to add a task (using req.body)
app.post("/task", (req, res) => {
  const task = req.body.task; // Get task from body
  if (task) {
    todos.push(task);
    saveTodosToFile(todos); // Save after adding task
    res.send({ message: "Task added", todos });
  } else {
    res.status(400).send({ error: "Task is required" });
  }
});

// DELETE the last task
app.delete("/delete", (req, res) => {
  if (todos.length > 0) {
    const removedTask = todos.pop();
    saveTodosToFile(todos); // Save after deleting task
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
