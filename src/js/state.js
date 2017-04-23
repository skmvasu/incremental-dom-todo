import {createStore} from './lib/state';
import TodoConstants from './constants.js';
 
const initialState = {
    todos: [],
    filter: TodoConstants.SHOW_ALL
};

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            break;

        case 'FILTER_TODOS':
            const {filter} = change;
            return {...state, filter};

        case 'INIT_TODOS':
            return {...state, todos: change.todos, filter: change.filter};
    }
}

export const todos = createStore(todoChangeHandler, initialState);
