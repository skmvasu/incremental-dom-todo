// WEB-103, WEB-120, WEB-203 and WEB-301
import {isEnabled} from './lib/feature';
import TodoConstants from './constants.js';
import {patch, elementOpen, elementClose, text, elementVoid, applyAttr} from 'incremental-dom';

export function renderTodoApp(state) {
    patch(document.body, renderApp, state);
}

function renderApp(state) {
    const renderBottom = isEnabled('renderBottom');

    elementOpen("div", null, ["id", "app"]);
        !renderBottom && renderInput();
        renderTodos(state.todos, state.filter);
        renderFilters(state.filter);
        renderBottom && renderInput();
    elementClose("div")
}

function renderFilters(filter) {
    const isFiltersEnabled = isEnabled('filter');
    if (!isFiltersEnabled) return null;

    elementOpen('div', null, ["class", "filters"]);
        Object.keys(TodoConstants).forEach(key => {
            const isSelected =  TodoConstants[key] === filter;
            elementOpen('label');
                const node = elementVoid('input', null, ["type", "radio",
                    "name", "todo_filter",
                    "value", TodoConstants[key],
                    "class", "js-todo-filter" ]);
                if (isSelected) {
                    applyAttr(node, "checked", "checked");
                }
                text(TodoConstants[key]);
            elementClose('label');
        });
    elementClose('div');
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
                const node = elementVoid("input", null,
                    ["type", "checkbox", "data-id", todo.id, "class", "js_toggle_todo"]);
                if (todo.done) {
                    applyAttr(node, "checked", "checked");
                } else {
                    node.removeAttribute("checked");
                }
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
