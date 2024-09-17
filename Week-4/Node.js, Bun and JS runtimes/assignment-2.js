/* Filesystem based todo list.

Create a `cli` that lets a user

1. Add a todo
2. Delete a todo
3. Mark a todo as done

Store all the data in files (todos.json) */
const fs = require("fs");
const { Command } = require("commander");
const program = new Command();
const filePath = "todo.json";

// Function to load existing tasks from JSON file
function loadTodos() {
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } else {
    return {}; // Return an empty object if the file doesn't exist
  }
}

// Function to save tasks to the JSON file
function saveTodos() {
  const jsonData = JSON.stringify(todo, null, 2);
  fs.writeFileSync(filePath, jsonData, "utf-8");
  console.log("Tasks saved successfully.");
}

let todo = loadTodos(); // Load tasks at the start
let i = Object.keys(todo).length; // Set the counter to the current length

program
  .name("todo-cli")
  .description("CLI to add, delete, and mark tasks as done")
  .version("0.8.0");

// Command to add a todo task
program
  .command("addtodo")
  .description("Add a task to the todo list")
  .argument("<task>", "Task to add")
  .action((task) => {
    todo[i] = { task: task, done: false }; // Add task with a "done" status
    i++;
    saveTodos(); // Save tasks after adding
    console.log(`Task added: ${task}`);
  });

// Command to delete a todo task by index
program
  .command("deletetodo")
  .description("Delete a task by its index")
  .argument("<index>", "Index of the task to delete")
  .action((index) => {
    if (todo.hasOwnProperty(index)) {
      delete todo[index];
      saveTodos(); // Save tasks after deletion
      console.log(`Task ${index} deleted`);
    } else {
      console.log("Task not found");
    }
  });

// Command to mark a todo task as done
program
  .command("markdone")
  .description("Mark a task as done by its index")
  .argument("<index>", "Index of the task to mark as done")
  .action((index) => {
    if (todo.hasOwnProperty(index)) {
      todo[index].done = true;
      saveTodos(); // Save tasks after marking as done
      console.log(`Task ${index} marked as done`);
    } else {
      console.log("Task not found");
    }
  });

// Command to export tasks to a JSON file
program
  .command("export")
  .description("Export the todo list to a JSON file")
  .argument("<filename>", "File to export the todo list to")
  .action((filename) => {
    const jsonData = JSON.stringify(todo, null, 2); // Convert tasks to JSON format
    fs.writeFileSync(filename, jsonData, "utf-8"); // Write the data to a file
    console.log(`Tasks exported to ${filename}`);
  });

// Parse command-line arguments
program.parse(process.argv);
