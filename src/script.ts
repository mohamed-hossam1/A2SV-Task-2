
let todoCounter = 0;

function getById<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element with id "${id}" not found`);
  return el as T;
}

function qsIn<T extends Element>(root: ParentNode, selector: string): T {
  const el = root.querySelector(selector);
  if (!el) throw new Error(`Selector "${selector}" not found inside root`);
  return el as T;
}

const addButton = getById<HTMLButtonElement>("add-btn");
const inputElement = getById<HTMLInputElement>("todo-input");
const todoList = document.querySelector(".todo-list") as HTMLElement;

if (!todoList) throw new Error(`Element ".todo-list" not found`);

function addTask(initialText: string): void {
  let currentText: string = initialText;

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

  const deleteButton = getById<HTMLElement>(`delete-${todoCounter}`);
  const updateButton = getById<HTMLElement>(`update-${todoCounter}`);
  const iconsDiv = qsIn<HTMLDivElement>(itemElement, "#icons");
  const titleEl = qsIn<HTMLHeadingElement>(itemElement, "h2");

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
  if (taskText) addTask(taskText);
});

const todos: string[] = ["Do some homeworks", "Play some games", "Go to gym"];

function setup(): void {
  todos.forEach((t) => addTask(t));
}

setup();
