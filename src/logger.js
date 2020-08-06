'use strict';

var Logger = (level) => (required, message) => {
    if (level >= required) {
        console.log(message);
    }
}

module.exports = Logger;
