import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, filterTodos} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });

    listen('click', '.js-todo-filter', event => {
        const {filter} = event.target.dataset;
        todos.dispatch(filterTodos(filter));
    });
}
