export function listen(eventName, selector, handler) {
    document.addEventListener(eventName, event => {
        if(event.target.matches(selector)) {
            return handler(event);
        }
    });
}
