import '../css/main.css';

import {todos} from './state';
import {render} from './view';
import {registerEventHandlers} from './events';
import {syncData, getInitialState} from './TodoService.js';

todos.subscribe(newState => {
	syncData(newState);
	render(document.body, newState);
});

window.addEventListener('load', getInitialState);

render(document.body, todos.getState());
registerEventHandlers();
