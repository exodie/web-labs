document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || {
    todo: [],
    inProgress: [],
    completed: [],
  };

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.todo.forEach((task, index) => {
      const row = document.createElement("tr");
      row.classList.add("task");
      row.innerHTML = `
                <td>${task} 
                    <select class="select-status" onchange="changeStatus(${index}, 'todo', this.value)">
                        <option value="">Переместить</option>
                        <option value="inProgress">В работе</option>
                        <option value="completed">Выполненные</option>
                    </select>
                </td>
                <td></td>
                <td><button class="delete-button" onclick="deleteTask(${index}, 'todo')">Удалить</button></td>
            `;
      taskList.appendChild(row);
    });

    tasks.inProgress.forEach((task, index) => {
      const row = document.createElement("tr");
      row.classList.add("in-progress");
      row.innerHTML = `
                <td></td>
                <td>${task} 
                    <select class="select-status" onchange="changeStatus(${index}, 'inProgress', this.value)">
                        <option value="">Переместить</option>
                        <option value="todo">К задачам</option>
                        <option value="completed">Выполненные</option>
                    </select>
                </td>
                <td><button class="delete-button" onclick="deleteTask(${index}, 'inProgress')">Удалить</button></td>
            `;
      taskList.appendChild(row);
    });

    tasks.completed.forEach((task, index) => {
      const row = document.createElement("tr");
      row.classList.add("completed");
      row.innerHTML = `
                <td></td>
                <td></td>
                <td>${task} 
                    <select class="select-status" onchange="changeStatus(${index}, 'completed', this.value)">
                        <option value="">Переместить</option>
                        <option value="todo">К задачам</option>
                        <option value="inProgress">В работе</option>
                    </select>

                    <button class="delete-button" onclick="deleteTask(${index}, 'completed')">Удалить</button>
                </td>
            `;
      taskList.appendChild(row);
    });
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskInput.value;
    tasks.todo.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  });

  window.deleteTask = (index, category) => {
    tasks[category].splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  };

  window.changeStatus = (index, fromCategory, toCategory) => {
    if (toCategory) {
      const task = tasks[fromCategory].splice(index, 1)[0];
      tasks[toCategory].push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  };

  renderTasks();
});
