import TodoConstants from './constants.js';
import {initTodos} from './actions.js';
import {todos} from './state';


const defaultTodos = [{
    id: 0,
    text: 'Take a look at the application',
    done: true
},
{
    id: 1,
    text: 'Add ability to filter todos',
    done: false
},
{
    id: 2,
    text: 'Filter todos by status',
    done: false
},
{
    id: 3,
    text: 'Filter todos by text',
    done: false
}];

export const syncData = (state) => {
	const {filter, todos} = state;
	localStorage.setItem('todos', JSON.stringify(todos));
	localStorage.setItem('filter', filter);
};

export const getInitialState = () => {
	const filter = localStorage.getItem('filter') || TodoConstants.SHOW_ALL;
	todos.dispatch(initTodos(getTodos(), filter));
};


const getTodos = () => {
	const lsTodos = localStorage.getItem('todos');
    const todos = lsTodos && JSON.parse(lsTodos);
	return todos && todos.length ? todos : defaultTodos;
};