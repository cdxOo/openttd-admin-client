'use strict';
module.exports = (client) => ({ ip }) => (
    client.rcon({ command: `unban ${ip}` })
);

