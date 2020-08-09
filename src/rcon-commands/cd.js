'use strict';
module.exports = (client) => ({ index, directory }) => (
    client.rcon({
        command: `cd ${ directory ? '"' + directory + '"' : index }`
    })
);

