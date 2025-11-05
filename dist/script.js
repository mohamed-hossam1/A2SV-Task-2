"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
let todoCounter = 0;
function getById(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element with id "${id}" not found`);
    return el;
}
function qsIn(root, selector) {
    const el = root.querySelector(selector);
    if (!el)
        throw new Error(`Selector "${selector}" not found inside root`);
    return el;
}
const addButton = getById("add-btn");
const inputElement = getById("todo-input");
const todoList = document.querySelector(".todo-list");
if (!todoList)
    throw new Error(`Element ".todo-list" not found`);
function addTask(initialText) {
    let currentText = initialText;
    const itemElement = document.createElement("div");
    itemElement.classList.add(`item-${todoCounter}`, "item");
    itemElement.innerHTML = `
    <h2>${currentText}</h2>
    <div id="icons">
      <i id="update-${todoCounter}" class="fa-solid fa-pen-to-square" role="button" aria-label="Update"></i>
      <i id="delete-${todoCounter}" class="fa-solid fa-trash" role="button" aria-label="Delete"></i>
    </div>
  `;
    todoList.appendChild(itemElement);
    const deleteButton = getById(`delete-${todoCounter}`);
    const updateButton = getById(`update-${todoCounter}`);
    const iconsDiv = qsIn(itemElement, "#icons");
    const titleEl = qsIn(itemElement, "h2");
    deleteButton.addEventListener("click", () => {
        todoList.removeChild(itemElement);
    });
    updateButton.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.className = "edit-input";
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.className = "update-confirm-btn";
        titleEl.replaceWith(input);
        iconsDiv.replaceWith(updateBtn);
        updateBtn.addEventListener("click", () => {
            const newText = input.value.trim();
            if (newText) {
                titleEl.textContent = newText;
                input.replaceWith(titleEl);
                currentText = newText;
                updateBtn.replaceWith(iconsDiv);
            }
        });
    });
    todoCounter++;
    inputElement.value = "";
}
addButton.addEventListener("click", () => {
    const taskText = inputElement.value.trim();
    if (taskText)
        addTask(taskText);
});
const todos = ["Do some homeworks", "Play some games", "Go to gym"];
function setup() {
    todos.forEach((t) => addTask(t));
}
setup();
//# sourceMappingURL=script.js.map
