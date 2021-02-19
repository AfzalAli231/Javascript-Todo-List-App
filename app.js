const date = new Date();
const todasDay = document.getElementById("todaysDay");
const todaysDate = document.getElementById("todaysDate");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
todasDay.textContent = days[date.getDay()];

todaysDate.textContent = `${
  months[date.getMonth()]
} ${date.getDate()}, ${date.getFullYear()}`;

const formEl = document.getElementById("form");
const todoInputEl = document.getElementById("todoInput");
const todoListContainer = document.querySelector(".todo__list");

// functions
function displayTodoDOM(todo) {
  const liEl = document.createElement("li");
  liEl.classList.add("bounceIn");
  liEl.innerHTML = `
  <span class="text">${todo}</span>
  <div class="options">
    <span id="check"><i class="fa fa-check"></i></span>
    <span id="edit"><i class="fa fa-edit"></i></span>
    <span id="trash"><i class="fa fa-trash"></i></span>
  </div>
  `;
  todoListContainer.appendChild(liEl);
}

function itemToDelete(item) {
  if (item.classList.contains("fa-trash") || item.id === "trash") {
    const todoLiEl = item.closest("li");
    todoLiEl.classList.remove("bounceIn");
    todoLiEl.classList.add("bounceOutDown");

    setTimeout(() => {
      todoLiEl.remove();
    }, 1000);

    deleteDataFromLocalstorage(item);
  }
}

function itemToEdit(item) {
  if (item.classList.contains("fa-edit") || item.id === "edit") {
    const todoLiEl = item.closest("li");
    todoInputEl.value = todoLiEl.textContent.trim();
    todoLiEl.remove();
    editItemFromLocalStorage(item);
  }
}

function itemDone(item) {
  if (item.classList.contains("fa-check") || item.id === "check") {
    const crossItem = item.closest("li");
    crossItem.firstElementChild.classList.add("completed");
    crossItem.classList.add("rotateOutDownLeft");

    crossItem.addEventListener("transitionend", () => {
      crossItem.remove();
    });

    deleteDataFromLocalstorage(item);
  }
}

// local Storage
function storeToLocalStorage(todo) {
  let todoArr;
  if (localStorage.getItem("todos") === null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(localStorage.getItem("todos"));
  }
  todoArr.push(todo);
  localStorage.setItem("todos", JSON.stringify(todoArr));
}

function displayDataFromLocalStorage() {
  const todoArr = JSON.parse(localStorage.getItem("todos"));
  for (const todo of todoArr) {
    displayTodoDOM(todo);
  }
}

function deleteDataFromLocalstorage(item) {
  const todoArr = JSON.parse(localStorage.getItem("todos"));
  const todoLiEl = item.closest("li");

  const todoItemLeft = todoArr.filter(
    (todo) => todoLiEl.textContent.trim() !== todo
  );

  localStorage.setItem("todos", JSON.stringify(todoItemLeft));
}

function editItemFromLocalStorage(item) {
  deleteDataFromLocalstorage(item);
}

// event
document.addEventListener("DOMContentLoaded", displayDataFromLocalStorage);

todoListContainer.addEventListener("click", (e) => {
  itemToDelete(e.target);
  itemToEdit(e.target);
  itemDone(e.target);
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputTodo = todoInputEl.value;
  if (!inputTodo) {
    alert("Please enter a todo item");
  } else {
    displayTodoDOM(inputTodo);
    storeToLocalStorage(inputTodo);
  }
  formEl.reset();
});