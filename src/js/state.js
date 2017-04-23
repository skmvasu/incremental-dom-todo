import {createStore, applyMiddleware, compose} from 'redux';
import TodoConstants from './constants.js';
 
const initialState = {
    todos: [],
    filter: TodoConstants.SHOW_ALL
};

function todoChangeHandler(state, change) {
    state = state || initialState;

    switch(change.type) {
        case 'ADD_TODO':
            if (!change.text) return state;

            return {...state, todos: state.todos.concat({
                id: state.todos.length,
                text: change.text,
                done: false
            })};

        case 'TODO_TOGGLE_DONE':
            const updated_todos = state.todos.map(todo => {
                if(todo.id === change.id) {
                    return {...todo, done: !todo.done};
                }

                return todo;
            });

            return {...state, todos: updated_todos};

        case 'FILTER_TODOS':
            const {filter} = change;
            return {...state, filter};

        case 'INIT_TODOS':
            return {...state, todos: change.todos, filter: change.filter};

        default:
            return state;
    }
}

export default createStore(
    todoChangeHandler, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
