'use strict';
module.exports = (client) => ({ index, file }) => (
    client.rcon({
        command: `save ${ file ? '"' + file + '"' : index }`
    })
);

