'use strict';
module.exports = (client) => ({ text }) => (
    client.rcon({ command: `say "${text}"` })
);

