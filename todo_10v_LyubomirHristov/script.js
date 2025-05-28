document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    loadTasks();

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
            saveTasks();
        }
    });

    taskList.addEventListener("click", (e) => {
        const taskItem = e.target.closest(".task");
        if (!taskItem) return;

        if (e.target.classList.contains("delete-btn")) {
            taskItem.remove();
            saveTasks();
        } else if (e.target.classList.contains("edit-btn")) {
            const taskTextElement = taskItem.querySelector(".task-text");
            const newText = prompt("Edit your task:", taskTextElement.innerText);
            if (newText !== null && newText.trim() !== "") {
                taskTextElement.innerText = newText.trim();
                saveTasks();
            }
        } else if (e.target.classList.contains("complete-btn")) {
            taskItem.classList.toggle("completed");
            saveTasks();
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement("div");
        taskItem.className = "task";
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-actions">
                <button class="complete-btn">Complete</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task").forEach(task => {
            tasks.push({
                text: task.querySelector(".task-text").innerText,
                completed: task.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTask(task.text);
            const lastTask = taskList.lastChild;
            if (task.completed) {
                lastTask.classList.add("completed");
            }
        });
    }
});