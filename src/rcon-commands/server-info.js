'use strict';
module.exports = (client) => () => (
    client.rcon({ command: 'server_info' })
);

