// Assignment #3 - Trying to code a filesystem based todo app with users
// we can see all the user task here
//Example:
/*         let users = {
          1: {
            todos: [],
          },
          2: {
            todos: [],
          },
          3: {
            todos: [],
          },
        }; */
const express = require('express');
const app = express();
let users = {};
let i = 0;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('You can add and delete tasks for users in this app');
});

// Add a task for a user
app.post('/task', (req, res) => {
  const task = req.body.task;

  // Increment user count and add a task to the user
  i++;
  users[i] = { todos: [task] }; // Initialize the user with the task
  res.send(`Task added successfully for user ${i}`);
});

// View all users and their tasks
app.get('/users', (req, res) => {
  res.send(users);
});

// Delete a task for a specific user
app.delete('/delete/:id', (req, res) => {
  const userId = req.params.id;
  if (users[userId] && users[userId].todos.length > 0) {
    const removedTask = users[userId].todos.pop(); // Remove the last task
    res.send({
      message: 'Task deleted',
      removedTask,
      remainingTodos: users[userId].todos,
    });
  } else {
    res.send('No task to delete for this user');
  }
});

// Show tasks for a specific user
app.get('/show/:id', (req, res) => {
  const userId = req.params.id;
  if (users[userId]) {
    res.send(users[userId]);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
