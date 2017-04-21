import {isEnabled} from './lib/feature';
import TodoConstants from './constants.js';

export function render(el, state) {
    const filteredTodos = filterTodos(state.todos, state.filter)
    const todoItems = filteredTodos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems)
    );
}

function renderApp(input, todoList) {
    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList);
    } else {
        return renderAddTodoAtTop(input, todoList);
    }
}

function renderAddTodoAtTop(input, todoList) {   
    return `<div id="app">
        ${input}
        ${todoList}
        ${renderFilters(todoList)}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
        ${renderFilters(todoList)}
    </div>`;
}

function renderFilters(todoList) {
    const isFiltersEnabled = isEnabled('filter');
    if (!isFiltersEnabled) return '';

    return `
        <ul id="filters">
            <li class="js-todo-filter" data-filter=${TodoConstants.SHOW_ALL}>Show All</li>
            <li class="js-todo-filter" data-filter=${TodoConstants.SHOW_DONE}>Done</li>
            <li class="js-todo-filter" data-filter=${TodoConstants.SHOW_PENDING}>Pending</li>
        </ul>
    `;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}

function filterTodos(todos, filter) {
    switch (filter) {
        case TodoConstants.SHOW_DONE:
            return todos.filter(filter => filter.done);
        case TodoConstants.SHOW_PENDING:
            return todos.filter(filter => !filter.done);
        default: 
            return todos;
    }
}
