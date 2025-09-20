const todoBody = document.getElementById("todo-body");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterInput = document.getElementById("filter");

// ambil data dari localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// fungsi render list
function renderTasks() {
    todoBody.innerHTML = "";
    tasks.forEach((taskObj, index) => {
        const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${taskObj.task}</td>
        <td>${taskObj.date}</td>
        <td>
            <button class="status-btn" data-index="${index}">
            ${taskObj.done ? "Done" : "Pending"}
            </button>
        </td>
        <td>
            <button class="delete" data-index="${index}">Delete</button>
        </td>
    `;
    if (taskObj.done) {
        tr.querySelector("td:first-child").classList.add("status-done");
    }
    todoBody.appendChild(tr);
    });
}

// simpan ke localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// submit form
todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const task = todoInput.value.trim();   // diperbaiki
    const date = dateInput.value;

    if(task === "" || date === "") {
        alert("Please fill out both fields!");
        return;
    }

    // push ke array tasks
    tasks.push({ task, date });
    saveTasks();
    renderTasks();

    // reset input
    todoInput.value = "";
    dateInput.value = "";
});

// hapus task
todoList.addEventListener("click", function (e) {
    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("status-btn")) {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
    }
    if(e.target.classList.contains("delete")) {
        const index = e.target.getAttribute("data-index");
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
});

// filter task
filterInput.addEventListener("keyup", function (e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll("#todo-list li").forEach(function(item) {
        const content = item.textContent.toLowerCase();
        item.style.display = content.includes(text) ? "flex" : "none";
   }); 
});

// render pertama kali saat halaman dibuka
renderTasks();
