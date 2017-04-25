import '../css/main.css';
import store from './state';
import {registerEventHandlers} from './events';
import {getInitialState} from './TodoService.js';

window.addEventListener('load', getInitialState);
registerEventHandlers();
