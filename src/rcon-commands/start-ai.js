'use strict';
// FIXME: idk what ai parameter is here and what the command
// does in general
module.exports = (client) => ({ ai }) => (
    client.rcon({ command: `start_ai "${ai}"` })
);
    
