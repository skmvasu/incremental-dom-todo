/**
 * Created by pgotthardt on 14/01/16.
 */
export function toggleTodoState(id) {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
}

export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text
    }
}

export function filterTodos(filter) {
    return {
        type: 'FILTER_TODOS',
        filter
    }
}

export function initTodos(todos, filter) {
    return {
        type: 'INIT_TODOS',
        todos, filter
    }
}
