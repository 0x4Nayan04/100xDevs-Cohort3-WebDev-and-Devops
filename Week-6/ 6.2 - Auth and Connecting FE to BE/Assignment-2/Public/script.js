let token = null;

function showTodoSection() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("todo-section").style.display = "block";
}

function showAuthSection() {
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("todo-section").style.display = "none";
}

async function signUp() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  try {
    const response = await axios.post("http://localhost:3000/signup", {
      username,
      password,
    });
    console.log(response.data.message);
    alert("Sign up successful. Please sign in.");
  } catch (error) {
    console.error("Sign up failed:", error.response.data.message);
    alert("Sign up failed: " + error.response.data.message);
  }
}

async function signIn() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;
  try {
    const response = await axios.post("http://localhost:3000/signin", {
      username,
      password,
    });
    token = response.data.token;
    console.log("Sign in successful");
    showTodoSection();
    getTodos();
  } catch (error) {
    console.error("Sign in failed:", error.response.data.message);
    alert("Sign in failed: " + error.response.data.message);
  }
}

function signOut() {
  token = null;
  showAuthSection();
}

async function createTodo() {
  const title = document.getElementById("todo-title").value;
  try {
    const response = await axios.post(
      "http://localhost:3000/todos",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Todo created:", response.data);
    getTodos();
  } catch (error) {
    console.error("Failed to create todo:", error.response.data.message);
  }
}

async function deleteTodo(id) {
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Todo deleted");
    getTodos();
  } catch (error) {
    console.error("Failed to delete todo:", error.response.data.message);
  }
}

async function updateTodo(id, title) {
  try {
    await axios.put(
      `http://localhost:3000/todos/${id}`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Todo updated");
    getTodos();
  } catch (error) {
    console.error("Failed to update todo:", error.response.data.message);
  }
}

async function getTodos() {
  try {
    const response = await axios.get("http://localhost:3000/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    displayTodos(response.data);
  } catch (error) {
    console.error("Failed to get todos:", error.response.data.message);
  }
}

async function markAsDone(id) {
  try {
    await axios.patch(
      `http://localhost:3000/todos/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Todo marked as done");
    getTodos();
  } catch (error) {
    console.error("Failed to mark todo as done:", error.response.data.message);
  }
}

function displayTodos(todos) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">${todo.title}</span>
      <button onclick="markAsDone(${todo.id})">Done</button>
      <button onclick="updateTodo(${
        todo.id
      }, prompt('Enter new title:'))">Edit</button>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    todoList.appendChild(li);
  });
}
