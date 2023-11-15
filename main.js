document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".js--form");
    const input = document.querySelector(".js--form__input");
    const todosWrapper = document.querySelector(".js--todos-wrapper");

    // Load saved todos from localStorage on page load
    loadTodos();

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });

    todosWrapper.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("todo-item__delete")) {
            deleteTodo(target.closest(".todo-item"));
        } else if (target.type === "checkbox") {
            toggleTodoStatus(target.closest(".todo-item"));
        }
    });

    function addTodo() {
        const value = input.value.trim();

        if (value !== "") {
            const todoItem = createTodoItem(value);
            todosWrapper.appendChild(todoItem);

            // Save todos to localStorage
            saveTodos();

            // Clear the input field
            // input.value = "";
        }
    }

    function createTodoItem(description) {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const span = document.createElement("span");
        span.classList.add("todo-item__description");
        span.textContent = description;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("todo-item__delete");
        deleteBtn.textContent = "Видалити";

        todoItem.appendChild(checkbox);
        todoItem.appendChild(span);
        todoItem.appendChild(deleteBtn);

        return todoItem;
    }

    function deleteTodo(todoItem) {
        todosWrapper.removeChild(todoItem);

        // Save todos to localStorage
        saveTodos();
    }

    function toggleTodoStatus(todoItem) {
        todoItem.classList.toggle("todo-item--checked");

        // Save todos to localStorage
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        const todoItems = document.querySelectorAll(".todo-item");

        todoItems.forEach(function (todoItem) {
            const description = todoItem.querySelector(".todo-item__description").textContent;
            const checked = todoItem.classList.contains("todo-item--checked");

            todos.push({ description, checked });
        });

        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];

        todos.forEach(function (todo) {
            const todoItem = createTodoItem(todo.description);

            if (todo.checked) {
                todoItem.classList.add("todo-item--checked");
            }

            todosWrapper.appendChild(todoItem);
        });
    }
});
