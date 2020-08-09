'use strict';
// FIXME: im not sure what level acually means here
module.exports = (client) => ({ level }) => (
    client.rcon({ command: `debug_level "${level}"` })
);

