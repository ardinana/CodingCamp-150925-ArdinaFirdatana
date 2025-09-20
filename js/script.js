const todoBody = document.getElementById("todo-body");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const filterInput = document.getElementById("filter");
const deleteAllBtn = document.getElementById("delete-all");

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
    tasks.push({ task, date, done: false });
    saveTasks();
    renderTasks();

    // reset input
    todoInput.value = "";
    dateInput.value = "";
});

// hapus task
todoBody.addEventListener("click", function (e) {
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
    Array.from(todoBody.getElementsByTagName("tr")).forEach(function(row) {
        const content = row.textContent.toLowerCase();
        row.style.display = content.includes(text) ? "" : "none";
   }); 
});

// delete all tasks
deleteAllBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// render pertama kali saat halaman dibuka
renderTasks();
