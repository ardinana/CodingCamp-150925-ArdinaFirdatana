const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterInput = document.getElementById("filter");

// ambil data dari localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// fungsi render list
function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((taskObj, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${taskObj.task} - ${taskObj.date}</span>
        <button class="delete" data-index="${index}">X</button>
        `;
        todoList.appendChild(li);
    });
}

// simpan ke localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// submit form
todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const task = todoInput.ariaValueMax.trim();
    const date = dateInput.value;

    if(task === "" || date === "") {
        alert("Please fill out both fileds!");
        return;
    }

    // push ke array tasks
    tasks.push({ task, date });
    saveTasks();
    renderTasks();

    todoList.appendChild(li);

    // reset input
    todoInput.value = "";
    dateInput.value = "";
});

// hapus task
todoList.addEventListener("click", function (e) {
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