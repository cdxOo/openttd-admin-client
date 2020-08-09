'use strict';
module.exports = (client) => ({ clientId, text }) => (
    client.rcon({ command: `say_client ${clientId} "${text}"` })
);
    
