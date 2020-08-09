'use strict';
module.exports = (client) => ({ clientId, ip }) => (
    client.rcon({ command: (
        `ban ${ ip ? ip : clientId }`
    )})
);
