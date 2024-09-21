// Assignment #3 & #4 - You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
const express = require('express');

const app = express();

app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todo item not found with id ' + id);
  }
});

app.post('/todos', (req, res) => {
  const { title, description } = req.body;

  const todo = {
    id: todos.length + 1,
    title,
    description,
  };

  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    const { title, description } = req.body;
    todo.title = title;
    todo.description = description;
    res.json(todo);
  } else {
    res.status(404).send('Todo item not found with id ' + id);
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.status(200).send('Todo deleted successfully with id ' + id);
  } else {
    res.status(404).send('Todo item not found with id ' + id);
  }
});

app.all('*', (req, res) => {
  res.status(404).send('Route Not Found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
