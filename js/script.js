const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterInput = document.getElementById("filter");

// submit form
todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const task = todoInput.ariaValueMax.trim();
    const date = dateInput.value;

    if(task === "" || date === "") {
        alert("Please fill out both fileds!");
        return;
    }

    // buat li baru
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${task} - ${date}</span>
    <button class="delete">X</button>
    `;

    todoList.appendChild(li);

    // reset input
    todoInput.value = "";
    dateInput.value = "";
});
