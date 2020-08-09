'use strict';
module.exports = (client) => ({ index, file }) => (
    client.rcon({
        command: `rm ${ file ? '"' + file + '"' : index }`
    })
);

