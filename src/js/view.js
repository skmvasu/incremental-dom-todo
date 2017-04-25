// WEB-103, WEB-120, WEB-203 and WEB-301
import {isEnabled} from './lib/feature';
import TodoConstants from './constants.js';
import {patch, elementOpen, elementClose, text, elementVoid} from 'incremental-dom';

export function renderTodoApp(state) {
    patch(document.body, renderApp, state);
}

function renderApp(state) {
    const renderBottom = isEnabled('renderBottom');

    elementOpen("div", null, ["id", "app"]);
        !renderBottom && renderInput();
        renderTodos(state.todos, state.filter);
        renderFilters();
        renderBottom && renderInput();
    elementClose("div")
}

function renderFilters() {
    const isFiltersEnabled = isEnabled('filter');
    if (!isFiltersEnabled) return null;

    elementOpen('ul');
        elementOpen('li', null, [
            "class", "js-todo-filter",
            "data-filter", TodoConstants.SHOW_ALL]);
            text('Show All');
        elementClose('li');
        elementOpen('li', null, [
            "class", "js-todo-filter",
            "data-filter", TodoConstants.SHOW_DONE]);
            text('Done');
        elementClose('li');
        elementOpen('li', null, [
            "class", "js-todo-filter",
            "data-filter", TodoConstants.SHOW_PENDING]);
            text('Pending');
        elementClose('li');
    elementClose('ul');
}

function renderInput() {
    elementOpen('div', null, null,
        "class", "todo__input");
        elementVoid("input", null, ["id", "todoInput", "type", "text"]);
        elementOpen("button", null, 
            ["id", "addTodo",
            "type", "submit"]);
            text("Add");
        elementClose("button");
    elementClose('div');
}

function renderTodos(todos, filter) {
    const filteredTodos = filterTodos(todos, filter);
    elementOpen('ul', null, null,
        "class", "todo");
        filteredTodos.forEach((todo, index) => {
            elementOpen('li', null, null,
                "class", `todo__item todo__item--${todo.done ? 'done' : 'open'}`);
                elementVoid("input", null,
                    ["type", "checkbox", "data-id", todo.id, "class", "js_toggle_todo"]);
                text(todo.text);
            elementClose('li');
        });
    elementClose('ul');
}

function filterTodos(todos, filter) {
    if (!isEnabled('filter')) return todos;

    switch (filter) {
        case TodoConstants.SHOW_DONE:
            return todos.filter(filter => filter.done);
        case TodoConstants.SHOW_PENDING:
            return todos.filter(filter => !filter.done);
        default: 
            return todos;
    }
}
