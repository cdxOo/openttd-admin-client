'use strict';
module.exports = (client) => ({ clientId, newName }) => (
    client.rcon({ command: `client_name ${clientId} "${newName}"` })
);

