'use strict';
module.exports = (client) => () => (
    client.rcon({ command: 'status' })
);

