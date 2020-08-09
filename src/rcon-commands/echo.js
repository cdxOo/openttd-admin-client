'use strict';
module.exports = (client) => ({ text }) => (
    client.rcon({ command: `echo "${text}"` })
);
