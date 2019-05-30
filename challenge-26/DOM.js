function DOM(nodeString) {
    this.element = document.querySelectorAll(nodeString);
}

DOM.prototype.on = function on(eventType, callback) {

    Array.prototype.forEach.call(this.element, function(element) {
        element.addEventListener(eventType, callback, false);
    });

    // this.element.forEach(function(node) {
    //     node.addEventListener(eventType, callback, false);
    // });
}

DOM.prototype.off = function off(eventType, callback) {
    
    Array.prototype.forEach.call(this.element, function(element) {
        element.removeEventListener(eventType, callback, false);
    });

    // this.element.forEach(function(node) {
    //     node.removeEventListener(eventType, callback, false);
    // });
}

DOM.prototype.get = function get() {
    return this.element;
}



