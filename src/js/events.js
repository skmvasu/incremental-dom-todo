import store from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, filterTodos} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        store.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        store.dispatch(toggleTodoState(id));
    });

    listen('click', '.js-todo-filter', event => {
        const {filter} = event.target.dataset;
        store.dispatch(filterTodos(filter));
    }); 
}
