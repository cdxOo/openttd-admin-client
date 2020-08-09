'use strict';
module.exports = (client) => ({ playerId, text }) => (
    client.rcon({ command: `say_player ${playerId} "${text}"` })
);

