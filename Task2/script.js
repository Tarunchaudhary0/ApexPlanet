// TODO: using local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");

    const taskText = document.createElement("div");
    taskText.className = `task-text ${task.completed ? "completed" : ""}`;
    taskText.textContent = task.text;

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.innerHTML = `Priority: <span class="priority-${task.priority}">${
      task.priority
    }</span> | Due: ${task.dueDate || "No date"}`;

    const btns = document.createElement("div");
    btns.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = task.completed
      ? '<i class="fas fa-rotate-left"></i>'
      : '<i class="fas fa-check-circle"></i>';
    completeBtn.title = task.completed ? "Undo" : "Mark as Complete";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks(filter);
    };

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-pen-to-square"></i>';
    editBtn.title = "Edit Task";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks(filter);
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.title = "Delete Task";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(filter);
    };

    btns.appendChild(completeBtn);
    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.appendChild(taskText);
    taskInfo.appendChild(btns);

    li.appendChild(taskInfo);
    li.appendChild(meta);
    list.appendChild(li);
  });
}


// TODO: add task
function addTask() {
  const input = document.getElementById("todo-input");
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("due-date").value;

  const task = input.value.trim();
  if (task === "") {
    alert("Task cannot be empty.");
    return;
  }

  tasks.push({
    text: task,
    priority,
    dueDate,
    completed: false,
  });

  input.value = "";
  document.getElementById("due-date").value = "";

  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

// TODO: Initial render
renderTasks();
